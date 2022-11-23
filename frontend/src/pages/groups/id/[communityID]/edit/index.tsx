import {
    Box,
    Text,
    HStack,
    Input,
    Select,
    Textarea,
    Tag,
    Button,
    Flex,
    IconButton,
    TagCloseButton,
    TagLabel,
    Link,
    background,
    DrawerFooter,
} from "@chakra-ui/react"
import { FormControl } from "@chakra-ui/react"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { ChevronRightIcon, SearchIcon, ChevronLeftIcon } from "@chakra-ui/icons"
import { useState } from "react"

import { FaPlus } from "react-icons/fa"
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2"
import { MdPublic, MdDesktopWindows } from "react-icons/md"

import FriendInviteList from "src/components/group/FriendInviteList"
import NavCommunity from "src/components/group/NavCommunity"
import { BiBorderRadius } from "react-icons/bi"
import AppBody from "src/components/share/app/AppBody"
import { userData } from "src/pages/groups/data"

const createCommunity = () => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isTagBarOpen, setIsTagBarOpen] = useState(false)
    const { height, width } = useWindowDimensions()
    const [preview, setPreview] = useState(true)//true = desktop, false = mobile
    const [searchValue, setSearchValue] = useState("") //for store search value

    let isDesktop = (width || 0) > 768
    //form values
    const [communityName, setCommunityName] = useState("")
    const [communityDesc, setCommunityDesc] = useState("")
    const [communityPrivacy, setCommunityPrivacy] = useState(true)//true = public, false = private
    const [communityCoverPhoto, setCommunityCoverPhoto] = useState("https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg")

    //tags 
    const [tags, setTags] = useState(userData.Tag)
    // const [isAdded, setIsAdded] = useState(false)
    // const [showTag, setShowTag] = useState(false)
    const [selectedTag, setSelectedTag] = useState<any>([]);
    const [updatedTag, setUpdatedTag] = useState<any>([]);

    const PrivacyOnChange = (e: any) => (e.target.value == "true" ? setPrivacy(true) : setPrivacy(false))

    const [changePreview, setPreview] = useState(true)
    const PreviewChange = () => {
        setPreview(!changePreview)
    }

    // const { isOpen, onOpen, onClose } = useDisclosure()

    const [isModalOpen, setModalOpen] = useState(false)
    const modalOnClick = () => setModalOpen(!isModalOpen)

    const [isSureOpen, setSureOpen] = useState(false)
    const sureOnClick = () => setSureOpen(!isSureOpen)

    const [tagBtn, setTagBtn] = useState(false)

    const handleTagChoose = () => {
        setTagBtn(!tagBtn)
    }
    //form styles
    const desktopStyle = {
        input: {
            bg: 'white',
            color: '#848383',
            shadow: "lg",
            borderRadius: "md",
            fontWeight: 500,
            fontSize: 'sm',
            mb: 1,
        },
        title: {
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: 'sm',
            mb: 2,
        },
        button1: {
            bg: "white",
            color: "#848383",
            shadow: 'lg',
            borderRadius: "md",
            _hover: {
                bg: "gray.100",
            },
        }
    }
    const mobileStyle = {
        //formInput
        input: {
            bg: "white",
            color: "#848383",
            shadow: "md",
            borderRadius: "xl",
            fontWeight: 500,
            mb: 2,
        },
        // formLabel
        title: {
            color: "gray.600",
            fontSize: "xl",
            fontWeight: "bold",
            mb: 4,

    //Tag
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const [tag, setTag] = useState(userData.Tag)
    // const [tagColor, setTagColor] = useState(false)
    const [chooseTag, setChooseTag] = useState<any>([])
    const [tagArray, setTagArray] = useState([])
    const handleTagOnlick = (obj: any) => () => {
        // console.log(obj)
        setChooseTag([...chooseTag, obj])
        // setTagColor(!tagColor)
        setTag(tag.filter((item: any) => item.tagID !== obj.tagID))
        // console.log(chooseTag)
    }

    const handleTagDelete = (obj: any) => () => {
        setChooseTag(chooseTag.filter((item: any) => item != obj))
        setTag([...tag, obj])
    }
    //Send data to backend
    const submit = () => {
        // const communityID = Date.now()//Create unique ID

        // console.log(communityID)
        // console.log(communityName)
        // console.log(communityDes)
        // console.log(communityPrivacy)
        // console.log(communityCoverPhoto)
        console.log(updatedTag)
        API.post("/group/createtest", {
            // communityID: Date.now(),
            communityName: communityName,
            communityDesc: communityDesc,
            communityPrivacy: communityPrivacy,
            communityCoverPhoto: communityCoverPhoto,
            communityTags: updatedTag,
        }).then((res) => {
            // console.log(res.status)
            // console.log(res.data)
            toast({
                title: "Success",
                description: "Community edited successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        }).catch((err) => {
            console.log(err)
            toast({
                title: "Error",
                description: "Community edited failed",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: 'top',
            })
        })
        onClose()
    }
    return (
        <AppBody>
            <HStack gap={changePreview ? "50px" : "100px"} mb={4}>
                {/*Edit Community*/}
                <Box
                    width={{ sm: "100%", md: "450px" }}
                    borderRadius="md"
                    mt={5}
                    padding={4}
                    background={{ md: "orange.400", base: "" }}
                    color={{ md: "white", base: "black" }}
                >
                    <Breadcrumb
                        display={{ sm: "none", md: "block" }}
                        ml={"0.4"}
                        fontSize={"xs"}
                        spacing="1.5px"
                        separator={<ChevronRightIcon color="white" />}
                    >
                        <BreadcrumbItem>
                            <BreadcrumbLink href="http://127.0.0.1:5173/groups/id/1">Community</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#" _hover={{ textDecoration: "none", cursor: "default" }}>
                                Edit Community
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>

                    <HStack ml={-2} mb={{ md: 0, sm: 4 }}>
                        <Link href="http://127.0.0.1:5173/groups">
                            <ChevronLeftIcon display={{ sm: "block", md: "none" }} color="black" w={6} h={6} />
                        </Link>
                        <Text fontSize={"2xl"} fontWeight={700}>
                            Edit Community
                        </Text>
                    </Flex>

                    <Text fontSize={"md"} fontWeight={500}>
                        <Text mb={{ md: 0, sm: 4 }}>Name</Text>
                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Input
                                type="Name"
                                placeholder="Community Name"
                                value={GroupName}
                                onChange={textChange}
                                background={"white"}
                                color="black"
                            />
                        </FormControl>

                        {/* Tags */}
                        <HStack mb={{ md: 2, sm: 4 }}>
                            <Text>Tags</Text>
                            <Box ml={2} my={2}>
                                <Button colorScheme={"green"} onClick={() => setDrawerOpen(true)} size="xs">
                                    <FaPlus />
                                </Button>
                            </Box>
                        </HStack>

                        <Drawer placement={"bottom"} onClose={() => setDrawerOpen(false)} isOpen={isDrawerOpen}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader borderBottomWidth="1px">Choose tags here!</DrawerHeader>
                                <DrawerBody>
                                    <Flex gap={2} flexWrap={"wrap"}>
                                        {/* {userData.Tag.map((i) => (
                                            <Button onClick={((handleTagChoose))}
                                                colorScheme={tagBtn ? 'green' : 'yellow'}
                                                variant='solid'
                                                key={i.tagID}
                                                borderRadius="full"
                                                size={"md"}
                                            >{i.tagName}
                                            </Button>
                                        ))} */}
                                        {/* <Box> */}
                                        {tag.map((tag: any) => (
                                            <Button
                                                variant="solid"
                                                key={tag.tagID}
                                                borderRadius="full"
                                                size={"md"}
                                                value={tag}
                                                onClick={handleTagOnlick(tag)}
                                            >
                                                {tag.tagName}
                                            </Button>
                                        ))}
                                        {/* </Box> */}
                                    </Flex>
                                </DrawerBody>
                                <DrawerHeader borderBottomWidth="1px">Selected Tags</DrawerHeader>
                                <DrawerBody>
                                    {chooseTag.map((tag: any) => tag).length > 0 ? (
                                        <Flex gap={2} flexWrap={"wrap"} mb={4}>
                                            {chooseTag.map((tag: any) => (
                                                <Button
                                                    key={tag.tagID}
                                                    borderRadius="full"
                                                    variant="solid"
                                                    size={"md"}
                                                    backgroundColor={"orange.400"}
                                                    color="white"
                                                    onClick={handleTagDelete(tag)}
                                                    value={tag}
                                                >
                                                    {tag.tagName}
                                                </Button>
                                            ))}
                                        </Flex>
                                    ) : (
                                        <Text>None</Text>
                                    )}
                                </DrawerBody>
                                <DrawerFooter>
                                    <Button onClick={onSubmit} colorScheme="blue">
                                        Confirm
                                    </Button>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>

                        <Box width="100%" bg={"white"} boxShadow={{ sm: "xs", md: "none" }} padding={1} borderRadius={"md"} mb={{ md: 2, sm: 4 }}>
                            <HStack flexWrap={"wrap"} gap={2} justify={"flex-start"} padding={2}>
                                {/* {userData.Tag.map((Tags) =>
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
                                    </Tag>)} */}

                                {tagArray.map((tag: any) => tag).length > 0 ? (
                                    tagArray.map((tag: any) => (
                                        <Tag
                                            fontSize={"md"}
                                            size={"lg"}
                                            key={tag.tagID}
                                            borderRadius="full"
                                            variant="solid"
                                            colorScheme="green"
                                            sx={{ marginLeft: "0 !important" }}
                                        >
                                            <TagLabel>{tag.tagName}</TagLabel>
                                            {/* <TagCloseButton onClick={handleTagDelete(tag)} /> */}
                                        </Tag>
                                    ))
                                ) : (
                                    <Text as={"p"} fontWeight={"normal"} color={{ base: "white", md: "gray" }}>
                                        Edit your community tags!{" "}
                                    </Text>
                                )}
                            </HStack>
                        </Box>
                    </Collapse>


                    <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>Privacy</FormLabel>
                    <Accordion allowToggle>
                        <AccordionItem
                            borderRadius={{ base: 'xl', md: 'md' }}
                            sx={{
                                borderTopWidth: '',
                                borderColor: '',
                                overflowAnchor: '',
                                bg: "white",
                                color: "#848383",
                                shadow: "md",
                                fontWeight: 500,
                                mb: 2,
                            }}>
                            <AccordionButton>
                                <Box
                                    fontSize={{ base: 'md', md: 'sm' }}
                                    fontWeight={500}
                                    flex='1'
                                    textAlign='left'>
                                    Choose Privacy
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <RadioGroup defaultValue='public'>
                                    <VStack align="flex-start">
                                        <Radio
                                            value='public'
                                            onChange={() => setCommunityPrivacy(true)}>
                                            <Text fontSize={{ base: 'md', md: 'sm' }}>Public</Text>
                                        </Radio>
                                        <Radio
                                            value='private'
                                            onChange={() => setCommunityPrivacy(false)}>
                                            <Text fontSize={{ base: 'md', md: 'sm' }}>Private</Text>                                      </Radio>
                                    </VStack>
                                </RadioGroup>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                    <Box display='none' borderRadius={'md'}>
                        <HStack borderRadius={'md'} boxShadow='md' padding={1} mb={{ md: 1, sm: 4 }} background={'white'} border='1px' borderColor='gray.200'>
                            <Box color={'black'} mr={-1}>
                                <IconButton
                                    aria-label='Search database'
                                    disabled={true}
                                    _hover={{ cursor: 'default', background: 'default' }}
                                    background={'white'}
                                    icon={<SearchIcon />}
                                />
                            </Box>
                            <Box width={'100%'} backgroundColor={'white'} color={'black'}  >
                                <Input
                                    width={"100%"}
                                    variant={"filled"}
                                    type={"search"}
                                    value={searchValue}
                                    onChange={(e: any) => setSearchValue(e.target.value)}
                                    placeholder="Seacrh for friends"
                                    focusBorderColor="gray.200"
                                ></Input>
                            </Box>
                        </HStack>
                    </Box>

                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Select onChange={PrivacyOnChange} placeholder="Public" background={"white"} color="black">
                                {/* <option value={'false'}>Public</option > */}
                                <option value={"true"}>Private</option>
                            </Select>
                        </FormControl>

                        <Text mb={{ md: 0, sm: 4 }}>Description</Text>
                        <FormControl mb={{ md: 2, sm: 4 }}>
                            <Textarea
                                value={Describe}
                                onChange={DesChange}
                                placeholder="Type your group description here"
                                size="sm"
                                background={"white"}
                                color="black"
                            />
                        </FormControl>

                        <Text mb={{ md: 0, sm: 4 }}>Edit a cover photo</Text>

                        <Button width="100%" color="black" size={"sm"} mb={{ md: 2, sm: 4 }}>
                            + Upload Cover Photo
                        </Button>

                        <Button
                            onClick={modalOnClick}
                            width="100%"
                            mt={2}
                            color={{ md: "black", sm: "white" }}
                            background={{ md: "white", sm: "orange.500" }}
                            _hover={{ background: "default.200" }}
                            size={"md"}
                        >
                            Save
                        </Button>
                        <Modal closeOnOverlayClick={false} isOpen={isModalOpen} onClose={modalOnClick} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Save save save!</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>Are you sure you want to save?</ModalBody>

                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={sureOnClick}>
                                        Sure
                                    </Button>
                                    <Modal closeOnOverlayClick={false} isOpen={isSureOpen} onClose={sureOnClick} isCentered>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Save save save!</ModalHeader>
                                            <Link href="http://127.0.0.1:5173/groups/id/1000/">
                                                <ModalCloseButton /> {/* Will link to created community page */}
                                            </Link>
                                            <ModalBody pb={6}>Change saved!</ModalBody>
                                            <ModalFooter>
                                                <Link href="http://127.0.0.1:5173/groups/id/1000/" _hover={{ textDecoration: "none" }}>
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
                <Box
                    width='full'

                {/* Desktop Preview */}
                <Box
                    background={"orange.400"}
                    borderRadius="md"
                    paddingTop={5}
                    color={"white"}
                    width={changePreview ? "550px" : "375px"}
                    display={{ sm: "none", md: "block" }}
                >
                    <HStack justifyContent={"space-between"} align={"center"} padding={1} mt={-2} paddingLeft={5} paddingRight={5}>
                        <Text fontSize={"2xl"} fontWeight={700}>
                            {changePreview ? "Desktop Preview" : " Mobile Preview"}
                        </Text>
                        <Text display={"flex"} gap={2}>
                            {changePreview ? <HiOutlineDevicePhoneMobile onClick={PreviewChange} /> : <MdDesktopWindows onClick={PreviewChange} />}
                        </Text>
                    </HStack>

                    <Box width="100%" borderRadius="md" padding={5} paddingTop={"5rem"} background={"orange.400"} textColor={"white"}>
                        <Box color={"black"}>
                            <NavCommunity
                                disableBtn={true}
                                communityName={GroupName ? GroupName : "Community Name"}
                                isPrivate={Privacy ? Privacy : false}
                                isMember={true}
                                description={
                                    Describe
                                        ? Describe
                                        : "Lorem eiei ipsum dolor sit, amet consectetur adipisicing elit. Dicta vitae non voluptates nisi quisquam necessitatibus doloremque neque voluptatum. Maiores facilis nulla sit quam laborum nihil illum culpa incidunt tempore obcaecati!"
                                }
                                coverPhoto="https://picsum.photos/id/400/800"
                                members={1}
                                communityID={1000}
                                tags={chooseTag}
                                disableInvite={true}
                            />
                        </Box>
                    </Flex>
                </Box>
            </HStack>
        </AppBody>
    )
}

export default createCommunity