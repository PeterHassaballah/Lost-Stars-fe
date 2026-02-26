import { FormEvent, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormState = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = () => {
    const nextErrors: Partial<FormState> = {};

    if (!values.name.trim()) nextErrors.name = 'Please provide your name.';
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setValues(initialState);
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-violet-400 focus:outline-none"
          required
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-rose-300">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((prev) => ({ ...prev, email: e.target.value }))}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-violet-400 focus:outline-none"
          required
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-rose-300">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((prev) => ({ ...prev, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 focus:border-violet-400 focus:outline-none"
          required
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-rose-300">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-lg bg-violet-500 px-5 py-2 font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && <p className="text-sm text-emerald-300">Thanks! Your message was sent.</p>}
      {status === 'error' && (
        <p className="text-sm text-rose-300">Something went wrong. Please try again shortly.</p>
      )}
    </form>
  );
}
