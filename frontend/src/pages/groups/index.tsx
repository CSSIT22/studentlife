import { Show, Box, HStack, Button, Input, Stack, Text, Flex, Grid, Link } from "@chakra-ui/react"
import React, { Suspense, useState } from "react"
import AppBody from "../../components/share/app/AppBody"
import { FaSearch, FaPlus } from "react-icons/fa"
import { TiWarning } from "react-icons/ti"
import { userData } from "./data"
import CommunityList from "../../components/group/CommunityList"
import SuggestBox from "../../components/group/SuggestBox"
import InvitationBox from "../../components/group/InvitationBox"
import useWindowDimensions from "./hooks/useWindowDimensions"
import { ExternalLinkIcon } from "@chakra-ui/icons"

const index = () => {
    const [searchBtn, setSearchBtn] = useState(false) //for close/open seach bar
    const [searchValue, setSearchValue] = useState("") //for store search value
    const handleChange = (event: any) => setSearchValue(event.target.value)
    const handleSearchBtn = () => {
        setSearchBtn(!searchBtn)
        setSearchValue("")
    }
    //for mobile
    const [allBtn, setAllBtn] = useState(true)
    const [inviteBtn, setInviteBtn] = useState(false)
    const [suggestBtn, setSuggestBtn] = useState(false)
    const [acceptBtn, setAcceptBtn] = useState(false)
    const [declinetBtn, setDeclinetBtn] = useState(false)

    const handleAllBtnOnClick = () => {
        setAllBtn(true)
        setInviteBtn(false)
        setSuggestBtn(false)
    }
    const handleInviteOnClick = () => {
        setAllBtn(false)
        setInviteBtn(true)
        setSuggestBtn(false)
    }
    const handleSuggestOnClick = () => {
        setAllBtn(false)
        setInviteBtn(false)
        setSuggestBtn(true)
    }

    const handleAcceptOnClick = () => {
        setAcceptBtn(true)
    }

    const handleDeclineOnClick = () => {
        setDeclinetBtn(true)
    }



    //md: 768px
    const { height, width } = useWindowDimensions()
    return (
        <AppBody>
            {/* <div>
                width: {width} ~ height: {height}
            </div> */}
            <Flex gap={2} direction={{ base: "column", md: "row" }} mb={4}>
                <Box>
                    <Show below="md">
                        <HStack justify={"space-between"}>
                            <HStack gap={1} display={searchBtn ? "none" : "flex"}>
                                <Button backgroundColor={allBtn ? "gray.300" : "gray.100"} onClick={handleAllBtnOnClick}>
                                    All
                                </Button>
                                <Button backgroundColor={inviteBtn ? "gray.300" : "gray.100"} onClick={handleInviteOnClick}>
                                    Invited
                                </Button>
                                <Button backgroundColor={suggestBtn ? "gray.300" : "gray.100"} onClick={handleSuggestOnClick}>
                                    Suggested
                                </Button>
                            </HStack>{" "}
                            {allBtn ? (
                                <Stack direction={"row"} justify="end" width={"100%"} gap={1}>
                                    <Link href="http://127.0.0.1:5173/groups/create">
                                        <Button display={searchBtn ? "none" : "flex"}>
                                            <FaPlus />
                                        </Button>
                                    </Link>
                                    <Input
                                        width={"100%"}
                                        display={searchBtn ? "" : "none"}
                                        variant={"filled"}
                                        type={"search"}
                                        value={searchValue}
                                        onChange={handleChange}
                                        placeholder="Seacrh Community"
                                        focusBorderColor="gray.200"
                                    ></Input>
                                    <Button onClick={handleSearchBtn}>
                                        <FaSearch />
                                    </Button>
                                </Stack>
                            ) : (
                                <div></div>
                            )}
                        </HStack>
                    </Show>
                    <Show above="md">
                        <Box textAlign={"center"}>
                            <Input
                                background={'white'}
                                color='black'
                                boxShadow={'2xl'}
                                textAlign={"center"}
                                width={"100%"}
                                variant={"filled"}
                                type={"search"}
                                value={searchValue}
                                onChange={handleChange}
                                placeholder="Seacrh Communities"
                                focusBorderColor="gray.200"
                            ></Input>
                            <Link href='groups/create' _hover={{ textDecoration: "none" }} >
                                <Button mt="2" colorScheme="orange" _hover={{ background: 'orange.200' }} variant="solid" width="95%" fontSize="sm">
                                    + Create New Community
                                </Button>
                            </Link>

                        </Box>
                    </Show>
                    <Box display={allBtn || (width || 0) > 768 ? "block" : "none"}>
                        <Box mt={4} mb={3} background={{ md: "orange.400", base: "" }} p={{ md: "3", base: "" }} borderRadius={"md"}>
                            <Text as="b" color={{ md: "white", base: "black" }}>Community you manage</Text>


                            {userData.ownCommunitys.filter((community) => community.name.toLowerCase().includes(searchValue.toLowerCase())).length > 0 ? (
                                userData.ownCommunitys
                                    .filter((community) => {
                                        return searchValue.toLowerCase() == "" ? community : community.name.toLowerCase().includes(searchValue)
                                    })
                                    .map((community) => (community.roleID >= 3 ? (
                                        <CommunityList
                                            communityID={community.ID}
                                            key={community.ID}
                                            communityName={community.name}
                                            lastActive={"9"}
                                            coverPhoto={community.coverPhoto}
                                            isPrivate={community.isPrivate}
                                            roleID={community.roleID}
                                        />) :
                                        <div></div>
                                    ))
                            ) : (
                                <Box borderRadius="md" backgroundColor="red.200" mt={2}>
                                    <Box p={2} borderRadius="md">
                                        <HStack gap={2}>
                                            <Box height={"55px"}></Box>
                                            <div>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <TiWarning />
                                                    <Text as="b" fontSize="sm">
                                                        Community not found :(
                                                    </Text>
                                                </Box>
                                                <Text fontSize="sm">Try to search again</Text>
                                            </div>
                                        </HStack>
                                    </Box>
                                </Box>
                            )}
                        </Box>

                        <Box mt={4} mb={3} background={{ md: "orange.400", base: "" }} p={{ md: "3", base: "" }} borderRadius={"md"}>
                            <Text as="b" color={{ md: "white", base: "black" }}>Community you've joined</Text>

                            {userData.joinedCommunitys.filter((community) => community.name.toLowerCase().includes(searchValue.toLowerCase())).length >
                                0 ? (
                                userData.joinedCommunitys
                                    .filter((community) => {
                                        return searchValue.toLowerCase() == "" ? community : community.name.toLowerCase().includes(searchValue)
                                    })

                                    .map((community) => (community.roleID < 3 ? (
                                        <CommunityList
                                            communityID={community.ID}
                                            key={community.ID}
                                            communityName={community.name}
                                            lastActive={"9"}
                                            coverPhoto={community.coverPhoto}
                                            isPrivate={community.isPrivate}
                                            roleID={community.roleID}
                                        />) :
                                        <div></div>
                                    ))
                            ) : (
                                <Box borderRadius="md" backgroundColor="red.200" mt={2}>
                                    <Box p={2} borderRadius="md">
                                        <HStack gap={2}>
                                            <Box height={"55px"}></Box>
                                            <div>
                                                <Box display="flex" alignItems="center" gap={1}>
                                                    <TiWarning />
                                                    <Text as="b" fontSize="sm">
                                                        Community not found :(
                                                    </Text>
                                                </Box>
                                                <Text fontSize="sm">Try to search again</Text>
                                            </div>
                                        </HStack>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                {/* <Show above="md"> */}
                <Show>
                    <Box width={"100%"} >
                        <Box
                            display={inviteBtn || (width || 0) > 768 ? "block" : "none"}
                            borderRadius="md"
                            background={{ md: "orange.400", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                        >
                            <Text as="b" color={{ md: "white", base: "black" }}>Invitation</Text>
                            <Text fontSize="sm" color={{ md: "white", base: "black" }}>These people have invited you to join the community</Text>
                            {userData.invitations.map((i) => (
                                <InvitationBox
                                    key={i.inviteID}
                                    userName={i.userName}
                                    communityName={i.communityName}
                                    memberNumber={i.memberNumber}
                                    isPrivate={i.isPrivate}
                                    coverPhoto={i.coverPhoto}
                                    expireDate={i.expireDate}
                                />
                            ))}
                        </Box>
                        <Box
                            display={suggestBtn || (width || 0) > 768 ? "block" : "none"}
                            mt={2}
                            borderRadius="md"
                            background={{ md: "orange.400", base: "" }}
                            width="100%"
                            pt={4}
                            textAlign="start"
                            pl={5}
                            pr={5}
                            pb={4}
                        >
                            <Text as="b" color={{ md: "white", base: "black" }}>Suggested for you</Text>
                            <Text fontSize="sm" color={{ md: "white", base: "black" }}>Communities you might be interested in.</Text>
                            <Grid gap={2} templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(2, 1fr)" }} width="100%">
                                {userData.invitations.map((i) => (
                                    <SuggestBox
                                        key={i.inviteID}
                                        communityName={i.communityName}
                                        memberNumber={i.memberNumber}
                                        isPrivate={i.isPrivate}
                                        coverPhoto={i.coverPhoto}
                                    />
                                ))}
                            </Grid>
                        </Box>
                    </Box>
                </Show>
            </Flex >
        </AppBody >
    )
}

export default index
