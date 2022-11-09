import DatingAppBody from "../../components/dating/DatingAppBody"
import TinderCard from "react-tinder-card"
import { Box, Center, Heading, Image, Link, Text } from "@chakra-ui/react"
import React, { useState } from "react"

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
const DatingRandomization = () => {
    const characters = db
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction: any, nameToDelete: any) => {
        console.log("removing: " + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name: any) => {
        console.log(name + " left the screen!")
    }

    return (
        <DatingAppBody>
            <Box>
                <Box className="cardContainer">
                    {characters.map((character) => (
                            <TinderCard
                                className="swipe"
                                key={character.name}
                                onSwipe={(dir: any) => swiped(dir, character.name)}
                                onCardLeftScreen={() => outOfFrame(character.name)}
                                preventSwipe={["down", "up"]}
                            >
                                <Box
                                    display="flex"
                                    borderRadius="3xl"
                                    backgroundImage={character.url}
                                    w="360px"
                                    h="450px"
                                    backgroundSize="cover"
                                    className="card"
                                    id={character.name}
                                    style={{ position: "absolute", top: "20px" }}
                                ><Text>{character.name}</Text></Box>
                            </TinderCard>
                    ))}
                </Box>
                {lastDirection ? <Text className="infoText">You swiped {lastDirection}</Text> : <Text className="infoText" />}
            </Box>
        </DatingAppBody>
    )
}

export default DatingRandomization
