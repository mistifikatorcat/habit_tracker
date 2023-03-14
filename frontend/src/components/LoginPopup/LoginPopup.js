import React from "react";
import Popup from "../Popup/Popup";
import "./loginpopup.css";


function LoginPopup({ isOpen, onClose, onRegisterClick, onLogin }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    onLogin(userData);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };


  return (
    <Popup
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onRegisterClick={onRegisterClick}
      title="Sign In"
    >
      <label className="form__input-label">Email</label>
      <input
        type="email"
        name="email"
        className="form__input"
        placeholder="Enter Email"
        value={email}
        required
        onChange={handleChangeEmail}
        minLength="2"
        maxLength="40"
      />
      <label className="form__input-label">Password</label>
      <input
        type="password"
        name="password"
        className="form__input"
        placeholder="Password"
        value={password}
        required
        onChange={handleChangePassword}
        minLength="2"
        maxLength="64"
      />
    </Popup>
  );
}

export default LoginPopup;