import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, ButtonGroup, Box, Text, Circle } from "@chakra-ui/react"
import React from "react"
import { AiFillSmile } from "react-icons/ai"

const EmojiReaction = () => {
    return (
        <Box display={"flex"}>
            <Popover>
                <PopoverTrigger>
                    <Circle size="60px" bg="tomato" color="white">
                        <AiFillSmile size="60px" />
                    </Circle>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent width={"100%"} display="flex" alignItems="center">
                        <PopoverHeader>
                            <ButtonGroup spacing={2}>
                                <Button>Pog</Button>
                                <Button>AYAYA</Button>
                                <Button>OMEGALOL</Button>
                                <Button>HUH</Button>
                                <Button>Neko</Button>
                            </ButtonGroup>
                        </PopoverHeader>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    )
}

export default EmojiReaction
