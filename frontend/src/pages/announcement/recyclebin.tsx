import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    useDisclosure,
    Stack,
    Box,
    Flex,
} from "@chakra-ui/react"
import React from "react"
import ButtonForEvent from "../../components/annoucement/ButtonForEvent"
import HeaderPage from "../../components/annoucement/HeaderPage"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import PostOnRecycle from "../../components/annoucement/PostOnRecycle"
import AppBody from "../../components/share/app/AppBody"
import detail from "./detail"

const recyclebin = () => {
    // const { isOpen, onOpen, onClose } = useDisclosure()
    const [isOpen, setIsOpen] = React.useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }
    const [statusPostRequest, setStatusPostRequest] = React.useState("")

    const [selectPost, setSelectPost] = React.useState(Number)
    const [showButton, setShowButton] = React.useState(false)
    const recoverClick = (postId: number, status: string) => {
        setShowButton(true)
        setSelectPost(postId)
        setStatusPostRequest(status)
    }
    // console.log(statusPostRequest)

    const cancelRecover = () => {
        setShowButton(false)
    }
    const modalRecycle = {
        topic: "Recover the announcement",
        detail: "Are you sure to recover this announcement?",
    }
    const post = [
        { topic: "hello World", sender: "SAMO-SIT", status: "delete", id: 10, expired: "45:12:11" },
        { topic: "SIT Esport", sender: "SAMO-SIT", status: "delete", id: 11, expired: "45:52:11" },
        { topic: "SIT Valentine", sender: "SAMO-SIT", status: "delete", id: 12, expired: "45:23:11" },
        { topic: "SIT Volunteer", sender: "SAMO-SIT", status: "delete", id: 13, expired: "45:55:11" },
    ]
    const [allPost, setAllPost] = React.useState(post)

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
        >
            <Flex alignItems={"center"}>
                <HeaderPage head="Recycle bin" />
            </Flex>
            {allPost
                .filter((fl) => fl.status == "delete")
                .map((el) => {
                    return (
                        <PostOnRecycle
                            topic={el.topic}
                            sender={el.sender}
                            expired={el.expired}
                            onClick={recoverClick}
                            id={el.id}
                            status={el.status}
                            key={el.id}
                        />
                    )
                })}
            <ModalForEvent
                isOpen={isOpen}
                onClose={onClose}
                topic={modalRecycle.topic}
                detail={modalRecycle.detail}
                status={statusPostRequest}
                allPost={allPost}
                setAllPost={setAllPost}
                selectPost={selectPost}
                cancelButtonForEvent={cancelRecover}
            />
            {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={"recover"} />}
        </AppBody>
    )
}

export default recyclebin
