
import {Button, Modal, Text, Input} from '@nextui-org/react';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const RegisterModal = ({registerModalCloseHandler,registerModalVisible}) =>{

    const defaultError = {
        error: false,
        msj: null
    }

    const [error,setError] = useState(defaultError)
    const [loading, setLoading] = useState(false)


    const handleSubmit =  (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const email = formData.get("email").trim()
        const password = formData.get("password").trim()
        const name = formData.get("name").trim()
        const email2 = formData.get("email2").trim()
        const password2 = formData.get("password2").trim()

        //inician comprobaciones

        if(validations(email,email2,name,password,password2)){
            setError({
                error: false,
                msj: null
            })
        } else{
            return
        }

        
        createUser(email,password,name)
        
        
    }

    const validations = (email,email2,name,password,password2) =>{

        const data = [email,email2,name,password,password2]

        if(name == ""){
            setError({
                error: true,
                msj: "El campo Nombre no puede estar vacio"
            })
            return false
        }

        if(email == ""){
            setError({
                error: true,
                msj: "El campo Email no puede estar vacio"
            })
            return false
        }

        if(email != email2){
            setError({
                error: true,
                msj: "No coinciden los emails ingresados"
            })
            return false
        }

        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;   // regex para un correo electronico
        if(!emailRegex.test(email)){
            setError({
                error: true,
                msj: "El email ingresado es invalido"
            })
            return false
        }


        //valido que el pasword ingresado tenga letras de Aa-Zz, al menos un numero, no espacios en blanco y al menos 7 caracteres.
        let numberRegex = /[0-9]+/;      //pregunta si tiene al menos un numero
        let spacesRegex = /\s/;          // pregunta si tiene al menos un espacio en blanco
        let letterRegex = /[A-Za-z]+/;   // pregunta si tiene al menos una letra

        if(password.length <= 6  ){
            setError({
                error: true,
                msj: "Password must have at least 7 characters"
            })
            return false
        }

        if(!numberRegex.test(password)  ){
            setError({
                error: true,
                msj: "Password must have at least 1 number"
            })
            return false
        }

        if(spacesRegex.test(password)  ){
            setError({
                error: true,
                msj: "Password must have not blank spaces"
            })
            return false
        }

        if(!letterRegex.test(password)  ){
            setError({
                error: true,
                msj: "Password must have at least 1 letter"
            })
            return false
        }


        if(password != password2){
            setError({
                error: true,
                msj: "No coinciden los passwords ingresados"
            })
            return false
        }

        return true

    }


    const createUser = async (email,password,name) =>{
        //crea el usuario mediante los metodos de firebase
        const auth = getAuth();
                
        //crea un nuevo usuario
        try {
            await createUserWithEmailAndPassword(auth, email, password)

            const actualUser = auth.currentUser;
            //si el usuario se creó correctamente actualizara los datos del usuario con los datos ingresados en el formulario
            if (actualUser) {
                await updateProfile(auth.currentUser, {
                    displayName: name
                })
            }
            setError({
                success: true,
                msj :"User created succesfully!"
            })

        } catch (error) {
            console.log("usuario/email utilizado")
            console.log(error.code)
            setError({
                error: true,
                msj : "Email alredy in use"
            })
        }
    }

    const handleClose = () =>{

        setError({
            error: false,
            msj: null
        })

        registerModalCloseHandler()

    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            open={registerModalVisible}
            onClose={handleClose}
            css={{
                '@xs': {
                    width: '80vw'
                }
            }}
        >
            <form onSubmit={(e) => handleSubmit(e)}>
                <Modal.Header>
                    <Text id="modal-title" size={18}>
                        ¡Welcome! ¡Create your account!
                    </Text>
                </Modal.Header>
                <Modal.Body>
                <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Name"
                        aria-labelledby="Name"
                        name="name"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Email"
                        aria-labelledby="email"
                        name="email"
                    />
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Repeat your email"
                        aria-labelledby="email"
                        name="email2"
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Password"
                        aria-labelledby="password"
                        name="password"
                    />
                    <Input.Password
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Repeat your password"
                        aria-labelledby="password"
                        name="password2"
                    />
                    
                    {error.error &&
                        <Text id="modal-title" size={18} color="error">
                            {error.msj}
                        </Text>
                    }

                    {error.success &&
                        <Text id="modal-title" size={18} color="success">
                            {error.msj}
                        </Text>
                    }   
                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onClick={handleClose}>
                        Close
                    </Button>
                    <Button auto type="submit">
                        Register
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}

export default RegisterModal









