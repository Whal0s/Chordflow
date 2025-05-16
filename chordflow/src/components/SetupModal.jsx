import React, { useState } from 'react';

const SetupModal = ({ onSetup }) => {
  const [bpm, setBpm] = useState(120);
  const [timeSignature, setTimeSignature] = useState('4/4');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetup({ bpm, timeSignature });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Setup Your Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              BPM:
              <input
                type="number"
                min="20"
                max="300"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time Signature:
              <select
                value={timeSignature}
                onChange={(e) => setTimeSignature(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="4/4">4/4</option>
                <option value="3/4">3/4</option>
                <option value="6/8">6/8</option>
              </select>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Start Composing
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetupModal; 