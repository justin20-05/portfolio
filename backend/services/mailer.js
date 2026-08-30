import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

export function createTransporter() {
  if (!isEmailConfigured()) {
    throw new Error('Email is not configured. Set SMTP_USER and SMTP_PASS.');
  }

  const port = Number(process.env.SMTP_PORT || 587);

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendContactEmail({ name, email, subject, message }) {
  const transporter = createTransporter();
  const to = process.env.CONTACT_TO || process.env.SMTP_USER;
  const fromName = process.env.CONTACT_FROM_NAME || 'Portfolio';
  const safeName = name.replace(/["\r\n]/g, ' ').trim();

  await transporter.sendMail({
    from: `"${fromName}" <${process.env.SMTP_USER}>`,
    to,
    replyTo: `"${safeName}" <${email}>`,
    subject: `Portfolio: ${subject}`,
    text: [
      `New message from ${name} <${email}>`,
      `Subject: ${subject}`,
      '',
      message,
    ].join('\n'),
    html: `
      <div style="font-family:Georgia,serif;background:#07080c;color:#f4f4f5;padding:32px">
        <div style="max-width:560px;margin:0 auto;background:#101218;border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px">
          <p style="margin:0 0 8px;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#5eead4">New inquiry</p>
          <h1 style="margin:0 0 20px;font-size:22px;color:#f4f4f5">${escapeHtml(subject)}</h1>
          <p style="margin:0 0 6px;color:#8b8d97;font-size:14px">From</p>
          <p style="margin:0 0 18px;font-size:15px">
            ${escapeHtml(name)} ·
            <a href="mailto:${escapeHtml(email)}" style="color:#5eead4">${escapeHtml(email)}</a>
          </p>
          <p style="margin:0 0 6px;color:#8b8d97;font-size:14px">Message</p>
          <p style="margin:0;white-space:pre-wrap;line-height:1.6;font-size:15px;color:#e4e4e7">${escapeHtml(message)}</p>
        </div>
      </div>
    `,
  });
}

export { EMAIL_RE };
