import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, ButtonGroup, Box, Text } from "@chakra-ui/react"
import React from "react"

const EmojiReaction = () => {
    return (
        <Box display={"flex"}>
            <Popover>
                <PopoverTrigger>
                    <Button borderRadius={"full"} rounded={"lg"} variant="outline" size="lg">
                        Emoji
                    </Button>
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
            <Text marginTop={2.5} color="black" fontSize="lg">
                Emotion
            </Text>
        </Box>
    )
}

export default EmojiReaction
