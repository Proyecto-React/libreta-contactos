import { useState,useEffect } from "react";
import {Link} from "react-router-dom"
import {collection,getDocs,deleteDoc,doc} from "firebase/firestore"
import {db} from "../firebaseConfig/firebase.js"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// eslint-disable-next-line  no-unused-vars
const MySwal = withReactContent(Swal)


const Show = ()=>{
// 1 configurar los hooks
const [contactos,setContactos]= useState([])
// 2 referenciamos la db de firestore
const contactosCollection = collection(db,"contactos")
//3 funcion para mostrar todos los docs
const getContactos= async () =>{
    const data = await getDocs (contactosCollection)
/*     console.log (data.docs) */
setContactos(
    data.docs.map((doc)=>({...doc.data(),id:doc.id}))
)
/*     console.log (contactos) */
}
// 4 funcion para eliminar un doc
const deleteContacto= async(id)=>{
const contactoDoc= doc(db,"contactos",id)
await deleteDoc (contactoDoc)
getContactos()
}
//5 funcion para la confirmacion de swwet alert
const confirmDelete=(id)=>{
    Swal.fire({
        title: 'Estas Seguro/a',
        text: "No podes revertir este cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, deseo Borrarlo'
      }).then((result) => {
        if (result.isConfirmed) {
            deleteContacto(id) //llamamos a la funcion eliminar
          Swal.fire(
            'Borrado!',
            'Has eliminado el Documento.',
            'success'
          )
        }
      })


}
//6 use useEffect

useEffect(()=>{
    getContactos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
//7 devolvemos la vista de nuestro componente
return(
 // fragment
 <> 
<div className="container">
<div className="row">
    <div className="col">
        <div className="d-grid gap-2">
<Link to="/create" className="btn btn-secondary mt-2 mb-2">CREAR</Link>
        </div>
<table className="table table-dark table-hover">
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
{contactos.map((contacto)=>(
<tr key={contacto.id}>
    <td>{contacto.nombre}</td>
    <td>{contacto.apellido}</td>
    <td>{contacto.email}</td>
    <td>{contacto.telefono}</td>
    <td>
        <Link to={`/edit/${contacto.id}`} className="btn btn-light" ><i className="fa-solid fa-pencil"></i></Link>
    <button onClick={()=>{confirmDelete(contacto.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
    </td>
</tr>


))}

</tbody>


</table>
    </div>  

</div>


</div>

</>
)

}

export default Show


