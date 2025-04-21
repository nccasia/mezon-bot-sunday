import { Metadata } from 'next';
import moment from 'moment-timezone';
import { Navbar } from '@/components/Navbar';
import { CountdownTimer } from '@/components/CountdownTimer';
import { UserChannelsInfo } from '@/components/UserChannelsInfo';
import Fireworks from '@/components/Fireworks';
import { lunarNewYearDates } from '@/pages/api/demngaytetam';

// Đặt múi giờ Việt Nam
const TIMEZONE = 'Asia/Ho_Chi_Minh';
moment.tz.setDefault(TIMEZONE);

type LunarNewYearDates = {
  [key: string]: string;
};

const dates: LunarNewYearDates = lunarNewYearDates;

export const metadata: Metadata = {
  title: 'Đếm ngày đến Tết Âm lịch - Sunday Bot',
  description: 'Đếm ngược thời gian đến khoảnh khắc giao thừa Tết Nguyên đán.',
  keywords: [
    'tết âm lịch',
    'tết nguyên đán',
    'đếm ngày',
    'năm mới',
    'countdown',
    'sunday bot',
  ],
  openGraph: {
    title: 'Đếm ngày đến Tết Âm lịch - Sunday Bot',
    description:
      'Đếm ngược thời gian đến khoảnh khắc giao thừa Tết Nguyên đán.',
    type: 'website',
  },
};

function getNextLunarNewYear() {
  const today = moment();
  const currentYear = today.year().toString();

  if (dates[currentYear]) {
    const thisYear = moment.tz(dates[currentYear], TIMEZONE);
    if (thisYear.isAfter(today)) {
      return dates[currentYear];
    }
  }

  const nextYear = (today.year() + 1).toString();
  return dates[nextYear] || '2025-01-29T00:00:00';
}

function getDaysUntilLunarNewYear() {
  const today = moment().startOf('day');
  const targetDate = moment.tz(getNextLunarNewYear(), TIMEZONE).startOf('day');
  return targetDate.diff(today, 'days');
}

const lunarYears: Record<number, string> = {
  2024: 'Giáp Thìn',
  2025: 'Ất Tỵ',
  2026: 'Bính Ngọ',
  2027: 'Đinh Mùi',
  2028: 'Mậu Thân',
  2029: 'Kỷ Dậu',
  2030: 'Canh Tuất',
  2031: 'Tân Hợi',
  2032: 'Nhâm Tý',
  2033: 'Quý Sửu',
};

export default function DemNgayTetAm() {
  const targetDate = getNextLunarNewYear();
  const daysLeft = getDaysUntilLunarNewYear();
  const showWishes = daysLeft <= 30;
  const nextYear = moment(targetDate).year();
  const lunarYearName = lunarYears[nextYear];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-400 via-red-500 to-yellow-500 text-white overflow-hidden relative">
      <Fireworks />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8 flex-grow pt-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
            Đếm ngày đến Tết Nguyên Đán
          </h1>
          <p className="text-xl md:text-2xl font-light text-yellow-100">
            Hãy cùng đếm ngược thời gian đến khoảnh khắc giao thừa Tết Nguyên
            đán!
          </p>
          <UserChannelsInfo />
        </div>

        <CountdownTimer targetDate={targetDate} />

        {showWishes && (
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-yellow-100">
              Chúc mừng năm mới - Vạn sự như ý!
            </p>
            <p className="mt-4 text-xl md:text-2xl font-medium text-yellow-100/80">
              Năm {lunarYearName} {nextYear}
            </p>
          </div>
        )}
      </main>

      <footer className="relative z-10 w-full bg-black/20 backdrop-blur-md mt-auto border-t border-white/10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-yellow-100 font-medium">
            © 2025 Sunday Bot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
