export interface TimeZoneOption {
  label: string;
  value: string;
  offset: string;
}

export const COMMON_TIMEZONES: TimeZoneOption[] = [
  { label: 'IST - Mumbai, Maharashtra (UTC+05:30)', value: 'Asia/Kolkata', offset: 'UTC+05:30' },
  { label: 'Auto (System Local)', value: 'AUTO', offset: 'Local' },
  { label: 'UTC - Coordinated Universal Time', value: 'UTC', offset: 'UTC+00:00' },
  { label: 'PST / PDT - Pacific Time (US)', value: 'America/Los_Angeles', offset: 'UTC-08:00' },
  { label: 'EST / EDT - Eastern Time (US)', value: 'America/New_York', offset: 'UTC-05:00' },
  { label: 'CST / CDT - Central Time (US)', value: 'America/Chicago', offset: 'UTC-06:00' },
  { label: 'GMT / BST - London (UK)', value: 'Europe/London', offset: 'UTC+00:00' },
  { label: 'CET / CEST - Paris, Berlin (Europe)', value: 'Europe/Paris', offset: 'UTC+01:00' },
  { label: 'GST - Dubai (UAE)', value: 'Asia/Dubai', offset: 'UTC+04:00' },
  { label: 'SGT - Singapore', value: 'Asia/Singapore', offset: 'UTC+08:00' },
  { label: 'JST - Tokyo (Japan)', value: 'Asia/Tokyo', offset: 'UTC+09:00' },
  { label: 'AEST / AEDT - Sydney (Australia)', value: 'Australia/Sydney', offset: 'UTC+11:00' },
];

export function getResolvedTimeZone(tzValue?: string): string {
  if (!tzValue || tzValue === 'AUTO') {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
    } catch {
      return 'Asia/Kolkata';
    }
  }
  return tzValue;
}

export function formatTimeWithZone(date: Date, tzValue?: string): { timeString: string; dateString: string; tzLabel: string } {
  const resolvedTz = getResolvedTimeZone(tzValue);

  try {
    const timeString = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedTz,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date);

    const dateString = new Intl.DateTimeFormat('en-US', {
      timeZone: resolvedTz,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);

    // Friendly abbreviation or tz name
    const found = COMMON_TIMEZONES.find((t) => t.value === resolvedTz || t.value === tzValue);
    const tzLabel = found ? found.label.split(' - ')[0] : resolvedTz.split('/').pop()?.replace('_', ' ') || resolvedTz;

    return { timeString, dateString, tzLabel };
  } catch (err) {
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    return { timeString, dateString, tzLabel: 'Local Time' };
  }
}
