import React from "react";
import "./landingPage.css";
import { Link } from "react-router-dom";
import image from "../../assets/inicio.png";
import { AiOutlineArrowRight } from "react-icons/ai";

const Login = () => {
  return (
    <div className="landing">
      <div className="landing-wrapper">
        <div className="logo_landing">
          <h1 className="landing_title">Bitcoin App</h1>
          <img src={image} alt="" className="image" />
        </div>
        <div className="description_landing">
          <h2 className="subitle_landing">¿Cuál es el valor actual del BTC?</h2>
          <p className="parrafo_landing">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, cum?
          </p>
          <Link to="/registro" className="button_landing">
            INGRESAR
            <AiOutlineArrowRight className="arrow_landing" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
