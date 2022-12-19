import {
    Avatar,
    Box,
    Button,
    Center,
    Checkbox,
    Editable,
    EditablePreview,
    EditableTextarea,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppBody from "src/components/share/app/AppBody"
import LList from "src/components/shortlink/LList"
import API from "src/function/API"

const history = () => {
    const [linkdata, setlinkdata] = useState<any>()

    async function fetch() {
        const res = await API.get(`/shortlink/getlink`)
        console.log(res)
        setlinkdata([...res.data.link])
    }

    const didFetchRef = useRef(false)
    useEffect(() => {
        if (didFetchRef.current) return
        fetch()

        return () => {
            didFetchRef.current = true;
        }
    }, [])

    console.log(linkdata)
    // ---------------------------------
    const handleDelete = async (shortenLink: string, slId: string) => {
        try {
            await API.post("/shortlink/deletelink", { slId })
            setlinkdata(linkdata.filter((item: { shortenLink: string }) => item.shortenLink !== shortenLink))

        } catch (err) {

        }
    }

    return (
        <AppBody>
            <Center>
                <Box width={{ base: '100%', sm: '70%', md: '70%', lg: '70%', xl: '70%' }} height={"500px"} background={"white"} borderRadius="20px" alignSelf={"center"} alignItems={"center"} alignContent={"center"} marginTop={"10%"} >
                    <Box>
                        <Heading
                            width={"300px"}
                            height={"50px"}
                            marginLeft={"10%"}
                            marginTop={"-5"}
                            background={"orange.200"}
                            borderRadius={"10px"}
                            fontSize={"xl"}
                            border={"3px solid white"}
                            textAlign={"center"}
                            textColor="white"
                        >
                            SHORTLINK HISTORY
                        </Heading>
                    </Box>

                    <VStack spacing={5} align="stretch" marginBottom={"100%"} >
                        <Center>
                            <Box w="100" p={5} color="white" alignItems={"center"}>

                                {/* ------------------------ */}
                                <HStack spacing="24px">

                                    <Box w="400px" h="430px" overflowWrap={'normal'} overflow="scroll">
                                        <Flex rounded="xl" gap={{ md: 1, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                                            {linkdata && linkdata.map((link: { shortenLink: string, slId: string }, index: any) =>
                                                (<LList key={index} shortenLink={link.shortenLink} slId={link.slId} handleSelect={handleDelete} />))}
                                        </Flex>
                                    </Box>
                                </HStack>
                                {/* ------------------------ */}

                            </Box>
                        </Center>
                        {/* ----- problem 1 ----- */}
                        {/* <Box>
                            <Button bg={"orange.600"} w={"20%"} height={"60px"} onClick={shortlink}  marginTop={"43%"}>
                                <Text as={"b"}>Return</Text>
                            </Button>
                        </Box> */}
                    </VStack>
                </Box>
            </Center>
        </AppBody>
    )
}
export default history
