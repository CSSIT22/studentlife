import React from "react"
import HeaderPage from "../../components/annoucement/HeaderPage"
import AppBody from "../../components/share/app/AppBody"
import PostOnHistory from "../../components/annoucement/PostOnHistory"
import ButtonForEvent from "../../components/annoucement/ButtonForEvent"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import { Box, Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { postInfoTest } from "./postInfoTest"

const history = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const onOpen = () => {
        setIsOpen(true)
    }
    const onClose = () => {
        setIsOpen(false)
    }
    const [showButton, setShowButton] = React.useState(false)
    const [statusPostRequest, setStatusPostRequest] = React.useState("")
    const [selectPost, setSelectPost] = React.useState(Number)
    const onClick = (status: string, postId: number) => {
        setShowButton(true)
        setStatusPostRequest(status)
        setSelectPost(postId)
    }
    // console.log(selectPost);

    // console.log(statusPostRequest)

    const cancelRecover = () => {
        setShowButton(false)
    }
    const modalDelete = {
        topic: "WARNING",
        detail: "This announcement will be kept for 3 days. After these 3 days, you won't be able to recover this announcement.",
    }
    const modalEdit = {
        topic: "Edit the announcement",
        detail: "Are you sure to edit this announcement?",
    }
    // const post = [
    //     { topic: "hello World", sender: "SAMO-SIT", status: "disapprove", id: 10 },
    //     { topic: "SIT Esport", sender: "SAMO-SIT", status: "approve", id: 11 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: "waiting", id: 12 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: "disapprove", id: 13 },
    // ]
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const deleteOrEdit = (status: string) => {
        if (status == "approve" || status == "disapprove") {
            return (
                <>
                    <ModalForEvent
                        isOpen={isOpen}
                        onClose={onClose}
                        topic={modalDelete.topic}
                        detail={modalDelete.detail}
                        status={statusPostRequest}
                        allPost={allPost}
                        setAllPost={setAllPost}
                        selectPost={selectPost}
                    />
                    {/* {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={statusPostRequest} />} */}
                </>
            )
        } else if (status == "waiting") {
            return (
                <>
                    <ModalForEvent
                        isOpen={isOpen}
                        onClose={onClose}
                        topic={modalEdit.topic}
                        detail={modalEdit.detail}
                        status={statusPostRequest}
                        allPost={allPost}
                        setAllPost={setAllPost}
                        selectPost={selectPost}
                    />
                    {/* {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={statusPostRequest} />} */}
                </>
                
                
            )
        }
    }

    return (
        <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{md:"3rem"}}
        >
            <Flex alignItems={"center"}>
                <HeaderPage head="History" />
            </Flex>
            {allPost
                .filter((fl) => fl.status == "waiting" || fl.status == "approve" || fl.status == "disapprove")
                .map((el) => {
                    return <PostOnHistory topic={el.topic} sender={el.sender} status={el.status} onClick={onClick} onOpen={onOpen} id={el.postId} key={el.postId} />
                })}
            {deleteOrEdit(statusPostRequest)}
        </AppBody>
    )
}

export default history
