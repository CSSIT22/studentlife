import React, { Ref, useState, useEffect } from "react"
import { buffer_to_img } from "../chat/function/64_to_img"
import { motion } from "framer-motion"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Stack,
    useDisclosure,
    HStack,
    Link,
    Center,
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"
import { ChangeProfileImageModal } from "./customModal/ChangeProfileImageModal"
import { ShowFollowerModal } from "./customModal/ShowFollowerModal"
import { ShowFollowingModal } from "./customModal/ShowFollowingModal"
import { userProfileButtons } from "./userProfileButton/userProfileButtons"
import { userFriendProfileButtons } from "./userFriendProfileButton/userFriendProfileButtons"
import FriendProfileImages from "./UserProfileImages/FriendProfileImages"
import UserProfileImages from "./UserProfileImages/UserProfileImage"

const UserProfile: React.FC<{ isMe: boolean, userData: any, rating: number }> = ({ isMe, userData, rating }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [follower, setFollower] = useState<number>(0)
    const [following, setFollowing] = useState<number>(0)

    // Following Modal
    const { isOpen: isFollowingListOpen, onOpen: onFollowingListopen, onClose: onFollowingListClose } = useDisclosure()
    // Follower Modal
    const { isOpen: isFollowerListOpen, onOpen: onFollowerListopen, onClose: onFollowerListClose } = useDisclosure()

    const btnRef = React.useRef(null)

    let navigate = useNavigate()

    const { isOpen: isProfileOpen, onOpen: onProfileopen, onClose: onProfileClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    useEffect(() =>{
        function fetch(){
            // fetch follower/following api 
            setFollower(10)
            setFollowing(10)
        }
        fetch()
    }, [])

    return (
        <Box maxW="100%" borderRadius="none" position={"initial"} height={"100%"} rounded="2xl" overflow={"unset"} p={5} pt={{ md: "40px", base: "0" }} ml={{ base: "3", md: "0" }}>
            <Grid
                templateAreas={{
                    base: `
                "nav main "
                "nav followlist"
                "nav footer"`,
                    md: `
                  "nav nav"
                  "main main"
                  "followlist footer"`,
                }}
                gridTemplateRows={{ base: "80% 1fr 50%", md: "45% 1fr 20%" }}
                gridTemplateColumns={{ md: "50% 1fr", base: "30% 1fr" }}
                h="100%"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
                bg={{ base: "", md: "white" }}
                shadow={{ base: "", md: "lg" }}
            >
                <GridItem rounded="xl" area={"nav"} mt={5}>
                    <>
                        <VStack align="stretch" alignItems="center" mt="5">
                            {isMe
                                ?
                                <UserProfileImages userData={userData} /> : <FriendProfileImages userData={userData} />}
                            <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                                Rating : {rating}
                            </Box>


                        </VStack>

                    </>
                </GridItem>
                <GridItem pl="2" mt={{ base: "3", md: "0", lg: "3rem" }} ml={{ base: "10", md: "25" }} alignItems={"center"} area={"main"} color="gray.700">
                    <Stack direction={"column"} alignItems={"center"}>
                        <HStack p={1} ml="3" align="stretch" alignItems="center">
                            <Box fontSize={{ lg: "md", base: "sm" }} color="orange.700">
                                ID :
                            </Box>
                            <Box fontSize={{ lg: "lg", base: "md" }}>{userData.studentId}</Box>
                        </HStack>

                        <Stack p={1} direction={{ base: "column", md: "row" }}>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 20,
                                }}
                            >

                                <Stack direction={{ base: "column", md: "row" }} spacing={{ base: "-1", md: "3" }} whiteSpace="nowrap" overflow={"hidden"} textOverflow={"ellipsis"}>
                                    <Box fontSize={{ xl: "2em", lg: "3xl", base: "xl" }}>{userData.fName}</Box>
                                    <Box fontSize={{ xl: "2em", lg: "3xl", base: "xl" }}>{userData.lName}</Box>
                                </Stack>
                            </motion.div>
                        </Stack>

                        <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">

                            <Stack p={1} direction="row" alignItems="center">
                                <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                    Faculty :
                                </Box>
                                <Box fontSize={{ base: "md", lg: "xl" }}>{userData.facultyId}</Box>
                                <Box fontSize={{ base: "lg", lg: "lg" }} display={{ base: "none", lg: "block" }} color="orange.700">
                                    ,
                                </Box>
                            </Stack>

                            <Stack
                                p={1}
                                direction={{ base: "row", lg: "row" }}
                                alignItems={{ base: "center", md: "flex-start", lg: "center" }}
                                spacing={{ base: "2", md: "2", lg: "2" }}
                            >
                                <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                    Major :
                                </Box>
                                <Box fontSize={{ base: "md", lg: "xl" }}>{userData.majorId}</Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "3", md: "10", lg: "3" }} mt={"3"}>
                    <Center>
                        {
                            isMe ?
                                (userProfileButtons(onOpen, initialRef, finalRef, onClose, isOpen, navigate))
                                :
                                (userFriendProfileButtons(onOpen, initialRef, finalRef, onClose, isOpen, navigate))

                        }
                    </Center>
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2rem", md: "0" }}>
                    <Center>
                        <Stack direction="row" mx={{ base: "50", lg: "30%" }} align="stretch" alignItems="center" spacing={{ base: "", md: "" }}>
                            <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }}>{follower}</Box>
                                <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowerListopen}>
                                    <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700">
                                        Follower
                                    </Box>
                                </Link>
                                {/* Show Follower List Modal */}
                                <ShowFollowerModal isOpen={isFollowerListOpen} onClose={onFollowerListClose} finalFocusRef={btnRef} onClick={onFollowerListClose} />
                            </Stack>
                            <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", lg: "" }}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }}>{following}</Box>
                                <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowingListopen}>
                                    <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700" mt="0.5rem">
                                        Following
                                    </Box>
                                </Link>
                                {/* Show Following List Modal */}
                                <ShowFollowingModal isOpen={isFollowingListOpen} onClose={onFollowingListClose} finalFocusRef={btnRef} onClick={onFollowingListClose} />
                            </Stack>
                        </Stack>
                    </Center>
                </GridItem>
            </Grid>



        </Box>
    )
}

export default UserProfile

