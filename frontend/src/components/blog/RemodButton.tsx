import {
    Button,
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Input,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Center } from "@chakra-ui/react";

interface Props {
    text: string;
}



function RemodButton(props: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [link, setLink] = useState(props.text);
    const cancelRef = React.useRef(null);
    const toast = useToast();

    const copyToClipboard = (str: string) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log(`Copying to clipboard: ${str}`);
    };

    // function copyToClipboard(str: string) {

    //     const el = document.createElement('textarea');
    //     el.textContent = str;
    //     el.setAttribute('readonly', '');
    //     el.style.position = 'absolute';
    //     el.style.left = '-9999px';
    //     document.body.appendChild(el);
    //     const selected =
    //         document.getSelection().rangeCount > 0 ?
    //             document.getSelection().getRangeAt(0) :
    //             false;
    //     el.select();
    //     document.execCommand('copy');
    //     document.body.removeChild(el);
    //     if (selected) {
    //         document.getSelection().removeAllRanges();
    //         document.getSelection().addRange(selected);
    //     }
    //     alert("Copy Text: " + str);
    // }


    return (
        <>
            <Box>
                <Button onClick={onOpen} colorScheme="orange" size="lg">
                    Remod
                </Button>
            </Box>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Center>reMod: Sharing</Center>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Box>
                            <Center />
                        </Box>
                        <Input
                            placeholder="Post's Link"
                            marginTop={5}
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            id="myInput"
                        />
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Box display="flex" gap={5}>
                            <Button colorScheme="orange" onClick={onClose}>
                                OK
                            </Button>
                            <Button
                                onClick={() => {
                                    // console.log(`Clicked CopyLink button`);
                                    copyToClipboard(link);
                                    copyToClipboard('Your Function Copied')
                                    toast({
                                        title: "Link Copied!",
                                        status: "success",
                                        duration: 1000,
                                        isClosable: true,
                                    });
                                }}
                            >
                                CopyLink
                            </Button>
                        </Box>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default RemodButton;