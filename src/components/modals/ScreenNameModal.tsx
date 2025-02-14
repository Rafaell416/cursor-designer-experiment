import { useState } from 'react';

interface ScreenNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (screenName: string) => void;
}

export function ScreenNameModal({ isOpen, onClose, onSubmit }: ScreenNameModalProps) {
  const [screenName, setScreenName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (screenName.trim()) {
      onSubmit(screenName.trim());
      setScreenName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">New Screen</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="screenName" className="block text-sm font-medium text-gray-700 mb-1">
              Screen Name
            </label>
            <input
              id="screenName"
              type="text"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              placeholder="e.g., Login Screen, Home Screen"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!screenName.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Add Screen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 