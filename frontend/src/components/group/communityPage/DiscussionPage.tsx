import { Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Textarea, HStack, Button, Flex, Heading, useBoolean } from '@chakra-ui/react'

import React, { FC, useEffect, useState } from 'react'
import { BsEyeFill, BsFillClockFill, BsFillPersonFill } from 'react-icons/bs'
import { HiLockClosed } from 'react-icons/hi2'
import { MdPublic } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import Post from '../Post'

const DiscussionPage: FC<{ data: any }> = ({ data }) => {
    const [isCreatePostBtn, setIsCreatePostBtn] = useState(false)
    let { communityID }: any = useParams()

    const [postText, setPostText] = useState('')
    const [post, setPost] = useState<any>()
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)

    const joinedDate = new Date(data?.user.joined || "")
    //Date format February 21, 2015. 12:00:00 AM
    const joinedDateStr = `${joinedDate.toLocaleString('default', { month: 'long' })} ${joinedDate.getDate()}, ${joinedDate.getFullYear()} ${joinedDate.toLocaleTimeString()}`
    const fetchPost = async () => {
        try {
            const postResult = (await API.get("/group/getCommunityPost/" + communityID)).data
            setPost(postResult)
            console.log("post:", postResult)
        } catch (err) {
            on()
        } finally {
            off()
        }
    }
    useEffect(() => {
        fetchPost()
        // console.log(post);
    }, [])

    const aboutMap = [
        {
            icon: data?.communityprivacy ?
                <HiLockClosed fontSize='20px' /> :
                <MdPublic fontSize='20px' />,
            title: data?.community.privacy ? 'Private community' : 'Public community',
            description: data?.community.privacy ?
                `Only members can see who's in the group and what they post.` :
                `Anyone can see who's in the group and what they post.`,
            display: true,
        },
        {
            icon: <BsEyeFill fontSize='20px' />,
            title: 'Visible',
            description: `Anyone can find this community.`,
            display: true,
        },
        {
            icon: <BsFillPersonFill fontSize='20px' />,
            title: 'Owner',
            description: data?.user.role == "OWNER" ?
                `You are the owner of this community.` :
                post?.owner,
            display: true,
        },

        {
            icon: <BsFillClockFill fontSize='20px' />,
            title: 'History',
            description: `You joined this community on ${joinedDateStr}.`,
            display: data?.user.status,
        }
    ]
    if (isError) return <Text>Something went wrong</Text>
    if (isLoading) return <Text>Loading...</Text>
    return (
        <HStack position='relative' px={{ base: 'none', md: '1rem', lg: '3rem' }} >
            <VStack mt='3' mb='6' width='full' >

                <Accordion maxW='580px' width='full' allowToggle>
                    <AccordionItem
                        bg="white"
                        shadow='lg'
                        borderRadius='md'
                        p='1'
                        width='full'
                        sx={{
                            borderTopWidth: '',
                            borderColor: '',
                            overflowAnchor: '',
                            bg: "white",
                            color: "#848383",
                            shadow: "md",
                            fontWeight: 500,
                            mb: 1,

                        }}>
                        <AccordionButton onClick={() => setIsCreatePostBtn(!isCreatePostBtn)}>
                            <Box
                                fontSize={{ base: 'md', md: 'sm' }}
                                fontWeight={isCreatePostBtn ? "bold" : ""}
                                color={isCreatePostBtn ? '#4a5568' : 'gray.500'}
                                flex='1'
                                textAlign='left'
                            >
                                {isCreatePostBtn ? 'Create Post' : 'Type anything...'}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <Textarea
                                focusBorderColor='none'
                                fontSize='sm'
                                // type='area'
                                value={postText}
                                placeholder='Type anything...'
                                onChange={(e) => setPostText(e.target.value)}
                            />
                            <HStack justify='flex-end'>
                                <Button
                                    color='white'
                                    bg='orange.400'
                                    size='sm'
                                    mt='2'
                                    _hover={{ bg: 'orange.500' }}
                                    display={isCreatePostBtn ? "block" : "none"}>
                                    Submit
                                </Button>
                            </HStack>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>


                <HStack
                    maxW='580px'
                    width='full'>
                    <Text
                        alignSelf='flex-start'
                        shadow='md'
                        fontSize='12px'
                        bg='#e65300'
                        px='2'
                        borderRadius='md'
                        py='0.5'
                        color='white'
                        as='b'
                    >
                        Pinned Post
                    </Text>
                </HStack>
                <Post
                    likeCount={10}
                    isPinned={false}
                    avatar={'test'}
                    userName='bost'
                    userRole='Admin'
                    isHigherPriority={true}
                    isOwn={false}
                    postText='อยากรู้จักก็ทิ้งเลขบัญชี แต่ถ้าอยากหอมสักทีก็ทิ้งเลขที่บ้าน'
                />
                <HStack
                    maxW='580px'
                    width='full'>
                    <Text
                        alignSelf='flex-start'
                        shadow='md'
                        fontSize='12px'
                        bg='#e65300'
                        px='2'
                        borderRadius='md'
                        py='0.5'
                        color='white'
                        as='b'
                    >
                        Post
                    </Text>
                </HStack>
                <Post
                    likeCount={10}
                    postText="test"
                    isPinned={false}
                    avatar={'test'}
                    userName='bost'
                    userRole='Admin'
                    isHigherPriority={true}
                    isOwn={false}
                />
            </VStack >
            <VStack
                align='flex-start'
                position="sticky"
                top='8rem'
                z-index='1'
                alignSelf='flex-start'
                width='full'
                maxW={{ base: 'none', md: '260' }}
                bg='white'
                borderRadius='md'
                p='4'
                shadow='md'
                display={{ base: 'none', md: 'block' }}
            >
                <Heading
                    fontSize='md' fontWeight='600'>
                    About
                </Heading >
                {
                    aboutMap.filter((item) => item.display).map((item, index) => (
                        <HStack align='flex-start' key={index}>
                            <Box mt='1'>
                                {item.icon}
                            </Box>
                            <Flex direction='column' align='flex-start'>
                                <Text fontSize='md' as='b' fontWeight='500'>
                                    {item.title}
                                </Text>
                                <Text as='p' fontSize='sm' lineHeight='5' >
                                    {item.description}
                                </Text>
                            </Flex>
                        </HStack>
                    ))
                }
            </VStack>
        </HStack >
    )
}

export default DiscussionPage