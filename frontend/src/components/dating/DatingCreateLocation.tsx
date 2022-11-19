import { Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Select } from "@chakra-ui/react"
import React, { useState, FC } from "react"

const DatingCreateLocation: FC<{
    getLocation: any
}> = ({ getLocation }) => {
    const [location, setLocationInput] = useState("")
    const handleInputLocationChange = (e: any) => setLocationInput(e.target.value)

    const [locationD, setLocationInputD] = useState("")
    // const handleInputLocationChangeD = (e: any) => setLocationInputD(e.target.value)

    //Restaurant name
    const res = ["Somchai Hotel", "Somsri Resturant", "Sompong Muu Ka Tra"]

    const isTooLongLocation = location.length >= 100
    const isTooShortLocation = location.length < 5
    let isValidLocation = !isTooLongLocation && !isTooShortLocation // Use for check all Location validate
    return (
        <FormControl isInvalid={!isValidLocation} isRequired>
            {/* Location input & error control */}
            <FormLabel>Location</FormLabel>
            <Flex>
                <Input
                    borderRadius={"6px"}
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => {
                        setLocationInputD("")
                        handleInputLocationChange(e)
                        getLocation(location)
                    }}
                    backgroundColor="white"
                    placeholder="Location"
                    size="sm"
                    borderColor="black"
                    maxLength={100}
                    errorBorderColor="red"
                    isRequired
                    shadow="lg"
                />
                {/* IMPORTANT!!! */}
                {/* If that user haven't use the restaurant function we should block this feature*/}
                <Select
                    borderRadius={"6px"}
                    placeholder="Pick from your favorites."
                    size="sm"
                    bgColor="white"
                    pl="20px"
                    borderColor="black"
                    errorBorderColor="red"
                    value={locationD}
                    shadow="lg"
                    onChange={(e: any) => {
                        handleInputLocationChange(e)
                        getLocation(location)
                    }}
                >
                    {res.map((value) => {
                        return <option key={value}>{value}</option>
                    })}
                </Select>
            </Flex>
            {!isTooShortLocation ? (
                <FormHelperText color="gray">You have selected {location} as a location.</FormHelperText>
            ) : (
                <FormErrorMessage color="red">The minimum header length is 5 characters. Type something.</FormErrorMessage>
            )}
            {!isTooLongLocation ? (
                <FormHelperText></FormHelperText>
            ) : (
                <FormErrorMessage color="orange">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
            )}
        </FormControl>
    )
}

export default DatingCreateLocation
