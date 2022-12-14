import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig/firebase"

const Edit = ()=>{
    const [ nombre, setNombre ] = useState('')
    const [ apellido, setApellido ] = useState(0)
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

return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
                <h1>Edit contacto</h1>
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

                    <button type='submit' className='btn btn-primary'>Update</button>
                 </form>   
            </div>
        </div>
    </div> 
)
}

export default Edit
