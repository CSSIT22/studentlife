import { Box, Card, CardBody, Flex, Heading, HStack, Stack, Text, Image, Button, ButtonGroup, CardFooter, Divider, SimpleGrid, Hide, Input } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaSpotify } from "react-icons/fa"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Clist from "src/components/chat/Chat-list"
import AppBody from "src/components/share/app/AppBody"
import { BsMusicNoteList } from "react-icons/bs"
import API from "src/function/API"

type Tracks = {
    tracks: {
        items: [
            {
                album: {
                    artists: [
                        {name :string}
                    ],
                    images: [
                        {
                            url: string
                        },
                        {
                            url: string
                        },
                        {
                            url: string
                        }
                    ]
                },
                name: string,
                external_urls: {
                    spotify: string
                },
            }
        ]
    }
}

const searchSong = (searchInput: string) => {
    // if(search===?){
    //     const result = ?.filter
    // }else{
    return (
        <AppBody>
            <HStack>
                <Hide below="md">
                    <Clist />
                </Hide>
                <Flex flex={"1"} justifyContent={"center"} alignItems={"center"}>
                    <Box fontSize={"2xl"} fontWeight={"bold"}>Not found any related </Box>
                </Flex>
            </HStack>
        </AppBody>
    )
}

function SpotifyPage() {
    // let param = useParams()
    // const navigate = useNavigate()
    const [tracks, setTracks] = useState<Tracks>()
    const navigate = useNavigate()
    useEffect(() => {
        API.get("chat/spotifySearch").then((e) => setTracks(e.data))
    }, [])

    // const searchSong = (search: string) => {
    //     // if(search===?){
    //     //     const result = ?.filter
    //     // }else{
    //         return (
    //         <AppBody>
    //             <HStack>
    //                 <Hide below="md">
    //                     <Clist />
    //                 </Hide>
    //                 <Flex flex={"1"} justifyContent={"center"} alignItems={"center"}>
    //                     <Box fontSize={"2xl"} fontWeight={"bold"}>Not found any related </Box>
    //                 </Flex>
    //             </HStack>
    //         </AppBody>
    //         )
    //     }
    // }
    function renderCard(props: any) {
        const { srcs, data,link } = props
        return (
            <Card maxW="md" bg={"#f1f1f2"} variant={'outline'} height='200px' overflow={'hidden'} onClick={()=>window.open(link)}>
                <CardBody>
                    <Image
                        src={srcs}
                        alt={data}
                        borderRadius='lg'
                        w={'30'}
                    />
                    <Stack mt='6' spacing='3'>
                        {/* <Heading fontSize={'6vm'} >{data}</Heading> */}
                        {/* <Divider/> */}
                        <Text as='b' textAlign={'center'}>{data}</Text>
                    </Stack>
                </CardBody>
            </Card>
        )
    }


    return (
        <AppBody>
            <HStack>
                <Hide below="md">
                    <Clist />
                </Hide>
                <Flex flex={4} flexDirection={"column"}
                    width={"300px"} height={"77.5vh"}
                    bg={"#fffef1"}
                    rounded={"xl"}
                // alignContent={'center'}
                // justifyContent={'flex-start'}
                >
                    <Flex alignItems={"center"} marginY={"10"}>
                        <Box cursor={"pointer"} marginLeft={4}>
                            <BsMusicNoteList size={80} />
                        </Box>
                        <Input
                            width={{ base: "40vw", md: "md" }}
                            size={'lg'}
                            placeholder="Search..."
                            _placeholder={{ color: "#F4A460" }}
                            focusBorderColor="#F4A460"
                            errorBorderColor="#606070"
                            margin={'20px'}
                        />
                    </Flex>
                    {/* </Form> */}

                    <SimpleGrid columns={[1, 2, 4]} spacing='10px' margin={'20px'}
                        justifyContent={'flex-start'} maxH={"80vh"} overflowY={"scroll"}>
                        {/* <Card maxW="md" bg={"#f1f1f1"} maxH='200px'>
                            <CardBody>
                                <Image
                                    src='#'
                                    alt='Green double couch with wooden legs'
                                    borderRadius='lg'
                                />
                                <Stack mt='6' spacing='3'>
                                    <Heading size='md'>Living room Sofa</Heading>

                                </Stack>
                            </CardBody>
                        </Card> */}
                        {tracks?.tracks.items.map((e) => renderCard({data : e.name , srcs:e.album.images[1].url,link:e.external_urls.spotify}))}

                    </SimpleGrid>
                </Flex>
            </HStack>
        </AppBody>
    )

}
export default SpotifyPage