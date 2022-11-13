import { Avatar, Flex, HStack, Box, Text, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'
import React, { FC } from 'react'
import { FaBan, FaExclamationCircle, FaHandMiddleFinger, FaUser, FaUserShield, FaUserLock } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'


const UserList: FC<{ userProfile: string; userRole?: string; userName: string }> = ({ userProfile, userName, userRole }) => {
    return (

        <Box borderRadius="md" backgroundColor="white" minWidth={"265px"} maxWidth={"700px"} width="100%">
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
                            <Text fontSize="sm">{userRole}</Text>
                        </div>
                    </HStack>
                    <Popover>
                        <PopoverTrigger>
                            <Box _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                                <BsThreeDots fontSize={"25px"} />
                            </Box>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent width="180px">
                                <PopoverHeader><Text as="b">Manage</Text></PopoverHeader>
                                <PopoverBody>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaBan />
                                        <Text>Ban</Text>
                                    </Box>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaExclamationCircle />
                                        <Text>Report</Text>
                                    </Box>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaHandMiddleFinger />
                                        <Text>Kick</Text>
                                    </Box>
                                </PopoverBody>
                                <PopoverBody><Text as="b">Set Role</Text></PopoverBody>
                                <PopoverFooter>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaUserLock />
                                        <Text>Set to admin</Text>
                                    </Box>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaUserShield />
                                        <Text>Set to moderator</Text>
                                    </Box>
                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                        <FaUser />
                                        <Text>Set to member</Text>
                                    </Box>
                                </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                    </Popover>

                </Flex>
            </Box>
        </Box>
    )
}

export default UserList