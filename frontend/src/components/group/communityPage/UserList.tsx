import { HStack, Avatar, Badge, Box, Text, Button, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider, useToast, Flex } from '@chakra-ui/react'
import React, { FC, useEffect } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaBan } from 'react-icons/fa'
import { IoPersonRemove } from 'react-icons/io5'
import { TiWarning } from 'react-icons/ti'
import API from 'src/function/API'

const UserList: FC<{
    communityId?: string
    userId?: string//member id
    checkId?: string//user id
    name?: string
    role?: string //member role (admin, co_admin member)
    checkRole?: string //user role (owner, admin, co_admin, member)
    majorId?: string
    image?: string
    data?: any
    isBlacklisted?: boolean
    isPending?: boolean
    fetchMember?: any
    joined?: Date
}> = ({ communityId, userId, name, role, checkRole, checkId, majorId, image, data, isBlacklisted, isPending, joined, fetchMember }) => {

    const toast = useToast()
    const sendAPI = async (
        title: string,
        desc: string,
        url: string,
        method: string,
        isCommunityId?: boolean,
        isUserId?: boolean,
        roleId?: string
    ) => {
        try {
            if (method === "POST") {
                await API.post(url, {
                    communityId: isCommunityId ? communityId : null,
                    userId: isUserId ? userId : null,
                    roleId: roleId ? roleId : null
                })
                fetchMember()
            } else if (method === "DELETE") {
                await API.delete(url, {
                    data: {
                        communityId: isCommunityId ? communityId : null,
                        userId: isUserId ? userId : null
                    }
                })
                fetchMember()
            }
            toast({
                title: title,
                description: desc,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
            // fetchCommunity()
        }
        catch (err) {
            toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        }
    }
    const onKick = () => {
        sendAPI(
            "Kick",
            "You have kicked user",
            `/group/deleteCommunityMember`,
            "DELETE",
            true,
            true
        )
    }
    const onBan = () => {
        sendAPI(
            "Ban",
            "You have banned user",
            "/group/banMember",
            "POST",
            true,
            true
        )
    }
    const onUnban = () => {
        sendAPI(
            "Unban",
            "You have unbanned user",
            "/group/unbanMember",
            "DELETE",
            true,
            true
        )
    }
    const onSetRoles = (role: string) => {
        let roleId = ""
        role == "ADMIN" ? roleId = 'clavjra540000v32wccz4v12g' :
            role == "CO_ADMIN" ? roleId = 'clavjrudj0002v32welorer2g' :
                role == "MEMBER" ? roleId = 'clavjs04i0004v32wxmjn3kvk' : ""
        sendAPI(
            `Set to ${role}`,
            `You have set ${name} to ${role}`,
            "/group/setRole",
            "POST",
            true,
            true,
            roleId
        )
    }
    const onAccept = () => {
        sendAPI(
            "Accept",
            "You have accepted user",
            "/group/acceptRequest",
            "POST",
            true,
            true
        )
    }
    const onDecline = () => {
        sendAPI(
            "Decline",
            "You have declined user",
            "/group/declineRequest",
            "DELETE",
            true,
            true
        )
    }

    const threeDotsBtn = [
        //Manage
        [
            
            {
                //Ban -> display only the group's owner and admin
                //Only owner and admin can ban
                name: "Ban",
                icon: <FaBan fontSize='20px' />,
                conditions: checkRole === 'ADMIN'
                    && (role === 'CO_ADMIN' || role === 'MEMBER')
                    || checkRole === 'OWNER'
                    && (role !== 'BANNED'),
                onClick: onBan
            },
            {
                //Kick -> display only the group's owner and admin
                //Only owner and admin can kick
                name: "Kick",
                icon: <IoPersonRemove fontSize='20px' />,
                conditions: checkRole === 'ADMIN'
                    && (role === 'CO_ADMIN' || role === 'MEMBER')
                    || checkRole === 'OWNER',
                onClick: onKick


            }],
        //Set role
        [
            {
                //Set to admin -> display only the group's owner
                //Only owner can set to admin
                name: "Set to admin",
                conditions: checkRole === "OWNER" && role !== 'ADMIN',
                onClick: () => onSetRoles("ADMIN")
            },
            {
                //Set to co-admin -> display only the group's owner and admin
                //Only owner and admin can set to co-admin
                name: "Set to co-admin",
                conditions:
                    (checkRole === 'ADMIN' && role !== 'CO_ADMIN' || role === 'ADMIN')
                    || (checkRole === "OWNER" && role !== 'CO_ADMIN'),
                onClick: () => onSetRoles("CO_ADMIN")
            },
            {
                //Set to member -> display only the group's owner and admin
                //Only owner and admin can set to member
                name: "Set to member",
                conditions:
                    (checkRole === 'ADMIN' && role !== 'MEMBER')
                    || (checkRole === "OWNER" && role !== 'MEMBER'),
                onClick: () => onSetRoles("MEMBER")
            }
        ],
    ]

    const joinedDate = new Date(joined || "")
    //joined the community at 10:12:22 on January 15, 2022.
    const joinedDateStr = `${joinedDate.toLocaleTimeString()} on ${joinedDate.toLocaleDateString()}`
    return (
        <Flex
            minWidth={"265px"}
            maxWidth={"700px"}
            py={2}
            px={{ base: 3, md: 5 }}
            borderRadius="md"
            width='full'
            bg='white'
            justifyContent='space-between'
            color='#4a5568'
            direction={isPending ? { base: 'column', md: 'row' } : 'row'}
            gap='2'
            align='center'
        >
            <HStack>
                <Avatar
                    src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + userId}
                    name='test' />
                <Box ml='3'>
                    <Text fontWeight='bold' fontSize='md'>
                        {name}
                        <Badge ml='1' colorScheme='green'>
                            {isPending ? null : role}
                        </Badge>
                    </Text>
                    <Text fontSize='sm'>{isPending ? `Joined community at ${joinedDateStr}` : majorId}</Text>
                </Box>
            </HStack>
            {
                checkId != userId && !isBlacklisted && !isPending ?
                    <Box>
                        <Menu>
                            <MenuButton>
                            {                    
                                checkRole === 'OWNER' || checkRole === 'ADMIN'||checkRole === 'CO-ADMIN' ? <BsThreeDots fontSize='25px' />: null
                            }
                            </MenuButton>
                            <MenuList>
                                {
                                    //Manage
                                    threeDotsBtn[0].map((btn: any) => {
                                        return btn.conditions ?
                                            <MenuItem
                                                icon={btn.icon}
                                                key={btn.name}
                                                onClick={btn.onClick}
                                            >
                                                {btn.name}
                                            </MenuItem>
                                            : null
                                    })}
                                {
                                    checkRole === 'OWNER' || checkRole === 'ADMIN' ? <MenuDivider /> : null
                                }

                                {
                                    //Set role
                                    threeDotsBtn[1].map((btn: any) => {
                                        return btn.conditions ?
                                            <MenuItem
                                                key={btn.name}
                                                onClick={btn.onClick}
                                            >
                                                {btn.name}
                                            </MenuItem>
                                            : null
                                    })
                                }
                            </MenuList>
                        </Menu>
                    </Box>
                    : null}
            {
                //Unban
                isBlacklisted ?
                    <Button
                        colorScheme='orange'
                        size='sm'
                        onClick={onUnban}
                    >
                        Unban
                    </Button>
                    : null
            }
            {
                //Accept request
                isPending ?
                    <HStack alignSelf='flex-end'>
                        <Button
                            colorScheme='green'
                            size='sm'
                            onClick={onAccept}
                        >
                            Accept
                        </Button>
                        <Button
                            colorScheme='red'
                            size='sm'
                            onClick={onDecline}
                        >
                            Decline
                        </Button>
                    </HStack>
                    : null
            }
        </Flex>
    )
}

export default UserList