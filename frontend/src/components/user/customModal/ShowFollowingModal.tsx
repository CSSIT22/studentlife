import React, { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";
import API from "src/function/API";

export const ShowFollowingModal: React.FC<{ onClose: VoidFunction; finalFocusRef: React.MutableRefObject<null>; isOpen: boolean; onClick: VoidFunction; }> = ({ onClose, finalFocusRef, isOpen, onClick }) => {

    const [friendList, setFriendList] = useState([])
    const param = useParams();


    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/getFollowering/${param.userID}`)
            setFriendList(res.data.following.map((item: any) => {
                return {
                    userId: item.following.userId,
                    fName: item.following.fName,
                    lName: item.following.lName,
                }
            }))
        }

        fetch();
    }, [])

    return (
        <Modal onClose={onClose} finalFocusRef={finalFocusRef} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Following</ModalHeader>
                <ModalCloseButton />
                <ModalBody rounded="xl">
                    <FriendList FriendList={friendList} />
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
