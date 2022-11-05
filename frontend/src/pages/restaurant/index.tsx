import { Heading } from '@chakra-ui/react'
import React from 'react'
import AppBody from '../../components/share/app/AppBody'


const likeOrNope = () => {
  return (
    <AppBody
        secondarynav={[
            {name: "Like or Nope", to: "/restaurant"},
            {name: "My Favorite", to: "/restaurant/favorite"},
            {name: "My History", to: "/restaurant/history"},
            {name: "Detail อันนี้ใส่ไว้ก่อง", to: "/restaurant/detail"}
        ]}
    >   
        //likeOrNope Here


        
    </AppBody>
  )
}

export default likeOrNope