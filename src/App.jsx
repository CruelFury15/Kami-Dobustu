import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Questions from './pages/Questions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/results" element={<div style={{padding: '20px', textAlign: 'center'}}><h1>Quiz Complete!</h1><p>Check the console for your results.</p></div>} />
    </Routes>
  )
}

export default App
