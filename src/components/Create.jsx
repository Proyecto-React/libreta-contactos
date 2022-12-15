import "../styles/Create.css";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// eslint-disable-next-line  no-unused-vars
const MySwal = withReactContent(Swal)

const Create = ()=>{

    const [nombre,setNombre]= useState("")
    const [apellido,setApellido]= useState('')
    const [email,setEmail]= useState('')
    const [telefono,setTelefono]= useState('')

    const navigate = useNavigate()

    const contactosCollection = collection(db,"contactos")

    const store =async (e)=>{
        e.preventDefault()
        await addDoc(contactosCollection,{
            nombre:nombre,
            apellido:apellido,
            email:email,
            telefono:telefono
        })
        navigate("/show")
    }
    const confirmCreate = ()=>{
        Swal.fire({            
            icon: 'success',
            title: 'Contacto guardado',                        
            showConfirmButton: true,
            timer: 1500
        })
    }
return(
<div className="container">
<div className="row">
    <div className="col">
        <h1>Crear contacto nuevo</h1>
        <form onSubmit={store}>
            <div className="mb-3">
                    <label className='form-label'>Nombre</label>
                    <input 
                    value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                    type="text"
                    className='form-control'/>
                </div>

                <div className="mb-3">
                    <label className='form-label'>Apellido</label>
                    <input 
                    value={apellido}
                onChange={(e)=>setApellido(e.target.value)}
                    type="text"
                    className='form-control'/>
                </div>

                <div className="mb-3">
                    <label className='form-label'>Email</label>
                    <input 
                    value={email}
                onChange={(e)=>setEmail(e.target.value)}
                    type="text"
                    className='form-control'/>
                </div>

                <div className="mb-3">
                    <label className='form-label'>Teléfono</label>
                    <input 
                    value={telefono}
                onChange={(e)=>setTelefono(e.target.value)}
                    type="text"
                    className='form-control'/>
                </div>

                <button onClick={()=>{confirmCreate()}} type="submit" className='btn btn-primary'>Agregar</button>
        </form>
    </div>
</div>
</div>


)




}
export default Create