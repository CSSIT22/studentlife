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

const create = () => {
    const [GroupName, setGroupName] = useState("")
    const textChange = (event: any) => setGroupName(event.target.value)

    const [Describe, setDescrip] = useState("")
    const DesChange = (event: any) => setDescrip(event.target.value)

    const [Privacy, setPrivacy] = useState(false)
    const PriChange = (event: any) => setPrivacy(!event.target.value)

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

    const handleTagCancel = () => {
        setTagBtn(false)
    }

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
    const onSubmit = () => {
        setTagArray(chooseTag)
        setDrawerOpen(false)
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
                    </HStack>

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

                        {/* Privacy */}
                        <HStack mb={{ md: 0, sm: 4 }}>
                            <Text mr={-1}>Privacy</Text>
                            <MdPublic color="White" />
                        </HStack>

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
                    </Box>
                </Box>
            </HStack>
        </AppBody>
    )
}
export default create
