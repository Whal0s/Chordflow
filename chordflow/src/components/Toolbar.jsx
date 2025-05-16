import React from 'react';

const Toolbar = ({ activeTool, onToolChange }) => {
  return (
    <div className="bg-gray-800 p-4 flex gap-4">
      <button
        className={`p-2 rounded ${
          activeTool === 'pen' ? 'bg-blue-500' : 'bg-gray-600'
        } text-white hover:bg-blue-600 transition-colors`}
        onClick={() => onToolChange('pen')}
      >
        ✏️ Pen
      </button>
      <button
        className={`p-2 rounded ${
          activeTool === 'eraser' ? 'bg-blue-500' : 'bg-gray-600'
        } text-white hover:bg-blue-600 transition-colors`}
        onClick={() => onToolChange('eraser')}
      >
        🧹 Eraser
      </button>
    </div>
  );
};

export default Toolbar; 