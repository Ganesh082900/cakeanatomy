import { Request, Response } from 'express';
import Staff from '../models/Staff';
import Attendance from '../models/Attendance';

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const { isActive } = req.query;
    const query = isActive !== undefined ? { isActive: isActive === 'true' } : {};
    
    const staff = await Staff.find(query).sort({ name: 1 });
    res.json({ success: true, data: staff });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStaffById = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }
    res.json({ success: true, data: staff });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({ success: true, data: staff });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }
    
    res.json({ success: true, data: staff });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff not found' });
    }
    
    res.json({ success: true, message: 'Staff deactivated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendance = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const query: any = { staff: req.params.id };
    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }
    
    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clockIn = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.create({
      staff: req.params.id,
      date: new Date(),
      clockIn: new Date(),
      status: 'present'
    });
    
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const clockOut = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const attendance = await Attendance.findOneAndUpdate(
      {
        staff: req.params.id,
        date: { $gte: today },
        clockOut: { $exists: false }
      },
      { clockOut: new Date() },
      { new: true }
    );
    
    if (!attendance) {
      return res.status(404).json({ success: false, message: 'No clock-in record found for today' });
    }
    
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const markLeave = async (req: Request, res: Response) => {
  try {
    const { date, leaveType, notes } = req.body;
    
    const attendance = await Attendance.create({
      staff: req.params.id,
      date: new Date(date),
      status: 'leave',
      leaveType,
      notes
    });
    
    res.json({ success: true, data: attendance });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
