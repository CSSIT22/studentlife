import { Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Textarea } from "@chakra-ui/react"
import React, { useState, FC } from "react"

const DatingCreateDescription: FC<{
    getDescription: any
}> = ({ getDescription }) => {
    const [description, setDescriptionInput] = useState("")
    const handleInputDescriptionChange = (e: any) => setDescriptionInput(e.target.value)
    //Validate the Description
    const isTooLongDescription = description.length > 250
    return (
        <Center>
            {/* Description input & error control */}
            <FormControl isInvalid={false} pt="8px">
                <FormLabel color={"white"}>Poll description</FormLabel>
                <Textarea
                    borderRadius={"6px"}
                    id="description"
                    value={description}
                    onChange={(e) => {
                        handleInputDescriptionChange(e)
                        getDescription(e.target.value)
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
                {!(description.length == 250) ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormHelperText color="orange">The maximum description length is 250 characters. You cannot type more.</FormHelperText>
                )}
            </FormControl>
        </Center>
    )
}

export default DatingCreateDescription
