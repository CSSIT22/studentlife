import {
    Avatar,
    Flex,
    HStack,
    Box,
    Text,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Badge,
    Button,
    Stack,
} from "@chakra-ui/react"
import React, { FC } from "react"
import { FaBan, FaExclamationCircle, FaHandMiddleFinger, FaUser, FaUserShield, FaUserLock } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"

const UserList: FC<{
    avatar?: string;
    firstName?: string;
    lastName?: string;
    majorId?: string;
    joined?: Date;
    role?: string;
    userId?: string;
    isHigherPriority?: boolean;

    userProfile?: string;
    userRole?: string;
    userName?: string
}> = ({
    firstName,
    lastName,
    joined,
    majorId,
    avatar,
    role,
    userId,
    isHigherPriority,

    userProfile,
    userName,
    userRole }) => {
        // const Role = str => {
        //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();};
        // let Role = (): string => userRole.charAt(0).toUpperCase() + userRole.slice(1)
        const joinedDate = new Date(joined || "")
        const joinedDateStr = `${joinedDate.getDate()}/${joinedDate.getMonth() + 1}/${joinedDate.getFullYear()}`
        const fullName = `${firstName?.charAt(0)}${firstName?.slice(1).toLocaleLowerCase()} ${lastName?.charAt(0)}${lastName?.slice(1).toLocaleLowerCase()}`
        return (
            <HStack
                minWidth={"265px"}
                maxWidth={"700px"}
                p={2}
                borderRadius="md"
                width='full'
                bg='white'
                justifyContent='space-between'
            >
                <HStack>
                    <Avatar
                        src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + userId}
                        name={fullName} />
                    <Box ml='3'>
                        <Text fontWeight='bold' fontSize='md'>
                            {fullName}
                            <Badge ml='1' colorScheme='green'>
                                {role}
                            </Badge>
                        </Text>
                        <Text fontSize='sm'>{majorId}</Text>
                    </Box>
                </HStack>
                <Popover>
                    <PopoverTrigger>
                        <Box _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                            <BsThreeDots fontSize={"25px"} />
                        </Box>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent width="180px">
                            <PopoverHeader>
                                <Text as="b">Manage</Text>
                            </PopoverHeader>
                            <PopoverBody >
                                <Box display={isHigherPriority ? 'flex' : 'none'} gap={1} _hover={{ cursor: "pointer" }} alignItems={"center"}>
                                    <FaBan />
                                    <Text>Ban</Text>
                                </Box>
                                <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                    <FaExclamationCircle />
                                    <Text>Report</Text>
                                </Box>
                                <Box display={isHigherPriority ? 'flex' : 'none'} gap={1} _hover={{ cursor: "pointer" }} alignItems={"center"}>
                                    <FaHandMiddleFinger />
                                    <Text>Kick</Text>
                                </Box>
                            </PopoverBody>
                            <PopoverBody display={isHigherPriority ? 'block' : 'none'}>
                                <Text as="b">Set Role</Text>
                            </PopoverBody>
                            <PopoverFooter display={isHigherPriority ? 'block' : 'none'}>
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
            </HStack >

        )
    }

export default UserList
