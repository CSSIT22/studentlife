import React, { useState, useEffect } from "react"
import { Box, extendTheme, Flex, HStack, IconButton, Input } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import std from "./RUser"
import UList from "./UList"
import API from "src/function/API"
import { useParams } from "react-router-dom"


function SearchUserList() {
    const [search, setSearch] = useState("")
    const [userData, setUserData] = useState<any>()
    const param = useParams();
    console.log(search)

    async function fetch() {
        const res = await API.get(`/shortlink/getUser`);
        setUserData([ ...res.data.users ]);
    }

    useEffect(() => {
        fetch()
    }, [])

    console.log(userData)

    return (    
        <Box borderRadius={"md"}>
            <HStack borderRadius={"md"} boxShadow="md" position="initial" padding={1} mb={{ md: 1, sm: 4 }} background={"white"}>
                <Box color={"black"} mr={-1}>
                    <IconButton aria-label="Search database" background={"white"} _hover={{ background: "default" }} icon={<SearchIcon />} />
                </Box>
                <Box width={"100%"} backgroundColor={"white"} color={"black"} position="sticky">
                    <Input onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder="Search User to access" />
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
                    {userData && userData
                        .filter((user: { fName: string; lName: string }) => (`${user.fName} ${user.lName}`).toLowerCase().includes(search.toLowerCase())).slice(0,65)
                        .map((user: { fName: string; lName: string }, index: any) => (
                            <UList userProfile={""} userName={user.fName} key={index} lastName={user.lName} />
                        ))}
                </Flex>
            </Box>
        </Box>
    )
}

export default SearchUserList

