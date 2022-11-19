import { Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react"
import React, { useState, FC } from "react"

const DatingCreateDescription: FC<{
    getDescription: any
}> = ({ getDescription }) => {
    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)
    //Validate the Description
    const isTooLongDescription = description.length >= 250
    return (
        <Center>
            {/* Description input & error control */}
            <FormControl isInvalid={isTooLongDescription} pt="8px">
                <FormLabel color={"white"}>Poll description</FormLabel>
                <Textarea
                    borderRadius={"6px"}
                    id="description"
                    value={description}
                    onChange={(e) => {
                        handleInputDescriptionChange(e)
                        getDescription(description)
                    }}
                    backgroundColor="white"
                    placeholder="Description"
                    size="sm"
                    maxLength={250}
                    errorBorderColor="red"
                    isRequired
                    shadow="lg"
                    borderColor="black"
                />
                {!isTooLongDescription ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormErrorMessage color="orange">The maximum description length is 250 characters. You cannot type more.</FormErrorMessage>
                )}
            </FormControl>
        </Center>
    )
}

export default DatingCreateDescription
