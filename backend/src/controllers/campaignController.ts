import { Request, Response } from 'express';
import Campaign from '../models/Campaign';

export const getAllCampaigns = async (req: Request, res: Response) => {
  try {
    const { status, type } = req.query;
    const query: any = {};
    
    if (status) query.status = status;
    if (type) query.type = type;

    const campaigns = await Campaign.find(query)
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: campaigns });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('targetAudience.customerIds', 'name email phone');
      
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    
    res.json({ success: true, data: campaign });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json({ success: true, data: campaign });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    
    res.json({ success: true, data: campaign });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    
    res.json({ success: true, message: 'Campaign cancelled successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const sendCampaign = async (req: Request, res: Response) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }

    if (campaign.status !== 'draft' && campaign.status !== 'scheduled') {
      return res.status(400).json({ success: false, message: 'Campaign cannot be sent' });
    }

    // TODO: Implement actual sending logic (WhatsApp, SMS, Email)
    // For now, just update status
    campaign.status = 'sent';
    campaign.sentDate = new Date();
    
    // Mock statistics
    campaign.statistics = {
      sent: campaign.targetAudience.customerIds?.length || 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      failed: 0
    };
    
    await campaign.save();

    res.json({
      success: true,
      message: 'Campaign sent successfully',
      data: campaign
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const scheduleCampaign = async (req: Request, res: Response) => {
  try {
    const { scheduledDate } = req.body;
    
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      {
        status: 'scheduled',
        scheduledDate: new Date(scheduledDate)
      },
      { new: true }
    );
    
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found' });
    }
    
    res.json({ success: true, data: campaign });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
