import React, { useContext, useState } from "react";
import "./registro.css";
import { Link, useNavigate } from "react-router-dom";

import correo from "../../assets/correo.png";
import telefono from "../../assets/telefono.png";

import { types } from "../types/types";
import { AuthContext } from "../auth/authContext";

const Login = () => {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  const [errors, setError] = useState({});
  const [input, setInput] = useState({
    telefono: "",
    correo: "",
  });

  function validate(input) {
    let errors = {};
    if (!input.telefono) errors.telefono = "Telefono Requerido";

    function ValidarTelefono(telefono) {
      var regex = /^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/;

      return regex.test(telefono)
        ? (errors.telefono = "Telefono Valido")
        : (errors.telefono = "Telefono Invalido");
    }
    ValidarTelefono(input.telefono);

    function ValidarEmail(correo) {
      var regex =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

      return regex.test(correo)
        ? (errors.correo = "Correo Valido")
        : (errors.correo = "Correo Invalido");
    }
    ValidarEmail(input.correo);

    // if (
    //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(input.correo) ==
    //   true
    // )
    //   errors.correo = " Correo Valido!";
    // else {
    //   errors.correo = " Correo Invalido!";
    // }
    return errors;
  }

  function handleChange1(e) {
    e.preventDefault();

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    //console.log(input)
  }

  function handleChange2(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    //console.log(input)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    

    if (
      errors.telefono === "Telefono Valido" &&
      errors.correo === "Correo Valido"
    ) {
      const action = {
        type: types.login,
        payload: {name: 'Manuel'}
      }
  
      dispatch(action)

      setInput({
        telefono: "",
        correo: "",
      });
      navigate("/home",{
        replace: true
      });
    } else {
      alert("Completa el registro");
    }
  };

  return (
    <>
      <div className="register">
        <h1 className="title_register">Bitcoin App</h1>
        <h2 className="subtitle_register">Crea tu cuenta</h2>

        <h3 className="texto_telefono">Ingresa tu celular</h3>
        <img src={telefono} alt="" className="icono_telefono" />
        <input
          className="input_telefono"
          type="tel"
          id="telefono"
          name="telefono"
          min={10}
          max={10}
          value={input.telefono}
          placeholder="a 10 dígitos"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
          onChange={(e) => handleChange1(e)}
        />
        <div>
          {errors.telefono && (
            <p
              className={
                errors.telefono === "Telefono Valido"
                  ? "error_telefono_active"
                  : "error_telefono"
              }
            >
              {errors.telefono}
            </p>
          )}
        </div>

        <h3 className="texto_correo">Y tu correo</h3>
        <img src={correo} alt="" className="icono_email" />
        <input
          className="input_email"
          type="email"
          name="correo"
          id="correo"
          placeholder="tucorreo@gmail.com"
          autoComplete="off"
          value={input.correo}
          onChange={(e) => handleChange2(e)}
        ></input>
        {errors.correo && (
          <p
            className={
              errors.correo === "Correo Valido"
                ? "error_correo_active"
                : "error_correo"
            }
          >
            {errors.correo}
          </p>
        )}

        <p className="parrafo_register">
          Al continuar, aceptas los{" "}
          <b className="parrafo_register_color">
            términos y condiciones y el aviso de privacidad
          </b>
        </p>
      </div>

      <button
        className={
          errors.correo !== "Correo Valido"
            ? "button_register"
            : "button_register_active"
        }
        onClick={(e) => handleSubmit(e)}
      >
        <h3 className="texto_boton_1">Crear cuenta</h3>
      </button>
      <Link to="/home" className="button_register_sesion">
        <h3 className="texto_boton_2">Iniciar Sesion</h3>
      </Link>
    </>
  );
};

export default Login;
