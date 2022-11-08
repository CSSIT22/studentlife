import { Box, Button, Grid, GridItem, Input, InputGroup, InputLeftElement, VStack, Text, Image, HStack } from "@chakra-ui/react"
import React from "react"
import CommunityList from "../../components/group/CommunityList"
import AppBody from "../../components/share/app/AppBody"

const communitys = [
    {
        ID: 1,
        name: "Dota2",
        Owner: "1",
        Member: 666,
        Tag: [2, 4],
        Describe: "Best mental therapy center",
        isPrivate: true,
        coverPhoto: "https://picsum.photos/id/1/200",
    },
    {
        ID: 2,
        name: "Memeworld",
        Owner: "3",
        Member: 300,
        Tag: [3],
        Describe: "Storage of meme around the world",
        isPrivate: false,
        coverPhoto: "https://picsum.photos/id/2/200",
    },
    {
        ID: 3,
        name: "IndianFood",
        Owner: "2",
        Member: 150,
        Tag: [1, 2],
        Describe: "No masara no flavor we can’t eat.",
        isPrivate: true,
        coverPhoto: "https://picsum.photos/id/3/200",
    },
    {
        ID: 4,
        name: "ThaiStreetFood",
        Owner: "3",
        Member: 50,
        Tag: [1],
        Describe: "Secret thai street food that have to try once",
        isPrivate: false,
        coverPhoto: "https://picsum.photos/id/4/200",
    },
]

const Groups = () => {
    return (
        <AppBody>
            <Grid templateColumns="repeat(8, 1fr)" gap="2">
                {/* Left side */}
                <GridItem colSpan={3} w="100%">
                    <VStack align="center">
                        <Input
                            fontWeight="bold"
                            variant="filled"
                            placeholder="Search Communitys"
                            textAlign="center"
                            focusBorderColor="tomato"
                            fontSize="sm"
                        />
                        <Button colorScheme="orange" variant="solid" width="95%" fontSize="sm">
                            + Craete New Community
                        </Button>
                        <Box
                            className="Community_Lists"
                            width="100%"
                            height="300px"
                            sx={{
                                "-webkit-overflow-scrolling": "touch" /* enables momentum-scrolling on iOS */,
                                overflowY: "scroll",
                                scrollBehavior: "smooth",
                                "::-webkit-scrollbar-track": {
                                    background: "none",
                                },
                                "::-webkit-scrollbar-thumb": {
                                    background: "orange",
                                },
                            }}
                        >
                            {communitys ? (
                                <div>
                                    <Box borderRadius="md" backgroundColor="gray.100" width="100%" pt={4} textAlign="start" pl={5} pr={5} pb={4}>
                                        <Text as="b" fontSize="sm">
                                            Community you manage
                                        </Text>
                                        {communitys.map((community) => (
                                            <CommunityList
                                                key={community.ID}
                                                communityName={community.name}
                                                isPrivate={community.isPrivate}
                                                coverPhoto={community.coverPhoto}
                                                lastActive={"3"}
                                            />
                                        ))}
                                    </Box>
                                    <Box
                                        mt={2}
                                        borderRadius="md"
                                        backgroundColor="gray.100"
                                        width="100%"
                                        pt={4}
                                        textAlign="start"
                                        pl={5}
                                        pr={5}
                                        pb={4}
                                    >
                                        <Text as="b" fontSize="sm">
                                            Community you've joined
                                        </Text>
                                        {communitys.map((community) => (
                                            <CommunityList
                                                key={community.ID}
                                                communityName={community.name}
                                                isPrivate={community.isPrivate}
                                                coverPhoto={community.coverPhoto}
                                                lastActive={"3"}
                                            />
                                        ))}
                                    </Box>
                                </div>
                            ) : (
                                <Text>empty</Text>
                            )}
                        </Box>
                    </VStack>
                </GridItem>
                <GridItem colSpan={5} w="100%" bg="tomato" />
            </Grid>
        </AppBody>
    )
}

export default Groups
