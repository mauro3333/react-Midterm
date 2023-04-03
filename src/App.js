
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useRoutes } from "react-router-dom";
import HomePage from './pages/HomePage/HomePage';
import PlatePage from './pages/PlatePage/PlatePage';
import OcrPage from './pages/OcrPage/OcrPage';
import Navbar from './components/Navbar';


window.tableImage = [];


  
  function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/plate' element={<PlatePage />} />
          <Route path='/ocr' element={<OcrPage />} />
        </Routes>

    </div>
  );
}

export default App;




