import React from "react"
import HeaderPage from "../../components/annoucement/HeaderPage"
import AppBody from "../../components/share/app/AppBody"
import PostOnHistory from "../../components/annoucement/PostOnHistory"
import ButtonForEvent from "../../components/annoucement/ButtonForEvent"
import ModalForEvent from "../../components/annoucement/ModalForEvent"

const history = () => {
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
    const modalHistory = {
      topic:"WARNING",
      detail:"This announcement will be kept for 3 days. After these 3 days, you won't be able to recover this announcement.",
      event:"Delete",
      button:"Delete announcement"
    }
    return (
        <AppBody>
            <HeaderPage head="History" />
            {/* เดี๋ยวจะใช้ map ทีหลัง */}
            <PostOnHistory topic="Hello World" sender="SAMO-SIT" status="" onClick={recoverClick}/>
            <PostOnHistory topic="Hello World" sender="SAMO-SIT" status="approve" onClick={recoverClick}/>
            <PostOnHistory topic="Hello World" sender="SAMO-SIT" status="disapprove" onClick={recoverClick}/>
            <ModalForEvent isOpen={isOpen} onClose={onClose} topic={modalHistory.topic} detail={modalHistory.detail} event={modalHistory.event}/>
            {showButton && <ButtonForEvent onOpen={onOpen} cancel={cancelRecover} button={modalHistory.button}/>}
            
        </AppBody>
    )
}

export default history
