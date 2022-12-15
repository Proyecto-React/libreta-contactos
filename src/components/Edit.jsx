import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

// eslint-disable-next-line  no-unused-vars
const MySwal = withReactContent(Swal)

const Edit = ()=>{
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ telefono, setTelefono ] = useState('')

    const navigate = useNavigate()

    const {id} = useParams()

    const update = async (e)=>{
        e.preventDefault()
        const contacto = doc(db,"contactos",id)
        const data= {
            nombre: nombre,
            apellido:apellido,
            email:email,
            telefono:telefono
        }
        await updateDoc (contacto,data)
        navigate("/")
    }

    const getcontactoById= async (id)=>{
        const contacto = await getDoc(doc(db,"contactos",id))
        if(contacto.exists()){
setNombre(contacto.data().nombre)
setApellido(contacto.data().apellido)
setEmail(contacto.data().email)
setTelefono(contacto.data().telefono)
        }else{
            console.log("el contacto no existe")
        }
    }
useEffect(()=>{
    getcontactoById(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const confirmEdit = ()=>{
    Swal.fire({            
        icon: 'success',
        title: 'Contacto guardado',                        
        showConfirmButton: true,
        timer: 1500
      })
}

return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Editar contacto</h1>
                 <form onSubmit={update}>
                    <div className='mb-3'>
                        <label className='form-label'>Nombre</label>
                        <input
                            value={nombre}
                            onChange={ (e) => setNombre(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  

                    <div className='mb-3'>
                        <label className='form-label'>Apellido</label>
                        <input
                            value={apellido}
                            onChange={ (e)=> setApellido(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Email</label>
                        <input
                            value={email}
                            onChange={ (e)=> setEmail(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>

                    <div className='mb-3'>
                        <label className='form-label'>Teléfono</label>
                        <input
                            value={telefono}
                            onChange={ (e)=> setTelefono(e.target.value)} 
                            type="text"
                            className='form-control'
                        />                 
                    </div>    

                    <button onClick={()=>{confirmEdit()}} type='submit' className='btn btn-primary' formTarget="_parent" >Guardar</button>
                 </form>   
            </div>
        </div>
    </div> 
)
}

export default Edit
