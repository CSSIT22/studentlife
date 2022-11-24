import { Heading } from '@chakra-ui/react'
import React from 'react'
import Historycontent from '../../components/restaurant/historycontent'
import Searchbar from '../../components/restaurant/searchbar'
import AppBody from '../../components/share/app/AppBody'

const history = () => {
  return (
    <AppBody
        secondarynav={[
            {name: "Like or Nope", to: "/restaurant"},
            {name: "My Favorite", to: "/restaurant/favorite"},
            {name: "My History", to: "/restaurant/history"},
            
        ]}
    >
       <Searchbar/>

       <Heading mt={"20px"} textAlign="center"> 
          History
       </Heading>
      
      <Historycontent resName={"Kitchen Cheif's"} date={"12/11/2022"} status={true}/>
      <Historycontent resName={"Kitchen Cheif's"} date={"12/11/2022"} status={false}/>
      <Historycontent resName={"Kitchen Cheif's"} date={"12/11/2022"} status={true}/>
      <Historycontent resName={"Kitchen Cheif's"} date={"12/11/2022"} status={false}/>
    </AppBody>
  )
}

export default history