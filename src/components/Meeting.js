
import { useState,useEffect } from "react"
import AddForm from "./AddForm"
import Extras from "./Extras"
import MeetingTable from "./MeetingTable"
import PeopleTable from "./PeopleTable"
import useData from "../hooks/useData"
import { useGlobalContext,handleUserContext } from "./GlobalProvider"

const Meeting = () =>{



const [extras, setExtras] = useState({tip : 0, tax : 0})
const [tableData, setTableData] = useState([])

const {loggedUser,handleUserContext} = useGlobalContext()

const {updateMeeting} = useData() //actualiza los datos en la nube, pero dejalo para el final. pensalo. 


const handleExtrasForm = (e) =>{
    e.preventDefault()
    const formData = new FormData(e.target)
    const newExtras = {
        tip : parseInt(formData.get("tip")) || 0,
        tax : parseInt(formData.get("tax")) || 0
    }
    console.log(newExtras)
    setExtras(newExtras)
    
}



const ByEqualParts = (extras) =>{

    let peopleData = []
    //preguntar si esta en offline u en offline y en base a eso asignar valor a peopleData
    if(loggedUser.actualMeeting){
        //si hay un usuario logeado y el usuario selecciono una reunion
        peopleData = [...loggedUser.actualMeeting.data]
    }else{
        //si el usuario no selecciono una reunion o no esta logueado
        peopleData = [...loggedUser.offlineData]
    }

    // calculo total del gasto sin tax   
    const total = peopleData.reduce((a, b) =>{
        return a + parseInt(b.gasto,10) 
    },0)
    //calculo el tax sobre el total
    const totalTip = (extras.tip * total) / 100
    //calculo el tip sobre el total
    const totalTax = (extras.tax * total) / 100
    //calculo el total dividido la cantidad de personas
    const peopleQuantity = peopleData.reduce((a,b)=>{
        return a + 1
    },0)
    // calculo el total que tendria que gastar cada persona
    const totalByEach = (total + totalTax + totalTip) / peopleQuantity
    //calculo lo que debería poner cada uno respecto a lo que ya puso y a lo que se gastó entre todos
    const newTableData = [...peopleData]

    newTableData.map((person)=>{

        person.totalGastado = totalByEach

        if(person.puso >= totalByEach){
            person.debt = 0
            person.credit = person.puso - totalByEach
            
        }else{
            person.credit = 0
            person.debt = totalByEach - person.puso
        }
        
    })

    setTableData(newTableData)

}

//calcula el gasto de manera individual segun lo consumido
const byIndividuals = (extras) =>{

    //preguntar si esta en offline u en offline y en base a eso asignar valor a peopleData
    let peopleData = []
    //preguntar si esta en offline u en offline y en base a eso asignar valor a peopleData
    if(loggedUser.actualMeeting){
        //si hay un usuario logeado y el usuario selecciono una reunion
        peopleData = [...loggedUser.actualMeeting.data]
    }else{
        //si el usuario no selecciono una reunion o no esta logueado
        peopleData = [...loggedUser.offlineData]
    }

    const newTableData = [...peopleData]

    newTableData.map((person)=>{

        //calculo el tax sobre el total
        const totalTip = (extras.tip * person.gasto) / 100

        //calculo el tip sobre el total
        const totalTax = (extras.tax * person.gasto) / 100

        //calculo total gastado
        const totalGastado = parseInt(totalTax)  + parseInt(totalTip)  + parseInt(person.gasto)
        
        person.totalGastado = totalGastado

        if(totalGastado >= person.puso  ){
            person.debt = totalGastado - person.puso 
            person.credit = 0

        }else{
            person.debt = 0
            person.credit =  person.puso - totalGastado 

        }

    })

    setTableData(newTableData)
}



    return (
        <>
            <AddForm />
            <PeopleTable   /> 
            <Extras byIndividuals={byIndividuals} ByEqualParts={ByEqualParts} />
            <MeetingTable tableData={tableData}  />
        </>
    )

}


export default Meeting