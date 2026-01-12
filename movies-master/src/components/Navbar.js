import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import useAppStateContext from "../hooks/useAppStateContext";

const Navbar = () => {
  const { dispatch } = useAppStateContext();

  const [show, setShow] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

    return window.removeEventListener("scroll", null);
  }, []);

  const handleAvatarClick = (event) => {
    event.preventDefault();
    setShowDropDown(!showDropDown);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch({
      type: "Logout",
    });
    navigate("/login");
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        alt="Netflix Logo"
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
      />
      <img
        className="nav_avatar"
        onClick={(event) => handleAvatarClick(event)}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-yQFL1YOsN3esm6p1jB1HT-Q6qKtxtZqh9LGwMDIgDCy-p54eMf8jdGSN6yZUeySqseA&usqp=CAU"
        alt="Netflix avatar"
      />
      {showDropDown && (
        <div className="dropdown">
          <span>John Doe</span>
          <span onClick={(event) => handleLogout(event)}>Logout</span>
        </div>
      )}
    </div>
  );
};

export default Navbar;