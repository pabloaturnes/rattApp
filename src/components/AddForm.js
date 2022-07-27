import { Row, Grid, Button, Text, Input, Spacer } from "@nextui-org/react"

const AddForm = ({handleAddForm}) =>{

    return (
        <>
            <Spacer y={1} />
            <Row align='center' justify='center' >
                <Text h2 align="center" color="warning">¡Add your friends!</Text>
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