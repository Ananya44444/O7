import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { generateContactReply } from '../services/openaiService';
import { sendEmail } from '../services/emailService';

// Submit contact form
export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const contactData = req.body;
    
    const contact = new Contact(contactData);
    await contact.save();

    // Generate AI reply
    try {
      const aiReply = await generateContactReply(
        contactData.message,
        contactData.firstName
      );
      
      // Update contact with AI reply
      contact.aiReply = aiReply;
      contact.status = 'responded';
      contact.repliedAt = new Date();
      await contact.save();

      // Send email reply to the submitter
      await sendEmail({
        to: contactData.email,
        subject: `Thank you for contacting us, ${contactData.firstName}`,
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Dear ${contactData.firstName} ${contactData.lastName},</p>
          <p>${aiReply}</p>
          <br>
          <p>Best regards,</p>
          <p>The MasterSolis Team</p>
        `
      });
    } catch (emailError) {
      console.error('Email or AI reply error:', emailError);
      // Don't fail the entire request if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!',
      contact: {
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
};

// Get all contact submissions (Admin only)
export const getContactSubmissions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query: any = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      contacts,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get contact by ID (Admin only)
export const getContactById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      contact
    });
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update contact status (Admin only)
export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete contact submission (Admin only)
export const deleteContact = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact submission deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};