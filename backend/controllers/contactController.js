import { db } from '../config/firebase.js';
import { EMAIL_RE, isEmailConfigured, sendContactEmail } from '../services/mailer.js';

const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  subject: { min: 3, max: 120 },
  message: { min: 10, max: 4000 },
};

function clean(value, max) {
  return String(value ?? '')
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, max);
}

function validate({ name, email, subject, message }) {
  if (name.length < LIMITS.name.min) return 'Please enter your name.';
  if (!EMAIL_RE.test(email)) return 'Please enter a valid email address.';
  if (subject.length < LIMITS.subject.min) return 'Please add a subject.';
  if (message.length < LIMITS.message.min) return 'Please write a slightly longer message.';
  return null;
}

export const submitInquiry = async (req, res) => {
  try {
    if (req.body?.website) {
      return res.status(201).json({ success: true });
    }

    const name = clean(req.body?.name, LIMITS.name.max);
    const email = clean(req.body?.email, LIMITS.email.max).toLowerCase();
    const subject = clean(req.body?.subject, LIMITS.subject.max);
    const message = String(req.body?.message ?? '').trim().slice(0, LIMITS.message.max);

    const error = validate({ name, email, subject, message });
    if (error) {
      return res.status(400).json({ error });
    }

    if (!isEmailConfigured()) {
      return res.status(503).json({
        error: 'Email is not configured on the server yet.',
      });
    }

    await sendContactEmail({ name, email, subject, message });

    if (db) {
      try {
        await db.collection('inquiries').add({
          name,
          email,
          subject,
          message,
          createdAt: new Date().toISOString(),
        });
      } catch (logError) {
        console.warn('Inquiry saved to inbox, but Firestore log failed:', logError.message);
      }
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Contact inquiry failed:', error.message);
    res.status(500).json({ error: 'Could not send your message. Please try again.' });
  }
};
