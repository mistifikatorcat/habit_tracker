import React from "react";
import Popup from "../Popup/Popup";
// import "./registerpopup.css";

// import { Link } from "react-router-dom";

function RegisterPopup({ isOpen, onClose, onLoginClick, onRegister }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password, username };

    onRegister(userData);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };


  return (
    <Popup
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onLoginClick={onLoginClick}
      onSubmit={handleSubmit}
      title="Sign Up"
    >
      <fieldset className="form__fieldset">
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
        <label className="form__input-label">Username</label>
        <input
          type="username"
          name="username"
          className="form__input"
          placeholder="Username"
          value={username}
          required
          onChange={handleChangeUsername}
          minLength="2"
          maxLength="15"
        />
      </fieldset>
    </Popup>
  );
}

export default RegisterPopup;