import { Avatar, Flex, HStack, Box, Text, Button } from "@chakra-ui/react"
import React, { FC } from "react"

const UList: FC<{ isSelected?: boolean; userProfile: string; userName: string; lastName: string }> = ({
    userProfile,
    userName,
    isSelected,
    lastName,
}) => {
    const [isSelect, setIsSelect] = React.useState(true)
    const handleOnSelect = () => {
        setIsSelect(!isSelect)
    }
    return (
        <Box
            borderRadius="md"
            backgroundColor="white"
            minWidth={"265px"}
            maxWidth={"700px"}
            width="100%"
            boxShadow={"md"}
            border="1px"
            borderColor={{ md: "", base: "gray.200" }}
        >
            <Box p={2} borderRadius="md">
                <Flex direction={"row"} gap={2} justify={"space-between"} mr={2} ml={2}>
                    <HStack gap={2}>
                        {/* {people.map((person) => (
                        <div key={person.id}> */}
                        <Avatar boxSize="55px"  src='https://bit.ly/broken-link' />
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Text as="b" fontSize="sm">
                                    {userName}
                                </Text>
                                <Text as="b" fontSize="sm">
                                    {lastName}
                                </Text>
                            </Box>
                            {/* <Text fontSize="sm">{userRole}</Text> */}
                        </div>
                        {/* </div>
                    ))} */}
                    </HStack>
                    <HStack width={"6rem"} justify={{ base: "flex-end" }}>
                        {isSelect ? (
                            <Button _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant="solid">
                                Add
                            </Button>
                        ) : (
                            <Button _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant="outline">
                                Add
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </Box>
        </Box>
    )
}

export default UList
