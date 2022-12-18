import React from "react";
import FriendList from "../FriendList";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

export const ShowFollowerModal: React.FC<{ isOpen: boolean; onClose: VoidFunction; finalFocusRef: React.MutableRefObject<null>; onClick: VoidFunction; }> = ({ isOpen, onClose, finalFocusRef, onClick }) => {
    return (
        <Modal onClose={onClose} finalFocusRef={finalFocusRef} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Follower</ModalHeader>
                <ModalCloseButton />
                <ModalBody rounded="xl">
                    <FriendList />
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClick} display={{ base: "none", md: "block" }}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
