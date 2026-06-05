import { JournalEntry } from '../lib/journalService';
import { Link } from 'react-router-dom';

interface JournalSummaryProps {
  entry?: JournalEntry;
}

function JournalSummary({ entry }: JournalSummaryProps) {
  if (!entry) {
    return (
      <div className="space-y-6 rounded-3xl bg-slate-50 p-6 text-slate-900">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">No entries yet</p>
          <h2 className="mt-2 text-2xl font-semibold">Start your first journal</h2>
        </div>
        <p className="text-slate-600">Create a daily entry with a mood and your thoughts. Each day can only store one journal.</p>
        <Link
          to="/add"
          className="inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Add today&apos;s entry
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-3xl bg-slate-50 p-6 text-slate-900">
      <div>
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Latest entry</p>
        <h2 className="mt-2 text-2xl font-semibold">Your most recent reflection</h2>
      </div>
      <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-200/70">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{entry.mood}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{entry.date}</span>
        </div>
        <p className="mt-6 whitespace-pre-line text-slate-700">{entry.text}</p>
      </div>
      <Link
        to={`/add?date=${entry.date}`}
        className="inline-flex items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-100"
      >
        Edit latest entry
      </Link>
    </div>
  );
}

export default JournalSummary;
