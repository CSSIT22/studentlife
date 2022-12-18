import { post } from "@apiType/announcement"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import React, { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "src/function/API"

const ModalForEvent: FC<{
    isOpen: boolean
    onClose: Function
    topic: string
    detail: string
    status: string
    allPost: Array<any> | ""
    setAllPost: React.Dispatch<React.SetStateAction<Array<any>>> | ""
    selectPost?: number
    onClick: Function
}> = ({ isOpen, onClose, topic, detail, status, allPost, setAllPost, selectPost, onClick }) => {
    const navigate = useNavigate()
    const toggle = async () => {
        onClick()
        if (status == "Approve") {
            await API.post<post>("/announcement/editstatusonhistory", { postId: selectPost, status: "Delete", deleteAt: new Date() })
            navigate("/announcement/history")
        } else if (status == "Disapprove") {
            await API.post<post>("/announcement/editstatusonhistory", { postId: selectPost, status: "Deleted", deleteAt: new Date() })
            navigate("/announcement/history")
        } else if (status == "Delete") {
            await API.post<post>("/announcement/editstatusonrecycle", { postId: selectPost })
            navigate("/announcement/recyclebin")
        }
    }

    const checkstatus = (status: string) => {
        if (status == "Disapprove" || status == "Approve") {
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
        } else if (status == "Delete") {
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
        } else if (status == "Waiting for Approve") {
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
