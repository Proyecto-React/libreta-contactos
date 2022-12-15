import "../styles/Inicio.css";
import React from "react";
import { Link } from "react-router-dom";

const Inicio=()=>{

    return (

            <div className="inicio">
                {/* eslint-disable-next-line  */}
                <h1>Libreta de Contacto</h1>
                <Link to="/show" className="logo"></Link>
            </div>

    )
}
export default Inicio;