import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import {userContext} from '../../contexts/userContext';
// import './App.css';


import * as auth from '../../utils/auth';


function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isTokenCheck, setIsTokenCheck] = React.useState(true);
  const [userData, setUserData] = React.useState({username: 'Foma Kiniaev'});




  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
      if (token) {
        auth.checkToken(token)
        .then((res) => {
          if (res._id){
            setIsLoggedIn(true);
            setUserData({username: res.username});
          } else{
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
            // setLoginPopup(true); // don't forget to open the login popup afterwards
          }
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
          // setLoginPopup(true); // don't forget to open the login popup afterwards
        })
        .finally(() => {
          setIsTokenCheck(false);
        });
      }
  }, []);

  function handleRegister({username, email, password}) {
		auth
			.register(username, email, password)
			.then((res) => {
				if (res) {
					closeAllPopups();
					console.log('user added');
					setIsInfoToolTipOpen(true);
				} else {
					setIsInfoToolTipOpen(false);
				}
			})
			.catch((err) => {
				console.log(err);
				console.log('user not added');
				if (err === 'Error 409') setIsClientError('This email or username is in use ');
				else {
					setIsClientError('Something else wrong on handleRegister function ');
				}
				setIsInfoToolTipOpen(false);
			});
	}

	function handleLogin({email, password}) {
		auth
			.login(email, password)
			.then((res) => {
				if (res.token) {
					setIsLoggedIn(true);
					setUserData({email});
					setCurrentUser(res.user);
					localStorage.setItem('jwt', res.token);
					//setToken(res.token);
					history('/');
					window.location.reload(true);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err === 'Error 400') setIsClientError('Wrong Email or Password ');
				else {
					setIsClientError('Something else wrong on handleLogin function ');
				}
			})
			.finally(() => {
				setIsTokenCheck(false);
			});
	}

	function signout() {
		setIsLoggedIn(false);
		setCurrentUser({});
		localStorage.removeItem('jwt');
		setIsLoginPopupOpen(true);
	}

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
