import React from 'react';
import Header from '../Header/Header';
import WelcomeMsg from '../WelcomeMsg/WelcomeMsg';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import {userContext} from '../../contexts/userContext';
// import './App.css';


import * as auth from '../../utils/auth';
import api from '../../utils/Api';
import { useNavigate, Route, Routes, Navigate, Redirect } from 'react-router-dom';
import AddEntityPopup from '../AddEntityPopup/AddEntityPopup';
import EditEntityPopup from '../EditEntityPopup/EditEntityPopup';



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
  const [isAddEntityPopupOpen, setIsAddEntityPopupOpen] = React.useState(false);
  const [isEditEntityPopupOpen, setIsEditEntityPopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  //cards
  const [habits, setHabits] = React.useState([]);
  const [entity, setEntity] = React.useState({});


//errors

	const [isServerError, setIsServerError] = React.useState(false);
	const [isClientError, setIsClientError] = React.useState('');

	//getting user info

	React.useEffect(() => {
	  const token = localStorage.getItem('jwt');
	  if (token) {
	    api
	      .getUserInfo(token)
	      .then(res => {
	        console.log('getting user info ', res);
			console.log(isLoggedIn);
	        setCurrentUser(res);
	      })
	      .catch((err) => {
	        console.log(err);
	      });
	  }
	}, [isLoggedIn]);

	//getting token info

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
            setIsLoginPopupOpen(true); // don't forget to open the login popup afterwards
          }
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('jwt');
          setIsLoggedIn(false);
          setIsLoginPopupOpen(true); // don't forget to open the login popup afterwards
        })
        .finally(() => {
          setIsTokenCheck(false);
        });
      }
  }, []);

  //getting card info

  React.useEffect(() => {
	const token = localStorage.getItem('jwt');
	if (token){
		api.getAllHabits(token)
		.then((res) => {
			console.log('checking existing cards', res);
			setHabits(res || []);
			// if(res){
			// 	api.changeHabitStatus(res)
			// 		.then((res) => {
			// 			console.log('status updated at ', res);
			// 			setHabits(res || [])
			// 		})
			// 		.catch((err) => {
			// 			console.log(err);
			// 		})
			// }
		})
		.catch((err)=>{
			console.log(err)
		})
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
					history('/dashboard');
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

	function handleHabitSubmit({title, description, keyword}){
		api.createHabit({title, description, keyword})
		.then((newHabit) => {
			setHabits([newHabit, ...habits]);
			console.log('success')
			closeAllPopups();
		})
		.catch((err) => {
			console.log(err);
		})
	}

	function handleDeleteHabit(id){
		habits.map((removedHabit) => {
			id = removedHabit._id;
			console.log('removed card with id: ', id)
		});
		api.deleteHabit(id)
		.then((res) => {
			setCurrentUser((currentUser) => ({
				...currentUser, 
				habits: habits.map((removedHabit) => removedHabit._id !== res.id),
			}))
		}) 
		.catch((err) => console.log(err));
	}

	function handleUpdateHabit({title, description, keyword}, id){ //perhaps id should be put inside {}
		habits.map((editedCard) => {
			id = editedCard._id;
			console.log('edited card with id: ', id);
		});
		api.editHabit({title, description, keyword}, id)
		.then((res) => {
			console.log(res, ' was updated')
			setEntity({...res}); //also may be I should put setCurrentUser there
			closeAllPopups();
			// history('/dashboard');
			// window.location.reload(true);
		})
		.catch((err) => {
			console.log(err);
			console.log('handleUpdateHabit did not work ')
		})
	}


	function closeAllPopups() {
		setIsLoginPopupOpen(false);
		setIsRegisterPopupOpen(false);
		setIsInfoToolTipOpen(false);
		setIsAddEntityPopupOpen(false);
		setIsEditEntityPopupOpen(false);
	}

	function handleLoginClick() {
		setIsLoginPopupOpen(true);
		setIsClientError('');
	}

	function handleAddHabitPopupClick(){
		setIsAddEntityPopupOpen(true);
		setIsClientError('');
	}

	function handleEditHabitPopupClick(){
		setIsEditEntityPopupOpen(true);
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
		username={userData.username} 
		isLoggedIn={isLoggedIn}
		onLoginClick={handleLoginClick}
		onClose={closeAllPopups}
		onRegisterClick={handleRegisterClick}
		onLogout={signout}
		/>
		<Routes>
  <Route
    path='/dashboard'
    element={
      <ProtectedRoute 
	  isLoggedIn={isLoggedIn}>
        <Main
          username={userData.username}
          cardsArray={habits}
		  onHabitClick={handleAddHabitPopupClick}
		  onEditClick={handleEditHabitPopupClick}
		  onDeleteClick={handleDeleteHabit}
        />
      </ProtectedRoute>
    }
  />
  <Route
    path='/welcome'
    element={
      <WelcomeMsg 
        handleSignup={handleRegister}
        onLoginClick={handleLoginClick}
		isLoggedIn={isLoggedIn}
        onClose={closeAllPopups}
      />
    }
  />
  <Route path='*' element={isLoggedIn ? <Navigate to='/dashboard' /> : <Navigate to='/welcome' /> } />
 
</Routes>
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
				<AddEntityPopup 
					isOpen={isAddEntityPopupOpen}
					onClose={closeAllPopups}
					onAddHabitSubmit={handleHabitSubmit}
				/>
				<EditEntityPopup 
					entity = {entity}
					isOpen={isEditEntityPopupOpen}
					onClose={closeAllPopups}
					onEditHabit={handleUpdateHabit}
				/>
        <Footer />
      </div>
    </userContext.Provider>
  );
}

export default App;
