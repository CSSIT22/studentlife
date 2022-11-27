import React, { useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"
import FriendList from "../user/FriendList"
import {
    Box,
    Avatar,
    VStack,
    Grid,
    GridItem,
    Button,
    ButtonGroup,
    Stack,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select,
    HStack,
    Link,
    NumberInputField,
    NumberInput,

} from "@chakra-ui/react"

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

interface AboutMeProps {
    phone: string
    sex: string
    hobbies: string
    birthdate: string
    year: string
    address: string
}

interface SimpleThreeColumnsProps {
    onClick: (data: AboutMeProps) => void
}


const SimpleThreeColumns: React.FC<SimpleThreeColumnsProps> = (props) => {
    const user = useContext(authContext)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { onClick } = props

    const { isOpen: isFollowingListOpen, onOpen: onFollowingListopen, onClose: onFollowingListClose } = useDisclosure()
    const { isOpen: isFollowerListOpen, onOpen: onFollowerListopen, onClose: onFollowerListClose } = useDisclosure()
    const btnRef = React.useRef(null)
    let history = useNavigate()
    const param = useParams();
    const [isFollow, setIsFollow] = useState(false)
    const [Phone, setPhone] = useState<any>()
    const [BirthDate, setBirthDate] = useState<any>()
    const [Sex, setSex] = useState<any>()
    const [Hobbies, setHobbies] = useState<any>()
    const [Years, setYears] = useState<any>()
    const [Address, setAddress] = useState<any>()
    useEffect(() => {
        API.get(`/profile/edit/${param.userID}`).then((res) => {
            console.log(res.data)
        })
    }, [])

    const postData = () => {
        onClick({
            phone: Phone,
            sex: Sex,
            hobbies: Hobbies,
            birthdate: BirthDate,
            year: Years,
            address: Address,
        })
        API.post(`profile/edit/${param.userID}`, {
            Phone,
            BirthDate,
            Sex,
            Hobbies,
            Years,
            Address
        }).then(() => {
            history("/read")
        })
    }


    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }
    // 3. Extend the theme

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
                    <VStack align="stretch" alignItems="center" ml={7}>
                        <motion.div animate={{ rotate: 360 }} transition={{ type: "spring", duration: 2, bounce: 0.6 }}>
                            <Avatar
                                pt={2}
                                mt={{ md: "-70px", base: "0" }}
                                display="flex"
                                position="initial"
                                float={"inline-end"}
                                size={{ md: "3xl", base: "2xl" }}
                                shadow="xl"
                                src={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + user?.userId}
                            />
                        </motion.div>{" "}
                        <Box textAlign="center" color="gray.600" my={4} fontSize={"1xl"} fontWeight={200} fontFamily={"body"}>
                            Rating : 9999
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem pl="2" mt={{ base: "3", md: "0", lg: "15" }} ml={{ base: "10", lg: "" }} alignSelf={"end"} area={"main"} color="gray.700">
                    <HStack p={1} ml="3">
                        <Box fontSize={{ lg: "md", base: "sm" }} color="orange.700">
                            ID :
                        </Box>
                        <Box fontSize={{ lg: "lg", base: "md" }}>{user?.studentId}</Box>
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
                            {" "}
                            <Box fontSize={{ lg: "5xl", base: "xl" }}>
                                {user?.fName} {user?.lName}
                            </Box>
                        </motion.div>
                    </Stack>

                    <Stack direction={{ base: "column", lg: "row" }} alignItems="flex-start" spacing={-0.5} mb="5">

                        <Stack p={1} direction="row" alignItems="center">
                            <Box fontSize={{ base: "sm", lg: "lg" }} display={{ base: "block", lg: "none" }} color="orange.700">
                                Faculty :
                            </Box>
                            <Box fontSize={{ base: "md", lg: "xl" }}>SIT</Box>
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
                            <Box fontSize={{ base: "md", lg: "xl" }}>Computer Science</Box>
                        </Stack>
                    </Stack>
                </GridItem>
                <GridItem pl="2" area={"footer"} rounded="xl" ml={{ base: "3", md: "10", lg: "6" }}>
                    <ButtonGroup color="white" variant="solid" spacing={{ base: "1.5", sm: "3" }}>
                        <motion.div whileHover={{ scale: 0.9 }}>
                            <Button
                                pl={5}
                                width={{ lg: "7rem", base: "" }}
                                height={{ lg: "3rem", base: "2rem" }}
                                fontSize={{ base: "", lg: "lg" }}
                                bg="orange.600"
                                _hover={{ background: "orange.200" }}
                                position="initial"
                                value="inside"
                                shadow={"lg"}
                                onClick={onOpen}
                            >
                                Edit
                            </Button></motion.div>
                        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>About Me</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <FormControl>
                                        <FormLabel>Phone</FormLabel>
                                        <Input ref={initialRef} placeholder="Phone Number" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                                    </FormControl>

                                    <HStack mt={4}>
                                        <FormControl>
                                            <FormLabel>Birth Date</FormLabel>
                                            <Input
                                                placeholder="Select Date and Time"
                                                size="md"
                                                type="date"
                                                value={BirthDate}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                            />
                                        </FormControl>
                                    </HStack>

                                    <FormControl mt={4}>
                                        <FormLabel>Sex</FormLabel>
                                        <Select value={Sex} onChange={(e) => setSex(e.target.value)}>
                                            <option> </option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>LGBTQ+</option>
                                        </Select>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Hobby</FormLabel>
                                        <Input placeholder="your favorite free time activity" value={Hobbies} onChange={(e) => setHobbies(e.target.value)} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Years</FormLabel>
                                        <NumberInput value={Years} onChange={() => {
                                            const currentYear = parseInt((new Date().getFullYear() + 543).toString().substring(2))
                                            const userYear = parseInt((user?.studentId || "0").substring(0, 2))
                                            const uniYear = currentYear - userYear
                                            console.log(currentYear)
                                            console.log(userYear)
                                            console.log(uniYear)
                                            setYears(uniYear)

                                        }}>
                                            <NumberInputField />
                                        </NumberInput>
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>ADDRESS</FormLabel>
                                        <Input placeholder="your address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <motion.div whileHover={{ scale: 0.9 }}>
                                        <Button onClick={postData} type='submit' color="white" bg="orange.600"
                                            _hover={{ background: "orange.200" }} mr={3}>
                                            Save
                                        </Button>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 0.9 }}>
                                        <Button onClick={onClose} _hover={{ background: "gray.300" }}>Cancel</Button></motion.div>

                                </ModalFooter>
                            </ModalContent>
                        </Modal><motion.div whileHover={{ scale: 0.9 }}>
                            <Button
                                pl={5}
                                bg="orange.600"
                                _hover={{ background: "orange.200" }}
                                width={{ lg: "9rem", base: "" }}
                                height={{ lg: "3rem", base: "2rem" }}
                                fontSize={{ base: "", lg: "lg" }}
                                position="initial"
                                shadow={"lg"}
                            >
                                Create blog
                            </Button></motion.div>{" "}
                    </ButtonGroup>
                </GridItem>
                <GridItem rounded="xl" area={"followlist"} mt={{ base: "-2rem", md: "3rem" }} mr={5}>
                    <Stack direction="row" mx={{ base: "50", lg: "" }} spacing={{ base: "", md: "" }}>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-1.5", md: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>
                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowerListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700">
                                    Follower
                                </Box>

                                <Modal onClose={onFollowerListClose} finalFocusRef={btnRef} isOpen={isFollowerListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Follower</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFollowerListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                        <Stack direction="column" alignItems="center" mr={3} spacing={{ base: "-3.5", lg: "" }}>
                            <Box fontSize={{ base: "lg", lg: "2xl" }}>0</Box>

                            <Link style={{ textDecoration: "none" }} ref={btnRef} onClick={onFollowingListopen}>
                                <Box fontSize={{ base: "lg", lg: "2xl" }} color="orange.700" mt="0.5rem">
                                    Following
                                </Box>

                                <Modal onClose={onFollowingListClose} finalFocusRef={btnRef} isOpen={isFollowingListOpen}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Following</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody rounded="xl">
                                            <FriendList />
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onFollowingListClose} display={{ base: "none", md: "block" }}>
                                                Close
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Link>
                        </Stack>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
        // Help me goddddd it almost finish but my eyes can handle much any more sorry for what i done this is the end of me nowww thank you everyone for support me and help me love you mom dad and my bro sry to be a
        // croward sorry
    )
}

export default SimpleThreeColumns