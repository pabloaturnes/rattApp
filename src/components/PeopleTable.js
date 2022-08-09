import { Table, Spacer,Button,Text } from "@nextui-org/react"
import { useGlobalContext } from "./GlobalProvider"
import useData from "../hooks/useData"

const PeopleTable = () =>{

    const HeadStyle = {color : "white", backgroundColor: "#F5A524", textAlign : "center" }
    const BodyStile = {color : "#F5A524", backgroundColor: "white", textAlign : "center"} 

    const {loggedUser,handleUserContext} = useGlobalContext()
    const {updateMeetingData} = useData()

    const handleDeleteData = (index) =>{

        let peopleData = []
    //preguntar si esta en offline u en offline y en base a eso asignar valor a peopleData
    if(loggedUser.actualMeeting){
        //si hay un usuario logeado y el usuario selecciono una reunion
        peopleData = [...loggedUser.actualMeeting.data]
    }else{
        //si el usuario no selecciono una reunion o no esta logueado
        peopleData = [...loggedUser.offlineData]
    }

    const newPeopleData = [...peopleData]
    newPeopleData.splice(index,1)


        if(loggedUser.logged){ //si hay usuario logueado actualizo al usuario logueado
            let updatedLoggedUser = Object.assign({},loggedUser)
            updatedLoggedUser.actualMeeting.data = newPeopleData
            
            const updatedLoggedUserMeetings = updatedLoggedUser.userMeetings.findIndex((object, index) => {
                    if (object.id === updatedLoggedUser.actualMeeting.id ) {
                        object.data = newPeopleData
                        return true
                    }
                });
            
            //actualizo las reuniones en local
            handleUserContext(updatedLoggedUser) 
            //actualizo la reunion en la nube
            updateMeetingData(updatedLoggedUser.actualMeeting.data,updatedLoggedUser.actualMeeting.id)

        }else{ // si no hay usuario logueado actualizo la variable de local Storage offlinePeopleData
            
            let updatedLoggedUser = Object.assign({},loggedUser)
            updatedLoggedUser.offlineData = newPeopleData
            handleUserContext(updatedLoggedUser)
        }

}


let actualPeopleData = []
//preguntar si esta en offline u en offline y en base a eso asignar valor a peopleData
if(loggedUser.actualMeeting){
    //si hay un usuario logeado y el usuario selecciono una reunion
    actualPeopleData = [...loggedUser.actualMeeting.data]
}else{
    //si el usuario no selecciono una reunion o no esta logueado
    actualPeopleData = [...loggedUser.offlineData]
}


    return (
        <>
            <Spacer y={1} />
            <Text color="warning" h2 css={{textAlign : "center"}}>Attendees</Text>
            <Spacer y={1}/>
            <Table  css={{height: "auto", minWidth: "100%", backgroundColor: "white" }} aria-label="Tabla de contenidos" >
                <Table.Header >
                    <Table.Column css={HeadStyle}>Name</Table.Column>
                    <Table.Column css={HeadStyle}>Spend</Table.Column>
                    <Table.Column css={HeadStyle}>Put</Table.Column>
                    <Table.Column css={HeadStyle}>Action</Table.Column>
                </Table.Header>
                <Table.Body css={BodyStile}>

                    {actualPeopleData && actualPeopleData.map((person,index)=>{

                        return (
                        <Table.Row key={index}>
                        <Table.Cell css={BodyStile}>{person.name}</Table.Cell>
                        <Table.Cell css={BodyStile}>${person.gasto}</Table.Cell>
                        <Table.Cell css={BodyStile}>${person.puso}</Table.Cell>
                        <Table.Cell css={BodyStile} >
                            <Button size="sm" color="error" css={{margin: "auto"}} onPress={() => handleDeleteData(index)} >
                                <i className="bi bi-trash"></i>
                            </Button>
                        </Table.Cell>
                        </Table.Row>
                        )

                    })}

                </Table.Body>
            </Table>
            <Spacer y={1} />  
        </>
    )}


export default PeopleTable