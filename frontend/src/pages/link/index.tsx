import AppBody from "src/components/share/app/AppBody"
import { Button, Container, Flex, Box, Text, Link, Stack, Grid, Center,GridItem } from "@chakra-ui/react"
import { EditIcon, LinkIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {HiLink} from 'react-icons/hi'
import {FaRegSave} from 'react-icons/fa'

const Home = () => {
    const navigate = useNavigate()
    const navigate1 = () => {
        navigate("/link/shortlink")
    }
    const navigate2 = () => {
        navigate("/link/savelink")
    }
    return (
        <AppBody>
            <Box bgColor={"#ffffff"} rounded={"xl"} mt={"3rem"} p={"5"} border={"4px"}
                borderColor={"#ffd500"}>
                <Stack direction={"column"} textAlign={"center"}>
                    <Grid
                        templateAreas={{md:`"header header"
                  "nav main"
                  `, base : `"header"
                  "main"
                  "nav"
                  `}}
                        gridTemplateRows={'50px 1fr'}
                        gridTemplateColumns={{md:'70% 1fr',base:'100%'}}
                        h='100%'
                        gap='1'
                        color='blackAlpha.700'
                        fontWeight='bold'
                    >
                        <GridItem pl='2' bg='' area={'header'}>
                            <Box bgColor={"orange"} rounded={"xl"} mt={"1rem"}>
                                SHORTLINK FEATURE</Box>
                        </GridItem>
                        <GridItem pl='2' area={'nav'} fontWeight={"medium"}>
                                Make your link to be a shorten link for convenience  and more security.
                                We have 2 Type of shortlink that are Shortlink Customize which you can add your security for your shortlink by password or select user permission to access your link  and Shortlink generator that you can shorten your link for 1 click!
                        </GridItem>
                        <GridItem pl='2' area={'main'} alignContent={"flex-end"}>
                            <Center flexDirection={"column"}>
                        <motion.div whileHover={{ scale: 1.2 }}
                                onHoverStart={e => { }}
                                onHoverEnd={e => { }}><HiLink size={"6rem"}/></motion.div>

                            <motion.div whileHover={{ scale: 0.9, color: "orange"}}
                            whileTap={{ scale: 1.2 }}
                                onHoverStart={e => { }}
                                onHoverEnd={e => { }}>
                                <Button size="md" borderRadius="100" mt={"2rem"} fontWeight={"extrabold"} 
                                padding="5" background={"orange.300"} onClick={navigate1}>
                                    CLICK
                                </Button>
                            </motion.div></Center>
                        </GridItem>
                    </Grid>

                    <Grid
                        templateAreas={{md:`"header header"
                        "nav main"
                        `, base : `"header"
                        "nav"
                        "main"
                        `}}
                        gridTemplateRows={'50px 1fr'}
                        gridTemplateColumns={{md:'30% 1fr',base:'100%'}}
                        h='100%'
                        gap='1'
                        color='blackAlpha.700'
                        fontWeight='bold'
                    >
                        <GridItem pl='2' area={'header'}>
                            <Box bgColor={"green.300"} rounded={"xl"} mt={"1rem"}>
                                SAVELINK FEATURE</Box>
                        </GridItem>
                        <GridItem pl='2' area={'nav'}>
                        <Center flexDirection={"column"}>
                        <motion.div whileHover={{ scale: 1.2 }}
                                onHoverStart={e => { }}
                                onHoverEnd={e => { }}><FaRegSave size={"6rem"}/></motion.div>

                    
                            <motion.div whileHover={{ scale: 0.9,color: "green" }}
                                onHoverStart={e => { }}
                                onHoverEnd={e => { }}>
                                <Button size="md" mt={"1rem"} fontWeight={"extrabold"} borderRadius="100" padding="5" background={"green.500"} onClick={navigate2}>
                                    CLICK
                                </Button></motion.div></Center>
                        </GridItem>
                        <GridItem pl='2' fontWeight={"medium"} area={'main'}>
                            Save the link what you want to collect in All-link!
                        </GridItem>
                    </Grid>
                </Stack>
            </Box>


        </AppBody>
    )
}

export default Home


{/* <Button size="md" borderRadius="100" padding="5" background={"orange.200"} onClick={navigate1}>
                                            Click
                                        </Button> */}


{/* <Button size="md" borderRadius="100" padding="5" background={"orange.200"} onClick={navigate2}>
                                            Click
                                        </Button> */}