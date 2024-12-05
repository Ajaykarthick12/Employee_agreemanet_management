import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ViewAgreement from './pages/ViewAgreement';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path='/view/:id' element={<ViewAgreement/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
