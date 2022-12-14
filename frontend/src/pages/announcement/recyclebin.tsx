import { Flex, Heading, useBoolean } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import ButtonForEvent from "../../components/annoucement/ButtonForEvent"
import HeaderPage from "../../components/annoucement/HeaderPage"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import PostOnRecycle from "../../components/annoucement/PostOnRecycle"
import AppBody from "../../components/share/app/AppBody"
import detail from "./detail/[postId]"
import { postInfoTest } from "./postInfoTest"
import { announcement_delete, post } from "@apiType/announcement"
import API from "src/function/API"
import AnnounceError from "src/components/annoucement/lotties/AnnounceError"
import AnnounceLoading from "src/components/annoucement/AnnounceLoading"
import AnnounceNav from "src/components/annoucement/AnnounceNav"

const recyclebin = () => {

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

    const cancelRecover = () => {
        setShowButton(false)
    }
    const modalRecycle = {
        topic: "Recover the announcement",
        detail: "Are you sure to recover this announcement?",
    }

    const [toggle, settoggle] = useState(false)
    const [allPost, setAllPost] = React.useState<announcement_delete[]>([])
    const [isError, { on }] = useBoolean()
    const [isLoading, { off }] = useBoolean(true)
    const getData = API.get("/announcement/getdeletepost")
    useEffect(() => {
        getData.then((res) => setAllPost(res.data)).catch((err) => on()).finally(off)
    }, [toggle])
    // console.log(toggle);
    const click = () => {
        settoggle(!toggle)
    }

    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    const date = new Date()

    const currentD = Math.round(date.getTime() / day)
    const currentH = Math.round(date.getTime() / hour)
    const currentM = Math.round(date.getTime() / minute)
    const showRemaining = (epd: Date) => {
        const expired = new Date(epd)
        const dEpd = Math.round(expired.getTime() / day)
        const diffD = dEpd - currentD

        if (diffD <= 3 && diffD > 0) {
            if (diffD == 1) {
                return diffD + " day"
            } else {
                return diffD + " days"
            }
        } else if (diffD == 0) {
            const hEpd = Math.round(expired.getTime() / hour)
            const diffH = hEpd - currentH
            if (diffH <= 24 && diffH > 0) {
                if (diffH == 1) {
                    return diffH + " hour"
                } else {
                    return diffH + " hours"
                }
            } else {
                return diffH + " H"
            }
        } else {
            return ""
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
                                    <HeaderPage head="Recycle bin" />
                                </Flex>
                                {allPost
                                    .filter((fl) => {
                                        const expiredonrecycle = new Date(fl.deleteAt)
                                        let date: number = new Date(fl.deleteAt).getDate()
                                        let month: number = new Date(fl.deleteAt).getMonth()
                                        let year: number = new Date(fl.deleteAt).getFullYear()
                                        expiredonrecycle.setDate(date + 3)
                                        // console.log(expiredonrecycle);


                                        const expired = new Date(expiredonrecycle)
                                        const expiredPost = Math.round(expired.getTime() / day)
                                        const diffD = expiredPost - currentD
                                        // console.log(diffD);


                                        const hEpd = Math.round(expired.getTime() / hour)
                                        const diffH = hEpd - currentH


                                        return (diffD > 0 || diffH > 0)
                                    })
                                    .map((el) => {
                                        const expired = new Date(el.deleteAt)
                                        let date: number = new Date(el.deleteAt).getDate()
                                        expired.setDate(date + 3)
                                        const r = showRemaining(expired)
                                        return (
                                            <PostOnRecycle
                                                topic={el.post.annLanguage[0].annTopic}
                                                sender={el.post.annCreator.fName + " " + el.post.annCreator.lName}
                                                expired={r}
                                                onClick={recoverClick}
                                                id={el.post.postId}
                                                status={"Delete"}
                                                key={el.postId}
                                                onOpen={onOpen}
                                            />
                                        )
                                    })}
                                <ModalForEvent
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    onClick={click}
                                    topic={modalRecycle.topic}
                                    detail={modalRecycle.detail}
                                    status={statusPostRequest}
                                    allPost={allPost}
                                    setAllPost={setAllPost}
                                    selectPost={selectPost}
                                /></>
                        )
                    }
                }
            })()}
        </AnnounceNav>



    )
}

export default recyclebin
