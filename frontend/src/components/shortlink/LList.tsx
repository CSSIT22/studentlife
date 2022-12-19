import { Flex, HStack, Box, Text, Button, useBoolean } from "@chakra-ui/react"
import React, { FC, useContext } from "react"
import { authContext } from "src/context/AuthContext"

const LList: FC<{ shortenLink: string; handleSelect?: (shortenLink: string, slId: string) => Promise<void>, slId: string }> = ({
    shortenLink,
    slId,
    handleSelect
}) => {

    const user = useContext(authContext)
    const [isSelect, setIsSelect] = React.useState(true)
    const [isLoading, { off, on }] = useBoolean(false)
    const handleOnSelect = () => {
        setIsSelect(!isSelect)
        if (handleSelect) {
            on()
            handleSelect(shortenLink, slId).finally(off)

        }
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
                                    {/* https://ss.modlifes.me/ */}
                                    https://ss.modlifes.me/{shortenLink}
                                    </Text>
                                </Box>
                            </div>
                        </HStack>
                        <HStack width={"6rem"} justify={{ base: "flex-end" }}>
                            <Button isLoading={isLoading} _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant="solid">
                                DELETE
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default LList
