import { Flex } from "@chakra-ui/react"
import React from "react"
import ButtonForEvent from "../../components/annoucement/ButtonForEvent"
import HeaderPage from "../../components/annoucement/HeaderPage"
import ModalForEvent from "../../components/annoucement/ModalForEvent"
import PostOnRecycle from "../../components/annoucement/PostOnRecycle"
import AppBody from "../../components/share/app/AppBody"
import detail from "./detail/[postId]"
import { postInfoTest } from "./postInfoTest"

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
    // const post = [
    //     { topic: "hello World", sender: "SAMO-SIT", status: "delete", id: 10, expired: "45:12:11" },
    //     { topic: "SIT Esport", sender: "SAMO-SIT", status: "delete", id: 11, expired: "45:52:11" },
    //     { topic: "SIT Valentine", sender: "SAMO-SIT", status: "delete", id: 12, expired: "45:23:11" },
    //     { topic: "SIT Volunteer", sender: "SAMO-SIT", status: "delete", id: 13, expired: "45:55:11" },
    // ]
    const [allPost, setAllPost] = React.useState(postInfoTest)
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    const date = new Date()
    // console.log(date);
    const d = new Date("Sat Nov 12 2022 01:39:11 GMT+0700")
    console.log(d);
    
    
    const currentD = Math.round(date.getTime() / day)
    const currentH = Math.round(date.getTime() / hour)
    const currentM = Math.round(date.getTime() / minute)
    const showRemaining = (epd: string) => {
        const expired = new Date(epd)
        const dEpd = Math.round(expired.getTime() / day)
        const diffD = dEpd - currentD
        if(diffD <= 3 && diffD > 0){
            if(diffD == 1){
                return diffD+" day"
            }else {
                return diffD+" days"
            }
        }else if(diffD == 0){
            const hEpd = Math.round(expired.getTime() / hour)
            const diffH = hEpd-currentH
            if(diffH <=24 && diffH > 0){
                if(diffH == 1){
                    return diffH+" hour"
                }else {
                    return diffH+" hours"
                }
            }else {
                return diffH+" H"
            }
        }else {
            return ""
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
                <HeaderPage head="Recycle bin" />
            </Flex>
            {allPost
                .filter((fl) => {
                    const expired = new Date(fl.expiredAfterDelete)
                    const expiredPost = Math.round(expired.getTime() / day)
                    const diffD = expiredPost - currentD 
                    const hEpd = Math.round(expired.getTime() / hour)
                    const diffH = hEpd-currentH
                    return fl.status == "delete" && ((diffD > 0) || (diffH > 0))
                })
                .map((el) => {
                    const r = showRemaining(el.expiredAfterDelete)
                    return (
                        <PostOnRecycle
                            topic={el.topic}
                            sender={el.sender}
                            expired={r}
                            onClick={recoverClick}
                            id={el.postId}
                            status={el.status}
                            key={el.postId}
                            onOpen={onOpen}
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
        </AppBody>
    )
}

export default recyclebin
