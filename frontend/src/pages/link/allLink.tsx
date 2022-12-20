import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Box, Text, HStack, Flex, Heading, VStack } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import SList from "src/components/shortlink/SList"
import API from "src/function/API"
const allLink = () => {

    const [savelink, setsavelink] = useState<any>()

    async function fetch() {
        const res = await API.get(`/shortlink/getsavelink`)
        console.log(res)
        setsavelink([...res.data.link])
    }

    const didFetchRef = useRef(false)
    useEffect(() => {
        if (didFetchRef.current) return
        fetch()

        return () => {
            didFetchRef.current = true;
        }
    }, [])

    const handleDelete = async (shortenLink: string, slId: string) => {
        try {
            await API.post("/shortlink/deletesavelink", { slId })
            setsavelink(savelink.filter((item: { link: string }) => item.link !== shortenLink))

        } catch (err) {

        }
    }
    return (
        <AppBody>

            <Box width={"100%"} border={"4px"} height={"40rem"}
                borderColor={"green"} background={"white"} borderRadius="20px"
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
                        border={"3px solid green"}
                        textAlign={"center"}
                        alignSelf={"center"}
                        color={"green"}
                    >
                        ALL LINK
                    </Heading>
                </Box>

                <VStack spacing={5} align="stretch" marginBottom={"100%"} >
                    <Center>
                        <Box w="100" p={5} color="white" alignItems={"center"}>

                            {/* ------------------------ */}
                            <HStack spacing="24px">

                                <Box w={{ md: "30rem", base: "100%" }} h="30rem" overflowWrap={'normal'} overflow="scroll">
                                    <Flex rounded="xl" gap={{ md: 1, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                                        {savelink && savelink.map((link: { link: string, slId: string }, index: any) =>
                                            (<SList key={index} fullLink={link.link} slId={link.slId} handleSelect={handleDelete} />))}
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
            <br />
        </AppBody >
    )
}
export default allLink

// {savelink && savelink.map((link: { link: string, slId: string }, index: any) =>
//                                 (<SList key={index} fullLink={link.link} slId={link.slId} handleSelect={handleDelete} />))}