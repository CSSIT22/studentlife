import { Popover, PopoverTrigger, Button, Portal, PopoverContent, PopoverHeader, ButtonGroup, Box, Text, Circle, Center, color } from '@chakra-ui/react';
import React, { useEffect, useState } from "react"
import { AiFillSmile, AiOutlineLike } from "react-icons/ai"
import { BsEmojiAngry, BsHandThumbsUp } from "react-icons/bs";
import { RiEmotionLaughLine, RiEmotionSadLine, RiHeartsLine, RiThumbUpLine } from "react-icons/ri";

interface EmojiReactionProps {
    setSelectedEmoji: (emoji: JSX.Element | null) => void;
    emojiname: string;
}

const EmojiReaction: React.FC<EmojiReactionProps> = (props) => {
    const [selectedEmoji, setSelectedEmoji] = useState<JSX.Element | null>(null);

    const handleEmojiClick = (emoji: JSX.Element, text: string) => {
        setSelectedEmoji(emoji.type.name === selectedEmoji?.type.name ? null : emoji);

        if (emoji.type.name === "RiThumbUpLine") {
            props.setSelectedEmoji(<Text>Like</Text>);

        } else if (emoji.type.name === "RiEmotionSadLine") {
            props.setSelectedEmoji(<Text>Sad</Text>);

        } else if (emoji.type.name === "RiEmotionLaughLine") {
            props.setSelectedEmoji(<Text>Laugh</Text>);

        } else if (emoji.type.name === "RiHeartsLine") {
            props.setSelectedEmoji(<Text>Love</Text>);

        } else {
            props.setSelectedEmoji(<Text>Angry</Text>);

        }

    }

    useEffect(() => {
        if (props.emojiname === "Like") {
            setSelectedEmoji(<RiThumbUpLine size="60px" />);

        } else if (props.emojiname === "Sad") {
            setSelectedEmoji(<RiEmotionSadLine size="60px" />);

        } else if (props.emojiname === "Laugh") {
            setSelectedEmoji(<RiEmotionLaughLine size="60px" color="white" />);

        } else if (props.emojiname === "Love") {
            setSelectedEmoji(<RiHeartsLine size="60px" />);

        } else if (props.emojiname === "Angry") {
            setSelectedEmoji(<BsEmojiAngry size="60px" />);

        } else {
            setSelectedEmoji(<AiFillSmile size="60px" />);
        }
    }, [props.emojiname]);





    const renderEmojiButton = (emoji: JSX.Element, text: string, colorScheme: string) => {
        return (
            <Button colorScheme={colorScheme} onClick={() => handleEmojiClick(emoji, text)}>
                {emoji}
            </Button>
        );
    };

    return (
        <Box>
            <Popover>
                <Box marginTop={-1}>
                    <Center>
                        <PopoverTrigger>
                            <Button size="60px" bg="tomato" color="white" borderRadius={100} _hover={{ color: "tomato" }}>
                                {selectedEmoji || <AiFillSmile size="60px" />}
                            </Button>
                        </PopoverTrigger>
                    </Center>
                </Box>
                <Portal>
                    <PopoverContent width={"100%"} display="flex" alignItems="center">
                        <PopoverHeader>
                            <ButtonGroup spacing={2}>
                                {renderEmojiButton(<RiThumbUpLine size="60px" />, "Like", "orange")}
                                {renderEmojiButton(<RiEmotionSadLine size="60px" />, "Sad", "blue")}
                                {renderEmojiButton(<RiEmotionLaughLine size="60px" color="white" />, "Laugh", "yellow")}
                                {renderEmojiButton(<RiHeartsLine size="60px" />, "Love", "pink")}
                                {renderEmojiButton(<BsEmojiAngry size="60px" />, "Angry", "red")}
                            </ButtonGroup>
                        </PopoverHeader>
                    </PopoverContent>
                </Portal>
            </Popover>
        </Box>
    );
}
export default EmojiReaction
