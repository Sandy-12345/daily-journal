import { JournalEntry } from '../lib/journalService';

interface JournalListProps {
  entries: JournalEntry[];
  onDelete: (date: string) => void;
  onEdit: (date: string) => void;
}

function JournalList({ entries, onDelete, onEdit }: JournalListProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/80">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Journal archive</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">My Journals</h2>
          </div>
          <p className="text-sm text-slate-600">{entries.length} total entries</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-3xl bg-white p-6 text-slate-700 shadow-sm shadow-slate-200/80">
          <p className="text-base">No journal entries yet. Start a new entry on the Add New Journal page.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <article key={entry.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 transition hover:-translate-y-1 hover:shadow-md hover:shadow-slate-200">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(entry.date)}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 transition hover:bg-slate-200"
                    >
                      {entry.date}
                    </button>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">{entry.mood}</span>
                  </div>
                  <p className="max-w-2xl text-slate-700">{entry.text.length > 180 ? `${entry.text.slice(0, 180)}...` : entry.text}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    onClick={() => onEdit(entry.date)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                    onClick={() => onDelete(entry.date)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalList;
