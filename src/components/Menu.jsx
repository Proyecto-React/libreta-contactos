import "../styles/Menu.css";
import {Link} from "react-router-dom"
import React from "react";

const Menu=()=>{

    return (

            <div className="menu">
                <ul>
                    <li>
                        <Link to={'/'}>Inicio</Link>
                        
                    </li>
                    <li>
                        <Link to={'/show'}>Lista de contactos</Link>
                        
                    </li>
                </ul>
            </div>

    )
}
export default Menu;