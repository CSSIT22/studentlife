import { Box } from "@chakra-ui/layout"
import { Center, HStack, SimpleGrid, Text } from "@chakra-ui/react"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SuggestedFriend from "./SuggestedFriend"

const FriendSuggestion = (/*{ photoUrl, year, department, faculty }: { photoUrl: string; year: number; department: string; faculty: string }*/) => {
    return (
        <Box minW="sm" maxW="sm" borderWidth="1px" borderRadius="lg" backgroundColor={"white"} overflow="auto" fontWeight="semibold">
            <Box w="full" h="7" bgColor="orange.300" p="1">
                <Text color="white">Suggestion for You</Text>
            </Box>
            <Swiper>
                <SimpleGrid row={1}>
                    <HStack>
                        <SwiperSlide>
                            <Center>
                                <SuggestedFriend></SuggestedFriend>
                            </Center>
                        </SwiperSlide>
                        {/* <SwiperSlide>
                            <Center>
                                <SuggestedFriend></SuggestedFriend>
                            </Center>
                        </SwiperSlide> */}
                    </HStack>
                </SimpleGrid>
            </Swiper>
        </Box>
    )
}

export default FriendSuggestion
