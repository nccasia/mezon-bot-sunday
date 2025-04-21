'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Command {
  id: number;
  command: string;
  response: string;
  secretKey: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CommandsPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCommand, setNewCommand] = useState({ command: '', response: '' });
  const [editingCommand, setEditingCommand] = useState<Command | null>(null);

  useEffect(() => {
    const adminKey = sessionStorage.getItem('adminKey');
    if (!adminKey) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    fetchCommands(adminKey);
  }, []);

  const fetchCommands = async (adminKey: string) => {
    try {
      const response = await fetch('/api/admin/commands', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminKey }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch commands');
      }

      const data = await response.json();
      setCommands(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCommand = async () => {
    const adminKey = sessionStorage.getItem('adminKey');
    if (!adminKey || !newCommand.command || !newCommand.response) return;

    try {
      const response = await fetch('/api/sdconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crud: 'add',
          command: newCommand.command,
          value: newCommand.response,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add command');
      }

      // Refresh commands list
      fetchCommands(adminKey);
      setNewCommand({ command: '', response: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleUpdateCommand = async () => {
    if (!editingCommand) return;
    
    const adminKey = sessionStorage.getItem('adminKey');
    if (!adminKey) return;

    try {
      const response = await fetch('/api/sdconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crud: 'update',
          command: editingCommand.command,
          value: editingCommand.response,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update command');
      }

      // Refresh commands list
      fetchCommands(adminKey);
      setEditingCommand(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDeleteCommand = async (command: Command) => {
    const adminKey = sessionStorage.getItem('adminKey');
    if (!adminKey) return;

    const confirmed = confirm(`Are you sure you want to delete the command: ${command.command}?`);
    if (!confirmed) return;

    try {
      const response = await fetch('/api/sdconfig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crud: 'delete',
          command: command.command,
          value: command.id.toString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete command');
      }

      // Refresh commands list
      fetchCommands(adminKey);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl">Loading commands...</div>
      </div>
    );
  }

  if (error === 'Authentication required') {
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
          <h1 className="text-3xl font-bold text-gray-800">Command Management</h1>
          <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">
            Back to Dashboard
          </Link>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Command</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Command"
              value={newCommand.command}
              onChange={(e) => setNewCommand({ ...newCommand, command: e.target.value })}
              className="px-4 py-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Response"
              value={newCommand.response}
              onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleAddCommand}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Command
          </button>
        </div>

        {editingCommand && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Edit Command</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Command"
                value={editingCommand.command}
                onChange={(e) => setEditingCommand({ ...editingCommand, command: e.target.value })}
                className="px-4 py-2 border rounded-md"
                disabled
              />
              <input
                type="text"
                placeholder="Response"
                value={editingCommand.response}
                onChange={(e) => setEditingCommand({ ...editingCommand, response: e.target.value })}
                className="px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleUpdateCommand}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Command
              </button>
              <button
                onClick={() => setEditingCommand(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Commands List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Command</th>
                  <th className="py-3 px-6 text-left">Response</th>
                  <th className="py-3 px-6 text-left">Protected</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {commands.map((command) => (
                  <tr key={command.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{command.id}</td>
                    <td className="py-3 px-6">{command.command}</td>
                    <td className="py-3 px-6">
                      <div className="max-w-xs truncate">{command.response}</div>
                    </td>
                    <td className="py-3 px-6">{command.secretKey ? 'Yes' : 'No'}</td>
                    <td className="py-3 px-6 flex gap-2">
                      <button
                        onClick={() => setEditingCommand(command)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={!!command.secretKey}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCommand(command)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}