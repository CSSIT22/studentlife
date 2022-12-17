import { Avatar, Box, Button, Flex, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Textarea, useDisclosure } from "@chakra-ui/react"
import React, { FC } from "react"
import DetailBox from "../../components/shopreview/DetailBox"
import AmountLike from "./AmountLike"
import AmountRate from "./AmountRate"
import RatingStar from "./RatingStar"
import TempUpload from "./TempUpload"
// หาวิธีเอาทุกอย่างที่มารวมกัน
const Addyour: FC<{
    name: String

}> = ({ name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    window.scrollTo(0, 0)
    return (
        <>

            <Box onClick={onOpen} as="button" mt={5} width={"100%"}>
                <Heading shadow={"md"} bgColor={"white"} padding={"10"} textAlign={"center"} size={"sm"} rounded={10}>
                    + Addyour
                </Heading>

                {/* pop ups  */}
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Add Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        {/* <RatingStar size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" onClick={} rating={0} /> */}
                        {/* input here */}
                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add review"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                        ></Textarea>
                        <Input type={"file"} id="id" hidden multiple></Input>

                        {/* <TempUpload files={undefined} setFiles={undefined} /> */}


                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button bgColor={"green"} color="white">
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>






    )
}

export default Addyour
