'use client';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

interface SalaryInfo {
  id: number;
  applyMonth: string;
  dateE: string;
  dateA: string | null;
}

// Reusable form input component
const FormInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
    />
  </div>
);

// Reusable button component
const Button = ({
  onClick,
  disabled,
  className,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  className: string;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} disabled={disabled} className={className}>
    {children}
  </button>
);

function Salary() {
  const [adminKey, setAdminKey] = useState('');
  const [authMode, setAuthMode] = useState(true);
  const [salaryDates, setSalaryDates] = useState<SalaryInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // Add sort state
  const [sortField, setSortField] = useState<keyof SalaryInfo>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  // Add password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [salaryMonth, setSalaryMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [salaryDateE, setSalaryDateE] = useState('');
  const [salaryDateA, setSalaryDateA] = useState('');
  const [selectedSalaryId, setSelectedSalaryId] = useState<number | null>(null);

  useEffect(() => {
    if (!authMode) {
      fetchSalaryDates();
    }
  }, [authMode]);

  // API request helper function
  const makeApiRequest = async (
    crud: string,
    command: string,
    value: string
  ) => {
    const response = await fetch('/api/sdconfig', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crud, command, value }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${crud}`);
    }

    return response;
  };

  const fetchSalaryDates = async () => {
    try {
      setLoading(true);
      const response = await makeApiRequest(
        'getSalaryDateId',
        'getSalaryDateId',
        adminKey
      );
      const data = await response.json();
      setSalaryDates(Array.isArray(JSON.parse(data)) ? JSON.parse(data) : []);
    } catch (error) {
      console.error('Error fetching salary dates:', error);
      setMessage('Error fetching salary dates');
      setSalaryDates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSalaryDate = async () => {
    if (!salaryMonth || !salaryDateE) {
      setMessage('Salary month and expected date are required');
      return;
    }

    try {
      setLoading(true);
      const formattedMonth = `${salaryMonth}-01`;
      const command = `${formattedMonth}-${salaryDateE}${
        salaryDateA ? `-${salaryDateA}` : ''
      }`;

      const response = await makeApiRequest(
        'manualCreateSalaryDate',
        command,
        adminKey
      );
      const data = await response.text();
      setMessage(data);
      fetchSalaryDates();
      resetForm();
    } catch (error) {
      console.error('Error adding salary date:', error);
      setMessage('Error adding salary date');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSalaryDate = async () => {
    if (!selectedSalaryId || !salaryDateE) {
      setMessage('Salary ID and expected date are required');
      return;
    }

    try {
      setLoading(true);
      const command = `${selectedSalaryId}-${salaryDateE}${
        salaryDateA ? `-${salaryDateA}` : ''
      }`;

      const response = await makeApiRequest(
        'manualUpdateSalaryDate',
        command,
        adminKey
      );
      const data = await response.text();
      setMessage(data);
      fetchSalaryDates();
      resetForm();
    } catch (error) {
      console.error('Error updating salary date:', error);
      setMessage('Error updating salary date');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSalaryDate = async (id: number) => {
    try {
      setLoading(true);
      const response = await makeApiRequest(
        'deleteSalaryDate',
        id.toString(),
        adminKey
      );
      const data = await response.text();
      setMessage(data);
      fetchSalaryDates();
    } catch (error) {
      console.error('Error deleting salary date:', error);
      setMessage('Error deleting salary date');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkSalaryReceived = async (id: number) => {
    try {
      setLoading(true);
      const response = await makeApiRequest(
        'receiveSalary',
        id.toString(),
        adminKey
      );
      const data = await response.text();
      setMessage(data);
      fetchSalaryDates();
    } catch (error) {
      console.error('Error marking salary as received:', error);
      setMessage('Error marking salary as received');
    } finally {
      setLoading(false);
    }
  };

  const handleCleanAllSalaryDates = async () => {
    if (
      !confirm(
        'Are you sure you want to delete all salary dates? This action cannot be undone.'
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await makeApiRequest(
        'cleanSalaryDate',
        'cleanSalaryDate',
        adminKey
      );
      const data = await response.text();
      setMessage(data);
      fetchSalaryDates();
    } catch (error) {
      console.error('Error cleaning salary dates:', error);
      setMessage('Error cleaning salary dates');
    } finally {
      setLoading(false);
    }
  };

  const selectSalaryForEdit = (salary: SalaryInfo) => {
    setSelectedSalaryId(salary.id);
    setSalaryMonth(salary.applyMonth.slice(0, 7));
    setSalaryDateE(moment(salary.dateE).format('YYYY/MM/DD'));
    if (salary.dateA) {
      setSalaryDateA(moment(salary.dateA).format('YYYY/MM/DD'));
    } else {
      setSalaryDateA('');
    }
  };

  const resetForm = () => {
    setSelectedSalaryId(null);
    setSalaryMonth(new Date().toISOString().slice(0, 7));
    setSalaryDateE('');
    setSalaryDateA('');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return moment(dateString).format('YYYY/MM/DD');
  };

  // Add sort function
  const handleSort = (field: keyof SalaryInfo) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Get sorted data
  const getSortedData = () => {
    return [...salaryDates].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      // Handle date comparison
      if (
        sortField === 'dateE' ||
        sortField === 'dateA' ||
        sortField === 'applyMonth'
      ) {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }

      if (aValue === bValue) return 0;

      const result = (aValue ?? 0) < (bValue ?? 0) ? -1 : 1;
      return sortDirection === 'asc' ? result : -result;
    });
  };

  if (authMode) {
    return (
      <div className="w-[400px] mx-auto mt-10 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center dark:text-white">
            Salary Admin Authentication
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter admin key"
                value={adminKey}
                onChange={e => setAdminKey(e.target.value.trim())}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-400"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                )}
              </button>
            </div>
            <button
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={() => setAuthMode(false)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Salary Management</h1>

      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 dark:bg-blue-900 dark:text-blue-200">
          <p>{message}</p>
          <button
            className="text-sm underline mt-1"
            onClick={() => setMessage('')}
          >
            Clear
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add/Edit Salary Form */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4">
            {selectedSalaryId ? 'Edit Salary Date' : 'Add New Salary Date'}
          </h2>
          <div className="space-y-4">
            <FormInput
              label="Month"
              type="month"
              value={salaryMonth}
              onChange={e => setSalaryMonth(e.target.value)}
            />
            <FormInput
              label="Expected Date (YYYY/MM/DD)"
              type="text"
              value={salaryDateE}
              onChange={e => setSalaryDateE(e.target.value)}
              placeholder="YYYY/MM/DD"
            />
            <FormInput
              label="Actual Date (YYYY/MM/DD, optional)"
              type="text"
              value={salaryDateA}
              onChange={e => setSalaryDateA(e.target.value)}
              placeholder="YYYY/MM/DD"
            />
            <div className="flex space-x-2">
              {selectedSalaryId ? (
                <>
                  <Button
                    onClick={handleUpdateSalaryDate}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleAddSalaryDate}
                  disabled={loading}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50 dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Add Salary Date
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-red-600">
            Danger Zone
          </h2>
          <div className="space-y-4">
            <div className="border border-red-300 rounded-md p-4 dark:border-red-700">
              <h3 className="font-medium mb-2">Delete All Salary Dates</h3>
              <p className="text-sm text-gray-600 mb-3 dark:text-gray-400">
                This action cannot be undone. All salary dates will be
                permanently deleted.
              </p>
              <Button
                onClick={handleCleanAllSalaryDates}
                disabled={loading}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Delete All Salary Dates
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Dates Table */}
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800">
        <h2 className="text-xl font-semibold p-4 border-b dark:border-gray-700">
          Salary Dates
        </h2>
        {salaryDates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    ID{' '}
                    {sortField === 'id' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                    onClick={() => handleSort('applyMonth')}
                  >
                    Month{' '}
                    {sortField === 'applyMonth' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                    onClick={() => handleSort('dateE')}
                  >
                    Expected Date{' '}
                    {sortField === 'dateE' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300 cursor-pointer"
                    onClick={() => handleSort('dateA')}
                  >
                    Actual Date{' '}
                    {sortField === 'dateA' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {getSortedData().map(salary => (
                  <tr
                    key={salary.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">{salary.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {moment(salary.applyMonth).format('YYYY/MM')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(salary.dateE)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {salary.dateA ? (
                        formatDate(salary.dateA)
                      ) : (
                        <span className="text-yellow-500 dark:text-yellow-400">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                      <button
                        onClick={() => selectSalaryForEdit(salary)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Edit
                      </button>
                      {!salary.dateA && (
                        <button
                          onClick={() => handleMarkSalaryReceived(salary.id)}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Mark Received
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSalaryDate(salary.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No salary dates found. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}

export default Salary;
