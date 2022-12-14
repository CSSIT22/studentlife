import { Avatar, Flex, HStack, Box, Text, Button } from "@chakra-ui/react"
import React, { FC, useContext } from "react"
import { authContext } from "src/context/AuthContext"

const UList: FC<{ id: string, userProfile: string; userName: string; lastName: string, handleSelect?: (id: { id: string; userName: string; lastName: string; }) => void; isSelected: boolean }> = ({
    id,
    userProfile,
    userName,
    lastName,
    handleSelect,
    isSelected = false
}) => {
    const [isSelect, setIsSelect] = React.useState(isSelected)
    const handleOnSelect = () => {
        setIsSelect(!isSelect)
        if (handleSelect)
            handleSelect({ id: id, userName: userName, lastName: lastName })
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
                        <Avatar boxSize="55px" src={userProfile} name={userName} />
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Text as="b" fontSize="sm">
                                    {userName}
                                </Text>
                                <Text as="b" fontSize="sm" width={"100px"} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>
                                    {lastName}
                                </Text>
                            </Box>
                            {/* <Text fontSize="sm">{userRole}</Text> */}
                        </div>
                        {/* </div>
                    ))} */}

                    </HStack>
                    <HStack width={"6rem"} justify={{ base: "flex-end" }}>
                        <Button _hover={{ cursor: "pointer" }} onClick={handleOnSelect} colorScheme="orange" variant={isSelect ? "solid" : "outline"}>
                            {isSelect ? "Added" : "Add"}
                        </Button>
                    </HStack>

                </Flex>
            </Box>
        </Box>
    )
}

export default UList
