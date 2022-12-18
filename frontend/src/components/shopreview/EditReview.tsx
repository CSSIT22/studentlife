import { EditIcon } from '@chakra-ui/icons'
import { Flex, Box, useDisclosure, Button, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, Image } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import API from 'src/function/API'
import review from 'src/pages/restaurant/review/[reviewRes]'
import RatingStar from './RatingStar'
import TempUpload from './TempUpload'

const EditReview: React.FC<{ shopId:number, reviewId:String ,  isOpen: any, onClose: any }> = ({shopId, reviewId,isOpen, onClose }) => {

    const finalRef = React.useRef();
   
    
    const [files, setFiles] = useState<any>([]) // array of user's files (pictures)
    const [text, setText] = useState("");
    const [rating, setRating] = useState(0) // rating star max = 5
    let param = useParams() // get data from param
    
    const save = () => {
        const form = new FormData();
        form.append("shopId",shopId+"") ;
        form.append("reviewId",reviewId+"") ;
        form.append("text", text);
        form.append("rating", rating + "");
        form.append("shopId", param.shopId + "");
        files.map((item: any) => {
            form.append("upload", item.file)
        })

        API.post("/shopreview/editmyreview",
            form,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then((res) => {
            console.log(res)
            window.location.reload()
        })
    }



   



    // handle onclick
    const onClick = (idx: any) => {
        var x = idx
        // allow user to click first icon and set rating to zero if rating is already 1
        if (rating === 1 && parseInt(x) === 1) {
            setRating(0)
        } else {
            setRating(parseInt(x))
        }
    }



    return (
        <>
            <Modal isOpen={isOpen} onClose={() => { }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader mt={3}>
                        <Heading>Add Review</Heading>
                    </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <RatingStar rating={rating} onClick={onClick} size={45} icon="star" scale={5} fillColor="black" strokeColor="grey" />
                        {/* input here */}
                        <Textarea
                            colorScheme="white"
                            focusBorderColor="black"
                            placeholder="Add review"
                            marginTop={"5"}
                            minHeight={"100px"}
                            maxHeight={"200px"}
                            value={text}
                            onChange={(e) => setText(e.target.value)}


                        >
                        </Textarea>
                        {/* <Input type={"file"} id="fileInput" hidden multiple></Input> */}
                        {/* <Box
                            onClick={() => {
                                document.getElementById("fileInput")?.click()
                            }}
                            as="button"
                            style={{
                                position: "absolute",
                                top: "67%",
                                left: "7%",
                            }}
                        >
                            <Image
                                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                width={"40px"}
                                borderRadius="full"
                            />
                        </Box> */}
                        <TempUpload files={files} setFiles={setFiles} />



                        {/* <Input type={"file"} id="id" hidden multiple></Input>
                        <Box
                            onClick={() => {
                                document.getElementById("id")?.click()
                            }}
                            as="button"
                            paddingTop={"10px"}
                        >
                            <Image
                                src="https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                                width={"40px"}
                                borderRadius="full"
                                marginLeft={"1"}
                                marginTop={"-58px"}
                                padding={"4px"}
                            />
                        </Box> */}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button bgColor={"green"} color="white"  onClick={save}  >
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditReview