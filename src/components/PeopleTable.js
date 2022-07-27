import { Table, Spacer,Button,Text } from "@nextui-org/react"

const PeopleTable = ({handleDeleteData, peopleData}) =>{

    const HeadStyle = {color : "white", backgroundColor: "#F5A524", textAlign : "center" }
    const BodyStile = {color : "#F5A524", backgroundColor: "white", textAlign : "center"} 

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

                    {peopleData.map((person,index)=>{

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