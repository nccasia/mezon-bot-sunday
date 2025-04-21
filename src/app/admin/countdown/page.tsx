'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CountdownSettingsPage() {
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [lunarNewYearDate, setLunarNewYearDate] = useState('');
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  
  useEffect(() => {
    const storedKey = sessionStorage.getItem('adminKey');
    if (storedKey) {
      setAdminKey(storedKey);
    }
  }, []);

  const handleUpdateLunarDate = async () => {
    if (!adminKey || !lunarNewYearDate) return;
    
    try {
      const response = await fetch('/api/sdconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crud: 'updateLunarNewYear',
          command: year.toString(),
          value: `${lunarNewYearDate}T00:00:00`,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update lunar new year date');
      }
      
      alert(`Lunar New Year date for ${year} updated successfully`);
    } catch (error) {
      alert('Error updating lunar new year date');
      console.error(error);
    }
  };

  if (!adminKey) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Required</h1>
          <p className="mb-4">You need to authenticate to access this page.</p>
          <Link href="/admin" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-block">
            Go to Admin Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Countdown Settings</h1>
          <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Lunar New Year Date Settings</h2>
          <p className="text-gray-600 mb-4">
            Set the date for Lunar New Year (Tết Nguyên Đán). This will be used for the countdown on the website.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="px-4 py-2 border rounded-md w-full"
                min={new Date().getFullYear()}
                max={new Date().getFullYear() + 10}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Lunar New Year Date</label>
              <input
                type="date"
                value={lunarNewYearDate}
                onChange={(e) => setLunarNewYearDate(e.target.value)}
                className="px-4 py-2 border rounded-md w-full"
              />
            </div>
          </div>
          
          <button
            onClick={handleUpdateLunarDate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Lunar New Year Date
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Preview Countdowns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Lunar New Year Countdown</h3>
              <Link href="/demngaytetam" className="text-blue-600 hover:underline" target="_blank">
                View Lunar New Year Countdown
              </Link>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Gregorian New Year Countdown</h3>
              <Link href="/demngaytetduong" className="text-blue-600 hover:underline" target="_blank">
                View Gregorian New Year Countdown
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}