import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import regresar from "../../assets/regresar.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/authContext";
import { types } from "../types/types";

const Home = () => {

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const [coin, setCoin] = useState([]);
  const [moneda, setMoneda] = useState("");
  const [costo, setCosto] = useState("");

  const api = () => {
    fetch("https://blockchain.info/ticker")
      .then((response) => response.json())
      .then((info) => setCoin(Object.values(info)));
  };

  console.log(coin);

  useEffect(() => {
    api();
  }, [costo]);

  const handleColor = (valor) => {
    setMoneda(valor);
    let costoCompra = coin.find((element) => {
      if (element.symbol === valor) {
        return setCosto(element.buy);
      }
    });
  };

  const handleLogout=()=>{
      dispatch({type: types.logout})
      navigate('/login', {
        replace:true
      })
  }

  return (
    <div className="home">
      <header className="home_regresar">
        <Link to={"/"}>
          <img src={regresar} alt="" className="image_home" onClick={e=>handleLogout()}/>
        </Link>
        <h1 className="text_regresar">Resumen Bitcoin</h1>
      </header>

      <div className="home_selection">
        <h2 className="text_valor">Valor de Bitcoin actual</h2>
        <div className="agrupacion_parcial">
          <h3 className="text_moneda">Moneda</h3>
          <div className="agroup">
            <li
              className={moneda !== "USD" ? "li_usd" : "li_usd_active"}
              onClick={(e) => handleColor("USD")}
            >
              USD
            </li>
            <li
              className={moneda !== "GBP" ? "li_gbp" : "li_gbp_active"}
              onClick={(e) => handleColor("GBP")}
            >
              GBP
            </li>
            <li
              className={moneda !== "EUR" ? "li_eur" : "li_eur_active"}
              onClick={(e) => handleColor("EUR")}
            >
              EUR
            </li>
          </div>
        </div>

        <div className="home_detalle">
          <h2 className="text_detalle">Detalle</h2>
          <h3 className="text_nombre_moneda">
            {moneda === "EUR" ? "Euro" : "Selecciona una moneda" && moneda ==="USD" ? "United States Dollar" : "Selecciona una moneda"   && moneda === "GBP" ? "Pound Sterling" : "Selecciona una moneda" }
          </h3>
          <div className="container_costo">
            <div className="content_costo">
              <h3 className="text_costo">$ {costo}</h3>
            </div>
          </div>
        </div>
      </div>

      <button className="button_actualizar">
        <h3 className="texto_boton_1" onClick={(e) => api()}>
          Actualizar
        </h3>
      </button>
    </div>
  );
};

export default Home;
