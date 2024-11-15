import React from "react";
import { Link } from "react-router-dom";
 import './Home.css'


const Home = () => {
  return (
    <div className="home">

        <ul className="home-links">
          <li>
            <button className="home-button">
            <Link to="/register">Register</Link>
            </button>
          </li>

          <li>
            <button className="home-button">
              <Link to="/login" className="">Login</Link>
            </button>
          </li>
        </ul>

      
    </div>
  );
};



export default Home;
