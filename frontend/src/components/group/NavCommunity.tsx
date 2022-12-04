import {
    HStack,
    Box,
    Image,
    Text,
    Button,
    Flex,
    background,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    IconButton,
    Input,
    useDisclosure,
    useBoolean,
    useToast,
    Tooltip,
} from "@chakra-ui/react"
import React, { FC, useState } from "react"
import { TiWarning } from "react-icons/ti"
import { Link } from "react-router-dom"
import { MdPublic, MdPublicOff } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs"
import { FaBan, FaExclamationCircle, FaHandMiddleFinger, FaUserLock, FaUserShield, FaUser } from "react-icons/fa"
import FriendInviteList from "./FriendInviteList"
import { SearchIcon } from "@chakra-ui/icons"
import { userData } from "src/pages/groups/data"
import useWindowDimensions from "./hooks/useWindowDimensions"
import API from "src/function/API"

const NavCommunity: FC<{
    communityId: string,
    communityName?: string,
    communityCoverPhoto?: string,
    communityPrivacy?: boolean,
    communityDesc?: string,
    communityMembers: number,
    tags?: any,
    role?: string,
    isBlacklist?: boolean,

    isOwner?: boolean,
    isMember: boolean,
    activeBtn?: number,
    disabled?: boolean
    isPending?: boolean
    //user data
    userId?: string,
}> = ({
    isBlacklist,
    isPending,
    userId,
    role,
    activeBtn,
    communityId,
    communityName,
    communityPrivacy,
    communityCoverPhoto,
    communityMembers,
    communityDesc,
    tags,
    isOwner,
    isMember,
    disabled }) => {

        //t
        const [isModalOpen, setModalOpen] = useState(false)
        const modalOnClick = () => setModalOpen(!isModalOpen)

        const [isLeaveOpen, setLeaveOpen] = useState(false)
        const leaveOnClick = () => setLeaveOpen(!isLeaveOpen)

        const [searchValue, setSearchValue] = useState("") //for store search value
        const handleChange = (event: any) => setSearchValue(event.target.value)
        const handleSearchBtn = () => {
            setSearchValue("")
        }
        const { height, width } = useWindowDimensions()
        //t
        const [isSureOpen, setSureOpen] = useState(false)
        const sureOnClick = () => {
            setSureOpen(!isSureOpen)
            console.log(isSureOpen)
        }
        const closeInvite = () => {
            setModalOpen(false)
            setSureOpen(false)
        }

        const [community, setCommunity] = useState<any>()
        const [isError, { on }] = useBoolean()
        const [isLoading, { off }] = useBoolean(true)



        // useEffect(() => {
        //     API.get("/group/getCommunityId/" + communityId)
        //         .then((res) => setCommunity(res.data))
        //         .catch((err) => on())
        //         .finally(() => off())
        // }, [])

        // if (isLoading) {
        //     return (
        //         // will fix the design later
        //         <AppBody>
        //             <Text>Loading...</Text>
        //         </AppBody>
        //     )
        // }
        // if (isError) {
        //     // will fix the design later
        //     return (
        //         <AppBody>
        //             <Box>
        //                 <Text>Something went wrong...</Text>
        //             </Box>
        //         </AppBody>
        //     )
        // }

        // const coverPhoto = community?.communityById.communityPhoto
        // const name = community?.communityById.communityName
        // const isPrivate = community?.communityById.communityPrivacy
        // const tag = community?.tag
        // const desc = community?.communityById.communityDesc
        const toast = useToast()
        const joinOnClick = () => {
            if (!communityPrivacy) {
                API.post("/group/joinCommunity", {
                    communityId: communityId,
                })
                    .then((res) => {
                        toast({
                            title: "Success",
                            description: "Joined the community",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: 'top',
                        })
                    }).catch((err) => {
                        console.log(err)
                        toast({
                            title: "Error",
                            description: "Something went wrong",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: 'top',
                        })
                    })
                leaveOnClick()
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            } else {
                API.post("/group/pendingRequest", {
                    communityId: communityId,
                })
                    .then((res) => {
                        toast({
                            title: "Success",
                            description: "Your request has been sent",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: 'top',
                        })
                    }).catch((err) => {
                        console.log(err)
                        toast({
                            title: "Error",
                            description: "Something went wrong",
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                            position: 'top',
                        })
                    })
                leaveOnClick()
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            }

        }
        const handleOnLeaveCommunity = () => {
            API.delete("/group/leaveCommunity", {
                data: {
                    communityId: communityId,
                }
            })
                .then((res) => {
                    toast({
                        title: "Success",
                        description: "Left the community",
                        status: "success",
                        duration: 5000,
                        position: 'top',
                    })
                }).catch((err) => {
                    console.log(err)
                    toast({
                        title: "Error",
                        description: "Something went wrong",
                        status: "error",
                        duration: 5000,
                        position: 'top',
                    })
                })
            setTimeout(() => {
                document.location.reload()
            }, 2000)
        }
        const deleteCommunity = () => {
            API.delete("/group/deleteCommunity", {
                data: {
                    communityId: communityId,
                }
            })
                .then((res) => {
                    toast({
                        title: "Success",
                        description: "Deleted the community",
                        status: "success",
                        duration: 5000,
                        position: 'top',
                    })
                }).catch((err) => {
                    console.log(err)
                    toast({
                        title: "Error",
                        description: "Something went wrong",
                        status: "error",
                        duration: 5000,
                        position: 'top',
                    })
                })
            setTimeout(() => {
                document.location.reload()
            }, 2000)
        }
        return (
            <Box>
                <Image
                    borderBottomRadius={{ base: "md", sm: "none" }}
                    marginTop={{ base: "-2rem", sm: "-5rem" }}
                    height={{ base: "10rem", sm: "15rem" }}
                    sx={{
                        backgroundRepeat: "no-repeat",
                        // marginTop: "-5rem",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        // height: "15rem",
                    }}
                    src={communityCoverPhoto}
                    // src={"https://storage.googleapis.com/thistinestorage/photos/DSC_5803-Edit-2.jpg"}
                    // fallbackSrc="https://via.placeholder.com/800"
                    fallbackSrc="https://149366088.v2.pressablecdn.com/wp-content/uploads/2017/02/ubuntu-1704-default-wallpaper-750x422.jpg"
                />
                <Box
                    p={4}
                    borderBottomRadius="md"
                    backgroundColor={{ base: "none", sm: "white" }}
                    boxShadow={{ base: "none", sm: "2xl" }}>
                    <Flex direction={{ base: 'column-reverse', xs: 'row' }} justify={"space-between"}>
                        <div>
                            <Text as="b">{communityName ? communityName : "Community Name"}</Text>
                            <Box display="flex" fontSize={"sm"} alignItems="center" gap={1}>
                                {communityPrivacy ? <MdPublicOff /> : <MdPublic />}
                                <Text>
                                    {communityPrivacy ? "Private Community" : "Public Community"} • {communityMembers} {communityMembers > 1 ? "members" : "member"}
                                </Text>
                            </Box>
                        </div>
                        <Box alignSelf={{ base: "flex-end", xs: 'flex-start' }}>
                            {isMember ? (
                                <HStack>
                                    <Button
                                        shadow={{ base: "lg", sm: "xl" }}
                                        disabled={disabled}
                                        onClick={modalOnClick}
                                        size={{ base: "xs", sm: "sm" }}
                                        background='#e65300'
                                        _hover={{ background: "orange.200", cursor: "pointer" }}
                                        color={"white"}
                                        _active={{ background: 'orange.200' }}
                                    >
                                        Invite
                                    </Button>

                                    {(width || 0) > 100 ? (
                                        <Modal closeOnOverlayClick={true} isOpen={isModalOpen} onClose={modalOnClick} isCentered>
                                            <ModalOverlay />
                                            <ModalContent>
                                                <ModalHeader mt={6} mb={-4} fontWeight={700}>
                                                    Invite your friends to join this community!
                                                </ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody pb={6}>
                                                    <Box borderRadius={"md"}>
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
                                                                    _active={{ background: 'default' }}
                                                                />
                                                            </Box>
                                                            <Box width={"100%"} backgroundColor={"white"} color={"black"}>
                                                                <Input
                                                                    width={"100%"}
                                                                    variant={"filled"}
                                                                    type={"search"}
                                                                    value={searchValue}
                                                                    onChange={handleChange}
                                                                    placeholder="Seacrh for friends"
                                                                    focusBorderColor="gray.200"
                                                                ></Input>
                                                            </Box>
                                                        </HStack>

                                                        <Box
                                                            background={{ md: "white", base: "" }}
                                                            height={{ sm: "200px", md: "350px" }}
                                                            padding={2}
                                                            paddingRight={1}
                                                            borderRadius={"md"}
                                                            mb={{ md: 0, sm: 4 }}
                                                            mt={{ md: 0, sm: 4 }}
                                                            sx={{
                                                                "-webkit-overflow-scrolling": "touch" /* enables momentum-scrolling on iOS */,
                                                                overflowY: "scroll",
                                                                scrollBehavior: "smooth",

                                                                "::-webkit-scrollbar-track": {
                                                                    background: "white",
                                                                    rounded: "xl",
                                                                },
                                                                "::-webkit-scrollbar-thumb": {
                                                                    background: { md: "#444444", sm: "none" },
                                                                },
                                                            }}
                                                        >
                                                            {/* <Flex gap={{ md: 2, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                                                                {userData.friends
                                                                    .filter((friends) => {
                                                                        return searchValue.toLowerCase() == ""
                                                                            ? friends
                                                                            : friends.userName.toLowerCase().includes(searchValue)
                                                                    })
                                                                    .map((i) => (
                                                                        <FriendInviteList
                                                                            key={i.userName}
                                                                            userName={i.userName}
                                                                            userProfile={i.profile}
                                                                            isSelected={i.isSelected}
                                                                        />
                                                                    ))}
                                                            </Flex> */}
                                                        </Box>
                                                    </Box>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button colorScheme="blue" mr={3} onClick={sureOnClick}>
                                                        Confirm
                                                    </Button>
                                                    <Modal closeOnOverlayClick={false} isOpen={isSureOpen} onClose={sureOnClick} isCentered>
                                                        <ModalOverlay />
                                                        <ModalContent>
                                                            <ModalHeader>Finished</ModalHeader>
                                                            <ModalCloseButton onClick={closeInvite} />
                                                            <ModalBody>Invite has been sent!</ModalBody>
                                                            <ModalFooter>
                                                                <Button onClick={closeInvite}>Close</Button>
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>
                                                    <Button onClick={modalOnClick}>Cancel</Button>
                                                </ModalFooter>
                                            </ModalContent>
                                        </Modal>
                                    ) : (
                                        <div />
                                    )}

                                    <Popover>
                                        <PopoverTrigger>
                                            <Button
                                                color='white'
                                                shadow={{ base: "lg", sm: "xl" }}
                                                size={{ base: 'xs', sm: "sm" }}
                                                bg='#e65300'
                                                disabled={disabled}
                                                _hover={{ cursor: "pointer" }}
                                                // py={'-3rem'}
                                                // px={4}
                                                borderRadius="md">
                                                <BsThreeDots
                                                    fontSize={"20px"}
                                                />
                                            </Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent width="180px">
                                                <PopoverBody>
                                                    <Box gap={1} _hover={{ cursor: "pointer" }}
                                                        display={isOwner ? "flex" : "none"}
                                                        alignItems={"center"}>
                                                        <FaExclamationCircle />
                                                        <Link to={`/groups/id/${communityId}/edit`}>
                                                            <Text _hover={{ textDecoration: "none" }}>Edit Community</Text>
                                                        </Link>
                                                    </Box>
                                                    <Box
                                                        display={isOwner ? "flex" : "none"}
                                                        onClick={deleteCommunity}
                                                        gap={1}
                                                        _hover={{ cursor: "pointer" }}
                                                        // display="flex"
                                                        alignItems={"center"}
                                                    >
                                                        <FaBan />
                                                        <Text>Delete Community</Text>
                                                    </Box>

                                                    <Box
                                                        display={isOwner ? "none" : "flex"}
                                                        onClick={leaveOnClick}
                                                        gap={1}
                                                        _hover={{ cursor: "pointer" }}
                                                        // display="flex"
                                                        alignItems={"center"}
                                                    >
                                                        <FaBan />
                                                        <Text>Leave Community</Text>
                                                    </Box>
                                                    <Modal closeOnOverlayClick={false} isOpen={isLeaveOpen} onClose={leaveOnClick} isCentered>
                                                        <ModalOverlay />
                                                        <ModalContent>
                                                            <ModalHeader>Leave this community!?</ModalHeader>
                                                            <ModalCloseButton />
                                                            <ModalBody pb={6}>Are you sure you want to leave this community?</ModalBody>

                                                            <ModalFooter>
                                                                <Link
                                                                    to={`/groups/id/${communityId}`}
                                                                >
                                                                    <Button
                                                                        colorScheme="blue" mr={3}
                                                                        onClick={handleOnLeaveCommunity}>
                                                                        sure
                                                                    </Button>
                                                                </Link>
                                                                <Button onClick={leaveOnClick}>Cancel</Button>
                                                            </ModalFooter>
                                                        </ModalContent>
                                                    </Modal>
                                                </PopoverBody>
                                            </PopoverContent>
                                        </Portal>
                                    </Popover>
                                </HStack>
                            ) : (
                                <Tooltip label={isPending ? 'Your request is being processed... please wait for the owner to accept it.' : ''}>
                                    <Button
                                        display={isBlacklist ? "none" : "block"}
                                        isLoading={isPending}
                                        onClick={joinOnClick}
                                        size="sm"
                                        background={"orange.500"}
                                        _hover={{ background: "orange.200" }} color={"white"}>
                                        Join
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>
                    </Flex>

                    <Flex mt={2} flexWrap={"wrap"} gap={1}>
                        {tags?.map((t: any) => (
                            <Box
                                color={{ base: "black", sm: "white" }}
                                shadow={{ base: "md", sm: "lg" }}
                                backgroundColor={{ base: 'white', sm: "orange.500" }}
                                fontWeight={"medium"}
                                px={3}
                                borderRadius={{ base: 'lg', sm: "md" }}
                                fontSize="xs"
                                key={t.tagID}
                            >
                                {t.tagName}
                            </Box>
                        ))}
                    </Flex>

                    <Text mt={2} fontSize="xs" padding={1}>
                        {communityDesc}
                    </Text>
                    <Flex gap={2} mt={3}>
                        <Link to={disabled ? "" : `/groups/id/${communityId}/`} relative="path">
                            <Button
                                shadow={{ base: "md", sm: "lg" }}
                                _active={{ background: "#687999" }}
                                color='white'
                                backgroundColor='#e65300'
                                sx={{ transition: "transform ease 300ms" }}
                                _hover={{ background: "default", cursor: "pointer", transform: "translate(0, -3px)" }}
                                size={{ base: "xs", sm: "sm" }}
                                isActive={activeBtn == 1}
                                disabled={!isMember && communityPrivacy || disabled || isBlacklist}
                            >
                                Discussion
                            </Button>
                        </Link>
                        <Link to={disabled ? "" : `/groups/id/${communityId}/member`} relative="path">
                            <Button
                                shadow={{ base: "md", sm: "lg" }}
                                _active={{ background: "#687999" }}
                                color='white'
                                backgroundColor='#e65300'
                                sx={{ transition: "transform ease 300ms" }}
                                _hover={{ background: "default", cursor: "pointer", transform: "translate(0, -3px)" }}
                                size={{ base: "xs", sm: "sm" }}
                                isActive={activeBtn == 2}
                                disabled={!isMember && communityPrivacy || disabled || isBlacklist}
                            >
                                Member
                            </Button>
                        </Link>
                        <Link to={disabled ? "" : `/groups/id/${communityId}/file`} relative="path">
                            <Button
                                shadow={{ base: "md", sm: "lg" }}
                                _active={{ background: "#687999" }}
                                color='white'
                                backgroundColor='#e65300'
                                sx={{ transition: "transform ease 300ms" }}
                                _hover={{ background: "default", cursor: "pointer", transform: "translate(0, -3px)" }}
                                size={{ base: "xs", sm: "sm" }}
                                isActive={activeBtn == 3}
                                disabled={!isMember && communityPrivacy || disabled || isBlacklist}
                            >
                                File
                            </Button>
                        </Link>
                    </Flex>
                </Box >


            </Box >
        )
    }

export default NavCommunity
