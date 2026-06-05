export interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  text: string;
}

const STORAGE_KEY = 'daily-journal-entries';

function parseEntries(value: string | null): JournalEntry[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as JournalEntry[];
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item.date === 'string' && typeof item.mood === 'string' && typeof item.text === 'string')
      : [];
  } catch {
    return [];
  }
}

export class JournalService {
  getEntries(): JournalEntry[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return parseEntries(raw).sort((a, b) => b.date.localeCompare(a.date));
  }

  getEntryByDate(date: string): JournalEntry | undefined {
    return this.getEntries().find((entry) => entry.date === date);
  }

  saveEntry(entry: JournalEntry): JournalEntry {
    const entries = this.getEntries().filter((item) => item.date !== entry.date);
    const updated = [entry, ...entries].sort((a, b) => b.date.localeCompare(a.date));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return entry;
  }

  deleteEntry(date: string): void {
    const entries = this.getEntries().filter((item) => item.date !== date);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
}
