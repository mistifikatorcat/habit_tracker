import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import {userContext} from '../../contexts/userContext';
// import './App.css';

function App() {

  const [currentUser, setCurrentUser] = React.useState({});

  return (
    <userContext.Provider value={currentUser}>
      <div className="app">
        <Header />
        <Main />
        <Footer />
      </div>
    </userContext.Provider>
  );
}

export default App;
