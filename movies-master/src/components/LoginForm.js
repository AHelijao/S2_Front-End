import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { movieApi } from "../constants/axios";
import { userRequests } from "../constants/requests";
import { useNavigate } from "react-router-dom";
import useAppStateContext from "../hooks/useAppStateContext";

const LoginForm = () => {
  const { dispatch } = useAppStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const togglePassword = (event) => {
    event.preventDefault();

    console.log(showPass);
    setShowPass(!showPass);
  };

  const authentication = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("missing credentials");
    } else {
      movieApi
        .post(userRequests.login, {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          console.log("DISPATCHED LOGIN")
          dispatch({
            type: "Login",
            payload: {
              token: response.data.token,
              email,
            },
          });
          navigate("/home");
        })
        .catch((error) => {
          setMessage(error.response.data.message);
        });
    }
  };
  return (
    <>
      <label className="email">Email</label>
      <input
        type="email"
        className="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label className="password">Password</label>
      <input
        type={showPass ? "text" : "password"}
        className="password"
        onChange={(e) => setPassword(e.target.value)}
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
      <button className="submit" onClick={(e) => authentication(e)}>
        submit
      </button>
      <span className="form-message">{message}</span>
    </>
  );
};

export default LoginForm;
