import {
    Box,
    Center,
    Flex,
    Heading,
    HStack,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
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
            <Box>
                <Center>
                    <Box width={"100%"} border={"4px"} height={"40rem"}
                borderColor={"orange"} background={"white"} borderRadius="20px" 
                marginTop={"10%"} textColor="black"  >
                        <Box>
                            <Heading
                                width={{ base: "200px", md: "300px" }}
                                height={{ base: "2rem", md: "2rem" }}
                                marginLeft={"10%"}
                                marginTop={"-5"}
                                background={"white"}
                                borderRadius={"10px"}
                                fontSize={{ base: "sm", md: "xl" }}
                                border={"3px solid orange"}
                                textAlign={"center"}
                                alignSelf={"center"}
                                color={"orange"}
                            >
                                SHORTLINK HISTORY
                            </Heading>
                        </Box>

                        <VStack spacing={5} align="stretch" marginBottom={"100%"} >
                            <Center>
                                <Box w="100" p={5} color="white" alignItems={"center"}>

                                    {/* ------------------------ */}
                                    <HStack spacing="24px">

                                        <Box w={{md:"30rem",base:"100%"}} h="30rem" overflowWrap={'normal'} overflow="scroll">
                                            <Flex rounded="xl" gap={{ md: 1, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                                                {linkdata && linkdata.map((link: { shortenLink: string, slId: string }, index: any) =>
                                                    (<LList key={index} shortenLink={link.shortenLink} slId={link.slId} handleSelect={handleDelete} />))}
                                            </Flex>
                                        </Box>
                                    </HStack>
                                    {/* ------------------------ */}

                                </Box>
                            </Center>
                        </VStack>
                    </Box>
                </Center>
            </Box>
        </AppBody>
    )
}
export default history
