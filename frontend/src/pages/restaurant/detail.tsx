import { Badge, Box, Button, ButtonGroup, Center, CloseButton, Flex, IconButton, Image, Link, Spacer, Text } from "@chakra-ui/react"
import React from "react"
import { BiHeartCircle, BiPhone } from "react-icons/bi"
import Searchbar from "../../components/restaurant/searchbar"
import AppBody from "../../components/share/app/AppBody"

function detail() {
    const property = {
        imageUrl: "https://cdn.discordapp.com/attachments/900658140704559116/1025051073842532412/received_1863984997105459.jpg",
        imageAlt: "view of the restaurant",
        amountLike: 103,
        openTime: "08.30",
        closeTime: "20.00",
        title: "Restaurant name",
        style: "Japanese",
        phoneNum: "0948426152",
        website: "https://www.instagram.com/nn_nattawat/",
        rating: 4,
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Like or Nope", to: "/restaurant" },
                { name: "My Favorite", to: "/restaurant/favorite" },
                { name: "My History", to: "/restaurant/history" },
            ]}
        >
            <Searchbar />
            <Center mt={4}>
                <Box px={2} width="full" borderWidth="1px" borderRadius="lg" overflow="hidden">
                    <Box my={5} textAlign={"center"} fontWeight="bold" fontSize={"2xl"}>
                        <CloseButton my={-4} ml={-1} /> {property.title}
                    </Box>
                    <Center>
                        <Image h={"sm"} w={"sm"} borderWidth="1px" borderRadius="lg" src={property.imageUrl} alt={property.imageAlt} />
                    </Center>
                    <Box p="6">
                        <Box display="flex" alignItems="baseline">
                            <Box color="" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase">
                                {property.amountLike} liked &bull;
                            </Box>
                            <Spacer />
                            <Box
                                as="button"
                                bg={"gray.300"}
                                color="gray.700"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                borderWidth="1px"
                                borderRadius="lg"
                                p={1}
                            >
                                comment
                            </Box>
                        </Box>

                        <Box>
                            <Box as="span" color="" fontSize="sm">
                                OPEN - CLOSE : {property.openTime} - {property.closeTime}
                            </Box>
                        </Box>

                        <Box>
                            <Box as="span" color="" fontSize="sm">
                                STYLE : {property.style}
                            </Box>
                        </Box>

                        <Box>
                            <Box as="span" color="" fontSize="sm" textTransform="uppercase">
                                CONTACT :
                                <br /> Phone Number : {property.phoneNum}
                                <br /> Website :{" "}
                                <Link href={property.website} isExternal>
                                    <Text as="u">Click here</Text>
                                </Link>
                            </Box>
                        </Box>

                        <Flex mt={10}>
                            <Box as="button" bg={"tomato"} color="white" border={1} borderRadius={"md"} p={1}>
                                Heart
                            </Box>
                            <Spacer />
                            <Box as="button" bg={"gray.300"} color="gray.700" border={1} borderRadius={"md"} px={6} py={1}>
                                Share
                            </Box>
                            <Spacer />
                            <Box as="button" bg={"green.400"} color="white" border={1} borderRadius={"full"} p={2}>
                                GO
                            </Box>
                        </Flex>
                    </Box>
                </Box>
            </Center>

            
        </AppBody>
    )
}

export default detail
