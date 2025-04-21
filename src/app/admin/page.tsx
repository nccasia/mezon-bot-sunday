'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if admin key exists in session storage on component mount
    const storedKey = sessionStorage.getItem('adminKey');
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
    }
  }, []);

  const adminCards = [
    {
      title: 'Salary Management',
      description: 'Manage salary dates and payment confirmations',
      link: '/admin/salary',
      icon: '💰',
    },
    {
      title: 'Commands',
      description: 'View and manage custom bot commands',
      link: '/admin/commands',
      icon: '🤖',
    },
    {
      title: 'Countdown Settings',
      description: 'Configure countdown dates for holidays',
      link: '/admin/countdown',
      icon: '🗓️',
    },
    {
      title: 'API Tokens',
      description: 'Manage API tokens and permissions',
      link: '/admin/tokens',
      icon: '🔑',
    },
  ];

  const handleAuthenticate = () => {
    if (adminKey) {
      sessionStorage.setItem('adminKey', adminKey);
      setIsAuthenticated(true);
      router.refresh();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminKey');
    setAdminKey('');
    setIsAuthenticated(false);
    router.refresh();
  };

  const handleResetTokens = async () => {
    if (!adminKey) {
      alert('Please authenticate first');
      return;
    }

    try {
      const res = await fetch('/api/cron', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${adminKey}`,
        },
      });
      
      alert(res.ok ? 'Reset tokens successful' : 'Failed to reset tokens');
    } catch (error) {
      alert('Error resetting tokens');
      console.error(error);
    }
  };

  const handleCleanSalaryDates = async () => {
    const confirmed = confirm('Are you sure you want to clean all salary dates?');
    
    if (!confirmed || !adminKey) return;
    
    try {
      const res = await fetch('/api/sdconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crud: 'cleanSalaryDate',
          command: '',
          value: adminKey,
        }),
      });
      
      alert(res.ok ? 'Cleaned all salary dates' : 'Failed to clean salary dates');
    } catch (error) {
      alert('Error cleaning salary dates');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Sunday Bot Admin Dashboard
        </h1>

        {!isAuthenticated ? (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Admin Authentication</h2>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                value={adminKey}
                onChange={e => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                className="px-4 py-2 border rounded-md"
                onKeyDown={e => e.key === 'Enter' && handleAuthenticate()}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleAuthenticate}
              >
                Authenticate
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {adminCards.map((card, index) => (
                <Link href={card.link} key={index}>
                  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer h-full flex flex-col">
                    <div className="text-4xl mb-4">{card.icon}</div>
                    <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                    <p className="text-gray-600 flex-grow">{card.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  className="px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
                  onClick={handleResetTokens}
                >
                  <span>Reset AI Tokens</span>
                </button>

                <button
                  className="px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center"
                  onClick={handleCleanSalaryDates}
                >
                  <span>Clean Salary Dates</span>
                </button>

                <button
                  className="px-4 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors flex items-center justify-center"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
