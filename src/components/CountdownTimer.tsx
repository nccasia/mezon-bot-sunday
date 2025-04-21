'use client';

import { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const TIMEZONE = 'Asia/Ho_Chi_Minh';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-gradient-to-br from-yellow-300 to-orange-500 rounded-lg p-6 w-36 text-center shadow-lg transform hover:scale-105 transition-transform duration-300">
      <div className="text-4xl md:text-5xl font-bold mb-2 text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xl font-semibold text-white">{label}</div>
    </div>
  );
}

export function CountdownTimer({ targetDate }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = moment().tz(TIMEZONE);
      let target: moment.Moment;

      if (targetDate) {
        target = moment.tz(targetDate, TIMEZONE);
        // Nếu ngày đích đã qua, tự động tính cho năm sau
        if (target.isBefore(now)) {
          target.add(1, 'year');
        }
      } else {
        // Tết Dương lịch năm sau
        target = moment()
          .tz(TIMEZONE)
          .year(now.year() + 1)
          .startOf('year');
      }

      const duration = moment.duration(target.diff(now));

      setTimeLeft({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6 mb-12">
        <CountdownBox value={timeLeft.days} label="Ngày" />
        <CountdownBox value={timeLeft.hours} label="Giờ" />
        <CountdownBox value={timeLeft.minutes} label="Phút" />
        <CountdownBox value={timeLeft.seconds} label="Giây" />
      </div>
    </div>
  );
}
