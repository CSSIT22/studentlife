import React, { useEffect, useState } from "react"
import {
    Tooltip,
    Text,
    useDisclosure,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Modal,
    Radio,
    RadioGroup,
    Textarea,
    useToast,
    VStack,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tag,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Collapse,
    IconButton,
    HStack,
    textDecoration,
    useBoolean,
} from "@chakra-ui/react"
import API from "src/function/API"
import AppBody from "src/components/share/app/AppBody"
import { IoIosArrowBack } from "react-icons/io"
import { MdDesktopWindows } from "react-icons/md"
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2"
import { Link, useParams } from "react-router-dom"
import { userData } from "../../../data"
import useWindowDimensions from "src/components/group/hooks/useWindowDimensions"
import NavCommunity from "src/components/group/communityPage/NavCommunity"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import FriendInviteList from "src/components/group/FriendInviteList"
import CreateEditNav from "src/components/group/CreateEditNav"

const editCommunity = () => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isTagBarOpen, setIsTagBarOpen] = useState(false)
    const { height, width } = useWindowDimensions()
    const [preview, setPreview] = useState(true) //true = desktop, false = mobile
    const [searchValue, setSearchValue] = useState("") //for store search value


    //tags
    const [tags, setTags] = useState<any>([])
    const [createTag, setCreateTag] = useState<any>([]);
    const [selectedTag, setSelectedTag] = useState<any>([])
    const [updatedTag, setUpdatedTag] = useState<any>([])




    let isDesktop = (width || 0) > 768
    //form values
    const [communityName, setCommunityName] = useState("")
    const [communityDesc, setCommunityDesc] = useState("")
    const [communityPrivacy, setCommunityPrivacy] = useState(true) //true = public, false = private
    const [communityCoverPhoto, setCommunityCoverPhoto] = useState(
        "https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"
    )

    let { communityID }: any = useParams()


    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const [data, setData] = useState<any>()

    const fetchCommunity = async () => {
        try {
            const communityResult = (await API.get("/group/getCommunityId/" + communityID)).data
            setCommunityName(communityResult?.community.name)
            setCommunityDesc(communityResult?.community.desc)
            setCommunityPrivacy(communityResult?.community.privacy)
            setCommunityCoverPhoto(communityResult?.community.photo)

            setUpdatedTag(communityResult?.community.tags)
            setCreateTag(communityResult?.community.tags)
            setTags((await API.get("/group/getTag/")).data)
            
            
            console.log(communityResult)
            console.log(updatedTag)
        } catch (err) {
            on()
        } finally {
            off()
        }
    }
    useEffect(() => {
        fetchCommunity()
    }, [])


    useEffect(() => {
        console.log(createTag)
        console.log(updatedTag)
        console.log(selectedTag)
       

    }, [updatedTag])

    const handleAddTag = (tag: any) => {
        if (!tag.isSelected) {
            tag.isSelected = true
            setSelectedTag([...selectedTag, tag])
        } else {
            tag.isSelected = false
            setSelectedTag(selectedTag.filter((item: any) => item.tagId !== tag.tagId))
        }
    }

    const [previewPhoto, setPreviewPhoto] = useState("")

    //program confuse with data at data:image but patial accept


    //form styles
    const desktopStyle = {
        input: {
            bg: "white",
            color: "#848383",
            shadow: "lg",
            borderRadius: "md",
            fontWeight: 500,
            fontSize: "sm",
            mb: 1,
        },
        title: {
            color: "#FFFFFF",
            fontWeight: "bold",
            fontSize: "sm",
            mb: 2,
        },
        button1: {
            bg: "white",
            color: "#848383",
            shadow: "lg",
            borderRadius: "md",
            _hover: {
                bg: "gray.100",
            },
        },
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
            mb: 1,
        },
        button1: {
            bg: "orange.400",
            color: "white",
            shadow: "md",
            borderRadius: "xl",
            _hover: {
                bg: "orange.600",
            },
        },
    }





    //Send data to backend
    const submit = () => {
        const form = new FormData()
        let Privacy: any = !communityPrivacy.toString();
        form.append("communityName", communityName);
        form.append("communityDesc", communityDesc);
        form.append("communityPrivacy", Privacy);
        form.append("communityTags", createTag);
        form.append("upload", communityCoverPhoto);
        for (var pair of form.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        API.patch("/group/editCommunity" + communityID, form,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                toast({
                    title: "Success",
                    description: "Change Saved",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error",
                    description: "Community Edit Failed",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top",
                })
            })
        onClose()
    }
    return (
        <AppBody>
            {/* <form method='post' onSubmit={submit}> */}
            <Flex gap="2" alignItems="flex-start">
                {/* Form input */}
                <Box
                    maxWidth={{ base: "full", md: "320px" }}
                    px={{ base: "3" }}
                    p={{ md: "5" }}
                    mb={{ md: "4" }}
                    borderRadius="xl"
                    background={{ base: "none", md: "#E67F45" }}
                    width="full"
                >
                    <Flex gap='0.25' fontSize={'xs'} color="white" display={{ md: 'flex', base: 'none' }} >
                        <Box _hover={{ textDecoration: 'underline' }}>
                            <Link to={`/groups/id/${communityID}/`}>Community</Link>
                        </Box>
                        <Box mt={'-0.25'}>
                            <ChevronRightIcon />
                        </Box>
                        <Text>Edit Community</Text>
                    </Flex>
                    <Heading color={{ base: "gray.600", md: "white" }} size={{ base: "lg", md: "md" }} display="flex" alignItems="center" mb={{ md: '3', base: '2' }}>
                        <Box display={{ base: 'block', md: 'none' }} ml='-6' mb={'1'}>
                            <Link to={`/groups/id/${communityID}/`}>
                                <ChevronLeftIcon />
                            </Link>
                        </Box>
                        Edit Community
                    </Heading>
                    <FormControl isRequired={communityName === ""} isInvalid={communityName === ""}>
                        <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>Name</FormLabel>
                        <Input
                            focusBorderColor="none"
                            sx={isDesktop ? desktopStyle.input : mobileStyle.input}
                            type="name"
                            value={communityName}
                            placeholder="Community Name"
                            onChange={(e) => setCommunityName(e.target.value)}
                        />
                    </FormControl>

                    <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>Tags</FormLabel>
                    <Box onClick={() => {
                        setIsTagBarOpen(true)
                    }}
                        sx={{
                            bg: "white",
                            color: "#848383",
                            shadow: "md",
                            fontWeight: 500,
                        }}
                        fontSize={{ base: "md", md: "sm" }}
                        borderRadius={{ base: "xl", md: "md" }}
                        mb="2"
                        _hover={{ bg: "gray.50", cursor: "pointer" }}
                        p="2"
                        pl="4"
                    >
                        Choose Tags
                    </Box>
                    <Collapse in={updatedTag?.length != 0} animateOpacity>
                        <Box
                            bg="gray.200"
                            p={{ base: 4, md: 2 }}
                            // shadow='md'
                            display="flex"
                            flexWrap="wrap"
                            gap="2"
                            borderRadius={{ base: "xl", md: "md" }}
                            mt={{ base: 2, md: 0 }}
                            mb="2"
                        >
                            {updatedTag?.map((tag: any) => {
                                return (
                                    <Tooltip hasArrow arrowSize={5} borderRadius="xl" label={tag?.tagDesc}>
                                        <Tag
                                            key={tag.tagId}
                                            shadow="lg"
                                            fontSize={{ base: "md", md: "xs" }}
                                            borderRadius="full"
                                            bg="green.500"
                                            color="#FFFFFF"
                                            px={{ base: 4, md: 2 }}
                                            py={{ base: 2, md: 1 }}
                                            fontWeight="bold"
                                        >
                                            {tag?.tagName}
                                        </Tag>
                                    </Tooltip>
                                )
                            })}
                        </Box>
                    </Collapse>

                    <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>Privacy</FormLabel>
                    <Accordion allowToggle>
                        <AccordionItem
                            borderRadius={{ base: "xl", md: "md" }}
                            sx={{
                                borderTopWidth: "",
                                borderColor: "",
                                overflowAnchor: "",
                                bg: "white",
                                color: "#848383",
                                shadow: "md",
                                fontWeight: 500,
                                mb: 2,
                            }}
                        >
                            <AccordionButton>
                                <Box fontSize={{ base: "md", md: "sm" }} fontWeight={500} flex="1" textAlign="left">
                                    Choose Privacy
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                                <RadioGroup defaultValue="public">
                                    <VStack align="flex-start">
                                        <Radio value="public" onChange={() => setCommunityPrivacy(true)}>
                                            <Text fontSize={{ base: "md", md: "sm" }}>Public</Text>
                                        </Radio>
                                        <Radio value="private" onChange={() => setCommunityPrivacy(false)}>
                                            <Text fontSize={{ base: "md", md: "sm" }}>Private</Text>{" "}
                                        </Radio>
                                    </VStack>
                                </RadioGroup>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>


                    <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>
                        Upload Community cover photo
                    </FormLabel>
                    <Box
                        sx={{
                            bg: "white",
                            color: "#848383",
                            shadow: "md",
                            fontWeight: 500,

                        }}
                        fontSize={{ base: 'md', md: 'sm' }}
                        borderRadius={{ base: 'xl', md: 'md' }}
                        mb='2'
                        _hover={{ bg: 'gray.50', cursor: 'pointer' }}
                        p='2' pl='4'
                    >

                        <input type="file"
                            id="avatar" name="avatar"
                            accept="image/png, image/jpeg"
                            onChange={(e: any) => {
                                let x = URL.createObjectURL(e.target.files[0])
                                
                                setPreviewPhoto(x)
                                setCommunityCoverPhoto(e.target.files[0])
                            }
                            }>
                        </input>

                    </Box>


                    {/* Cant get friend from another module */}
                    <FormLabel display="none" sx={isDesktop ? desktopStyle.title : mobileStyle.title}>
                        Invite friends to join this community
                    </FormLabel>
                    <Box display="none" borderRadius={"md"}>
                        <HStack
                            borderRadius={"md"}
                            boxShadow="md"
                            padding={1}
                            mb={{ md: 1, sm: 4 }}
                            background={"white"}
                            border="1px"
                            borderColor="gray.200"
                        >
                            <Box color={"black"} mr={-1}>
                                <IconButton
                                    aria-label="Search database"
                                    disabled={true}
                                    _hover={{ cursor: "default", background: "default" }}
                                    background={"white"}
                                    icon={<SearchIcon />}
                                />
                            </Box>
                            <Box width={"100%"} backgroundColor={"white"} color={"black"}>
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

                        <Box
                            background={{ md: "orange.400", base: "" }}
                            height={{ sm: "400px", md: "200px" }}
                            paddingRight={0.5}
                            mb={{ md: 0, sm: 4 }}
                            sx={{
                                "-webkit-overflow-scrolling": "touch" /* enables momentum-scrolling on iOS */,
                                overflowY: "scroll",
                                scrollBehavior: "smooth",

                                "::-webkit-scrollbar-track": {
                                    background: "white",
                                    rounded: "xl",
                                },
                                "::-webkit-scrollbar-thumb": {
                                    background: { md: "gray", sm: "none" },
                                },
                            }}
                        >
                            <Flex gap={{ md: 1, sm: 2 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                                {userData.friends
                                    .filter((friends) => {
                                        return searchValue.toLowerCase() == "" ? friends : friends.userName.toLowerCase().includes(searchValue)
                                    })
                                    .map((i) => (
                                        <FriendInviteList key={i.userName} userName={i.userName} userProfile={i.profile} isSelected={i.isSelected} />
                                    ))}
                            </Flex>
                        </Box>
                    </Box>

                    <FormControl>
                        <FormLabel sx={isDesktop ? desktopStyle.title : mobileStyle.title}>Description</FormLabel>
                        <FormHelperText mb="2">
                            <Text color={{ base: "gray.600", md: "#FFFFFF" }}>Describe your community so people know what it's about.</Text>
                        </FormHelperText>
                        <Textarea
                            focusBorderColor="none"
                            sx={isDesktop ? desktopStyle.input : mobileStyle.input}
                            value={communityDesc}
                            onChange={(e) => setCommunityDesc(e.target.value)}
                            // placeholder="Type your group description here"
                            size="sm"
                            background={"white"}
                            color="black"
                        />
                    </FormControl>
                    <Button
                        width="full"
                        mt={{ md: 4 }}
                        sx={isDesktop ? desktopStyle.button1 : mobileStyle.button1}
                        isLoading={false}
                        type="submit"
                        isDisabled={communityName === ""}
                        onClick={onOpen}
                    >
                        Edit Community
                    </Button>
                    {/* </form> */}

                    {/* Modal for confirmation */}
                    <Modal isOpen={isOpen} onClose={onClose} isCentered>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader> Edit your community!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody mt={'-2'}>
                                Are you sure you want to save?
                            </ModalBody>
                            <ModalFooter>
                                <Link to={`/groups/id/${communityID}/`}>
                                    <Button onClick={submit} colorScheme="blue" mr={3} boxShadow='md'>
                                        Sure
                                    </Button>
                                </Link>
                                <Button variant="cancel" onClick={onClose} boxShadow='md'>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    {/* Tag bar */}
                    <Drawer
                        placement="bottom"
                        onClose={() => {
                            setIsTagBarOpen(false)
                            if (selectedTag.length != 0) {
                                setUpdatedTag(selectedTag)
                                setCreateTag([])
                                selectedTag.forEach((item: any) => {
                                    setCreateTag((createTag: any) => [...createTag, item.tagName])
                                });
                            }
                        }}
                        isOpen={isTagBarOpen}
                    >
                        <DrawerOverlay />
                        <DrawerContent mx={{ base: "5", md: "10%", lg: "20%" }} width="auto" backgroundColor="#e67f45" borderTopRadius="3rem" pb="20">
                            <DrawerBody pt="6" display="flex" flexWrap="wrap" gap="2">
                                {tags.map((tag:any) => (
                                    <Tooltip hasArrow arrowSize={5} borderRadius="xl" label={tag?.tagDesc}>
                                        <Tag
                                            key={tag.tagId}
                                            _hover={{ cursor: "pointer" }}
                                            shadow="lg"
                                            borderRadius="full"
                                            px="4"
                                            py="2"
                                            fontWeight="bold"
                                            bg={tag.isSelected ? "#444444" : "#FFFFFF"}
                                            color={tag.isSelected ? "#FFFFFF" : "#444444"}
                                            onClick={() => handleAddTag(tag)}
                                        >
                                            {tag.tagName}
                                        </Tag>
                                    </Tooltip>
                                ))}
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>
                <Box width="full" display={{ base: "none", md: "block" }}>
                    <Flex justifyContent="center" width="full">
                        <Box sx={{ transition: "width 0.8s", transitionTimingFunction: "ease-in-out" }} width={preview ? "full" : "350px"}>
                            <Box borderTopRadius="xl" bg="#e67f45" px="3" pt="5">
                                <Flex
                                    justifyContent="space-between"
                                    direction="row"
                                    borderTopRadius="md"
                                    bg="white"
                                    px="4"
                                    py="2"
                                    color="#FFFFFFF"
                                    fontSize="md"
                                    as="b"
                                >
                                    <Text>{preview ? "Desktop Preview" : "Mobile Priview"}</Text>
                                    <Flex direction="row" alignItems="center" justifyContent="center" gap="2">
                                        <Tooltip hasArrow arrowSize={5} borderRadius="md" label="Click for switch to mobile preview">
                                            <Box
                                                borderRadius="md"
                                                px="3"
                                                py="1"
                                                _hover={{ cursor: "pointer" }}
                                                color="white"
                                                bg={preview ? "gray.300" : "gray.500"}
                                                onClick={() => setPreview(false)}
                                            >
                                                <HiOutlineDevicePhoneMobile />
                                            </Box>
                                        </Tooltip>
                                        <Tooltip hasArrow arrowSize={5} borderRadius="md" label="Click for switch to desktop preview">
                                            <Box
                                                borderRadius="md"
                                                px="3"
                                                py="1"
                                                _hover={{ cursor: "pointer" }}
                                                color="white"
                                                bg={preview ? "gray.500" : "gray.300"}
                                                onClick={() => setPreview(true)}
                                            >
                                                <MdDesktopWindows />
                                            </Box>
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                            </Box>
                            <Box p="5" px="3" bg="#e67f45" paddingTop="5rem" borderBottomRadius="xl">
                                <CreateEditNav
                                    disabled={true}
                                    name={communityName ? communityName : "Community Name"}
                                    privacy={communityPrivacy}

                                    desc={
                                        communityDesc
                                            ? communityDesc
                                            : "Lorem eiei ipsum dolor sit, amet consectetur adipisicing elit. Dicta vitae non voluptates nisi quisquam necessitatibus doloremque neque voluptatum. Maiores facilis nulla sit quam laborum nihil illum culpa incidunt tempore obcaecati!"
                                    }
                                    photo={previewPhoto ? previewPhoto : (import.meta.env.VITE_APP_ORIGIN || "") + "/group/getpic/" + data?.community.id}
                                    memberCount={1}
                                    tags={updatedTag}
                                />
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Flex >
        </AppBody >
    )
}

export default editCommunity