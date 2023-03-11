import React from "react";
// import { NavLink } from "react-router-dom";

import './footer.css';
import github from "../../images/gh.svg";
import telegram from '../../images/tg.svg'




function Footer(){
    return(
        <footer className="footer">
  <p className="footer__copyright">
        © {new Date().getFullYear()} Habit tracker proudly made by Daniel Evgrafov
      </p>
      <nav className="footer__nav">
        <div className="footer__links">
          {/* <NavLink to="/" className="footer__link">
            Home
          </NavLink> */}
        </div>
        <div className="footer__icons">
          <a
            href="https://github.com/mistifikatorcat"
            target="_blank"
            className="footer__icon"
            rel="noreferrer"
          >
            <img className="footer__icon" src={github} alt="github" />
          </a>
          <a
            href="https://t.me/mistycat"
            target="_blank"
            className="footer__icon"
            rel="noreferrer"
          >
            <img className="footer__icon" src={telegram} alt="telegram" />
          </a>
        </div>
      </nav>
        </footer>
    )
}

export default Footer;