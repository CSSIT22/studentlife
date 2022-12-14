import { Flex, HStack, Box, Text, Button, useBoolean } from "@chakra-ui/react"
import React, { FC, useContext } from "react"
import { authContext } from "src/context/AuthContext"

const SList: FC<{ fullLink: string; handleSelect?: (shortenLink: string, slId: string) => Promise<void>, slId: string }> = ({
    fullLink,
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
            handleSelect(fullLink, slId).finally(off)
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
                borderColor={{ md: "", base: "green" }}
                marginTop={"3"}
            >
                 <Box p={2} borderRadius="md">
                    <Flex direction={"row"} gap={2} justify={"flex-start"} ml={2} width={"10rem"}>
                        <HStack gap={2}>
                            <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                    <Text as="b" fontSize={{base:"xx-small" ,md:"lg"}} width={{base:"170px" ,  md:"23rem"}} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>
                                   {fullLink}
                                    </Text>
                                </Box>
                            </div>
                        </HStack>
                        <HStack width={{md:"6rem",base:"4rem"}} justify={{ base: "flex-end" }}>
                            <Button isLoading={isLoading} _hover={{ cursor: "pointer" }} fontSize="xx-small" onClick={handleOnSelect} colorScheme="red" variant="solid">
                                DELETE
                            </Button>
                        </HStack>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}
export default SList
