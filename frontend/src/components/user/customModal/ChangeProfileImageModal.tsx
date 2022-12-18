import React from "react";
import { Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

export const ChangeProfileImageModal: React.FC<{ isProfileOpen: boolean; onProfileClose: VoidFunction; }> = ({ isProfileOpen, onProfileClose }) => {
    return (
        <Modal isOpen={isProfileOpen} onClose={onProfileClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Change Profile Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Button>
                        import file
                    </Button>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='orange' mr={3} onClick={onProfileClose}>
                        Save
                    </Button>
                    <Button variant='ghost' onClick={onProfileClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
