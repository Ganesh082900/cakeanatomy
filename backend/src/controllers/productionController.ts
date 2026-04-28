import { Request, Response } from 'express';
import Production from '../models/Production';
import { startOfDay, endOfDay } from 'date-fns';

export const getAllProductions = async (req: Request, res: Response) => {
  try {
    const { status, startDate, endDate } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (startDate && endDate) {
      query.scheduledDate = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string)
      };
    }

    const productions = await Production.find(query)
      .populate('recipe', 'name category')
      .populate('assignedTo', 'name role')
      .sort({ scheduledDate: -1 });

    res.json({ success: true, data: productions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTodaysProduction = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    const startToday = startOfDay(today);
    const endToday = endOfDay(today);

    const productions = await Production.find({
      scheduledDate: { $gte: startToday, $lte: endToday }
    })
      .populate('recipe', 'name category')
      .populate('assignedTo', 'name role')
      .sort({ status: 1, scheduledDate: 1 });

    res.json({ success: true, data: productions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductionById = async (req: Request, res: Response) => {
  try {
    const production = await Production.findById(req.params.id)
      .populate('recipe')
      .populate('assignedTo', 'name role')
      .populate('qualityCheck.checkedBy', 'name');
      
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    
    res.json({ success: true, data: production });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduction = async (req: Request, res: Response) => {
  try {
    const production = await Production.create(req.body);
    res.status(201).json({ success: true, data: production });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduction = async (req: Request, res: Response) => {
  try {
    const production = await Production.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    
    res.json({ success: true, data: production });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const startProduction = async (req: Request, res: Response) => {
  try {
    const production = await Production.findByIdAndUpdate(
      req.params.id,
      {
        status: 'in-progress',
        startTime: new Date()
      },
      { new: true }
    );
    
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    
    res.json({ success: true, data: production });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const completeProduction = async (req: Request, res: Response) => {
  try {
    const { actualQuantityProduced, wastage, wastageReason, qualityCheck } = req.body;
    
    const production = await Production.findByIdAndUpdate(
      req.params.id,
      {
        status: 'completed',
        endTime: new Date(),
        actualQuantityProduced,
        wastage,
        wastageReason,
        qualityCheck
      },
      { new: true }
    );
    
    if (!production) {
      return res.status(404).json({ success: false, message: 'Production not found' });
    }
    
    res.json({ success: true, data: production });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
