import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import API from "src/function/API";
import { useParams } from "react-router-dom";

export const ChangeProfileImageModal: React.FC<{ isProfileOpen: boolean; onProfileClose: VoidFunction; }> = ({ isProfileOpen, onProfileClose }) => {
    const [image, setimage] = useState<any>()
    const param = useParams();
    function imageHandler(user_image: any) {
        setimage(user_image)
    }
    async function submitHandler() {
        await API.put(`/profile/changeuserimage/${param.userID}`, {
            image: image,

        }).then().catch(err => console.error("Error happend during updating user profile", err))
    }


    return (
        <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
            <form onSubmit={(e) => { e.preventDefault(); submitHandler(); onProfileClose() }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Change Profile Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button value={image} onChange={(e) => imageHandler(e.target.value)}>
                            import file
                        </Button>
                    </ModalBody>

                    <ModalFooter>
                        <Button type='submit' colorScheme='orange' mr={3} onClick={onProfileClose}>
                            Save
                        </Button>
                        <Button variant='ghost' onClick={onProfileClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    );
};
