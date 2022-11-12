import React, { useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";
import { Button, CircularProgress } from "@mui/material";
import validator from "validator";
import { useNavigate } from "react-router-dom";
const Login = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setemailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();
  const handleKeyDown = (e) =>{
    if(e.keyCode === '13'){
      handleSubmit(e)
    }
  }
  const validateEmail = (newEmail) => {
    setEmail(newEmail);
    setemailValid(
      validator.isEmail(newEmail) &&
        newEmail.length > 0 &&
        newEmail.length <= 50
    );
  };
  const validatePassword = (newPassword) => {
    setPassword(newPassword);
    setPasswordValid(newPassword.length > 4 && newPassword.length <= 16);
  };
  const handleSubmit = async (e) => {
    setIsValid(true);
    e.preventDefault();
    let data = new FormData();
    data.append("email", email);
    data.append("password", password);
    try {
      if (emailValid && passwordValid && email && password) {
        setIsLoading(true);
        await axios
          .post("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", data)
          .then(function (res) {
            setTimeout(() => {
              setUserData(res.data);
              navigate("/list");
            }, 1000);
          });
      }
    } catch (e) {
      console.log(e);
      setTimeout(() => {
        setIsLoading(false);
        setIsValid(false);
      }, 1000);
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Rapptr Labs</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <div className="form-control">
            <span>
              <PersonIcon fontSize={"large"} />
            </span>
            <input
              type="email"
              name="email"
              className="login-input"
              placeholder="user@rapptrlabs.com"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              style={{ borderColor: emailValid ? "black" : "red" }}
            ></input>
            <p
              className="validator-text"
              style={{ marginTop: "10px", color: "red" }}
            >
              {emailValid ? "" : "Not a valid email"}
            </p>
          </div>
          <label htmlFor="password">Password</label>
          <div className="form-control">
            <span>
              <LockIcon fontSize={"large"} />
            </span>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Must be at least 4 characters"
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              style={{ borderColor: passwordValid ? "black" : "red" }}
            ></input>
            <p
              className="validator-text"
              style={{ marginTop: "10px", color: "red" }}
            >
              {passwordValid ? "" : "Not a valid password"}
            </p>
          </div>
          {isLoading ? (
            <LoadingButton
              loading
              loadingPosition="start"
              loadingIndicator={
                <CircularProgress
                  color="inherit"
                  size={35}
                  sx={{ top: "-20px" }}
                />
              }
              variant="contained"
              className="login-btn"
              sx={{ padding: "15px", fontSize: "20px" }}
            >
              Loading...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              type="submit"
              className="login-btn"
              sx={{ padding: "15px", fontSize: "20px" }}
            >
              Login
            </Button>
          )}
          {isValid ? (
            ""
          ) : (
            <p
              className="validator-text"
              style={{ marginTop: "10px", color: "red", textAlign: "center" }}
            >
              The server could not be reached. {<br />} Please try again later.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
