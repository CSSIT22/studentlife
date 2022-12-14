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
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceNav from "src/components/annoucement/AnnounceNav"

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
    const params = useParams()
    const [toggle, settoggle] = useState(false)
    const [allPost, setAllPost] = React.useState<announcement[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/announcement/gethistorypost/")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [toggle])

    const tog = () => {
        settoggle(!toggle)
    }

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
                </>
            )
        }
    }

    return (
        <AnnounceNav>
            {(() => {
                if (isLoading && !isError) {
                    return <AnnounceLoading />
                } else {
                    if (isError) {
                        return <AnnounceError />
                    } else {
                        return (
                            <>
                                <Flex alignItems={"center"}>
                                    <HeaderPage head="History" />
                                </Flex>
                                {allPost
                                    .filter((fl) => fl.annPost?.status == "Waiting for Approve" || fl.annPost?.status == "Approve" || fl.annPost?.status == "Disapprove")
                                    .map((el) => {
                                        return (
                                            <PostOnHistory
                                                topic={el.annLanguage[0].annTopic}
                                                sender={el.annCreator.fName + " " + el.annCreator.lName}
                                                status={el.annPost.status}
                                                onClick={onClick}
                                                onOpen={onOpen}
                                                id={el.postId}
                                                key={el.postId}
                                            />
                                        )
                                    })}
                                {deleteOrEdit(statusPostRequest)}
                            </>
                        )
                    }
                }
            })()}
        </AnnounceNav>



    )
}

export default history
