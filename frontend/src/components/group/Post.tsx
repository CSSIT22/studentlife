import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'
import { Avatar, Badge, Box, Button, Flex, HStack, Menu, MenuButton, MenuItem, MenuList, Text, Textarea, useToast, Image } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { AiFillDislike, AiFillLike, AiFillPushpin, AiOutlineDislike, AiOutlineLike, AiOutlinePushpin } from 'react-icons/ai'
import { BsPinFill, BsThreeDots } from 'react-icons/bs'
import { FaBan, FaDownload, FaEdit } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import { RiDeleteBinFill } from 'react-icons/ri'
import { TiWarning } from 'react-icons/ti'
import API from 'src/function/API'

const Post: FC<{
    userId?: string,
    avatar?: string,
    userName?: string,
    userRole?: string, //member role
    isOwn?: boolean,
    isHigherPriority?: boolean,
    isPinned?: boolean,
    postText?: string,
    likeCount?: number,
    communityId?: string,
    fetchPost?: any,
    checkRole?: any, //user role
    postId?: string,
    checkid?: string,
    lastEdit?: Date,
    seen?: boolean,
    postMedia?: any
    undefined?: any
}> = ({
    userName = "Unknown user",
    userRole,
    postText,
    likeCount,
    userId,
    communityId,
    fetchPost,
    checkRole,
    postId,
    checkid,
    lastEdit,
    isPinned,
    seen,
    postMedia,
    undefined,
}) => {

        const [files, setFiles] = useState<any>([])
        const [fs, setFs] = useState(true)

        const [body, setBody] = useState(postText)
        const [isEditing, setIsEditing] = useState(false)

        const [like, setLike] = useState(false)
        const [dislike, setDislike] = useState(false)
        const handleOnLikeClick = () => {

            setLike(!like)
            setDislike(false)
            setFs(false)

            if (fs) {
                onLike()
                setFs(false)
            }
            else {
                onDislike()
                setFs(true)
            }

        }
        const handleOnDislikeClick = () => {
            setDislike(!dislike)
            setLike(false)
            setFs(!fs)

        }
        const toast = useToast()
        const sendAPI = async (
            url: string,
            method: string,
            title?: string,
            desc?: string,

        ) => {
            try {
                if (method === "POST") {
                    await API.post(url, {
                        postId: postId ? postId : null,
                        communityId: communityId ? communityId : null,
                        body: body ? body : null
                    })
                    fetchPost()
                } else if (method === "DELETE") {
                    await API.delete(url, {
                        data: {
                            postId: postId ? postId : null
                        }
                    })
                    fetchPost()
                }
                title ? toast({
                    title: title,
                    description: desc,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                })
                    : null
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
        const onDeletePost = () => {
            sendAPI(
                "/group/deletePost",
                "DELETE",
                "Delete post",
                "Post deleted successfully",

            )
        }
        const onPinPost = () => {
            sendAPI(
                "/group/pinPost",
                "POST",
                "Pin post",
                "Post pinned successfully",

            )
        }
        const onUnpinPost = () => {
            sendAPI(
                "/group/unpinPost",
                "POST",
                "Unpin post",
                "Post unpinned successfully",

            )
        }
        const onEdit = () => {
            sendAPI(
                "/group/editPost",
                "POST",
                "Edit post",
                "Post edited successfully",

            )
            setTimeout(() => {
                setIsEditing(false)
            }, 2000)

        }
        const onLike = () => {
            sendAPI(
                "/group/likePost",
                "POST",


            )
        }
        const onDislike = () => {
            sendAPI(


                "/group/dislikePost",
                "POST",
            )
        }



        const threeDots = [
            {
                name: "Pin post",
                icon: <AiFillPushpin fontSize='20px' />,
                conditions: !isPinned && (checkRole === "OWNER" || checkRole === "ADMIN"),
                onClick: () => onPinPost()
            },
            {
                name: "Unpin post",
                icon: <AiOutlinePushpin fontSize='20px' />,
                conditions: isPinned && (checkRole === "OWNER" || checkRole === "ADMIN"),
                onClick: () => onUnpinPost()
            },
            {
                name: "Report",
                icon: <TiWarning fontSize='20px' />,
                conditions: true,
                onClick: () => { }
            },
            {
                name: "Edit",
                icon: <FaEdit fontSize='20px' />,
                conditions: checkRole === "OWNER"
                    || checkid === userId
                    || checkRole === "ADMIN",
                onClick: () => setIsEditing(true)
            },
            {
                name: "Delete",
                icon: <RiDeleteBinFill fontSize='20px' />,
                conditions: checkRole === "OWNER"
                    || checkid === userId
                    || checkRole === "ADMIN",
                onClick: () => onDeletePost()
            }
        ]
        //date format July 1, 2021 12:00 AM
        const dateFormater = (dateValue: Date) => {
            const date = new Date(dateValue)
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
            const formattedDate = date.toLocaleDateString('en-US', dateOptions as any)
            const formattedTime = date.toLocaleTimeString('en-US', timeOptions as any)
            return formattedDate + ' ' + formattedTime
        }

        return (
            <Box width='full' maxW='580px'>
                <Box p='4' shadow='lg' bg={!undefined ? 'white' : 'gray.100'} borderRadius='md'>
                    <HStack mb='1' justify='space-between'>
                        <Flex

                        >
                            <Avatar
                                size='sm'
                                src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + userId}
                            />
                            <Box ml='3' lineHeight='1.2'>
                                <Text fontSize='sm' fontWeight='bold'>
                                    {!undefined ? userName : 'Anonymous'}
                                    <Badge ml='1' colorScheme='green'>
                                        {userRole}
                                    </Badge>
                                </Text>
                                <Text fontSize='xs'>{dateFormater(lastEdit || new Date())}</Text>
                            </Box>
                            {/* <Avatar
                                size={"sm"}
                                src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + userId}

                            />
                            <Text fontSize='sm' as='b'>{userName}</Text>
                            <Badge colorScheme='red' >Default</Badge> */}
                        </Flex>
                        <Box>
                            <Menu>
                                <MenuButton>
                                    <BsThreeDots fontSize='25px' />
                                </MenuButton>
                                <MenuList>
                                    {
                                        threeDots
                                            .filter((item) => item.conditions)
                                            .map((item, index) => {
                                                return (
                                                    <MenuItem
                                                        key={index}
                                                        icon={item.icon}
                                                        onClick={item.onClick}>
                                                        {item.name}
                                                    </MenuItem>
                                                )
                                            })
                                    }
                                </MenuList>
                            </Menu>
                        </Box>
                    </HStack>
                    {
                        isEditing ? (
                            <Textarea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                fontSize='lg'
                                placeholder='Write something...'
                                autoFocus
                                variant='unstyled'
                            />
                        ) : (
                            <Box>
                                <Text fontSize='lg'>{body}</Text>
                                <Image
                                    src={postMedia}
                                    alt=""
                                    width="100%"
                                    height="auto"
                                    objectFit="cover"
                                    borderRadius="md"
                                    maxHeight='300px'
                                    p="1"
                                    fit={"cover"}
                                />
                            </Box>



                        )
                    }

                    {/* <Flex
                    flexWrap='wrap'
                    borderRadius='md'
                    // height='200px'
                    textAlign={'center'}
                    py={{ base: 9, sm: '4rem', md: '6rem' }}
                    px='8'
                    bg='#fff2e6'
                    alignItems={"center"}
                    justifyContent={"center"}

                >
                    <Text as='b' fontSize={{ base: 'lg', sm: '3xl' }}>
                        {body}
                    </Text>
                </Flex> */}
                    <Flex mt='2' alignItems='center' justifyContent='flex-start' gap='1'>
                        {!like ? <AiOutlineLike color='#3388ff' size='20px' onClick={handleOnLikeClick} />
                            : <AiFillLike color='#3388ff' size='20px' onClick={handleOnLikeClick} />}
                        <Text color='#3388ff' as='b' fontSize='sm'>{likeCount}</Text>
                        {!dislike ? <AiOutlineDislike color='#ff2400' size='20px' onClick={handleOnDislikeClick} />
                            : <AiFillDislike color='#ff2400' size='20px' onClick={handleOnDislikeClick} />}
                        {/* <Text color='#ff2400' as='b' fontSize='sm'></Text> */}
                    </Flex>
                </Box >
                {
                    isEditing ? (
                        <HStack mt='2' justify='flex-end'>
                            <Button
                                onClick={() => onEdit()}
                                disabled={!body || body === postText}
                                // width={{ base: 'full', sm: 'auto' }}
                                px='5'
                                colorScheme='orange'
                                size='sm'
                                shadow='lg'
                            >
                                Save changes
                            </Button>
                            <Button
                                // width={{ base: 'full', sm: 'auto' }}
                                onClick={() => {
                                    setIsEditing(false)
                                    setBody(postText)
                                }}
                                px='5'
                                colorScheme='red'
                                size='sm'
                                shadow='lg'
                            >
                                Cancel
                            </Button>
                        </HStack>)
                        : (null)
                }
            </Box >


        )
    }
export default Post