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
    useToast,
} from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import { FaBan, FaExclamationCircle, FaHandMiddleFinger, FaUser, FaUserShield, FaUserLock } from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import API from "src/function/API"

const UserList: FC<{
    avatar?: string;
    firstName?: string;
    lastName?: string;
    majorId?: string;
    joined?: Date;
    role?: string;
    userId?: string;
    isHigherPriority?: boolean;
    checkRole?: string;
    communityId?: string;
    isOwner?: boolean;

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
    checkRole,
    userId,
    isHigherPriority,
    communityId,
    isOwner,

    userProfile,
    userName,
    userRole }) => {
        // const Role = str => {
        //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();};
        // let Role = (): string => userRole.charAt(0).toUpperCase() + userRole.slice(1)
        const joinedDate = new Date(joined || "")
        const joinedDateStr = `${joinedDate.getDate()}/${joinedDate.getMonth() + 1}/${joinedDate.getFullYear()}`
        const fullName = `${firstName?.charAt(0)}${firstName?.slice(1).toLocaleLowerCase()} ${lastName?.charAt(0)}${lastName?.slice(1).toLocaleLowerCase()}`
        // const [isRole, setIsRole] = useState(0)
        // if (role == "ADMIN") {
        //     setIsRole(3)
        // } else if (role == "CO_ADMIN") {
        //     setIsRole(2)
        // } else if (role == "MEMBER") {
        //     setIsRole(1)
        // } else {
        //     setIsRole(4)//Owner
        // }
        const toast = useToast()
        const kickUser = async () => {
            const res = await API.delete("/group/deleteCommunityMember", {
                data: {
                    communityId: communityId,
                    userId: userId
                }
            })
            if (res.status == 200) {
                console.log(res.data)
                toast({
                    title: "Kick user successfully",
                    status: "success",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            } else {
                toast({
                    title: "Kick user failed",
                    status: "error",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
            }
        }

        const unbanUser = async () => {
            const res = await API.delete("/group/unbanMember", {
                data: {
                    communityId: communityId,
                    userId: userId
                }
            })

            if (res.status == 200) {
                console.log(res.data)
                toast({
                    title: "Unban user success",
                    status: "success",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
                setTimeout(() => {
                    document.location.reload()
                }, 2000)

            } else {
                toast({
                    title: "Unban user failed",
                    status: "error",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
            }
        }

        const banUser = async () => {
            const res = await API.post("/group/banMember", {
                communityId: communityId,
                userId: userId
            })
            if (res.status == 200) {
                toast({
                    title: "Ban user successfully",
                    status: "success",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
                setTimeout(() => {
                    document.location.reload()
                }, 2000)

            } else {
                toast({
                    title: "Ban user failed",
                    status: "error",
                    duration: 5000,
                    position: 'top',
                    // isClosable: true,
                })
            }
        }


        const setRoles = (setRole: string) => {
            let roleId = ''
            setRole == "ADMIN" ? roleId = 'clavjra540000v32wccz4v12g' :
                setRole == "CO_ADMIN" ? roleId = 'clavjrudj0002v32welorer2g' :
                    setRole == "MEMBER" ? roleId = 'clavjs04i0004v32wxmjn3kvk' : ""

            API.post("/group/setRole", {
                userId: userId,
                communityId: communityId,
                roleId: roleId,
            }).then((res) => {
                toast({
                    title: "Set role successfully",
                    description: `${firstName} has been given the ${setRole} role. `,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                })

            }).catch((err) => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: 'top',
                })
            })
            // document.location.reload()

            setTimeout(() => {
                document.location.reload()
            }, 2000)

        }
        useEffect(() => {
            console.log("userRole", role)
            console.log("checkRole", checkRole)
        }, [])
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
                <Popover >
                    <PopoverTrigger >
                        <Box display={isOwner ? "none" : 'block'} _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                            <BsThreeDots fontSize={"25px"} />
                        </Box>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent width="180px">
                            <PopoverHeader>
                                <Text as="b">Manage</Text>
                            </PopoverHeader>
                            <PopoverBody >
                                <Box
                                    onClick={banUser}
                                    display={checkRole === 'ADMIN' && (role === 'CO_ADMIN' || role === 'MEMBER') ||
                                        checkRole === undefined &&
                                        (role !== 'BANNED')
                                        ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    alignItems={"center"}>
                                    <FaBan />
                                    <Text>Ban</Text>
                                </Box>
                                <Box
                                    onClick={unbanUser}
                                    display={checkRole === undefined && role === 'BANNED' ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    alignItems={"center"}>
                                    <FaBan />
                                    <Text>Unban</Text>
                                </Box>
                                <Box
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    display={role !== 'BANNED' ? 'flex' : 'none'}
                                    alignItems={"center"}>
                                    <FaExclamationCircle />
                                    <Text>Report</Text>
                                </Box>
                                <Box
                                    onClick={kickUser}
                                    display={checkRole === 'ADMIN' && (role === 'CO_ADMIN' || role === 'MEMBER') ||
                                        checkRole === undefined ? 'flex' : 'none'}
                                    // display={
                                    //     (role === "ADMIN" || role === "CO_ADMIN" || role === "MEMBER" && checkRole === undefined) ||
                                    //         (role === "CO_ADMIN" || role === "MEMBER" && checkRole === "ADMIN")
                                    //         ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    alignItems={"center"}>
                                    <FaHandMiddleFinger />
                                    <Text>Kick</Text>
                                </Box>
                            </PopoverBody>
                            <PopoverBody
                                display={
                                    (checkRole === undefined && role !== 'BANNED') || (checkRole === "ADMIN" && role !== 'ADMIN')
                                        ? 'block' : 'none'}
                            >
                                <Text

                                    as="b">Set Role</Text>
                            </PopoverBody>
                            <PopoverFooter
                                display={
                                    (checkRole === undefined && role !== 'BANNED') || (checkRole === "ADMIN" && role !== 'ADMIN') ? 'block' : 'none'}
                            >
                                <Box
                                    // onClick={setRoles('ADMIN')}
                                    onClick={() => setRoles('ADMIN')}
                                    display={checkRole === undefined && role !== 'ADMIN' ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    // display="flex"
                                    alignItems={"center"}>
                                    <FaUserLock />
                                    <Text>Set to admin</Text>
                                </Box>
                                <Box
                                    onClick={() => setRoles('CO_ADMIN')}
                                    display={(checkRole === 'ADMIN' && role !== 'CO_ADMIN' || role === 'ADMIN')
                                        || (checkRole === undefined && role !== 'CO_ADMIN')
                                        ? 'flex' : 'none'}
                                    // display={(checkRole === 'ADMIN' && role === 'MEMBER' || role === 'CO_ADMIN') ||
                                    //     (checkRole === 'ADMIN' && role === 'CO_ADMIN') ||
                                    //     checkRole === undefined ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    // display="flex"
                                    alignItems={"center"}>
                                    <FaUserShield />
                                    <Text>Set to moderator</Text>
                                </Box>
                                <Box
                                    onClick={() => setRoles('MEMBER')}
                                    display={(checkRole === 'ADMIN' && role !== 'MEMBER') || (checkRole === undefined && role !== 'MEMBER') ? 'flex' : 'none'}
                                    // display={(checkRole === 'ADMIN' && role === 'MEMBER' || role === 'CO_ADMIN') || checkRole === undefined ? 'flex' : 'none'}
                                    gap={1}
                                    _hover={{ cursor: "pointer" }}
                                    // display="flex"
                                    alignItems={"center"}>
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
