import React from 'react'
import HeaderPage from '../../components/annoucement/HeaderPage'
import AppBody from '../../components/share/app/AppBody'
import PostOnHistory from '../../components/annoucement/PostOnHistory';

const history = () => {
  return (
    <AppBody>
      <HeaderPage head='History'/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status=''/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status='approve'/>
      <PostOnHistory topic='Hello World' sender='SAMO-SIT' status='disapprove'/>
    </AppBody>
  )
}

export default history