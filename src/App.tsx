import React, { useState, useEffect } from 'react';
import Login from './Components/Login/Login';
import Dashboard from './Components/DashBoard/DashBoard';
import Navbar from './Components/Navbar/Navbar';

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };


  return (
    <>
      <Navbar />

      {loggedIn ? (
        <Dashboard />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;