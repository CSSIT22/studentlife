import { Box, Card, CardBody, Flex, Heading, HStack, Stack, Text, Image, Button, ButtonGroup, CardFooter, Divider, SimpleGrid, Hide, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaSpotify } from "react-icons/fa"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Clist from "src/components/chat/Chat-list"
import AppBody from "src/components/share/app/AppBody"
import { BsMusicNoteList } from "react-icons/bs"
import API from "src/function/API"
import { SearchIcon } from "@chakra-ui/icons"

type Tracks = {
    tracks: {
        items: [
            {
                album: {
                    artists: [
                        { name: string }
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
    //     // if(search===""){
    //     //     return userRoom.map((e:any) => renderCard)
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
        const { srcs, name, link, artist } = props
        return (
            <Card maxW="md" bg={"#f1f1f2"} height='200px' overflow={'hidden'} onClick={() => window.open(link)}>
                <CardBody justifyContent={'center'}>
                    <Stack direction={["row", "row", "column"]}>
                        <Image
                            src={srcs}
                            alt={name}
                            borderRadius='lg'
                            w={['150px', '150px', '75px']}
                        />
                        <Stack mt='3' spacing='1'>
                            {/* <Heading fontSize={'6vm'} >{data}</Heading> */}
                            <Text
                                fontWeight='bold'
                                textTransform='uppercase'
                                fontSize='xs'
                                letterSpacing='wide'
                                color='teal.600'
                                overflow={'hidden'}
                                textOverflow={'ellipsis'}
                                whiteSpace={'nowrap'}
                            >
                                {artist}
                            </Text>
                            <Divider />
                            <Text
                                textAlign={'center'}
                                overflow={'hidden'}
                                textOverflow={'ellipsis'}
                                whiteSpace={'nowrap'}
                                fontSize={'sm'}>
                                {name}
                            </Text>
                            <Button colorScheme='teal' size='xs'>
                                Share
                            </Button>
                        </Stack>
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
                    <Flex alignItems={"center"} margin={"10"}>
                        <Box cursor={"pointer"} marginX={4}>
                            <BsMusicNoteList size={30} />
                        </Box>
                        <InputGroup>
                            <InputRightElement pointerEvents="none" children={<SearchIcon />} />
                            <Input placeholder="Search..." borderColor={"#F4A460"} />
                        </InputGroup>
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
                        {/* {tracks?.tracks.items.map((e) => renderCard({ data: e.name, srcs: e.album.images[1].url, link: e.external_urls.spotify }))} */}
                        {tracks?.tracks.items.map((e) => renderCard({ name: e.name, artist: e.album.artists.map((el) => el.name).join(", "), srcs: e.album.images[1].url, link: e.external_urls.spotify }))}
                    </SimpleGrid>
                </Flex>
            </HStack>
        </AppBody>
    )

}
export default SpotifyPage