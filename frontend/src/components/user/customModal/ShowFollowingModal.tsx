import React from "react";
import {
    Button, Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import FriendList from "../FriendList";

export const ShowFollowingModal: React.FC<{ onClose: VoidFunction; finalFocusRef: React.MutableRefObject<null>; isOpen: boolean; onClick: VoidFunction; }> = ({ onClose, finalFocusRef, isOpen, onClick }) => {
    return (
        <Modal onClose={onClose} finalFocusRef={finalFocusRef} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Following</ModalHeader>
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
