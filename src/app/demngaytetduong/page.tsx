import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { CountdownTimer } from '@/components/CountdownTimer';
import Fireworks from '@/components/Fireworks';

export const metadata: Metadata = {
  title: 'Đếm ngày đến Tết Dương lịch - Sunday Bot',
  description:
    'Đếm ngược thời gian đến khoảnh khắc giao thừa năm mới Dương lịch.',
  keywords: [
    'tết dương lịch',
    'đếm ngày',
    'năm mới',
    'countdown',
    'sunday bot',
  ],
  openGraph: {
    title: 'Đếm ngày đến Tết Dương lịch - Sunday Bot',
    description:
      'Đếm ngược thời gian đến khoảnh khắc giao thừa năm mới Dương lịch.',
    type: 'website',
  },
};

function getDaysUntilNewYear() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  const newYear = new Date(`January 1, ${nextYear} 00:00:00`);
  const difference = newYear.getTime() - now.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export default function DemNgayTetDuong() {
  const daysLeft = getDaysUntilNewYear();
  const showWishes = daysLeft <= 30;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 text-white overflow-hidden relative">
      <Fireworks />
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <Navbar />

      <main className="relative z-10 container mx-auto px-4 py-8 flex-grow pt-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-center">
            Đếm ngày đến Tết Dương lịch
          </h1>
          <p className="text-xl md:text-2xl font-light text-yellow-100">
            Hãy cùng đếm ngược thời gian đến khoảnh khắc giao thừa năm mới!
          </p>
        </div>

        <CountdownTimer />

        {showWishes && (
          <div className="mt-16 text-center animate-fade-in">
            <p className="text-2xl md:text-3xl font-semibold text-yellow-100">
              Chúc mừng năm mới - Vạn sự như ý!
            </p>
          </div>
        )}
      </main>

      <footer className="relative z-10 w-full bg-black/20 backdrop-blur-md mt-auto border-t border-white/10">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-yellow-100 font-medium">
            © 2024 Sunday Bot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
