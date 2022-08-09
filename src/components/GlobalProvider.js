import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appConfig from "../config/firebaseConfig"

const defaultUser = {
    displayName : null,
    id : null,
    userMeetings : [],
    actualMeeting: null,
    logged : false,
    offlineData : [] 
}

let GlobalContext = createContext()  //creo un contexto por default

export const useGlobalContext = () =>{
    const contextValue = useContext(GlobalContext)
    return contextValue
}  //creo y exporto un hook para consumir el contexto desde cualquier componente

const GlobalProvider = ({children}) =>{    //creo un provider para el contexto creado, con la propiedad children para que todo los componentes que yo quiera queden dentro

    
    const [loggedUser, setLoggedUser] = useState(defaultUser)

    useEffect(()=>{
    
        let storage = window.localStorage
        const localStorageData = JSON.parse(storage.getItem("loggedUser"))
        
        if(localStorageData){
            setLoggedUser(localStorageData)
            //parseas a objeto y lo pones en estado logeed user
        }else{
            //parseas a string y creas la variable en local storage
            let ToString = JSON.stringify(loggedUser)
            storage.setItem("loggedUser", ToString)
        }
        

     
    
      },[])


    const handleUserContext = (loggedUser) =>{
        setLoggedUser(loggedUser)
        // actualizo el local storage para la persistencia de datos
        let storage = window.localStorage
        let ToString = JSON.stringify(loggedUser)
        storage.setItem("loggedUser", ToString)
    }

    return (
        <GlobalContext.Provider value={{loggedUser,handleUserContext}}>
            {children}
        </GlobalContext.Provider>
    )

}

export default GlobalProvider