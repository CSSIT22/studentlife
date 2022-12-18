import React, { Ref } from "react"
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
} from "@chakra-ui/react"

import { useNavigate } from "react-router-dom"
import { ChangeProfileImageModal } from "./customModal/ChangeProfileImageModal"
import { ShowFollowerModal } from "./customModal/ShowFollowerModal"
import { ShowFollowingModal } from "./customModal/ShowFollowingModal"
import { userProfileButtons } from "./userProfileButton/userProfileButtons"
import { userFriendProfileButtons } from "./userFriendProfileButton/userFriendProfileButtons"

const UserProfile: React.FC<{ isMe: boolean, userData: any, rating: number }> = ({ isMe, userData, rating }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // Following Modal
    const { isOpen: isFollowingListOpen, onOpen: onFollowingListopen, onClose: onFollowingListClose } = useDisclosure()
    // Follower Modal
    const { isOpen: isFollowerListOpen, onOpen: onFollowerListopen, onClose: onFollowerListClose } = useDisclosure()

    const btnRef = React.useRef(null)

    let navigate = useNavigate()

    const { isOpen: isProfileOpen, onOpen: onProfileopen, onClose: onProfileClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    return (
        <Box maxW="100%" borderRadius="none" rounded="2xl" overflow="hidden" p={5} pt={{ md: "45px", base: "0" }} ml={{ base: "3", md: "0" }}>
            <Grid
                templateAreas={{
                    base: `
                "nav main "
                "nav followlist"
                "nav footer"`,
                    md: `
                  "nav main followlist"
                  "nav main footer"`,
                }}
                gridTemplateRows={{ base: "80% 1fr 50%", md: "70% 1fr 50%" }}
                gridTemplateColumns={"20% 1fr"}
                h="100%"
                gap="2"
                color="blackAlpha.700"
                fontWeight="bold"
                borderRadius="md"
                bg={{ base: "", md: "white" }}
                shadow={{ base: "", md: "lg" }}
            >
                <GridItem rounded="xl" area={"nav"} mt={5}>
                    <VStack align="stretch" alignItems="center" ml={7} mt="5">
                        <motion.div animate={{ rotate: 360 }} transition={{ type: "spring", duration: 2, bounce: 0.6 }} whileHover={{ scale: 0.9 }}>
                            <Avatar
                                borderRadius='full'
                                mt={{ md: "-70px", base: "0" }}
                                display="flex"
                                position="initial"
                                float={"inline-end"}
                                size={{ md: "3xl", base: "2xl" }}
                                shadow="xl"
                                bg='orange.400'
                                src={`${buffer_to_img(userData?.image?.data)}`}
                                _hover={{ cursor: "pointer" }}
                                onClick={onProfileopen}
                            />
                        </motion.div>{" "}
                        {/* Changing Profile Image Modal */}
                        <ChangeProfileImageModal isProfileOpen={isProfileOpen} onProfileClose={onProfileClose} />

                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : {rating}
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={{ base: "3", md: "0", lg: "15" }} ml={{ base: "10", lg: "" }} alignSelf={"end"} area={"main"} color="gray.700">
                    <HStack p={1} ml="3">
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

                            <Stack direction={{ base: "column", md: "row", lg: "column", xl: "row" }} spacing={{ base: "-1", md: "3" }} whiteSpace="nowrap" overflow={"hidden"} textOverflow={"ellipsis"}>
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
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "3", md: "10", lg: "6" }}>
                    {
                        false ?
                            (userFriendProfileButtons(onOpen, initialRef, finalRef, onClose, isOpen, navigate))
                            :
                            (userProfileButtons(onOpen, initialRef, finalRef, onClose, isOpen, navigate))
                    }
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2rem", md: "3rem" }} mr={5}>
                    <Stack direction="row" mx={{ base: "50", lg: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowerListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700">
                                    Follower
                                </Box>
                            </Link>
                            {/* Show Follower List Modal */}
                            <ShowFollowerModal isOpen={isFollowerListOpen} onClose={onFollowerListClose} finalFocusRef={btnRef} onClick={onFollowerListClose} />
                        </Stack>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", lg: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowingListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700" mt="0.5rem">
                                    Following
                                </Box>
                            </Link>
                            {/* Show Following List Modal */}
                            <ShowFollowingModal isOpen={isFollowingListOpen} onClose={onFollowerListClose} finalFocusRef={btnRef} onClick={onFollowerListClose} />
                        </Stack>
                    </Stack>
                </GridItem>
            </Grid>



        </Box>
    )
}

export default UserProfile

