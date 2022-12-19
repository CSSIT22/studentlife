import React, { useEffect, useState } from "react";
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

import { useParams } from "react-router-dom";
import API from "src/function/API";


export const ShowFollowerModal: React.FC<{ isOpen: boolean; onClose: VoidFunction; finalFocusRef: React.MutableRefObject<null>; onClick: VoidFunction; }> = ({ isOpen, onClose, finalFocusRef, onClick }) => {
    const [friendList, setFriendList] = useState([])
    const param = useParams();


    useEffect(() => {
        async function fetch() {
            const res = await API.get(`/user/getFollower/${param.userID}`)

            setFriendList(res.data.follower.map((item: any) => {
                return {
                    userId: item.follower.userId,
                    fName: item.follower.fName,
                    lName: item.follower.lName,
                }
            }))
        }

        fetch();
    }, [])


    return (
        <Modal onClose={onClose} finalFocusRef={finalFocusRef} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Follower</ModalHeader>
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
