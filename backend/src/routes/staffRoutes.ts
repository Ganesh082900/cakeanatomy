import express from 'express';
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
  getAttendance,
  clockIn,
  clockOut,
  markLeave
} from '../controllers/staffController';

const router = express.Router();

router.get('/', getAllStaff);
router.get('/:id', getStaffById);
router.post('/', createStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);

// Attendance routes
router.get('/:id/attendance', getAttendance);
router.post('/:id/clock-in', clockIn);
router.post('/:id/clock-out', clockOut);
router.post('/:id/leave', markLeave);

export default router;
