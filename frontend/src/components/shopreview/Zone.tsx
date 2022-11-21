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
    handleSetZones: Function
}> = ({ name, handleSetZones }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Button shadow={"lg"} mr={2} ml={2} width={"100px"} colorScheme="gray" rounded={"3xl"}>
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
                            <SelectZone handleSetZones={handleSetZones} name={"หอหญิง"} />
                            <SelectZone handleSetZones={handleSetZones} name={"หอชาย"} />
                            <SelectZone handleSetZones={handleSetZones} name={"KFC"} />
                        </Flex>
                        <Flex mb={3} direction={"row"} justifyContent={"center"}>
                            <SelectZone handleSetZones={handleSetZones} name={"หน้ามอ"} />
                            <SelectZone handleSetZones={handleSetZones} name={"หลังมอ"} />
                        </Flex>
                        <br></br>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    )
}

export default Zone
