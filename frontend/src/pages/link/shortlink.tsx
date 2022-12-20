import { Box, Button, Center, Heading, Link, VStack, Text, PopoverBody, PopoverContent, Popover, PopoverCloseButton, PopoverArrow, PopoverTrigger } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import { motion } from "framer-motion"
import { RiHistoryLine } from 'react-icons/ri'
import { FaPlus } from 'react-icons/fa'
import {TbTools} from 'react-icons/tb'
import {RiLockPasswordLine} from 'react-icons/ri'
import {BiUserCheck} from 'react-icons/bi'

const shortlink = () => {
    const navigate = useNavigate()
    const customize = () => {
        navigate("/link/customize")
    }
    const generate = () => {
        navigate("/link/generate")
    }
    const history = () => {
        navigate("/link/history")
    }
    const customper = () => {
        navigate("/link/customper")
    }
    return (
        <AppBody>
            <Center>
                {" "}
                <Box width={"80%"} height={"25rem"} border={"4px"}
                    borderColor={"orange"} background={"white"} borderRadius="20px"
                    marginTop={"10%"} textColor="white">

                    <Box>
                        <Heading
                            width={{ base: "200px", md: "300px" }}
                            height={{ base: "2rem", md: "3rem" }}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"white"}
                            borderRadius={"10px"}
                            fontSize={{ md: "xl", base: "md" }}
                            border={"3px solid orange"}
                            textAlign={"center"}
                            color={"orange"}
                        >
                            SHORTLINK FEATURE
                        </Heading>
                    </Box>

                    <VStack spacing={10} align="center" marginTop={"10%"} ml={"-2rem"} >
                        <Box h="2rem">
                            <Box width={"100%"}>

                                <Center>
                                    <Popover>
                                        <PopoverTrigger>
                                            <motion.div whileHover={{ scale: 0.9 }}
                                                onHoverStart={e => { }}
                                                onHoverEnd={e => { }}>
                                                <Button bg={"#E65300"} w={"130%"} height={"3rem"} textColor="white" gap={"0.5rem"}>
                                                <TbTools/><Text fontSize={"md"} as={"b"}>CUSTOMIZE</Text>
                                                </Button></motion.div>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />

                                            <PopoverBody>
                                                <Button bg={"orange.600"} w={"100%"} mt={3} onClick={customize} textColor="white" gap={"0.5rem"}>
                                                <RiLockPasswordLine/> Password
                                                </Button>

                                                <Button bg={"orange.600"} w={"100%"} mt={3} onClick={customper} textColor="white" gap={"0.5rem"}>
                                                <BiUserCheck/> Permission
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Center>

                            </Box>
                        </Box>
                        <Box h="2rem">
                            <Center>
                                <motion.div whileHover={{ scale: 0.9 }}
                                    onHoverStart={e => { }}
                                    onHoverEnd={e => { }}>
                                    <Button bg={"#E65300"} w={"130%"} height={"3rem"} textColor="white" onClick={generate} gap={"0.5rem"}>
                                        <FaPlus /><Text as={"b"}>GENERATOR</Text>
                                    </Button>
                                </motion.div>
                            </Center>
                        </Box>
                        <Box h="2rem">
                            <Link>
                                <Center>
                                    <motion.div whileHover={{ scale: 0.9 }}
                                        onHoverStart={e => { }}
                                        onHoverEnd={e => { }}>
                                        <Button bg={"#E65300"} w={"130%"} height={"3rem"} onClick={history} textColor="white" gap={"0.5rem"} >
                                            <RiHistoryLine /><Text as={"b"}>HISTORY</Text>
                                        </Button>
                                    </motion.div>
                                </Center>
                            </Link>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default shortlink
