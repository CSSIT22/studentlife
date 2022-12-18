import { Center, Box, } from "@chakra-ui/react"
import React, { FC, useEffect, useState } from "react"
import file from "src/pages/groups/id/[communityID]/file";
function isImgUrl(url: any) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onerror = () => resolve(false);
        img.onload = () => resolve(true);
    })
}


const PostFile: FC<{
    file: string
}> = ({ file }) => {
    const [isImg, setIsImg] = useState(false);
    useEffect(() => {
        isImgUrl(file).then((res) => {
            if (res) {
                setIsImg(true);
            } else {
                setIsImg(false);
            }
        });
    }, [])

    return (
        <Box marginTop={4}>
            <Center>{isImg ? <img src={`${file}`} width="100%" height="auto" /> : <video width="100%" height="auto" controls>
                <source src={`${file}`} type="video/mp4"></source>
            </video>}
            </Center>
        </Box>
    )
}

export default PostFile

// Modal project (Still unfinish)

// import {
//     useDisclosure,
//     Button,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalCloseButton,
//     ModalBody,
//     ModalFooter,
//     Center,
//     Box,
//     Image,
// } from "@chakra-ui/react"
// import React from "react"

// function PostImage() {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     return (
//         <>
//             <Center>
//                 <Box marginTop={4}>
//                     <Center>
//                         <Image onClick={onOpen} src="https://i.redd.it/ujfngj2v25k91.jpg" alt="PostImage" objectFit={"cover"} boxSize="500px" />
//                     </Center>
//                 </Box>
//             </Center>

//             <Modal isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent size>
//                     <ModalHeader>Modal Title</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                         <Image src="https://i.redd.it/ujfngj2v25k91.jpg" alt="PostImage" objectFit={"cover"} boxSize="-moz-max-content" />
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme="blue" mr={3} onClick={onClose}>
//                             Close
//                         </Button>
//                         <Button variant="ghost">Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }

// export default PostImage
