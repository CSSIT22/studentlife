import { Box, Button, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react"
import { FC, useState } from "react"
import AmountRate from "./AmountRate"

const Rate: FC<{ ratting: String; background: String; amo_rate: String }> = ({ ratting, background, amo_rate }) => {
    const [active1, setActive1] = useState(false)
    const handleClick1 = () => {
        setActive1(!active1)
    }
    // const [active2, setActive2] = useState(false)
    // const handleClick2 = () => {
    //     setActive2(!active2)
    // }
    // const [active3, setActive3] = useState(false)
    // const handleClick3 = () => {
    //     setActive3(!active3)
    // }
    // const [active4, setActive4] = useState(false)
    // const handleClick4 = () => {
    //     setActive4(!active4)
    // }
    // const [active5, setActive5] = useState(false)
    // const handleClick5 = () => {
    //     setActive5(!active5)
    // }
    // const [active6, setActive6] = useState(false)
    // const handleClick6 = () => {
    //     setActive6(!active6)
    // }
    return (
        // <SimpleGrid columns={{ base: 3, lg: 6 }} gap={{ base: 3, lg: 6 }} marginTop={5}>
        <Box
            onClick={handleClick1}
            style={{ background: active1 ? "#FF7E20" : "", color: active1 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick1}
                style={{ background: active1 ? "black" : "", color: active1 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={`${background}`}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        {ratting}/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>{amo_rate}</Heading>
            <br></br>
        </Box>
        /* <Box
            onClick={handleClick2}
            style={{ background: active2 ? "#FF7E20" : "", color: active2 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick2}
                style={{ background: active2 ? "black" : "", color: active2 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={"#1DBC03"}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        4/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>100</Heading>
            <br></br>
        </Box>
        <Box
            onClick={handleClick3}
            style={{ background: active3 ? "#FF7E20" : "", color: active3 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick3}
                style={{ background: active3 ? "black" : "", color: active3 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={"#1DBC03"}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        3/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>300K</Heading>
            <br></br>
        </Box>
        <Box
            onClick={handleClick4}
            style={{ background: active4 ? "#FF7E20" : "", color: active4 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick4}
                style={{ background: active4 ? "black" : "", color: active4 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={"#39A0FF"}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        2/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>1</Heading>
            <br></br>
        </Box>
        <Box
            onClick={handleClick5}
            style={{ background: active5 ? "#FF7E20" : "", color: active5 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick5}
                style={{ background: active5 ? "black" : "", color: active5 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={"#39A0FF"}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        1/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>15</Heading>
            <br></br>
        </Box>
        <Box
            onClick={handleClick6}
            style={{ background: active6 ? "#FF7E20" : "", color: active6 ? "white" : "" }}
            transitionDuration="300ms"
            as="button"
            p={5}
            h={32}
            background={"white"}
            shadow={"md"}
            rounded={"2xl"}
        >
            <Box
                onClick={handleClick6}
                style={{ background: active6 ? "black" : "", color: active6 ? "white" : "" }}
                transitionDuration="300ms"
                p={1}
                width={"60px"}
                height={"25px"}
                px={2}
                rounded={"2xl"}
                background={"#838383"}
            >
                <Flex mb={1} direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <img
                        style={{ maxWidth: 14 }}
                        src={"https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1999085/yellow-star-clipart-xl.png"}
                    ></img>
                    <Heading ml={2} size={"xs"} color="white">
                        0/5
                    </Heading>
                </Flex>
            </Box>
            <Heading textAlign={"center"}>10</Heading>
            <br></br>
        </Box> */
        // </SimpleGrid>
    )
}

export default Rate
