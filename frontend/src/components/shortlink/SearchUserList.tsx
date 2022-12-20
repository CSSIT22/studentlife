import React, { useState, useEffect, useRef, useMemo } from "react"
import { Box, extendTheme, Flex, HStack, IconButton, Input } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import std from "./RUser"
import UList from "./UList"
import API from "src/function/API"
import { useParams } from "react-router-dom"

interface SearchUserListProps {
    handleSelect?: ((id: {
        id: string;
        userName: string;
        lastName: string;
    }) => void);
    selectedUser?: {
        id: string;
        userName: string;
        lastName: string;
    }[];
    userData: any;
}

function SearchUserList({ handleSelect, selectedUser, userData }: SearchUserListProps) {
    const [search, setSearch] = useState("")

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
                        ?.filter((user: { fName: string; lName: string }) => (`${user.fName} ${user.lName}`).toLowerCase().includes(search.toLowerCase())).slice(0, 65)
                        ?.map((user: { userId: string; fName: string; lName: string }, index: any) => (
                            <UList id={user.userId} userProfile={""} userName={user.fName} key={index} lastName={user.lName} handleSelect={handleSelect}
                                isSelected={!!(selectedUser?.find(sUser => sUser.id === user.userId)) || false} />
                        ))}
                </Flex>
            </Box>
        </Box>
    )
}

export default SearchUserList

