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
    const [showButton, setShowButton] = React.useState(false)
    const recoverClick = () => {
        setShowButton(true)
    }
    const cancelRecover = () => {
        setShowButton(false)
    }
    const modalRecycle = {
        topic:"Recover the announcement",
        detail:"Are you sure to recover this announcement?",
      }

    return (
        <AppBody>
            <HeaderPage head="Recycle bin" />
            {/* เดี๋ยวใส่ map ทีหลัง */}
            <PostOnRecycle topic="Hello world" sender="SAMO-SIT" expired="48:12:02" onClick={recoverClick} />
            <PostOnRecycle topic="Hi" sender="SAMO-MEDIA" expired="48:12:02" onClick={recoverClick}/>
            <PostOnRecycle topic="Hi kub" sender="SAMO-SCI" expired="48:12:02" onClick={recoverClick}/>
            <PostOnRecycle topic="Hi kub" sender="SAMO-SCI" expired="48:12:02" onClick={recoverClick}/>
            <ModalForEvent isOpen={isOpen} onClose={onClose} topic={modalRecycle.topic} detail={modalRecycle.detail} status={"recover"} />
            {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} status={"recover"}/>}
        </AppBody>
    )
}

export default recyclebin
