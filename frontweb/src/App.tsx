import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';

import { ToastContainer } from 'react-toastify';
import Routes from 'Routes';
import { useState } from 'react';
import { AuthContex, AuthContextData } from 'AuthContext';

function App() {

  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  });

  return (
      <AuthContex.Provider value={{authContextData, setAuthContextData}}>
      <Routes />
      <ToastContainer />
      </AuthContex.Provider>
  );
}

export default App;
