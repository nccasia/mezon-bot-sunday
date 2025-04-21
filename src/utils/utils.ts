import moment from 'moment';

interface TimeMatch {
  targetMoment: moment.Moment;
  timezone: string;
}

const formatDuration = (duration: moment.Duration): string => {
  const parts = [];
  const days = Math.floor(duration.asDays());
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (days > 0) parts.push(`${days} ngày`);
  if (hours > 0) parts.push(`${hours} giờ`);
  if (minutes > 0) parts.push(`${minutes} phút`);
  if (seconds > 0) parts.push(`${seconds} giây`);

  return parts.join(' ');
};

const parseTargetTime = (match: RegExpMatchArray): TimeMatch => {
  const targetTimeStr = match[1];
  return {
    targetMoment: moment.parseZone(targetTimeStr, 'YYYY/MM/DD HH:mm:ss Z'),
    timezone: targetTimeStr.slice(-5),
  };
};

const parseWeeklyTime = (match: RegExpMatchArray): TimeMatch => {
  const [, dayOfWeek, timeStr, timezone] = match;
  const now = moment().utcOffset(timezone);
  let targetMoment = moment(now)
    .day(parseInt(dayOfWeek))
    .set({
      hour: parseInt(timeStr.split(':')[0]),
      minute: parseInt(timeStr.split(':')[1]),
      second: 0,
    });

  if (targetMoment.isBefore(now)) {
    targetMoment = targetMoment.add(1, 'week');
  }

  return { targetMoment, timezone };
};

const parseDailyTime = (match: RegExpMatchArray): TimeMatch => {
  const [, timeStr, timezone] = match;
  const now = moment().utcOffset(timezone);
  let targetMoment = moment(now).set({
    hour: parseInt(timeStr.split(':')[0]),
    minute: parseInt(timeStr.split(':')[1]),
    second: 0,
  });

  if (targetMoment.isBefore(now)) {
    targetMoment = targetMoment.add(1, 'day');
  }

  return { targetMoment, timezone };
};

const parseMonthlyTime = (match: RegExpMatchArray): TimeMatch => {
  const [, dayOfMonth, timeStr, timezone] = match;
  const now = moment().utcOffset(timezone);
  let targetMoment = moment(now)
    .date(parseInt(dayOfMonth))
    .set({
      hour: parseInt(timeStr.split(':')[0]),
      minute: parseInt(timeStr.split(':')[1]),
      second: 0,
    });

  if (targetMoment.isBefore(now)) {
    targetMoment = targetMoment.add(1, 'month');
  }

  return { targetMoment, timezone };
};

const parseYearlyTime = (match: RegExpMatchArray): TimeMatch => {
  const [, year, timeStr, timezone] = match;
  const now = moment().utcOffset(timezone);
  let targetMoment = moment(now)
    .year(parseInt(year))
    .set({
      hour: parseInt(timeStr.split(':')[0]),
      minute: parseInt(timeStr.split(':')[1]),
      second: 0,
    });

  if (targetMoment.isBefore(now)) {
    targetMoment = targetMoment.add(1, 'year');
  }

  return { targetMoment, timezone };
};

export const countDown = (string: string) => {
  const patterns = {
    targetTime:
      /target_time\((\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}\s[+-]\d{4})\)/,
    weekly: /target_weekly\((\d)\s(\d{2}:\d{2})\s([+-]\d{4})\)/,
    daily: /target_daily\((\d{2}:\d{2})\s([+-]\d{4})\)/,
    monthly: /target_monthly\((\d{1,2})\s(\d{2}:\d{2})\s([+-]\d{4})\)/,
    yearly: /target_yearly\((\d{4})\s(\d{2}:\d{2})\s([+-]\d{4})\)/,
  };

  let timeMatch: TimeMatch | undefined;
  let matchedPattern: RegExpMatchArray | null = null;

  for (const [type, pattern] of Object.entries(patterns)) {
    const match = pattern.exec(string);
    if (match) {
      matchedPattern = match;
      switch (type) {
        case 'targetTime':
          timeMatch = parseTargetTime(match);
          break;
        case 'weekly':
          timeMatch = parseWeeklyTime(match);
          break;
        case 'daily':
          timeMatch = parseDailyTime(match);
          break;
        case 'monthly':
          timeMatch = parseMonthlyTime(match);
          break;
        case 'yearly':
          timeMatch = parseYearlyTime(match);
          break;
      }
      break;
    }
  }

  if (timeMatch && matchedPattern) {
    const { targetMoment, timezone } = timeMatch;
    const now = moment().utcOffset(timezone);
    const duration = moment.duration(targetMoment.diff(now));
    const timeLeft = formatDuration(duration);
    const response = string.replace(matchedPattern[0], timeLeft);
    return response;
  }
};

export const random = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const countingTime = (string: string) => {
  const [targetTime] = string.split('-');
  const match = targetTime.match(
    /(\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}\s[+-]\d{4})/
  );
  if (!match) {
    return 'Không tìm thấy thời gian';
  }
  const timeMatch = parseTargetTime(match);
  if (timeMatch) {
    const { targetMoment, timezone } = timeMatch;
    const now = moment().utcOffset(timezone);
    const duration = moment.duration(now.diff(targetMoment));
    const timeLeft = formatDuration(duration);
    const response = string.replace(targetTime, timeLeft);
    return response;
  }
  return 'Không tìm thấy thời gian';
};
