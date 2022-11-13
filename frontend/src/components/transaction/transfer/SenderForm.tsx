import { Box, Button, Center, FormControl, FormHelperText, FormLabel, Input, Text, Textarea } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { Form } from "react-router-dom"

const SenderForm: FC<{ displaySize: boolean }> = ({ displaySize }, props) => {
    let [note, setNote] = React.useState("")
    let [amount, setAmount] = React.useState(0)

    const AmountError = () => {
        amount >= 10
    }

    let setTransfer = (e: React.FormEvent) => {
        e.preventDefault()
        setAmount(amount)
        setNote(note)
        console.log(amount, note)
    }

    let handlerNoteChange = (e: any) => {
        const inputNote = e.target.value
        setNote(inputNote)
    }

    let handlerAmountChange = (e: any) => {
        const inputAmount = e.target.value
        AmountError()
        setAmount(inputAmount)
    }

    return (
        <Box bgColor="white" padding={3} borderRadius="3xl">
            <Form onSubmit={setTransfer}>
                <FormLabel fontSize="3xl">Payment Detail</FormLabel>
                <FormControl p={4}>
                    <FormLabel>Amount</FormLabel>
                    <Input type="number" value={amount} onChange={handlerAmountChange} />
                    {!AmountError ? (
                        <FormHelperText color="red">* Must have at least 10 Bath</FormHelperText>
                    ) : (
                        <FormHelperText color="grey">* Limit at 10,000</FormHelperText>
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
            </Form>
        </Box>
    )
}

export default SenderForm
