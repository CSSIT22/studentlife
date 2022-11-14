import { ChevronRightIcon, ChevronLeftIcon, SearchIcon } from '@chakra-ui/icons'
import { HStack, Breadcrumb, BreadcrumbItem, Text, BreadcrumbLink, FormControl, Input, Button, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Tag, TagLabel, TagCloseButton, Select, Textarea, IconButton, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Box, useDisclosure, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2'
import { MdPublic, MdDesktopWindows } from 'react-icons/md'
import FriendInviteList from 'src/components/group/FriendInviteList'
import NavCommunity from 'src/components/group/NavCommunity'
import AppBody from 'src/components/share/app/AppBody'
import { userData } from 'src/pages/groups/data'

const communityEdit = () => {

    const [GroupName, setGroupName] = useState("")
    const textChange = (event: any) => setGroupName(event.target.value)

    const [Describe, setDescrip] = useState("")
    const DesChange = (event: any) => setDescrip(event.target.value)

    const [Privacy, setPrivacy] = useState(false)
    const PriChange = (event: any) => setPrivacy(!event.target.value)

    const PrivacyOnChange = (e: any) => e.target.value == 'true' ? setPrivacy(true) : setPrivacy(false)

    const [changePreview, setPreview] = useState(true)
    const PreviewChange = () => { setPreview(!changePreview) }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [isModalOpen, setModalOpen] = useState(false);
    const modalOnClick = () => setModalOpen(!isModalOpen)

    const [isSureOpen, setSureOpen] = useState(false);
    const sureOnClick = () => setSureOpen(!isSureOpen)

    const [tagBtn, setTagBtn] = useState(false)


    const handleTagChoose = () => {
        setTagBtn(!tagBtn)
    }

    const handleTagCancel = () => {
        setTagBtn(false)
    }

    return (
        <AppBody>
            <HStack gap={changePreview ? '50px' : '100px'} mb={4}>
                { /*Create Community*/}
                <Box width={{ sm: "100%", md: "450px" }} borderRadius="md" mt={5} padding={4} background={{ md: 'orange.400', base: '' }} color={{ md: "white", base: 'black' }}>

                    <Breadcrumb display={{ sm: 'none', md: 'block' }} ml={'0.4'} fontSize={'xs'} spacing='1.5px' separator={<ChevronRightIcon color='white' />}>
                        <BreadcrumbItem>
                            <BreadcrumbLink href='http://127.0.0.1:5173/groups/id/1'>
                                Community
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href='#'>
                                Edit Community
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <HStack ml={-2} mb={{ md: 0, sm: 4 }}>
                        <ChevronLeftIcon
                            display={{ sm: 'block', md: 'none' }}
                            color='black'
                            w={6} h={6}
                        />
                        <Text fontSize={"2xl"} fontWeight={700}  >
                            Edit Community
                        </Text>
                    </HStack>


                    <Text fontSize={"md"} fontWeight={500} >

                        <Text mb={{ md: 0, sm: 4 }}>
                            Name
                        </Text>
                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Input type='Name' placeholder="Community Name" value={GroupName} onChange={textChange} background={"white"} color="black" />
                        </FormControl>

                        {/* Tags */}
                        <HStack mb={{ md: 2, sm: 4 }}>
                            <Text>
                                Tags
                            </Text>
                            <Button colorScheme={'green'} onClick={onOpen} ml={2} my={2} size='xs'>
                                <FaPlus />
                            </Button>
                        </HStack>


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

                        <HStack flexWrap={'wrap'} gap={2} justify={'flex-start'} mb={{ md: 2, sm: 4 }}>
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

                        {/* Privacy */}
                        <HStack mb={{ md: 0, sm: 4 }}>
                            <Text mr={-1}>Privacy</Text>
                            <MdPublic color="White" />
                        </HStack>

                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Select onChange={PrivacyOnChange} placeholder='Public' background={"white"} color="black">
                                {/* <option value={'false'}>Public</option > */}
                                <option value={'true'}>Private</option >
                            </Select>
                        </FormControl>

                        <Text mb={{ md: 0, sm: 4 }}>
                            Description
                        </Text>
                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Textarea value={Describe} onChange={DesChange} placeholder="Type your group description here" size='sm' background={"white"} color="black" />
                        </FormControl>

                        <Text mb={{ md: 0, sm: 4 }}>
                            Edit a cover photo
                        </Text>

                        <Button width="100%" color='black' size={"sm"} mb={{ md: 2, sm: 4 }}>
                            + Upload Cover Photo
                        </Button>

                        <Button onClick={modalOnClick} width="100%" mt={2} color={{ md: 'black', sm: 'white' }} background={{ md: 'white', sm: 'orange.500' }} _hover={{ background: 'default.200' }} size={"md"}>
                            Save
                        </Button>
                        <Modal closeOnOverlayClick={false} isOpen={isModalOpen} onClose={modalOnClick}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Save save save!</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    Are you sure you want to save?
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' mr={3} onClick={sureOnClick}>
                                        Sure
                                    </Button>
                                    <Modal closeOnOverlayClick={false} isOpen={isSureOpen} onClose={sureOnClick}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Save save save!</ModalHeader>
                                            <Link href='http://127.0.0.1:5173/groups/id/1'>
                                                <ModalCloseButton /> {/* Will link to created community page */}
                                            </Link>
                                            <ModalBody pb={6}>
                                                Community has been saved!
                                            </ModalBody>
                                            <ModalFooter>
                                                <Link href='http://127.0.0.1:5173/groups/id/1' _hover={{ textDecoration: "none" }}>
                                                    <Button onClick={modalOnClick}>Close</Button> {/* Will link to created community page */}
                                                </Link>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                    <Button onClick={modalOnClick}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Text>
                </Box>

                {/* Desktop Preview */}
                <Box background={'orange.400'} borderRadius="md" paddingTop={5} color={'white'} width={changePreview ? '550px' : '375px'} display={{ sm: "none", md: "block" }}>

                    <HStack justifyContent={"space-between"} align={'center'} padding={1} mt={-2} paddingLeft={5} paddingRight={5} >
                        <Text fontSize={"2xl"} fontWeight={700} >
                            {changePreview ? "Desktop Preview" : " Mobile Preview"}
                        </Text>
                        <Text display={'flex'} gap={2} >
                            {changePreview ? <HiOutlineDevicePhoneMobile onClick={PreviewChange} /> : <MdDesktopWindows onClick={PreviewChange} />}
                        </Text>
                    </HStack>

                    <Box width="100%" borderRadius="md" padding={5} paddingTop={'5rem'} background={'orange.400'} textColor={"white"}>
                        <Box color={'black'} >
                            <NavCommunity
                                disableBtn={true}
                                communityName={GroupName ? GroupName : "Community Name"}
                                isPrivate={Privacy ? Privacy : false}
                                isMember={false}
                                description={Describe ? Describe : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta vitae non voluptates nisi quisquam necessitatibus doloremque neque voluptatum. Maiores facilis nulla sit quam laborum nihil illum culpa incidunt tempore obcaecati!"}
                                coverPhoto="https://picsum.photos/id/400/800"
                                members={1}
                                communityID={1000}
                                tags={userData.Tag}
                            />
                        </Box>
                    </Box>
                </Box>
            </HStack >
        </AppBody>
    )
}

export default communityEdit