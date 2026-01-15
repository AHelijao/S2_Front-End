import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const RegisterForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    city: "",
    street: "",
  });

  const togglePassword = (event) => {
    event.preventDefault();

    console.log(showPass);
    setShowPass(!showPass);
  };

  const registerUser = () => {
    // call our API
  };
  return (
    <div>
      <div className="inputs-container">
        <div className="input-container">
          <label className="email">Email</label>
          <input
            type="email"
            className="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          ></input>
          <div className="input-container">
            <label className="password">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
            <span onClick={(e) => togglePassword(e)}>
              <span>
                {showPass ? (
                  <FontAwesomeIcon icon={faEye} className="customIcon" />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} className="customIcon" />
                )}
              </span>
            </span>
          </div>
          <div className="inputs-container">
            <div className="input-container">
              <label className="city">City</label>
              <input
                type="text"
                className="city"
                onChange={(e) => setUser({ ...user, city: e.target.value })}
              ></input>
            </div>
          </div>
          <div className="inputs-container">
            <div className="input-container">
              <label className="street">Street</label>
              <input
                type="text"
                className="street"
                onChange={(e) => setUser({ ...user, street: e.target.value })}
              ></input>
            </div>
          </div>
          <button className="submit" onClick={registerUser}>
            submit
          </button>
          <span className="form-message">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
