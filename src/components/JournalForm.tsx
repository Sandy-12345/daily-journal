import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { JournalEntry } from '../lib/journalService';

interface JournalFormProps {
  entries: JournalEntry[];
  onSave: (entry: JournalEntry) => void;
}

const moodOptions = [
  { value: '😊', label: 'Happy' },
  { value: '😌', label: 'Calm' },
  { value: '😔', label: 'Sad' },
  { value: '😠', label: 'Angry' },
  { value: '😴', label: 'Tired' }
];

function formatToday() {
  return new Date().toISOString().slice(0, 10);
}

function JournalForm({ entries, onSave }: JournalFormProps) {
  const [searchParams] = useSearchParams();
  const queryDate = searchParams.get('date');
  const existingEntry = useMemo(
    () => (queryDate ? entries.find((entry) => entry.date === queryDate) : undefined),
    [entries, queryDate]
  );

  const [date, setDate] = useState(formatToday());
  const [mood, setMood] = useState(moodOptions[0].value);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (existingEntry) {
      setDate(existingEntry.date);
      setMood(existingEntry.mood);
      setText(existingEntry.text);
      setError('');
    }
  }, [existingEntry]);

  const isExistingDate = entries.some((entry) => entry.date === date && entry.date !== existingEntry?.date);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) {
      setError('Please select a date.');
      return;
    }

    if (!mood) {
      setError('Please select a mood.');
      return;
    }

    if (!text.trim()) {
      setError('Please add your journal text.');
      return;
    }

    if (isExistingDate) {
      setError('An entry already exists for that date. Choose a different date or edit the existing entry.');
      return;
    }

    onSave({
      id: existingEntry?.id ?? crypto.randomUUID(),
      date,
      mood,
      text: text.trim()
    });
  };

  return (
    <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/80">
      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{existingEntry ? 'Edit entry' : 'Add new journal'}</p>
          {existingEntry && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Editing</span>}
        </div>
        <h2 className="text-3xl font-semibold text-slate-900">{existingEntry ? 'Update the day' : 'Write your journal entry'}</h2>
        <p className="text-sm text-slate-600">Each calendar day can have one entry. Choose today or select a past date to update it.</p>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            Date
            <input
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <div className="space-y-3 text-sm font-medium text-slate-700">
            <p className="mb-2">Mood</p>
            <div className="grid grid-cols-3 gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMood(option.value)}
                  className={`rounded-3xl border px-4 py-3 text-left transition ${
                    mood === option.value
                      ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-2xl">{option.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.24em]">{option.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          Journal text
          <textarea
            className="min-h-[180px] w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Describe what happened today, what you felt, or what you want to remember."
          />
        </label>
        {error && <p className="rounded-3xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</p>}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          {existingEntry ? 'Save changes' : 'Save entry'}
        </button>
      </form>
    </div>
  );
}

export default JournalForm;
