import {
    Box,
    Button,
    Collapse,
    Flex,
    Heading,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
} from "@chakra-ui/react"
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react"
import React, { FC, useState } from "react"
import SelectZone from "./SelectZone"

const Zone: FC<{
    name: String
}> = ({ name }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button mr={2} ml={2} width={"100px"} colorScheme="gray" rounded={"3xl"}>
                    {name}
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Heading color={"black"}>Select Zone</Heading>
                        <br></br>
                        <Flex mb={3} direction={"row"} justifyContent={"space-around"}>
                            <SelectZone name={"หอหญิง"} />
                            <SelectZone name={"หอชาย"} />
                            <SelectZone name={"KFC"} />
                        </Flex>
                        <Flex mb={3} direction={"row"} justifyContent={"space-around"}>
                            <SelectZone name={"หน้ามอ"} />
                            <SelectZone name={"หลังมอ"} />
                        </Flex>
                        <br></br>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

function ColorChange() {
    const [active, setActive] = useState(false)
    const handleClick = () => {
        setActive(!active)
    }

    return (
        <div className="center">
            <button onClick={handleClick} style={{ backgroundColor: active ? "black" : "white" }}>
                SignUp
            </button>
        </div>
    )
}

export default Zone
