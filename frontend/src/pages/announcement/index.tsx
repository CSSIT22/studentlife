import React from 'react'
import { IoIosAddCircle } from 'react-icons/io'
import HeaderPage from '../../components/annoucement/HeaderPage'
import PostOnAnnouncementPage from '../../components/annoucement/PostOnAnnouncementPage'
import AppBody from '../../components/share/app/AppBody'

const index = () => {
  return (
    <AppBody>
        <HeaderPage head="Announcement" Icon={IoIosAddCircle} />
        <PostOnAnnouncementPage topic="Hello World1" sender='SAMO-SIT' status={false}/>
        <PostOnAnnouncementPage topic="Hello World2" sender='SAMO-SIT' status={false}/>
        <PostOnAnnouncementPage topic="Hello World3" sender='SAMO-SIT' status={false}/>
    </AppBody>
  )
}

export default index
