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

const NavCommunity: FC<{
    communityId: string,
    communityName?: string,
    communityCoverPhoto?: string,
    communityPrivacy?: boolean,
    communityDesc?: string,
    tags?: any,

    isMember: boolean,
    communityMembers: number,

    activeBtn?: number,
    disabled?: boolean
}> = ({
    activeBtn,
    communityId,
    communityName,
    communityPrivacy,
    communityCoverPhoto,
    communityMembers,
    communityDesc,
    tags,
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



        return (
            <Box>
                <Image
                    sx={{
                        backgroundRepeat: "no-repeat",
                        marginTop: "-5rem",
                        width: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        height: "15rem",
                    }}
                    src={communityCoverPhoto}
                    // src={"https://storage.googleapis.com/thistinestorage/photos/DSC_5803-Edit-2.jpg"}
                    fallbackSrc="https://via.placeholder.com/800"
                />
                <Box p={4} borderBottomRadius="md" backgroundColor={"white"} boxShadow={"2xl"}>
                    <HStack justify={"space-between"}>
                        <div>
                            <Text as="b">{communityName ? communityName : "Community Name"}</Text>
                            <Box display="flex" fontSize={"sm"} alignItems="center" gap={1}>
                                {communityPrivacy ? <MdPublicOff /> : <MdPublic />}
                                <Text>
                                    {communityPrivacy ? "Private Community" : "Public Community"} • {communityMembers} {communityMembers > 1 ? "members" : "member"}
                                </Text>
                            </Box>
                        </div>
                        <div>
                            {isMember ? (
                                <HStack>
                                    <Button
                                        disabled={disabled}
                                        onClick={modalOnClick}
                                        size="sm"
                                        background={"orange.500"}
                                        _hover={{ background: "orange.200", cursor: "pointer" }}
                                        color={"white"}
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
                                            <Button disabled={disabled} _hover={{ cursor: "pointer" }} p={2} borderRadius="md">
                                                <BsThreeDots fontSize={"25px"} />
                                            </Button>
                                        </PopoverTrigger>
                                        <Portal>
                                            <PopoverContent width="180px">
                                                <PopoverBody>
                                                    <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                                        <FaExclamationCircle />
                                                        <Link to={`/groups/id/${communityId}/edit`}>
                                                            <Text _hover={{ textDecoration: "none" }}>Edit Community</Text>
                                                        </Link>
                                                    </Box>

                                                    <Box
                                                        onClick={leaveOnClick}
                                                        gap={1}
                                                        _hover={{ cursor: "pointer" }}
                                                        display="flex"
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
                                                                <Link to={`/groups/`}>
                                                                    <Button colorScheme="blue" mr={3} onClick={leaveOnClick}>
                                                                        Sure
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
                                <Button size="sm" background={"orange.500"} _hover={{ background: "orange.200" }} color={"white"}>
                                    Join
                                </Button>
                            )}
                        </div>
                    </HStack>

                <Flex mt={2} flexWrap={"wrap"} gap={1}>
                    {tags?.map((t: any) => (
                        <Box
                            backgroundColor={"orange.500"}
                            color={"white"}
                            fontWeight={"medium"}
                            px={3}
                            borderRadius={"md"}
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
                                backgroundColor={"white"}
                                _hover={{ background: "default" }}
                                size={"sm"}
                                isActive={activeBtn == 1 && !communityPrivacy ? true : false}
                                disabled={communityPrivacy}
                            >
                                Discussion
                            </Button>
                        </Link>
                        <Link to={disabled ? "" : `/groups/id/${communityId}/member`} relative="path">
                            <Button
                                backgroundColor={"white"}
                                _hover={{ background: "default" }}
                                size={"sm"}
                                isActive={activeBtn == 2 && !communityPrivacy ? true : false}
                                disabled={communityPrivacy}
                            >
                                Member
                            </Button>
                        </Link>
                        <Link to={disabled ? "" : `/groups/id/${communityId}/file`} relative="path">
                            <Button
                                backgroundColor={"white"}
                                _hover={{ background: "default" }}
                                size={"sm"}
                                isActive={activeBtn == 3 && !communityPrivacy ? true : false}
                                disabled={communityPrivacy}
                            >
                                File
                            </Button>
                        </Link>
                    </Flex>
                </Box>

            <Flex direction="column" justify={"center"} align="center" mt={3}>
                {communityPrivacy && communityId != "" ? (
                    <Box borderRadius="md" backgroundColor="red.200" maxWidth={"700px"} width={"100%"}>
                        <HStack gap={2} p={2}>
                            <Box height={"55px"}></Box>
                            <div>
                                <Box display="flex" alignItems="center" gap={1}>
                                    <TiWarning />
                                    <Text as="b" fontSize="sm">
                                        This Community is Private :(
                                    </Text>
                                </Box>
                                <Text fontSize="sm">Join this Community to view or participate in discussions.</Text>
                            </div>
                        </HStack>
                    </Box>
                ) : (
                    ""
                )}
            </Flex>
        </Box>
    )
}

export default NavCommunity
