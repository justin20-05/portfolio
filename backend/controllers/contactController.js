import { db } from '../config/firebase.js';

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const docRef = await db.collection('inquiries').add({
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};