import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return false;

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captchaToken } = await req.json() as {
      name: string;
      email: string;
      subject: string;
      message: string;
      captchaToken: string;
    };

    // Validate required fields
    if (!name || !email || !subject || !message || !captchaToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Verify Google reCAPTCHA
    /*const captchaValid = await verifyRecaptcha(captchaToken);
    if (!captchaValid) {
      return NextResponse.json({ error: 'CAPTCHA verification failed' }, { status: 400 });
    }*/

    // Send email via Resend (instantiated here so env var is read at request time)
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Website Contact Form <noreply@stacywilliamsphd.com>',
      to: 'Stacy.Williams@marist.edu',
      reply_to: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #faf9f6;">
          <div style="border-top: 4px solid #c9973e; padding-top: 24px; margin-bottom: 24px;">
            <h1 style="font-size: 22px; color: #1e3a5f; margin: 0 0 4px;">New Contact Form Submission</h1>
            <p style="font-size: 13px; color: #6b7280; margin: 0;">stacywilliamsphd.com</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 12px; background: #f0f4f8; font-size: 12px; color: #4a5568; font-weight: bold; width: 100px; border-bottom: 1px solid #e2e8f0;">From</td>
              <td style="padding: 8px 12px; font-size: 14px; color: #1e3a5f; border-bottom: 1px solid #e2e8f0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f0f4f8; font-size: 12px; color: #4a5568; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 8px 12px; font-size: 14px; color: #1e3a5f; border-bottom: 1px solid #e2e8f0;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; background: #f0f4f8; font-size: 12px; color: #4a5568; font-weight: bold;">Subject</td>
              <td style="padding: 8px 12px; font-size: 14px; color: #1e3a5f;">${subject}</td>
            </tr>
          </table>
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 4px; padding: 20px;">
            <p style="font-size: 12px; color: #6b7280; margin: 0 0 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="font-size: 14px; color: #2d3748; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 11px; color: #9ca3af; margin-top: 24px;">
            Sent via the contact form at stacywilliamsphd.com. Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
