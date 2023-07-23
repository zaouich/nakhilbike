import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Nav = () => {
  const [isNavOpen, setNavOpen] = useState(false);

  const handleNavToggle = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <h1>
            <Link className="navbar-brand" to="/">
              SIKLAN Moto
            </Link>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            onClick={handleNavToggle}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/store">
                  اضافة مبيعة
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/select">
                  {" "}
                  الاحصائيات
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
