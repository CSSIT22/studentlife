import React from 'react'
import HeaderPage from '../../components/annoucement/HeaderPage'
import PostOnAnnouncementPage from '../../components/annoucement/PostOnAnnouncementPage'
import AppBody from '../../components/share/app/AppBody'

const index = () => {
  return (
    <AppBody>
        <HeaderPage head="Announcement"/>
        <PostOnAnnouncementPage topic="Hello World1" sender='SAMO-SIT' status='pin'/>
        <PostOnAnnouncementPage topic="Hello World2" sender='SAMO-SIT' status=''/>
        <PostOnAnnouncementPage topic="Hello World3" sender='SAMO-SIT' status=''/>
    </AppBody>
  )
}

export default index
