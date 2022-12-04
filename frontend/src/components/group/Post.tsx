import { Avatar, Box, Flex, Heading, HStack, Popover, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Text } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { BsThreeDots } from 'react-icons/bs'
import { FaDownload } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import { RiDeleteBinFill } from 'react-icons/ri'

const Post: FC<{ avatar: string, userName: string, userRole: string, isOwn: boolean, isHigherPriority: boolean, isPinned: boolean, postText: string, likeCount: number }> = ({
    avatar,
    userName,
    userRole,
    isHigherPriority,
    isOwn,
    isPinned,
    postText,
    likeCount
}) => {
    const [like, setLike] = useState(false)
    const [dislike, setDislike] = useState(false)
    const handleOnLikeClick = () => {
        setLike(!like)
        setDislike(false)
    }
    const handleOnDislikeClick = () => {
        setDislike(!dislike)
        setLike(false)
    }
    // const [unLike, setUnLike] = useState(false)
    return (
        <Box maxW='580px' width='full' shadow='lg' bg='white' p='4' borderRadius='md'>
            <HStack mb='1' justify='space-between'>
                <HStack>
                    <Avatar size={"sm"} src={avatar} />
                    <Text fontSize='sm' as='b'>{userName}</Text>
                    <Text
                        shadow='md'
                        fontSize='12px'
                        bg='#e65300'
                        px='2'
                        borderRadius='md'
                        py='0.5'
                        color='white'
                        as='b'
                    >{userRole}
                    </Text>
                </HStack>
                <Popover>
                    <PopoverTrigger>
                        <Box _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                            <BsThreeDots fontSize={"25px"} />
                        </Box>
                    </PopoverTrigger>

                    <Portal>
                        <PopoverContent width="180px">
                            <PopoverHeader as='b'>Manage</PopoverHeader>
                            <PopoverBody >
                                <Box gap={1} _hover={{ cursor: "pointer" }} display={isHigherPriority && isPinned ? 'flex' : 'none'} alignItems={"center"}>
                                    <FaDownload />
                                    <Text>Unpin Post</Text>
                                </Box>
                                <Box gap={1} _hover={{ cursor: "pointer" }} display={isHigherPriority && !isPinned ? 'flex' : 'none'} alignItems={"center"}>
                                    <FaDownload />
                                    <Text>Pin Post</Text>
                                </Box>
                                <Box gap={1} _hover={{ cursor: "pointer" }} display={isOwn ? 'none' : 'flex'} alignItems={"center"}>
                                    <RiDeleteBinFill />
                                    <Text>Report</Text>
                                </Box>
                                <Box gap={1} _hover={{ cursor: "pointer" }} display={isHigherPriority || isOwn ? 'flex' : 'none'} alignItems={"center"}>
                                    <RiDeleteBinFill />
                                    <Text>Edit</Text>
                                </Box>
                                <Box gap={1} _hover={{ cursor: "pointer" }} display={isHigherPriority || isOwn ? 'flex' : 'none'} alignItems={"center"}>
                                    <RiDeleteBinFill />
                                    <Text>Delete</Text>
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </HStack>
            <Flex
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
                <Text as='b' fontSize={{ base: 'lg', sm: '3xl' }}>{postText}</Text>
            </Flex>
            <Flex mt='2' alignItems='center' justifyContent='flex-start' gap='1'>

                {!like ? <AiOutlineLike color='#3388ff' size='20px' onClick={handleOnLikeClick} />
                    : <AiFillLike color='#3388ff' size='20px' onClick={handleOnLikeClick} />}
                <Text color='#3388ff' as='b' fontSize='sm'>{likeCount}</Text>
                {!dislike ? <AiOutlineDislike color='#ff2400' size='20px' onClick={handleOnDislikeClick} />
                    : <AiFillDislike color='#ff2400' size='20px' onClick={handleOnDislikeClick} />}
                <Text color='#ff2400' as='b' fontSize='sm'>{likeCount}</Text>
            </Flex>
        </Box >

    )
}
export default Post