import React, { useState } from 'react';
import SetupModal from './components/SetupModal';
import Toolbar from './components/Toolbar';
import NoteEditor from './components/NoteEditor';

function App() {
  const [projectSettings, setProjectSettings] = useState(null);
  const [activeTool, setActiveTool] = useState('pen');

  if (!projectSettings) {
    return <SetupModal onSetup={setProjectSettings} />;
  }

  return (
    <div className="app">
      <header className="header bg-dark">
        <h1>Chordflow</h1>
        <div className="info">
          BPM: {projectSettings.bpm} | Time Signature: {projectSettings.timeSignature}
        </div>
      </header>
      
      <Toolbar activeTool={activeTool} onToolChange={setActiveTool} />
      
      <main className="container">
        <NoteEditor 
          bpm={projectSettings.bpm} 
          timeSignature={projectSettings.timeSignature}
          activeTool={activeTool}
        />
      </main>
    </div>
  );
}

export default App; 