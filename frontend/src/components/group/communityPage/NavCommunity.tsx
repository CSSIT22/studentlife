import { Box, Image, Heading, Text, Flex, Button, VStack, Wrap, Tab, TabList, Tabs, Menu, MenuButton, MenuItem, MenuList, useToast, Status, transition, Skeleton } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import { HiLockClosed, HiUserGroup } from 'react-icons/hi2'
import { MdPublic } from 'react-icons/md'
import { Link } from 'react-router-dom'
import API from 'src/function/API'
import Ban from '../Ban'
import Pending from '../Pending'
import Private from '../Private'
import Loading from './Loading'

const NavbarCommunity: FC<{
    //Community
    disabled?: boolean, //use for disable button
    name?: string,
    desc?: string,
    photo?: any,
    privacy?: boolean,
    tags?: any,
    memberCount?: number,

    //User
    access?: boolean, //true = not access to community | false = access to community
    role?: string, //OWNER, ADMIN, CO_ADMIN, MEMBER
    status?: boolean, //true = pending | false = not pending
    isBlacklisted?: boolean,

    data?: any
    isLoading?: boolean
    isError?: boolean
    fetchCommunity?: any
    activeTab?: number

}> = ({ disabled, name, desc, photo, privacy, tags, memberCount = 0, access, role, status, isBlacklisted, data, isLoading, isError, fetchCommunity, activeTab }) => {

    if (isLoading) {
        return <Loading />
    }
    if (isError) {
        return <Box>Something went wrong...</Box>
    }




    const toast = useToast()
    const onJoin = async () => {
        if (data?.community.privacy) {
            sendAPI(
                "Success",
                "Your request has been sent",
                "/group/pendingRequest",
                "POST",
                true,
                false
            )
        } else {
            sendAPI(
                "Success",
                "Joined the community",
                "/group/joinCommunity",
                "POST",
                true,
                false
            )
        }
    }
    const onCancel = async () => {
        sendAPI(
            "Success",
            "Cancelled the request",
            "/group/declineRequest",
            "DELETE",
            true,
            true
        )
    }
    const onLeave = async () => {
        sendAPI(
            "Success",
            "You have left the community",
            "/group/leaveCommunity",
            "DELETE",
            true,
            false
        )
    }
    const onDelete = async () => {
        sendAPI(
            "Success",
            "You have deleted the community",
            "/group/deleteCommunity",
            "DELETE",
            true,
            false
        )
    }
    //Using for send API to backend (join, leave, delete, cancel)
    const sendAPI = async (
        title: string,
        desc: string,
        url: string,
        method: string,
        isCommunityId?: boolean,
        isUserId?: boolean,
    ) => {
        try {
            if (method === "POST") {
                await API.post(url, {
                    communityId: isCommunityId ? data?.community.id : null,
                    userId: isUserId ? data?.user.id : null
                })
            } else if (method === "DELETE") {
                await API.delete(url, {
                    data: {
                        communityId: isCommunityId ? data?.community.id : null,
                        userId: isUserId ? data?.user.id : null
                    }
                })
            }
            toast({
                title: title,
                description: desc,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
            fetchCommunity()
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


    const threeDotsBtn = [
        {
            //Edit -> display only the group's owner 
            name: "Edit community",
            conditions: data?.user.role === 'OWNER',
            to: `/groups/id/${data?.community.id}/edit`,
            onClick: () => { }
        },
        {
            //Edit -> display only the group's owner 
            name: "Delete community",
            conditions: data?.user.role === 'OWNER',
            to: `/groups`,
            onClick: onDelete
        },
        {
            //Leave -> display only members of the group (not owner)
            name: "Leave community",
            conditions: data?.user.access && data.user.role !== 'OWNER',
            to: ``,
            onClick: onLeave
        }
    ]
    const navTab = [
        {
            name: "Discusstion",
            to: `/groups/id/${data?.community.id}`
        },
        {
            name: "Member",
            to: `/groups/id/${data?.community.id}/member`
        },
        {
            name: "File",
            to: `/groups/id/${data?.community.id}/file`
        }
    ]

    return (
        <Box
        >
            <Image
                fallbackSrc="https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"
                src={`data:image;base64,${btoa(String.fromCharCode(...new Uint8Array(data.community.photo?.data)))}`}
                marginTop={{ base: "-2rem", sm: "-5rem" }}
                height={{ base: "11rem", sm: "15rem" }}
                backgroundRepeat="no-repeat"
                width="100%"
                objectFit="cover"
                objectPosition="center"
            />
            <VStack
                borderBottomRadius='lg'
                align='flex-start'
                bg={data?.user.isBlacklisted ? "red.200" : "white"}
                px='4'
                pt='4'
                shadow='lg'
                mb='2'
            >
                <Heading
                    fontSize='2xl'
                    lineHeight='1'
                >
                    {data?.community?.name}
                </Heading>
                <Flex
                    alignItems='center'
                    gap='1'
                    fontSize='sm'
                    color='gray.500'
                >
                    {data?.community.privacy ? <HiLockClosed /> : <MdPublic />}
                    <Text>
                        {data?.community.privacy ? "Private community" : "Public community"}
                    </Text>
                    <Text
                        fontWeight='500'
                    >
                        {" • "}
                        {data?.community.memberCount > 1 ? `${data?.community.memberCount} members` : `${data?.community.memberCount} member`}
                    </Text>
                </Flex>
                <Wrap
                    pb='1'
                >
                    {data?.community.tags?.map((tag: any) => (
                        <Box
                            color='white'
                            shadow={{ base: "md", sm: "lg" }}
                            bg='orange.100'
                            fontWeight='medium'
                            px={3}
                            borderRadius={{ base: 'lg', sm: "md" }}
                            fontSize="xs"
                            key={tag.tagId}

                        >
                            {tag?.tagName}
                        </Box>
                    ))}
                </Wrap>
                <Text
                    fontSize='sm'
                    color='gray.500'
                    lineHeight='1.1'
                >
                    {data?.community.desc}
                </Text>
                <Flex
                    justify='flex-end'
                    width={{ base: 'full', sm: 'full' }}
                    gap='1.5'
                >
                    {
                        //Invite, Cancel, Join -> display only members of the group (not owner)
                        data?.user.role === 'OWNER' ? null :
                            <Button
                                leftIcon={data?.user.access ? <BsPlusLg /> : !data?.user.status ? undefined : <HiUserGroup />}
                                width={{ base: 'full', sm: 'auto' }}
                                colorScheme='orange'
                                size='sm'
                                shadow='lg'
                                disabled={data?.user.isBlacklisted}
                                onClick={
                                    data?.user.access ? () => { } :
                                        !data?.user.status && data?.user.status !== undefined ? onCancel :
                                            onJoin
                                }
                            >
                                <Text>
                                    {data?.user.access ? "Invite" :
                                        !data?.user.status && data?.user.status !== undefined
                                            ? "Cancel Request"
                                            : "Join community"}
                                </Text>
                            </Button>
                    }
                    {
                        //Check that user can access community or not
                        data?.user.access ?
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    size='sm'
                                    shadow='lg'
                                    colorScheme='orange'
                                >
                                    <BsThreeDots />
                                </MenuButton>
                                <MenuList>
                                    {threeDotsBtn.map((btn) => {
                                        return btn.conditions ?
                                            <Link to={btn.to} key={btn.name}>
                                                <MenuItem
                                                    onClick={btn.onClick}
                                                >
                                                    {btn.name}
                                                </MenuItem>
                                            </Link>
                                            : null
                                    })}
                                </MenuList>
                            </Menu>
                            : null
                    }
                </Flex>
                <Tabs
                    size="md"
                    bg={data?.user.isBlacklisted ? "red.200" : "white"}
                    variant="unstyled"
                    defaultIndex={activeTab}
                >
                    <TabList
                    >
                        {
                            navTab.map((tab) => {
                                return (
                                    <Link to={tab.to} key={tab.name}>
                                        <Tab
                                            _active={{
                                                color: "orange.500",
                                            }}
                                            _selected={{
                                                color: "orange.500",
                                                borderBottom: "2px solid",
                                            }}
                                            isDisabled={disabled || (!data?.user.access && data?.community.privacy)}
                                        >
                                            {tab.name}
                                        </Tab>
                                    </Link>
                                )
                            })
                        }
                    </TabList>
                </Tabs>
            </VStack >
            {
                !data?.user.access
                    && (data?.user.status
                        || data?.user.status == undefined)
                    && data?.community.privacy
                    && !data?.user.isBlacklisted
                    ? <Private /> : null
            }
            {
                data?.user.isBlacklisted ? <Ban /> : null
            }
            {
                !data?.user.status && data?.user.status !== undefined
                    ? <Pending /> : null
            }
        </Box >
    )
}

export default NavbarCommunity