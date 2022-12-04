import { Flex, Heading, Button, Box, Text, useBoolean, HStack, VStack, Input, FormLabel, FormControl, Textarea, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Radio, RadioGroup } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import NavCommunity from "src/components/group/NavCommunity"
import AppBody from "src/components/share/app/AppBody"
import { BrowserRouter, BrowserRouter as Router, useParams, Link } from "react-router-dom"
import { userData } from "../../data"
import API from "src/function/API"
import { TiWarning } from "react-icons/ti"
import Post from '../../../../components/group/Post'
import { desktopStyle, mobileStyle } from "src/components/group/styles/styles"
import PrivateContent from "src/components/group/PrivateContent"
import Banned from "src/components/group/Banned"

const headCommunity = () => {
    let { communityID }: any = useParams()
    const [community, setCommunity] = useState<any>()
    const [tag, setTag] = useState<any>()
    // const [isError, { on }] = useBoolean()
    // const [isLoading, { off }] = useBoolean(true)

    //Post
    const [isCreatePostBtn, setIsCreatePostBtn] = useState(false)
    const [postText, setPostText] = useState('')


    // useEffect(() => {
    //     API.get("/group/getCommunityId/" + communityID)
    //         .then((res) => {
    //             setCommunity(res.data)
    //             // setTag(res.data.tag)
    //             // console.log(res.data.tag)
    //         })
    //         .catch((err) => on())
    //         .finally(() => off())
    // }, [])

    //get community form backend
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const status = 0
    // const [community, setCommunity] = useState<any>()
    useEffect(() => {
        API.get("/group/getCommunityId/" + communityID)
            .then((res) => {
                // setCommunity(res.data)
                console.log(res.data)
                res.status === 200 ? setCommunity(res.data) : on()
            })
            .catch((err) => on())
            .finally(() => off())
    }, [])
    if (isLoading) {
        return (
            // will fix the design later
            <AppBody>
                <Text>Loading...</Text>
            </AppBody>
        )
    }
    if (isError) {
        // will fix the design later
        return (
            <AppBody>
                <Box>
                    <Text>There was no community found.</Text>
                </Box>
            </AppBody>
        )
    }
    return (
        <AppBody>
            <NavCommunity
                communityName={community?.communityName}
                communityId={community?.communityId}
                communityCoverPhoto={community?.communityCoverPhoto}
                communityPrivacy={community?.communityPrivacy}
                communityDesc={community?.communityDesc}
                isMember={community?.isMember}
                isOwner={community?.isOwner}
                communityMembers={community?.memberCount + 1}
                activeBtn={1}
                isPending={community?.isPending}
                tags={community?.tags}
                isBlacklist={community?.isBlacklist}

            />
            {/* <Text>{community?.communityId}</Text> */}
            <Box>
                <PrivateContent
                    isMember={community?.isMember}
                    communityId={community?.communityId}
                    communityPrivacy={community?.communityPrivacy && !community?.isBlacklist}

                />
            </Box>

            <Box>
                <Banned
                    isBlacklisted={community?.isBlacklist}
                />
            </Box>

            <VStack display={community?.isMember || !community?.communityPrivacy && !community?.isBlacklist ? 'flex' : 'none'} mb='6' width='full'>
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
            </VStack>
        </AppBody >
    )
}

export default headCommunity