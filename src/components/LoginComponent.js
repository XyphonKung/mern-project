import axios from "axios";
import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import {authenticate, getUser} from "../services/authorize";
import NavbarComponent from "./NavbarComponent";
import { useNavigate } from "react-router-dom";

const LoginComponent = () => {
  let navigate = useNavigate()
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API + "/login", { username, password })
      .then((response) => {
        
        //login success
        authenticate(response,()=>navigate("/create"))
      })
      .catch((err) => {
        Swal.fire("Error!", err.response.data.error, "error");
      });
  };
  useEffect(()=>{
    getUser() && navigate('/')
  },[])
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>LOGIN | Admin</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="LOGIN" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default LoginComponent;
