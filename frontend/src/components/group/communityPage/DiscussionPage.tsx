import { Box, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Textarea, HStack, Button } from '@chakra-ui/react'

import React, { useState } from 'react'
import Post from '../Post'

const DiscussionPage = () => {
    const [isCreatePostBtn, setIsCreatePostBtn] = useState(false)
    const [postText, setPostText] = useState('')
    return (
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
    )
}

export default DiscussionPage