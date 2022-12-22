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
                width={{md:"100%", base: "80%"}}
                boxShadow={"md"}
                border="1px"
                borderColor={{ md: "", base: "orange" }}
                marginTop={"3"}
            >
                <Box p={2} borderRadius="md">
                    <Flex direction={"row"} gap={2} justify={"flex-start"} ml={2} width={"10rem"}>
                        <HStack gap={2}>
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <Text as="b" fontSize={{base:"x-small" ,md:"lg"}} width={{base:"170px" ,  md:"23rem"}} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>
                                    {/* https://ss.modlifes.me/ */}
                                    https://ss.modlifes.me/{shortenLink}
                                    
                                    </Text>
                                </Box>
                            </div>
                        </HStack>
                        <HStack width={{md:"6rem",base:"4rem"}} justify={{ base: "flex-end" }}>
                            <Button isLoading={isLoading} _hover={{ cursor: "pointer" }} fontSize="xx-small" onClick={handleOnSelect} colorScheme="orange" variant="solid">
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
