import { EditIcon } from '@chakra-ui/icons'
import { useDisclosure, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, Heading, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, Box, Image } from '@chakra-ui/react'
import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import Rate from 'src/components/shopreview/Rate'
import RatingStar from 'src/components/shopreview/RatingStar'
const EditComment: FC<{ commentId: number }> = ({ commentId }) => {
    const [text, setText] = useState("") // review description 
    //const [detail, setDetail] = useState<any>([]) // shop's detail fetch from backend
    // const [files, setFiles] = useState<any>([]) // array of user's files (pictures)
    const { isOpen, onOpen, onClose } = useDisclosure() // chakra disclosure for open/close modal
    let param = useParams() // get data from param


    const submit = () => {
        const form = new FormData();
        console.log(commentId);

        console.log(text);
        API.post("/shopreview/editcomment",
            {
                commentId: commentId,
                text: text,
            }
        ).then((res) => {
            // console.log(res)
            window.location.reload()
        })
    }
    return (
        <>
            <Box onClick={onOpen} width={"100%"} as="button">
                <Flex direction={"row"} justifyContent={"center"} alignItems={"center"}>
                    <EditIcon mr={2} />
                    Edit
                </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader mt={3}>
                        {/* edit the comment */}
                        <Heading>Edit Your Comment</Heading>
                    </ModalHeader>

                    <ModalCloseButton />

                    <ModalBody>
                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add Comment"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></Textarea>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme={"green"} color="white" onClick={submit}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditComment