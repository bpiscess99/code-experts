import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  skills: [""],
};

// Validate Email
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    dateOfBirth,
    skills,
  } = formData;
  const [photo, setPhoto] = useState(null);

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  // Add skills input
  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };

  // Add SKill
  const addSkill = () => {
    setFormData({ ...formData, skills: [...skills, ""] });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email | !password | !confirmPassword) {
      return alert("All fields are required");
    }
    if (password.length < 6) {
      return alert(
        "Password must be upto 6 characters with UpperCase, LowerCase, special character & number"
      );
    }
    if (!validateEmail(email)) {
      return alert("Please enter a valid email");
    }
    if (password !== confirmPassword) {
      return alert("Please do not match");
    }

    // formData
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("dateOfBirth", dateOfBirth);
    if (photo) formData.append("photo", photo); // Appending image file
    skills.forEach((skill, index) =>
      formData.append(`skills[${index}]`, skill)
    );
    console.log(formData);
    // API Call
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredential: true,
        }
      );
      console.log("User registered Successfully", response.data);
      return response.data;
    } catch (error) {
      console.log("registerUser error", error);
    }
  };

  return (
    <div>
      <div className="form">
        <h2>Register</h2>

        <form onSubmit={register}>
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
          />

          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
          />

          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleInputChange}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            onPaste={(e) => {
              e.preventDefault();
              alert("Cannot paste into input field");
              return false;
            }}
          />

          <input
            type="file"
            name="photo"
            placeholder="upload photo"
            onChange={handleImageChange}
            accept="image/*"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleInputChange}
          />
          {skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Skill ${index + 1}`}
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={addSkill}>
            Add More
          </button>

          <button type="submit" className="--btn --btn-primary --btn-block">
            Register
          </button>
        </form>

        <span className="register">
          <Link className="black" to="/">
            Home
          </Link>
          <p> &nbsp; Already have an account? &nbsp;</p>
          <Link className="black" to="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
