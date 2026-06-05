import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { JournalEntry, JournalService } from './lib/journalService';
import JournalForm from './components/JournalForm';
import JournalList from './components/JournalList';
import JournalSummary from './components/JournalSummary';

const journalService = new JournalService();

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEntries(journalService.getEntries());
  }, []);

  const totalEntries = entries.length;
  const latestEntry = useMemo(() => {
    return [...entries].sort((a, b) => b.date.localeCompare(a.date))[0];
  }, [entries]);

  const refreshEntries = () => setEntries(journalService.getEntries());

  const handleDelete = async (date: string) => {
    journalService.deleteEntry(date);
    refreshEntries();
  };

  const handleSave = async (entry: JournalEntry) => {
    journalService.saveEntry(entry);
    refreshEntries();
    navigate('/journals');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 sticky top-0 z-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.25em] text-slate-500">Daily Journal</p>
            <h1 className="text-3xl font-semibold text-slate-900">Mood Tracker & Journal</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-medium text-slate-700">
            <Link className="rounded-full bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-600" to="/">
              Home
            </Link>
            <Link className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100" to="/journals">
              My Journals
            </Link>
            <Link className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:bg-slate-100" to="/add">
              Add New Journal
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 via-violet-600 to-slate-900 px-6 py-10 text-white shadow-[0_25px_80px_rgba(56,189,248,0.16)] sm:px-8">
                  <div className="max-w-3xl space-y-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-sky-200">Today</p>
                    <h2 className="text-4xl font-semibold sm:text-5xl">Track your mood and reflect daily.</h2>
                    <p className="max-w-2xl text-base leading-7 text-sky-100/90">
                      One journal entry per calendar day, with mood support, clear history, and fast access to past reflections.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-[max-content_1fr] sm:items-center">
                      <div className="space-y-3">
                        <p className="text-sm uppercase tracking-[0.3em] text-sky-200">Your next step</p>
                        <p className="text-3xl font-semibold">Write, review, or update your journals.</p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => navigate('/add')}
                          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 shadow-lg shadow-slate-950/5 transition hover:bg-slate-100"
                        >
                          Add today&apos;s entry
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('/journals')}
                          className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                          View journal history
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="space-y-6 rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/70">
                    <div className="space-y-2">
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Stats</p>
                      <h2 className="text-2xl font-semibold text-slate-900">Journal overview</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-slate-50 p-6">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Total entries</p>
                        <p className="mt-4 text-5xl font-semibold text-slate-900">{totalEntries}</p>
                      </div>
                      <div className="rounded-3xl bg-slate-50 p-6">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Latest mood</p>
                        <p className="mt-4 text-5xl font-semibold text-slate-900">{latestEntry ? `${latestEntry.mood}` : '—'}</p>
                        <p className="mt-2 text-sm text-slate-600">{latestEntry ? latestEntry.date : 'No entries yet'}</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-brand-50 p-5 text-slate-900">
                      <p className="text-sm uppercase tracking-[0.24em] text-brand-700">Quick add</p>
                      <p className="mt-3 text-base text-slate-700">Add a new journal entry for today or update a recent date.</p>
                      <button
                        type="button"
                        onClick={() => navigate('/add')}
                        className="mt-4 inline-flex items-center justify-center rounded-3xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                      >
                        Add New Journal
                      </button>
                    </div>
                  </div>
                  <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200/70">
                    <JournalSummary entry={latestEntry} />
                  </div>
                </div>
              </div>
            }
          />
          <Route
            path="/journals"
            element={<JournalList entries={entries} onDelete={handleDelete} onEdit={(date) => navigate(`/add?date=${date}`)} />}
          />
          <Route path="/add" element={<JournalForm entries={entries} onSave={handleSave} />} />
          <Route path="*" element={<p className="text-slate-700">Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
