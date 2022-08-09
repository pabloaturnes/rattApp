import { Row, Grid, Button, Text, Input, Spacer, Popover } from "@nextui-org/react"
import { useGlobalContext } from "./GlobalProvider"
import useData from "../hooks/useData"
import { useState } from "react"



const AddForm = () =>{

    const [copiPopOver, setCopiPopOver] = useState(false)
    const {loggedUser,handleUserContext} = useGlobalContext()
    const {updateMeetingData} = useData()


    const copyToClipboard = () =>{
        navigator.clipboard.writeText(loggedUser.actualMeeting.id)
    }


    const handleAddForm = (e) =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const newPerson = {
            name : formData.get("nombre"),
            gasto : formData.get("gasto"),
            puso : formData.get("aporto")
        }
    
        let newPeopleData = []
    
    
        if(loggedUser.actualMeeting){
            //si hay un usuario logeado y el usuario selecciono una reunion
            newPeopleData = [...loggedUser.actualMeeting.data]
        }else{
            //si el usuario no selecciono una reunion o no esta logueado
            newPeopleData = [...loggedUser.offlineData]
        }
    
        
        newPeopleData.push(newPerson)
    
        if(loggedUser.actualMeeting){ //si hay usuario logueado y con reunion seleccionada actualizo al usuario logueado
            let updatedLoggedUser = Object.assign({},loggedUser)
            updatedLoggedUser.actualMeeting.data = newPeopleData
            
            const updatedLoggedUserMeetings = updatedLoggedUser.userMeetings.findIndex((object, index) => {
                    if (object.id === updatedLoggedUser.actualMeeting.id ) {
                        object.data = newPeopleData
                        return true
                    }
                });
            //actualizo en el local
            handleUserContext(updatedLoggedUser) 
            //actualizo tambien la reunion en la nube
            updateMeetingData(updatedLoggedUser.actualMeeting.data,updatedLoggedUser.actualMeeting.id)
    
        }else{ // si no hay usuario logueado o no tiene reunion seleccionada actualizo la variable de local Storage offlineData
            
            let updatedLoggedUser = Object.assign({},loggedUser)
            updatedLoggedUser.offlineData = newPeopleData
            handleUserContext(updatedLoggedUser)
        }
    
        
    
    }



    return (
        <>
            <Spacer y={1} />
            <Row align='center' justify='center' >
                <Text h2 align="center" color="warning">
                 {loggedUser.logged && `Hello ${loggedUser.displayName}!`}
                 {!loggedUser.logged && `Hello Guest!`}
                 </Text>
            </Row>
            <Row align='center' justify='center' wrap="wrap">
                <Text h2 align="center" color="warning">
                    {loggedUser.logged && loggedUser.actualMeeting &&`!Add friends to: ${loggedUser.actualMeeting.name}!`}
                    {loggedUser.actualMeeting == null  && `Offline Mode`}
                </Text>
                
                {loggedUser.logged && loggedUser.actualMeeting && 
                    <Popover isOpen={copiPopOver} onOpenChange={setCopiPopOver}>
                        <Popover.Trigger>
                            <Button onClick={copyToClipboard} size="sm" auto rounded={true} color="success"><i className="bi bi-clipboard-plus"></i></Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            <Text css={{ p: "$10" }}>Meeting id copied to the clipboard! Share it !</Text>
                        </Popover.Content>
                    </Popover>
                }
            </Row>
            <Row align='center' justify='center'  >
                <form onSubmit={(event) => handleAddForm(event)}>
                    <Grid.Container gap={2} justify="center" >
                        <Grid xs={12} sm={4}  justify="center">
                            <Input
                                name="nombre"
                                required
                                clearable
                                color="warning"
                                status="warning"
                                helperColor="warning"
                                helperText="Your friend name"
                                label="Name"
                                placeholder="Enter your friend name"
                            />
                        </Grid>
                            <Grid xs={12} sm={4} justify="center">
                                <Input
                                    name="gasto"
                                    type="number"
                                    clearable
                                    color="warning"
                                    status="warning"
                                    helperColor="warning"
                                    helperText="How much he spend"
                                    label="He spend"
                                    placeholder="How much he spend"
                                />
                            </Grid>
                            <Grid xs={12} sm={4} justify="center">
                                <Input
                                    name="aporto"
                                    type="number"
                                    clearable
                                    color="warning"
                                    status="warning"
                                    helperColor="warning"
                                    helperText="How much he put"
                                    label="He put"
                                    placeholder="How much he put"
                                />
                            </Grid>
                            <Spacer y={1} />
                            <Grid xs={12} justify="center">
                                <Button type="submit" color="warning" auto>
                                    Add
                                </Button> 
                            </Grid>
                    </Grid.Container>
                </form>
            </Row>
        </>
    )

}


export default AddForm