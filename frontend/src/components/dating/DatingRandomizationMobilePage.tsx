import TinderCard from "react-tinder-card"
import { Box, Center, Heading, SimpleGrid, Tag, Text } from "@chakra-ui/react"
import DatingAppBody from "./DatingAppBody"

const db = [
    {
        name: "Jennie Kim",
        url: "https://lh3.googleusercontent.com/Km2FSe-U_oW1ZT1LK1u-p0nsH_QTucR7l_sUU2UvlgZpAjQaj2Oik4te9iFUVmqthLCd-6VLPtoDL9iAcs7mL7tcpSOd0tCMAtPUISBFtjMh0WI=w1600-rj-l80-nu-e365",
    },
    {
        name: "Kim Jisoo",
        url: "https://lh3.googleusercontent.com/MDVfO5G8cmGAKLcNXXdik1iTJe92ZcNoHbPTB4lbn0KutHvtWcBXyFEApa9x20HHg0NCrVQfxuU5u3mIsFYhM71aPJJ5XrXfOZOBRJFSYfAAM1U=w1600-rj-l80-nu-e365",
    },
    {
        name: "Lalisa Manoban",
        url: "https://lh3.googleusercontent.com/FQ0PlEhb6lDNLSAYiZEb_80MYlzn-ev3pEGJXC8TvBQlTcKdxAPsp3Lsnn9EZod88FHSMu6GFn2QAKnRsaRg-OBt-m_zNYow6M85Jrw1RC8FGzAD=w1600-rj-l80-nu-e365",
    },
    {
        name: "Park Chaeyoung",
        url: "https://lh3.googleusercontent.com/iIzDn013HQ8NR_KZhaXGeLld6jaszvmRbdrKMGoYuB5MZOZI7ZM6V58yVFHqIuOuJGALhKcKn8vwXTBLf-csPpwaHE5f7YEFIj_KS2SVMcVbQlc=w1600-rj-l80-nu-e365",
    },
]

const DatingRandomizationMobilePage = () => {
    const characters = db

    const swiped = (direction: any, nameToDelete: any) => {
        console.log("Swiping " + nameToDelete + " to the " + direction)
    }

    const outOfFrame = (name: any) => {
        console.log(name + " left the screen!")
    }

    return (
        <DatingAppBody>
            <SimpleGrid>
                <Box>
                    <Box className="cardContainer">
                        {characters.map((character) => (
                            <TinderCard
                                className="swipe"
                                key={character.name}
                                onSwipe={(dir: any) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}
                                preventSwipe={["down", "up"]}
                                swipeThreshold={1}
                            >
                                <Center>
                                    <Box
                                        borderRadius="10px"
                                        backgroundImage={character.url}
                                        w="326px"
                                        h="402px"
                                        backgroundSize="cover"
                                        className="card"
                                        pl="1rem"
                                        id={character.name}
                                        style={{ position: "absolute", top: "30px" }}
                                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                    ></Box>
                                </Center>
                            </TinderCard>
                        ))}
                    </Box>
                </Box>
                <Box display="flex">
                    <Text
                        style={{ fontFamily: "Inter", fontStyle: "normal", fontWeight: "700", fontSize: "20px", lineHeight: "120%" }}
                        pt="468px"
                        pl="18px"
                    >
                        Firstname L.
                    </Text>
                    <Text
                        style={{ fontFamily: "Inter", fontStyle: "normal", fontWeight: "400", fontSize: "20px", lineHeight: "120%" }}
                        pt="468px"
                        pl="18px"
                    >
                        M , Age
                    </Text>
                </Box>
                <Box style={{ fontFamily: "Inter", fontStyle: "normal", fontWeight: "400", fontSize: "16px", lineHeight: "150%" }}>
                    <Text pl="18px" pt="10px">
                        Faculty
                    </Text>
                </Box>
                <Box pl="18px" pt="20px">
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                    <Tag backgroundColor="orange.600" color="white" mr="0.5">
                        Tag
                    </Tag>
                </Box>
            </SimpleGrid>
        </DatingAppBody>
    )
}

export default DatingRandomizationMobilePage
