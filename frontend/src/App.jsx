import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import routing components
import Authenticated from './pages/authenticated/authenticated.jsx';
import Unauthenticated from './pages/unauthenticated/unauthenticated.jsx';
import Login from './pages/login/login.jsx';
import Signup from './pages/signup/signup.jsx';
import Info from './pages/info/info.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Unauthenticated />} />
        <Route path="/authenticated/:id" element={<Authenticated />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/info/:id" element={<Info />} />
      </Routes>
    </Router>
  );
}

export default App;
