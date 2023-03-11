import React, { useState } from "react";
import { Link } from "react-router-dom";
import './signup.css';

function Signup(/*{ handleSignup }*/) {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const userData = { email, password };
//     handleSignup(userData);
//   };

//   const handleChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

  return (
    <section className="signup">
      <h2 className="signup__title">Sign Up</h2>
      <form className="signup__form" /*onSubmit={handleSubmit}*/>
        <input
          type="email"
          name="email"
          className="signup__input"
          placeholder="Email"
         /* value={email}
          onChange={handleChangeEmail}*/
        />

        <input
          type="password"
          name="password"
          className="signup__input"
          placeholder="Password"
          /*value={password}
  onChange={handleChangePassword}*/
        />

        <div className="signup__footer">
          <div className="signup__footer-wrapper">
            <button type="submit" className="signup__submit">
              Sign Up
            </button>
            <p className="signup__footer-text">
              Already a member?{" "}
              {/* <Link to="/login" className="signup__link">
                Log in here!
              </Link> */}
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Signup;
