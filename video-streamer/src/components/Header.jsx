import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import { UserContext } from "./UserContext";

function Header({ handleSignOut }) {
  const { user, setStreamData } = useContext(UserContext);

  function home() {
    setStreamData("undefined");
  }

  return (
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <Link
        to="/"
        className="nav-link fs-4 d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        aria-current="page"
        onClick={home}
      >
        Streamer
      </Link>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/" className="nav-link" aria-current="page" onClick={home}>
            All Streams
          </Link>
        </li>

        <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <div className="d-flex">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <Link to="/streamCreate" className="nav-link">
                  Create
                </Link>
              </li>
            </ul>
            <div className="status">
              <p className="username">{user.name}</p>
              <button
                onClick={(e) => handleSignOut(e)}
                id="signOut"
                className="btn btn-danger"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </ul>
    </header>
  );
}

export default Header;
