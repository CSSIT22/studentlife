import { post } from "@apiType/announcement"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { Link } from "react-router-dom"
import API from "src/function/API"

const ModalForEvent: FC<{
    isOpen: boolean
    onClose: Function
    topic: string
    detail: string
    status: string
    allPost: Array<any>
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>>
    selectPost?: number
    onClick: Function
}> = ({ isOpen, onClose, topic, detail, status, allPost, setAllPost, selectPost, onClick }) => {
    // console.log(status + " " + selectPost)
    // console.log(allPost);
    let expiredonrecycle: Date = new Date()
    let date: number = new Date().getDate()
    let month: number = new Date().getMonth()
    let year: number = new Date().getFullYear()
    // console.log  (year+"-"+month+"-"+date);
    expiredonrecycle.setDate(date + 3)
    expiredonrecycle.setMonth(month)
    expiredonrecycle.setFullYear(year)
    // console.log(expiredonrecycle);

    const toggle = () => {
        onClick()
        if (status == "approve") {
            // setAllPost(
            //     allPost.map((el) => {
            //         if (el.postId == selectPost) {
            //             el.status = "delete"
            //             el.expiredAfterDelete = new Date()
            //         }
            //         return el
            //     })
            // )
            API.post<post>("/announcement/editstatusonhistory", { postId: selectPost, status: "delete", expiredAfterDelete: expiredonrecycle })
        } else if (status == "disapprove") {
            // setAllPost(
            //     allPost.map((el) => {
            //         if (el.postId == selectPost) {
            //             el.status = "deleted"
            //         }
            //         return el
            //     })
            // )
            API.post<post>("/announcement/editstatusonhistory", { postId: selectPost, status: "deleted", expiredAfterDelete: expiredonrecycle })
        } else if (status == "delete") {
            // setAllPost(
            //     allPost.map((el) => {
            //         if (el.postId == selectPost) {
            //             el.status = "approve"
            //         }
            //         return el
            //     })
            // )
            API.post<post>("/announcement/editstatusonrecycle", { postId: selectPost })
        }
    }
    // console.log(status);
    // console.log(allPost);
    // console.log(selectPost);

    const checkstatus = (status: string) => {
        if (status == "disapprove" || status == "approve") {
            return (
                <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                        onClose(), toggle()
                    }}
                    bg="#E65300"
                    color="white"
                >
                    Delete
                </Button>
            )
        } else if (status == "delete") {
            return (
                <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                        onClose(), toggle()
                    }}
                    bg="#E65300"
                    color="white"
                >
                    Recover
                </Button>
            )
        } else if (status == "waiting") {
            return (
                <Link to={`/announcement/history/${selectPost}`}>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={() => {
                            onClose(), toggle()
                        }}
                        bg="#E65300"
                        color="white"
                    >
                        Edit
                    </Button>
                </Link>
            )
        } else {
            return ""
        }
    }
    // console.log(status);
    const backToHistory = (status: string) => {
        if (status == "edit") {
            return (
                <Link to="/announcement/history">
                    <Button
                        onClick={() => {
                            onClose()
                            onClick()
                        }}
                    >
                        Close
                    </Button>
                </Link>
            )
        } else if (status == "OK") {
            return (
                <Link to="/announcement">
                    <Button
                        onClick={() => {
                            onClose()
                        }}
                    >
                        Close
                    </Button>
                </Link>
            )
        } else {
            return (
                <Button
                    onClick={() => {
                        onClose()
                    }}
                >
                    Close
                </Button>
            )
        }
    }
    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={() => onClose()} size={"xs"} isCentered>
            <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
            <ModalContent>
                <ModalHeader>{topic}</ModalHeader>
                <ModalBody pb={6}>
                    <Text>{detail}</Text>
                </ModalBody>
                <ModalFooter>
                    {checkstatus(status)}
                    {backToHistory(status)}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalForEvent
