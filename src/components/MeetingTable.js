import { Table, Spacer, Text } from "@nextui-org/react"

const MeetingTable = ({tableData}) =>{

    const HeadStyle = {color : "white", backgroundColor: "#F5A524", textAlign : "center" }
    const BodyStile = {color : "#F5A524", backgroundColor: "white", textAlign : "center"} 

    return (
        <>
            <Spacer y={2} />
            <Table  css={{height: "auto", minWidth: "100%", backgroundColor: "white" }} aria-label="Tabla de contenidos" >
                <Table.Header >
                    <Table.Column css={HeadStyle}>Name</Table.Column>
                    <Table.Column css={HeadStyle}>Spend</Table.Column>
                    <Table.Column css={HeadStyle}>Put</Table.Column>
                    <Table.Column css={HeadStyle}>Credit</Table.Column>
                    <Table.Column css={HeadStyle}>Debt</Table.Column>
                </Table.Header>
                <Table.Body css={BodyStile}>

                    {tableData.map((person,index)=>{

                        return (
                        <Table.Row key={index}>
                            <Table.Cell css={BodyStile}>{person.name}</Table.Cell>
                            <Table.Cell css={BodyStile}>${person.totalGastado}</Table.Cell>
                            <Table.Cell css={BodyStile}>${person.puso}</Table.Cell>
                            <Table.Cell css={BodyStile}>${person.credit}</Table.Cell>
                            <Table.Cell css={BodyStile}>${person.debt}</Table.Cell>
                        </Table.Row>
                        )

                    })}

                    


                </Table.Body>
            </Table>
            <Spacer y={1} />
            <Text color="warning" h2 css={{textAlign : "center"}}>Total: ${tableData.reduce((a,b)=>{return a + parseInt(b.totalGastado,10)},0)}</Text>
            <Spacer y={2} />  
        </>
    )}


export default MeetingTable