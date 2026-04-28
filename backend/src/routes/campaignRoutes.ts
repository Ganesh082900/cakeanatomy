import express from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  sendCampaign,
  scheduleCampaign
} from '../controllers/campaignController';

const router = express.Router();

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);
router.post('/:id/send', sendCampaign);
router.post('/:id/schedule', scheduleCampaign);

export default router;
