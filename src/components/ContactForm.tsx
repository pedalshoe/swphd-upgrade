'use client';

import { useState, useRef } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('contact');
  const captchaRef = useRef<HCaptcha>(null);

  const [status, setStatus] = useState<Status>('idle');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please complete the CAPTCHA verification.');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        setCaptchaToken(null);
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const inputBase =
    'w-full border border-navy-200 rounded px-4 py-3 text-navy-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-navy-400 focus:border-transparent transition-colors duration-200 placeholder:text-navy-300';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1.5">
            {t('form_name')} <span className="text-red-500" aria-hidden>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
            {t('form_email')} <span className="text-red-500" aria-hidden>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputBase}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-navy-700 mb-1.5">
          {t('form_subject')} <span className="text-red-500" aria-hidden>*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={form.subject}
          onChange={handleChange}
          className={clsx(inputBase, 'cursor-pointer')}
        >
          <option value="">Select a subject...</option>
          <option value="Consulting Inquiry">Consulting Inquiry</option>
          <option value="Speaking Engagement">Speaking Engagement</option>
          <option value="Research Collaboration">Research Collaboration</option>
          <option value="Professional Development">Professional Development</option>
          <option value="Media / Press">Media / Press</option>
          <option value="General Inquiry">General Inquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1.5">
          {t('form_message')} <span className="text-red-500" aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder="Please describe how Dr. Williams can assist you..."
          className={clsx(inputBase, 'resize-y min-h-[140px]')}
        />
      </div>

      {/* hCaptcha */}
      <div>
        <HCaptcha
          ref={captchaRef}
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '10000000-ffff-ffff-ffff-000000000001'}
          onVerify={(token) => setCaptchaToken(token)}
          onExpire={() => setCaptchaToken(null)}
          theme="light"
        />
        <p className="text-xs text-navy-400 mt-1.5">
          This form is protected by hCaptcha to prevent automated submissions.
        </p>
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded p-4" role="alert">
          <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-green-800 text-sm">{t('form_success')}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded p-4" role="alert">
          <AlertCircle size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
          <p className="text-red-800 text-sm">{t('form_error')}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending' || !captchaToken}
        className={clsx(
          'btn-primary w-full sm:w-auto justify-center',
          (status === 'sending' || !captchaToken) && 'opacity-60 cursor-not-allowed'
        )}
      >
        {status === 'sending' ? (
          <>
            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
            {t('form_sending')}
          </>
        ) : (
          <>
            <Send size={16} />
            {t('form_submit')}
          </>
        )}
      </button>
    </form>
  );
}
