import React, { useState } from 'react';
import './App.css';
function App() {
  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState(null);

  const checkClearance = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/clearance/${studentId}');
      const result = await response.json();
      setData(result);
    } catch (error) {
      alert("ዳታቤዙ አልተገናኘም! backend.js መከፈቱን አረጋግጥ።");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>MTU Clearance System</h2>
        <input 
          type="text" 
          placeholder="መታወቂያ ያስገቡ (ለምሳሌ፦ MTUUR/8751/17)" 
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: '10px', width: '250px', fontSize: '16px' }}
        />
        <button onClick={checkClearance} style={{ padding: '10px 20px', margin: '10px', cursor: 'pointer' }}>
          መረጃ አምጣ
        </button>

        {data && (
          <div style={{ marginTop: '20px', border: '1px solid white', padding: '20px' }}>
            <h3>የተማሪ ስም፦ {data.FullName}</h3>
            <p>ላይብረሪ፦ {data.LibraryStatus}</p>
            <p>ካፌ፦ {data.CafeStatus}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;