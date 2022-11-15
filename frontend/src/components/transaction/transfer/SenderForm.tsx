import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Input, NumberInput, NumberInputField, Text, Textarea } from "@chakra-ui/react"
import React, { FC, useState } from "react"

const SenderForm: FC<{ displaySize: boolean }> = ({ displaySize }, props) => {
    let [note, setNote] = React.useState("")
    let [amount, setAmount] = React.useState(0)
    let [invoice, setInvoice] = React.useState([0, ""])
    const AmountError = amount === 0
    const handleAmountChange = (e: any) => setAmount(e.target.value)

    let setTransfer = (e: any) => {
        e.preventDefault()
        setAmount(amount)
        setNote(note)
        console.log(amount)
    }

    let handlerNoteChange = (e: any) => {
        const inputNote = e.target.value
        setNote(inputNote)
    }

    return (
        <Box bgColor="white" padding={3} borderRadius="3xl">
            <FormControl onSubmit={setTransfer}>
                <FormLabel fontSize="3xl">Payment Detail</FormLabel>
                <FormControl p={4}>
                    <FormLabel>Amount</FormLabel>
                    <NumberInput>
                        <NumberInputField maxLength={5} value={amount} onChange={handleAmountChange} />
                    </NumberInput>
                    {!AmountError ? (
                        <FormHelperText color="grey">* Start at 1 not above 100,000</FormHelperText>
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
