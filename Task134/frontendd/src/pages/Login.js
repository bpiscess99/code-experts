import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

// Validate Email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("All fields are required");
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredential: true }
      );
      console.log("login Successfully", response.data);
      navigate("/dashboard")
    } catch (error) {
      console.log("login error", error);
    }
  };
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={loginUser}>
        <input
          type="email"
          placeholder="Email"
          required
          name="email"
          value={email}
          onChange={handleInputChange}
        />

        <input
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <button type="submit" className="--btn --btn-primary --btn-block">
          Login
        </button>
      </form>

      <p>&nbsp;Don't have an account? &nbsp;</p>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Login;
