import "../styles/Create.css";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {collection, addDoc} from 'firebase/firestore'
import {db} from '../firebaseConfig/firebase'

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
        navigate("/")
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
                    <label className='form-label'>Telefono</label>
                    <input 
                    value={telefono}
                onChange={(e)=>setTelefono(e.target.value)}
                    type="text"
                    className='form-control'/>
                </div>

                <button type="submit" className='btn btn-primary'>Agregar</button>
        </form>
    </div>
</div>
</div>


)




}
export default Create