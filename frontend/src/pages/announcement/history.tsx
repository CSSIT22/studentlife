import { Box, Flex, Heading, useBoolean } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"

import { announcement, post } from "@apiType/announcement"

import API from "src/function/API"
import { postInfoTest } from "./postInfoTest"
import React, { useEffect, useState } from "react"
import HeaderPage from "src/components/annoucement/HeaderPage"
import ModalForEvent from "src/components/annoucement/ModalForEvent"
import PostOnHistory from "src/components/annoucement/PostOnHistory"
import AppBody from "src/components/share/app/AppBody"

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
    const modalDeleted = {
        topic: "WARNING",
        detail: "This announcement will completely deleted from this page",
    }
    // const post = [
    //     { topic: "hello World", sender: "SAMO-SIT", status: "disapprove", id: 10 },
    //     { topic: "SIT Esport", sender: "SAMO-SIT", status: "approve", id: 11 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: "waiting", id: 12 },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: "disapprove", id: 13 },
    // ]

    const params = useParams()
    const [toggle, settoggle] = useState(false)
    const [allPost, setAllPost] = React.useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/announcement/gethistorypost/")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [toggle])
    console.log(allPost);
    

    const tog = () => {
        settoggle(!toggle)
    }
    if (isLoading)
        return (
            <AppBody>
                <Heading>Loading</Heading>
            </AppBody>
        )
    if (isError)
        return <AppBody><Heading color={"red"}>There is an Error</Heading></AppBody>
    // console.log(allPost)

    const deleteOrEdit = (status: string) => {
        if (status == "Approve") {
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
                        onClick={tog}
                    />
                    {/* {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={statusPostRequest} />} */}
                </>
            )
        } else if (status == "Disapprove") {
            return (
                <>
                    <ModalForEvent
                        isOpen={isOpen}
                        onClose={onClose}
                        topic={modalDeleted.topic}
                        detail={modalDeleted.detail}
                        status={statusPostRequest}
                        allPost={allPost}
                        setAllPost={setAllPost}
                        selectPost={selectPost}
                        onClick={tog}
                    />
                    {/* {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={statusPostRequest} />} */}
                </>
            )
        } else if (status == "Waiting for Approve") {
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
                        onClick={tog}
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
            p={{ md: "3rem" }}
        >
            <Flex alignItems={"center"}>
                <HeaderPage head="History" />
            </Flex>
            {allPost
                .filter((fl) => fl.annPost?.status == "Waiting for Approve" || fl.annPost?.status == "Approve" || fl.annPost?.status == "Disapprove")
                .map((el) => {
                    return (
                        <PostOnHistory
                            topic={el.annLanguage[0].annTopic}
                            sender={el.annCreator.fName+" "+el.annCreator.lName}
                            status={el.annPost.status}
                            onClick={onClick}
                            onOpen={onOpen}
                            id={el.postId}
                            key={el.postId}
                        />
                    )
                })}
            {deleteOrEdit(statusPostRequest)}
        </AppBody>
    )
}

export default history
