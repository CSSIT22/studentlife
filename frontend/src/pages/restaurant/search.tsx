import { Box, Button, Flex, Heading, Input, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React from 'react';
import Searchbar from '../../components/restaurant/searchbar';
import Searchcontent from '../../components/restaurant/searchcontent';
import AppBody from '../../components/share/app/AppBody';
const search = () => {
  return (
   <AppBody 
   secondarynav={[ 
    { name: "Like or Nope", to: "/restaurant" },
    { name: "My Favorite", to: "/restaurant/favorite" },
    { name: "My History", to: "/restaurant/history" },
]}>
    <Searchbar/>

       <Heading mt={"20px"} textAlign="center"> 
           Search Result
       </Heading>

       <Searchcontent resName={"Kitchen Cheif's"} phone={"0919191911"} open={"10.00 am - 9.00 pm"} website={"https://www.facebook.com/pugkitchenchef"}/>
       <Searchcontent resName={"Kitchen Cheif's"} phone={"0919191911"} open={"10.00 am - 9.00 pm"} website={"https://www.facebook.com/pugkitchenchef"}/>
       <Searchcontent resName={"Kitchen Cheif's"} phone={"0919191911"} open={"10.00 am - 9.00 pm"} website={"https://www.facebook.com/pugkitchenchef"}/>
       <Searchcontent resName={"Kitchen Cheif's"} phone={"0919191911"} open={"10.00 am - 9.00 pm"} website={"https://www.facebook.com/pugkitchenchef"}/>
       

   </AppBody>
  );
}

export default search;
