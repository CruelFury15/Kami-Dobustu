import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Results from './pages/Results';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}

export default App
