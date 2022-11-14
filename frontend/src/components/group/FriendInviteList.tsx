import { Avatar, Flex, HStack, Box, Text, Button, } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FiPlusSquare, FiMinusSquare } from "react-icons/fi"
const FriendInviteList: FC<{ isSelected?: boolean; userProfile: string; userRole?: string; userName: string }> = ({ userProfile, userName, userRole, isSelected }) => {
    const [isSelect, setIsSelect] = React.useState(false)
    const handleOnSelect = () => {
        setIsSelect(!isSelect)
    }
    return (

        <Box borderRadius="md" backgroundColor="white" minWidth={"265px"} maxWidth={"700px"} width="100%" boxShadow={'md'} border='1px'
            borderColor={{ md: '', base: 'gray.200' }}>
            <Box p={2} borderRadius="md">
                <Flex direction={"row"} gap={2} justify={"space-between"} mr={2} ml={2}>
                    <HStack gap={2}>
                        <Avatar boxSize="55px" src={userProfile} name={userName} />
                        <div>
                            <Box display="flex" alignItems="center" gap={1}>

                                <Text as="b" fontSize="sm">
                                    {userName}
                                </Text>
                            </Box>
                            {/* <Text fontSize="sm">{userRole}</Text> */}
                        </div>
                    </HStack>
                    <HStack width={"60px"} justify={{ base: "flex-end" }}>{isSelect ? <Box _hover={{ cursor: "pointer" }} onClick={handleOnSelect} ><FiMinusSquare color={"gray"} size={"40px"} /></Box> : <Box _hover={{ cursor: "pointer" }} onClick={handleOnSelect} ><FiPlusSquare color={"gray"} size={"40px"} /></Box>}</HStack>
                </Flex>
            </Box>
        </Box>
    )
}

export default FriendInviteList