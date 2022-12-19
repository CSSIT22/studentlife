import AppBody from "../../components/share/app/AppBody"
import { Container, Center, Box, Text, HStack, Flex } from "@chakra-ui/react"
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
            <Container borderWidth="1px" padding="10" borderRadius="xl" background={"white"} gap={2}>
                <Box
                    width={"200px"}
                    height={"40px"}
                    marginLeft={"-30"}
                    marginTop={"-50"}
                    background={"orange.200"}
                    borderRadius={"10px"}
                    fontSize={"md"}
                    border={"3px solid white"}
                    textAlign={"center"}
                    textColor="white"
                >
                    <Text as={"b"}>ALL-LINK</Text>
                </Box>

                <HStack spacing="24px">

                    <Box w="400px" h="430px" overflowWrap={'normal'} overflow="scroll">
                        <Flex rounded="xl" gap={{ md: 1, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                            {savelink && savelink.map((link: { link: string, slId: string }, index: any) =>
                                (<SList key={index} fullLink={link.link} slId={link.slId}   handleSelect={handleDelete}/>))}
                              
                        </Flex>
                    </Box>
                </HStack>
                <br />
                <Box bgColor={"white"} p="10rem" borderRadius="15"></Box>
            </Container>
        </AppBody>
    )
}
export default allLink
