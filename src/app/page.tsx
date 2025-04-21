import { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Sunday Bot - Trang chủ',
  description:
    'Sunday Bot là một dự án cung cấp các API hữu ích như đếm ngày nhận lương, đếm ngày đến Tết và gửi thông báo tự động.',
  keywords: [
    'sunday bot',
    'api',
    'đếm ngày',
    'thông báo tự động',
    'bot discord',
  ],
  authors: [{ name: 'Sunday Bot Team' }],
  openGraph: {
    title: 'Sunday Bot - Trang chủ',
    description:
      'Sunday Bot là một dự án cung cấp các API hữu ích như đếm ngày nhận lương, đếm ngày đến Tết và gửi thông báo tự động.',
    url: 'https://sundaybot.vercel.app',
    siteName: 'Sunday Bot',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function Home() {
  const apis = [
    {
      name: 'Đếm ngày nhận lương',
      endpoint: '/api/demngaynhanluong',
      description: 'API tính số ngày còn lại đến ngày nhận lương',
    },
    {
      name: 'Đếm ngày đến Tết Âm',
      endpoint: '/api/demngaytetam',
      description: 'API tính số ngày còn lại đến Tết Âm lịch',
    },
    {
      name: 'Đếm ngày đến Tết Dương',
      endpoint: '/api/demngaytetduong',
      description: 'API tính số ngày còn lại đến Tết Dương lịch',
    },
    {
      name: 'Happy Birthday',
      endpoint: '/api/hbd',
      description: 'API gửi lời chúc mừng sinh nhật',
    },
    {
      name: 'Sunday Bot',
      endpoint: '/api/sunday',
      description: 'Bot tự động gửi thông báo các ngày đặc biệt',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Sunday Bot
          </h1>
        </div>

        {/* API List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apis.map((api, index) => (
            <div
              key={index}
              className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-100 dark:border-orange-900/20"
            >
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">
                    {api.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 bg-clip-text text-transparent">
                  {api.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {api.description}
              </p>
              <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-gray-700 dark:to-gray-700 rounded-lg p-3 border border-orange-200 dark:border-orange-800/20">
                <code className="text-sm text-orange-800 dark:text-orange-200">
                  {api.endpoint}
                </code>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg mt-auto border-t border-orange-100 dark:border-orange-900/20">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 Sunday Bot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
