import { Flex, HStack, Box, Text, Button } from "@chakra-ui/react"
import React, { FC, useContext } from "react"
import { useNavigate } from "react-router"
import { authContext } from "src/context/AuthContext"

const LList: FC<{ shortenLink: string }> = ({
    shortenLink
}) => {
    const user = useContext(authContext)
    const [isSelect, setIsSelect] = React.useState(true)
    const handleOnSelect = () => {
        setIsSelect(!isSelect)
    }
    const navigate = useNavigate()
    const shortlink = () => {
        navigate("/link/shortlink")
    }
    return (

        <>
            <Box
                borderRadius="md"
                backgroundColor="white"
                minWidth={"265px"}
                maxWidth={"800px"}
                width="100%"
                boxShadow={"md"}
                border="1px"
                borderColor={{ md: "", base: "gray.200" }}
                marginTop={"3"}
            >
                <Box p={2} borderRadius="md" >
                    <Flex direction={"row"} gap={2} justify={"space-between"} mr={2} ml={2}>
                        <HStack gap={2}>
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Text as="b" fontSize="sm">
                                        http://localhost:8000/shortlink/redirect?shorten={shortenLink}
                                    </Text>
                                </Box>
                            </div>
                        </HStack>
                        <HStack width={"6rem"} justify={{ base: "flex-end" }}>
                            {isSelect ? (
                                <Button _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant="solid">
                                    DELETE
                                </Button>
                            ) : (
                                <Button _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant="outline">
                                    DELETE
                                </Button>
                            )}

                        </HStack>

                    </Flex>
                </Box>

            </Box>

        </>


    )
}

export default LList
