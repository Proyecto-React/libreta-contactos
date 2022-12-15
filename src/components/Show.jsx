import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "../styles/Show.css"

// eslint-disable-next-line  no-unused-vars
const MySwal = withReactContent(Swal);

const searchName = () => {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        } else {
        tr[i].style.display = "none";
        }
    }
    }

}

const Show = () => {
  // 1 configurar los hooks
  const [contactos, setContactos] = useState([]);
  // 2 referenciamos la db de firestore
  const contactosCollection = collection(db, "contactos");
  //3 funcion para mostrar todos los docs
  const getContactos = async () => {
    const data = await getDocs(contactosCollection);
    /*     console.log (data.docs) */
    setContactos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    /*     console.log (contactos) */
  };
  // 4 funcion para eliminar un doc
  const deleteContacto = async (id) => {
    const contactoDoc = doc(db, "contactos", id);
    await deleteDoc(contactoDoc);
    getContactos();
  };
  //5 funcion para la confirmacion de swwet alert
  const confirmDelete = (id) => {
    Swal.fire({
      title: "Estas Seguro/a",
      text: "No podes revertir este cambio",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo Borrarlo",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContacto(id); //llamamos a la funcion eliminar
        Swal.fire("Borrado!", "Has eliminado el Documento.", "success");
      }
    });
  };
  //6 use useEffect

  useEffect(() => {
    getContactos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //7 devolvemos la vista de nuestro componente
  return (
    // fragment
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
            
              <Link to="/create" className="btn-nuevo mt-2 mb-2">

              <span>Nuevo contacto</span>
              <svg className="flecha" width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
                <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
              </svg>
              </Link>
              <div className="group">
            
            <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g></svg>
                <input 
                  // className="buscar"
                  type="text"
                  id="myInput"
                  onKeyUp={searchName} 
                  placeholder="Buscar contacto"
                  title="Type in a name"
                />
              
            </div>
            </div>
            
            <table className="table table-dark table-hover" id="myTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contactos.map((contacto) => (
                  <tr key={contacto.id}>
                    <td>{contacto.nombre}</td>
                    <td>{contacto.apellido}</td>
                    <td>{contacto.email}</td>
                    <td>{contacto.telefono}</td>
                    <td>
                      <Link
                        to={`/edit/${contacto.id}`}
                        className="btn btn-light"
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </Link>
                      <button
                        onClick={() => {
                          confirmDelete(contacto.id);
                        }}
                        className="btn btn-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Show;
