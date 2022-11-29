import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, ButtonGroup, Box, Text, Circle, Center } from "@chakra-ui/react"
import React from "react"
import { AiFillSmile } from "react-icons/ai"

const EmojiReaction = () => {
    return (
        <Box>
            <Popover>
                <Box marginTop={-1}>
                    <Center>
                        <PopoverTrigger>
                            <Button size="60px" bg="tomato" color="white" borderRadius={100} _hover={{ color: "tomato" }}>
                                <AiFillSmile size="60px" />
                            </Button>
                        </PopoverTrigger>
                    </Center>
                </Box>
                <Portal>
                    <PopoverContent width={"100%"} display="flex" alignItems="center">
                        <PopoverHeader>
                            <ButtonGroup spacing={2}>
                                <Button colorScheme="red">Love❤️</Button>
                                <Button colorScheme="yellow">HaHa😂</Button>
                                <Button colorScheme="pink">WOW😮</Button>
                                <Button colorScheme="blackAlpha">COOL😎</Button>
                                <Button colorScheme="blue">SAD😢</Button>
                            </ButtonGroup>
                        </PopoverHeader>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    )
}

export default EmojiReaction
