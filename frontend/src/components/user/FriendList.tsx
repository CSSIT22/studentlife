import React, { FC, useState, useEffect } from "react"
import { Box, extendTheme, Flex, HStack, IconButton, Input } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import UserList from "../user/UserList"
import { people } from "./Mock_UpData"
import { useParams } from "react-router-dom"
import API from "src/function/API"

interface FriendListProps {
    props: any
}

const FriendList: FC<(FriendListProps: any)> = ({ FriendListProps: any }) => {
    const [search, setSearch] = useState("")
    const [friendList, setFriendList] = useState([])
    const param = useParams();
    console.log(search)


    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/profile/getFollower/${param.userId}`)
            console.log(res.data)
            setFriendList(res.data.follower)
        }

        fetch();
    }, [])

    const breakpoints = {
        sm: "400px",
        md: "800px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    const theme = extendTheme({ breakpoints })
    return (
        <Box borderRadius={"md"}>
            <HStack borderRadius={"md"} boxShadow="md" position="initial" padding={1} mb={{ md: 1, sm: 4 }} background={"white"}>
                <Box color={"black"} mr={-1}>
                    <IconButton aria-label="Search database" background={"white"} _hover={{ background: "default" }} icon={<SearchIcon />} />
                </Box>
                <Box width={"100%"} backgroundColor={"white"} color={"black"} position="sticky">
                    <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Search for friends" />
                </Box>
            </HStack>

            <Box
                background={{ md: "White", base: "" }}
                height={{ sm: "400px", md: "200px" }}
                paddingRight={0.5}
                mb={{ md: 0, sm: 4 }}
                sx={{
                    "-webkit-overflow-scrolling": "touch" /* enables momentum-scrolling on iOS */,
                    overflowY: "scroll",
                    scrollBehavior: "smooth",
                    rounded: "xl",

                    "::-webkit-scrollbar-track": {
                        background: "white",
                        rounded: "xl",
                    },
                    "::-webkit-scrollbar-thumb": {
                        background: { md: "#444444", sm: "none" },
                    },
                }}
            >
                <Flex rounded="xl" gap={{ md: 1, sm: 3 }} direction="column" ml={1} color={"black"} borderRadius={"md"}>
                    {friendList
                        .filter((user: any) => user.follower.fName.toLowerCase().includes(search) || user.follower.lName.toLowerCase().includes(search))
                        .map((user: any) => (
                            <UserList userProfile={""} userName={user.follower.fName} key={user.userId} lastName={user.follower.lName} />
                        ))}
                </Flex>
            </Box>
        </Box>
    )
}

export default FriendList
