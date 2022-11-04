import React from 'react';
import AppBody from '../../components/share/app/AppBody';
import SecondaryNav from '../../components/share/navbar/SecondaryNav';

const index = () => {
  return (
   <AppBody 
   secondarynav={[
    {
        name: "Test",
        to: "/ad",
        Icon: AiFillAccountBook,
        subNav: [{ name: "Sub1", to: "/asd", Icon: AiFillAccountBook }],
    },
   ]}>
    
   </AppBody>
  );
}

export default index;
