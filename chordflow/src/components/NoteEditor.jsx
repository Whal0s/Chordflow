import React, { useState } from 'react';

const NoteEditor = ({ bpm, timeSignature, activeTool }) => {
  const [notes, setNotes] = useState([]);
  
  // Note names for the labels (starting from highest to lowest)
  const noteNames = ['B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4'];
  
  // Calculate grid columns based on time signature
  const getGridConfig = () => {
    const [beatsPerBar, beatUnit] = timeSignature.split('/').map(num => parseInt(num));
    const divisionsPerBar = timeSignature === '6/8' ? 12 : 16;
    return {
      beatsPerBar,
      beatUnit,
      divisionsPerBar,
      totalBars: 4,
      totalColumns: 4 * divisionsPerBar
    };
  };

  const gridConfig = getGridConfig();
  
  const handleCellClick = (row, col) => {
    const noteExists = notes.find(note => note.row === row && note.col === col);
    
    if (activeTool === 'eraser' && noteExists) {
      setNotes(notes.filter(note => !(note.row === row && note.col === col)));
    } else if (activeTool === 'pen' && !noteExists) {
      setNotes([...notes, { row, col }]);
    }
  };

  const editorStyles = {
    container: {
      padding: '1rem',
      overflow: 'auto'
    },
    gridContainer: {
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    beatMarkers: {
      display: 'grid',
      gridTemplateColumns: `50px repeat(${gridConfig.totalColumns}, 40px)`,
      marginBottom: '8px'
    },
    noteLabel: {
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '0.5rem',
      fontSize: '0.875rem',
      color: '#4B5563'
    },
    grid: {
      display: 'grid',
      gridTemplateRows: 'repeat(12, 40px)',
      gridTemplateColumns: `repeat(${gridConfig.totalColumns}, 40px)`,
      gap: '1px',
      backgroundColor: '#E5E7EB'
    },
    cell: (hasNote, isBarStart, isBeatStart) => ({
      backgroundColor: hasNote ? '#3B82F6' : 'white',
      borderRight: isBarStart ? '2px solid #9CA3AF' : isBeatStart ? '1px solid #D1D5DB' : '1px solid #E5E7EB',
      borderBottom: '1px solid #E5E7EB',
      cursor: 'pointer',
      transition: 'background-color 0.2s'
    })
  };

  return (
    <div style={editorStyles.container}>
      <div style={editorStyles.gridContainer}>
        {/* Beat numbers */}
        <div style={editorStyles.beatMarkers}>
          <div style={{ width: '50px' }} /> {/* Spacer for alignment */}
          {Array.from({ length: gridConfig.totalBars }).map((_, barIndex) => (
            Array.from({ length: gridConfig.beatsPerBar }).map((_, beatIndex) => (
              <div
                key={`beat-${barIndex}-${beatIndex}`}
                style={{
                  width: `${(gridConfig.divisionsPerBar / gridConfig.beatsPerBar) * 40}px`,
                  textAlign: 'center',
                  fontSize: '0.875rem',
                  color: '#4B5563'
                }}
              >
                {beatIndex + 1}
              </div>
            ))
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr' }}>
          {/* Note labels */}
          <div>
            {noteNames.map(note => (
              <div key={note} style={editorStyles.noteLabel}>
                {note}
              </div>
            ))}
          </div>

          {/* Notes grid */}
          <div style={editorStyles.grid}>
            {Array.from({ length: 12 }).map((_, row) => (
              Array.from({ length: gridConfig.totalColumns }).map((_, col) => {
                const hasNote = notes.some(note => note.row === row && note.col === col);
                const isBarStart = col % gridConfig.divisionsPerBar === 0;
                const isBeatStart = col % (gridConfig.divisionsPerBar / gridConfig.beatsPerBar) === 0;
                
                return (
                  <div
                    key={`${row}-${col}`}
                    style={editorStyles.cell(hasNote, isBarStart, isBeatStart)}
                    onClick={() => handleCellClick(row, col)}
                  />
                );
              })
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor; 