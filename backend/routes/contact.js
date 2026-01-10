const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendContactFormEmail } = require('../utils/emailService');

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit contact form
router.post('/', async (req, res) => {
  const contact = new Contact(req.body);
  try {
    // Save to database
    const newContact = await contact.save();

    // Send email notification
    try {
      await sendContactFormEmail(req.body);
      console.log('Contact form email sent successfully');
    } catch (emailError) {
      console.error('Failed to send contact form email:', emailError);
      // Don't fail the request if email fails, just log it
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      data: newContact
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact status
router.patch('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
