import { HStack, Box, Image, Text, Button, Flex, background, Popover, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, IconButton, Input, useDisclosure, } from "@chakra-ui/react"
import React, { FC, useState, } from "react"
import { TiWarning } from "react-icons/ti";
import { Link } from "react-router-dom";
import { MdPublic, MdPublicOff } from "react-icons/md"
import { BsThreeDots } from "react-icons/bs";
import { FaBan, FaExclamationCircle, FaHandMiddleFinger, FaUserLock, FaUserShield, FaUser } from "react-icons/fa";
import FriendInviteList from "./FriendInviteList";
import { SearchIcon } from "@chakra-ui/icons";
import { userData } from "src/pages/groups/data";
import InvitationBox from "./InvitationBox";
import useWindowDimensions from "src/pages/groups/hooks/useWindowDimensions";



const CommunityList: FC<{ disableInvite?: boolean; disableBtn?: boolean; activeBtn?: number; tags?: any; communityID: number; communityName: string; coverPhoto: string; isPrivate: boolean, description: string, isMember: boolean, members: number }> = ({
    communityID,
    communityName,
    coverPhoto,
    isPrivate,
    tags,
    description,
    isMember,
    members,
    activeBtn,
    disableInvite,
    disableBtn,
}) => {
    //t
    const [isModalOpen, setModalOpen] = useState(false);
    const modalOnClick = () => setModalOpen(!isModalOpen)

    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)
    const handleSearchBtn = () => {
        setSearchValue("")
    }
    const { height, width } = useWindowDimensions()
    //t
    const [isSureOpen, setSureOpen] = useState(false);
    const sureOnClick = () => {
        setSureOpen(!isSureOpen)
        console.log(isSureOpen);
    }
    const closeInvite = () => {
        setModalOpen(false)
        setSureOpen(false)
    }

    return (

        <Box  >
            <Image sx={{
                // backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                // position: "absolute",
                marginTop: "-5rem",
                // left: 0,
                // top: 0,
                // right: 0,
                // bottom: 0,
                // backgroundPosition: "center",
                width: "100%",
                // height: "100px",
                // backgroundPosition: "bottom",
                // backgroundSize: "initial",
                objectFit: "cover",
                objectPosition: "center",
                height: "15rem",
                // height: "300px",

            }} src={coverPhoto}
                fallbackSrc='https://via.placeholder.com/800'
            />
            <Box p={4} borderBottomRadius="md" backgroundColor={"white"} boxShadow={'2xl'}>
                <HStack justify={"space-between"}>
                    <div>
                        <Text as="b">{communityName}</Text>
                        <Box display="flex" fontSize={"sm"} alignItems="center" gap={1}>
                            {isPrivate ? <MdPublicOff /> : <MdPublic />}
                            <Text>
                                {isPrivate ? "Private Community" : "Public Community"} • {members} {members > 1 ? "members" : "member"}
                            </Text>
                        </Box>
                    </div>
                    <div>
                        {isMember ? <HStack>
                            <Button disabled={disableInvite} onClick={modalOnClick} size="sm" background={'orange.500'} _hover={{ background: 'orange.200', cursor: 'pointer' }} color={'white'} >
                                Invite
                            </Button>

                            {(width || 0) > 768 ? (
                                <Modal closeOnOverlayClick={true} isOpen={isModalOpen} onClose={modalOnClick} isCentered >
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader mt={6} mb={-4} fontWeight={700}>
                                            Invite your friends to join this community!
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <Box borderRadius={'md'}>
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
                                                            onChange={handleChange}
                                                            placeholder="Seacrh for friends"
                                                            focusBorderColor="gray.200"
                                                        ></Input>
                                                    </Box>
                                                </HStack>

                                                <Box background={{ md: 'white', base: '' }}
                                                    height={{ sm: '200px', md: '350px' }}
                                                    padding={2}
                                                    paddingRight={1}
                                                    borderRadius={'md'}
                                                    mb={{ md: 0, sm: 4 }}
                                                    mt={{ md: 0, sm: 4 }}
                                                    sx={{
                                                        "-webkit-overflow-scrolling": "touch" /* enables momentum-scrolling on iOS */,
                                                        overflowY: "scroll",
                                                        scrollBehavior: "smooth",

                                                        "::-webkit-scrollbar-track": {
                                                            background: "white",
                                                            rounded: 'xl',
                                                        },
                                                        "::-webkit-scrollbar-thumb": {
                                                            background: { md: "#444444", sm: "none" },
                                                        },
                                                    }}>

                                                    <Flex gap={{ md: 2, sm: 3 }} direction='column' ml={1} color={'black'} borderRadius={'md'} >

                                                        {
                                                            userData.friends.
                                                                filter((friends) => {
                                                                    return searchValue.toLowerCase() == "" ? friends : friends.userName.toLowerCase().includes(searchValue)
                                                                }).map((i) => (
                                                                    <FriendInviteList
                                                                        key={i.userName}
                                                                        userName={i.userName}
                                                                        userProfile={i.profile}
                                                                        isSelected={i.isSelected}
                                                                    />
                                                                ))}
                                                    </Flex>
                                                </Box>
                                            </Box>
                                        </ModalBody>
                                        <ModalFooter >
                                            <Button colorScheme='blue' mr={3} onClick={sureOnClick}>
                                                Confirm
                                            </Button>
                                            <Modal closeOnOverlayClick={false} isOpen={isSureOpen} onClose={sureOnClick} isCentered>
                                                <ModalOverlay />
                                                <ModalContent>
                                                    <ModalHeader>Finished</ModalHeader>
                                                    <ModalCloseButton onClick={closeInvite} />
                                                    <ModalBody>
                                                        Invite has been sent!
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button onClick={closeInvite}>Close</Button>
                                                    </ModalFooter>
                                                </ModalContent>
                                            </Modal>
                                            <Button onClick={modalOnClick}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>) : (<div />)}

                            <Popover >
                                <PopoverTrigger  >
                                    <Button disabled={disableInvite} _hover={{ cursor: 'pointer' }} p={2} borderRadius="md">
                                        <BsThreeDots fontSize={"25px"} />
                                    </Button>
                                </PopoverTrigger>
                                <Portal >
                                    <PopoverContent width="180px">
                                        <PopoverBody>
                                            <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                                <FaExclamationCircle />
                                                <Link to={`/groups/id/${communityID}/edit`} >
                                                    <Text _hover={{ textDecoration: "none" }}>Edit Community</Text>
                                                </Link>
                                            </Box>
                                            <Box gap={1} _hover={{ cursor: "pointer" }} display="flex" alignItems={"center"}>
                                                <FaBan />
                                                <Text>Leave Community</Text>
                                            </Box>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        </HStack> : <Button size="sm" background={'orange.500'} _hover={{ background: 'orange.200' }} color={'white'}>Join</Button>}
                    </div>
                </ HStack>

                <Flex mt={2} flexWrap={"wrap"} gap={1}>
                    {
                        tags.map((t: any) => <Box backgroundColor={"orange.500"} color={'white'} fontWeight={'medium'} px={3} borderRadius={"md"} fontSize="xs" key={t.tagID}>{t.tagName}</Box>)
                    }
                </Flex>

                <Text mt={2} fontSize="xs" padding={1} >{description}</Text>
                <Flex gap={2} mt={3}>
                    <Link to={disableBtn ? "" : `/groups/id/${communityID}/`} relative='path'><Button backgroundColor={"white"} _hover={{ background: 'default' }} size={"sm"} isActive={(activeBtn == 1 && !isPrivate ? true : false)} disabled={isPrivate}>Discussion</Button></Link>
                    <Link to={disableBtn ? "" : `/groups/id/${communityID}/member`} relative='path'><Button backgroundColor={"white"} _hover={{ background: 'default' }} size={"sm"} isActive={(activeBtn == 2 && !isPrivate ? true : false)} disabled={isPrivate}>Member</Button></Link>
                    <Link to={disableBtn ? "" : `/groups/id/${communityID}/file`} relative='path'><Button backgroundColor={"white"} _hover={{ background: 'default' }} size={"sm"} isActive={(activeBtn == 3 && !isPrivate ? true : false)} disabled={isPrivate}>File</Button></Link>
                </Flex>

            </Box >

            <Flex direction="column" justify={"center"} align="center" mt={3}>
                {(isPrivate && (communityID != 1000)) ? (<Box borderRadius="md" backgroundColor="red.200" maxWidth={"700px"} width={"100%"}>
                    <HStack gap={2} p={2}>
                        <Box height={"55px"}></Box>
                        <div >
                            <Box display="flex" alignItems="center" gap={1}>
                                <TiWarning />
                                <Text as="b" fontSize="sm">
                                    This Community is Private :(
                                </Text>
                            </Box>
                            <Text fontSize="sm">Join this Community to view or participate in
                                discussions.</Text>
                        </div>
                    </HStack>
                </Box>) : ""}
            </Flex >

        </Box >

    )
}

export default CommunityList
