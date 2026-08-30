import { db } from '../config/firebase.js';

export const getProjects = async (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not configured' });
  }

  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};