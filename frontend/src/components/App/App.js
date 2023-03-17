import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';

import {userContext} from '../../contexts/userContext';
// import './App.css';


import * as auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';


function App() {
		const history = useNavigate();


	//auth and context 
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isTokenCheck, setIsTokenCheck] = React.useState(true);
  const [userData, setUserData] = React.useState({username: 'Foma Kiniaev'});

  //popups
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

//errors

	const [isServerError, setIsServerError] = React.useState(false);
	const [isClientError, setIsClientError] = React.useState('');

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



	function closeAllPopups() {
		setIsLoginPopupOpen(false);
		setIsRegisterPopupOpen(false);
		setIsInfoToolTipOpen(false);
	}

	function handleLoginClick() {
		setIsLoginPopupOpen(true);
		setIsClientError('');
	}

	function handleRegisterClick() {
		setIsClientError('');
		setIsRegisterPopupOpen(true);
	}

  return (
    <userContext.Provider value={currentUser}>
      <div className="app">
        <Header 
		onLoginClick={handleLoginClick}
		onClose={closeAllPopups}
		onRegisterClick={handleRegisterClick}
		/>
        <Main handleSignup={handleRegister} onLoginClick={handleLoginClick} onClose={closeAllPopups}/>
		<LoginPopup
					isOpen={isLoginPopupOpen}
					onClose={closeAllPopups}
					onRegisterClick={handleRegisterClick}
					onLogin={handleLogin}
					isClientError={isClientError}
				/>
				<RegisterPopup
					isOpen={isRegisterPopupOpen}
					onClose={closeAllPopups}
					onLoginClick={handleLoginClick}
					onRegister={handleRegister}
					isClientError={isClientError}
				/>
        <Footer />
      </div>
    </userContext.Provider>
  );
}

export default App;
