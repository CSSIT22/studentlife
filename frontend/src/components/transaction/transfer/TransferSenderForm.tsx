import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Input, NumberInput, NumberInputField, Text, Textarea } from "@chakra-ui/react"
import React, { FC, useState } from "react"

interface RegisterForm {
    amount: number;
    note:string|null;

}

const SenderForm: FC<{ displaySize: boolean }> = ({ displaySize }, props) => {
    let [note, setNote] = React.useState("")
    let [amount, setAmount] = React.useState(0)
    let [invoice, setInvoice] = React.useState([0, ""])

    const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));

    

    // const onSubmit = async (values: any) => {
    //     await sleep(300);
    //     window.alert(JSON.stringify(values, 0, 1));
    // };
    

    let AmountError = amount === 0
    let handleAmountChange = (e: any) => setAmount(e.target.value)

    const setTransfer = (e:any) => {
        setInvoice([e.amount, e.note])
        console.log(invoice)
    }

    let handlerNoteChange = (e: any) => {
        const inputNote = e.target.value
        setNote(inputNote)
    }
    

    return (
        <Box bgColor="white" padding={3} borderRadius="3xl">
            {/* onSubmit={onSubmit} */}
            <FormControl className="myForm" >
                <FormLabel fontSize="3xl">Payment Detail</FormLabel>
                <FormControl p={4}>
                    <FormLabel>Amount</FormLabel>
                    <NumberInput name="amountInput" max={100000} min={0} clampValueOnBlur={true} >
                        <NumberInputField onChange={handleAmountChange} value={amount} placeholder="0"/>
                    </NumberInput>
                    {!AmountError ? (
                        <FormHelperText color="grey">* Start at 1 but not above 100,000</FormHelperText>
                    ) : (
                        <FormHelperText color="red">* Must have at least 1 Bath</FormHelperText>
                    )}

                    <FormLabel paddingTop={5}>Note</FormLabel>
                    <Textarea noOfLines={3} resize={"none"} maxLength={300} value={note} onChange={handlerNoteChange} />
                    <FormHelperText color="grey">* Limit 300 characters.</FormHelperText>
                        
                    <FormControl id="confirmation">
                        <Center float={displaySize ? "right" : "none"}>
                            <Button
                                style={{ margin: 20 }}
                                type="submit"
                                variant="solid"
                                bg="#E67F45"
                                color="white"
                                w="100%"
                                _hover={{ bg: "green.500" }}
                            >
                                Confirm
                            </Button>
                        </Center>
                    </FormControl>
                </FormControl>
            </FormControl>
        </Box>
    )
}

export default SenderForm
