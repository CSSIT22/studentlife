import { Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from "@chakra-ui/react"
import { useState, FC } from "react"

const DatingCreateHeader: FC<{
    getHeader: any
}> = ({ getHeader }) => {
    const [header, setHeaderInput] = useState("")
    const handleInputHeaderChange = (e: any) => setHeaderInput(e.target.value)
    const isTooLongHeader = header.length >= 100
    const isTooShortHeader = header.length < 10
    let isValidHeader = isTooLongHeader && isTooShortHeader // Use for check all Header validate
    return (
        <Center>
            {/* Header input & error control */}
            <FormControl isInvalid={!isValidHeader} isRequired>
                <FormLabel>Poll header</FormLabel>
                <Input
                    borderRadius={"6px"}
                    id="header"
                    type="text"
                    value={header}
                    onChange={(e) => {
                        handleInputHeaderChange(e)
                        getHeader(e.target.value)
                    }}
                    backgroundColor="white"
                    placeholder="Your poll header"
                    size="sm"
                    borderColor="black"
                    maxLength={100}
                    errorBorderColor="red"
                    isRequired
                    shadow="lg"
                />
                {!isTooShortHeader ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormErrorMessage color="red">The minimum header length is 10 characters. Type something</FormErrorMessage>
                )}
                {!isTooLongHeader ? (
                    <FormHelperText></FormHelperText>
                ) : (
                    <FormErrorMessage color="orange">The maximum header length is 100 characters. You cannot type more.</FormErrorMessage>
                )}
            </FormControl>
        </Center>
    )
}

export default DatingCreateHeader
