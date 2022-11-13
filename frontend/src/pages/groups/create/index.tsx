import { Box, Image, Text, HStack, Input, Select, Textarea, Tag, Button, Flex, IconButton, Spacer, Link, Tab, TabList, TabPanel, TabPanels, Tabs, TagCloseButton, TagLabel, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react"
import { FormControl, FormLabel } from '@chakra-ui/react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, } from '@chakra-ui/react'
import { AddIcon, ChevronRightIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon, SearchIcon } from "@chakra-ui/icons"
import { MdPublic, MdPublicOff, MdDesktopWindows } from "react-icons/md"
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { userData } from '../data'
import React, { useState } from "react"
import { FaPlus } from "react-icons/fa"

import AppBody from "../../../components/share/app/AppBody"
import FriendInviteList from 'src/components/group/FriendInviteList';
import NavCommunity from 'src/components/group/NavCommunity'



const create = () => {
    const [GroupName, setGroupName] = useState("")
    const textChange = (event: any) => setGroupName(event.target.value)

    const [Describe, setDescrip] = useState("")
    const DesChange = (event: any) => setDescrip(event.target.value)

    const [Privacy, setPrivacy] = useState("")
    const PriChange = (event: any) => setPrivacy(event.target.value)

    const [changePreview, setPreview] = useState(true)
    const PreviewChange = () => { setPreview(!changePreview) }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [tagBtn, setTagBtn] = useState(false)


    const handleTagChoose = () => {
        setTagBtn(!tagBtn)
    }

    const handleTagCancel = () => {
        setTagBtn(false)
    }


    return (
        <AppBody>
            <HStack gap={3}>
                { /*Create Community*/}
                <Box width={{ sm: "100%", md: "450px" }} borderRadius="md" mt={5} padding={4} background=" orange.400" textColor={"white"}>
                    <Breadcrumb ml={'0.4'} fontSize={'xs'} spacing='1.5px' separator={<ChevronRightIcon color='white' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='http://127.0.0.1:5173/groups'>Community</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>Create Community</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Text fontSize={"xl"} fontWeight={700}>
                        Create Community
                    </Text>
                    <Text fontSize={"md"}>
                        Name
                        <FormControl>
                            <Input type='Name' value={GroupName} onChange={textChange} background={"white"} color="black" />
                        </FormControl>

                        Choose Tags
                        <Button colorScheme={'green'} onClick={onOpen} ml={2} my={2} size='xs'>
                            <FaPlus />
                        </Button>

                        <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader borderBottomWidth='1px'>Tags</DrawerHeader>
                                <DrawerBody>
                                    <HStack gap={2}>
                                        {userData.Tag.map((i) => (
                                            <Button onClick={((handleTagChoose))}
                                                colorScheme={tagBtn ? 'green' : 'yellow'}
                                                variant='solid'
                                                key={i.tagID}
                                                borderRadius="full"
                                                size={"md"}

                                            >{i.tagName}
                                            </Button>
                                        ))}
                                    </HStack>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>


                        <HStack flexWrap={'wrap'} gap={2} justify={'flex-start'} >
                            {userData.Tag.map((Tags) =>
                                <Tag
                                    fontSize={"md"}
                                    size={"md"}
                                    key={Tags.tagID}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                    sx={{ marginLeft: '0 !important' }}
                                >
                                    <TagLabel>{Tags.tagName}</TagLabel>
                                    <TagCloseButton />
                                </Tag>)}
                        </HStack>

                        <HStack>
                            <Text mr={-1}>Privacy</Text>
                            <MdPublic color="White" />
                        </HStack>
                        <FormControl>
                            <Select value={Privacy} onChange={PriChange} placeholder='Public' background={"white"} color="black">
                                <option>Private</option >
                            </Select>
                        </FormControl>
                        Description
                        <FormControl>
                            <Textarea value={Describe} onChange={DesChange} placeholder=" " size='sm' background={"white"} color="black" />
                        </FormControl>

                        <Text mt={2} mb={2}>Add a cover photo</Text>

                        <Button width="100%" color='black' size={"sm"}>
                            + Upload Cover Photo
                        </Button>
                        <Text mt={2} mb={2}>
                            Invite friends to join this community
                        </Text>
                        <Box background={'white'} borderRadius={'md'}>
                            <HStack padding={1}>
                                <IconButton background={'white'} aria-label='Search database' icon={<SearchIcon />} color={'black'} />
                                < Input backgroundColor={'white'} color={'black'} placeholder='Search for friends' />
                            </HStack>
                            <Box>
                                <Box padding={1} background={'white'} color={'black'}>
                                    <FriendInviteList userName='Passakorn Puttama' isSelected={false} userProfile={''} />
                                </Box>
                                <Box padding={1} background={'white'} color={'black'}>
                                    <FriendInviteList userName='Patthadol Raksapram' isSelected={false} userProfile={''} />
                                </Box>
                                <Box padding={1} background={'white'} color={'black'}>
                                    <FriendInviteList userName='Vatcharamai Rodring' isSelected={false} userProfile={''} />
                                </Box>
                            </Box>

                        </Box>

                        <Button width="100%" mt={3} color='black' size={"md"}>
                            Create
                        </Button>
                    </Text>
                </Box>

//Desktop Preview
                <Box background={'orange.400'} borderRadius="md" paddingTop={5} color={'white'} width={changePreview ? '550px' : '375px'} display={{ sm: "none", md: "block" }}>
                    <HStack justifyContent={"space-between"} align={'center'} padding={1} mt={-2} paddingLeft={5} paddingRight={5} >
                        <Text fontSize={"xl"} fontWeight={700} >
                            {changePreview ? "Desktop Preview" : " Mobile Preview"}
                        </Text>
                        <Text display={'flex'} gap={2} >
                            {changePreview ? <HiOutlineDevicePhoneMobile onClick={PreviewChange} /> : <MdDesktopWindows onClick={PreviewChange} />}
                        </Text>
                    </HStack>
                    <Box width="100%" borderRadius="md" padding={5} paddingTop={'5rem'} background={'orange.400'} textColor={"white"}>
                        <Box color={'black'}>
                            <NavCommunity
                                communityName={GroupName ? GroupName : "Community Name"}
                                isPrivate={Privacy ? Privacy : false}
                                isMember={false}
                                description={Describe ? Describe : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta vitae non voluptates nisi quisquam necessitatibus doloremque neque voluptatum. Maiores facilis nulla sit quam laborum nihil illum culpa incidunt tempore obcaecati!"}
                                coverPhoto="https://picsum.photos/id/400/800"
                                members={1}
                                communityID={1000}
                                tags={userData.Tag}
                                activeBtn={2}
                            />
                        </Box>


                        {/* <Box width="100%" borderRadius="md" background="orange.700" display={changePreview ? 'block' : "none"} >
                        <Image boxSize='100%' borderRadius='md' src="data:image/jpeg;base64,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" />
                        <Box ml={2} >
                            <Flex minWidth='max-content' alignItems='center' mb={-2}>
                                {GroupName ? GroupName : "Community Name"}
                                < Spacer />
                                <HStack mt={1} mr={1}>
                                    <Button background={"RGBA(0, 0, 0, 0.64)"}
                                        _hover={{ background: "RGBA(0, 0, 0, 0.64)", cursor: "default" }} size={"sm"} p='3' >
                                        Invite
                                    </Button>
                                    <Menu >
                                        <MenuButton
                                            as={IconButton}
                                            isDisabled="true"
                                            aria-label='Options'
                                            icon={<HamburgerIcon />}
                                            variant='outline'
                                            background={'tomato'}
                                            _hover={{ background: "tomato", cursor: "default" }}
                                            _focus={{ background: 'tomato' }}
                                        />
                                    </Menu>
                                </HStack>
                            </Flex>
                            <HStack>
                                <MdPublic />
                                <HStack fontSize={"xs"} mt={-4}>
                                    <Text ml={-1}>
                                        {Privacy ? Privacy : " "} Community
                                    </Text>
                                    <Text> - </Text>
                                    <Text >
                                        69M Members
                                    </Text>
                                </HStack>

                            </HStack>
                            <HStack spacing={1} mt={1} mb={1}>
                                <Tag background={"RGBA(0, 0, 0, 0.64)"} color={'white'} size={"sm"}>#Cats</Tag>
                                <Tag background={"RGBA(0, 0, 0, 0.64)"} color={'white'} size={"sm"}>#Pets</Tag>
                                <Tag background={"RGBA(0, 0, 0, 0.64)"} color={'white'} size={"sm"}>#Cat Lover</Tag>
                            </HStack>
                            <Text fontSize={'xs'}>
                                {Describe ? Describe : "Lorem eiei ipsum dolor sit, amet consectetur adipisicing elit. Praesentium error harum nam! Blanditiis et laboriosam maiores impedit omnis mollitia ipsa amet porro incidunt ut, eius officia ipsam pariatur nemo quam!"}
                            </Text>
                            <HStack color={'black'} fontWeight={'500'} padding='0.5' spacing={2}>
                                <Link>Discussion</Link>
                                <Link>Member</Link>
                                <Link>File</Link>
                            </HStack>
                        </Box>
                    </Box> */}
                    </Box>
                </Box>

            </HStack >
        </AppBody >
    )
}
export default create
