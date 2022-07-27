import { Row, Input, Spacer, Button, Text, Checkbox } from "@nextui-org/react"
import { useRef, useState } from "react"
import OptionModal from "./OptionModal"


const Extras = ({byIndividuals,ByEqualParts}) =>{

    
    const [optionModalVisible,setOptionModalVisible] = useState(false)
    const optionModalCloseHandler = () =>setOptionModalVisible(false)
    const optionModalHandler = () => setOptionModalVisible(true);

    const extrasFormRef = useRef()
    const tipInput = useRef()
    const taxInput = useRef()


    const handleTipCheck = (e) =>{
        tipInput.current.disabled = !e     
   }

   const handleTaxCheck = (e) =>{
       taxInput.current.disabled = !e     
  }


    const handleByIndividuals = () =>{

        const formData = new FormData(extrasFormRef.current)
        const extras = {
            tip : parseInt(formData.get("tip")) || 0,
            tax : parseInt(formData.get("tax")) || 0
        }
        optionModalCloseHandler()
        byIndividuals(extras)
    }

    const handleByEquals = () =>{

        const formData = new FormData(extrasFormRef.current)
        const extras = {
            tip : parseInt(formData.get("tip")) || 0,
            tax : parseInt(formData.get("tax")) || 0
        }
        optionModalCloseHandler()
        ByEqualParts(extras)
    }







    return (
        <> 
            <Spacer y={2}/>
            <Text color="warning" h2 css={{textAlign : "center"}}>Calculations of your meeting</Text>
            <Spacer y={1}/>
            <form ref={extrasFormRef} >
                <Row align="end" justify="center">
                    <Input
                        disabled={true}
                        ref={tipInput}
                        name="tip"
                        clearable
                        color="warning"
                        status="warning"
                        label={
                        <Checkbox  color="warning" labelColor="warning" defaultSelected={false} onChange={(e)=>handleTipCheck(e)}>Tip</Checkbox>
                        }
                        placeholder="Enter your tip (%)"
                    />
                    
                    <Spacer x={2} />
                    <Input
                        disabled={true}
                        ref={taxInput}
                        name="tax"
                        clearable
                        color="warning"
                        status="warning"
                        label={
                            <Checkbox color="warning" labelColor="warning" defaultSelected={false} onChange={(e)=>handleTaxCheck(e)}>Tax</Checkbox>
                        }   
                        placeholder="Enter your tax (%)"
                    />
                    <Spacer x={2} />
                    <Button color="warning" auto onClick={optionModalHandler}>
                        Apply
                    </Button>
                    <OptionModal  optionModalCloseHandler={optionModalCloseHandler} optionModalVisible={optionModalVisible}  handleByIndividuals={ handleByIndividuals} handleByEquals={handleByEquals} />
                </Row> 
            </form>
        </>
    )

}


export default Extras