import AppBody from "../share/app/AppBody";
import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const QAnsAppBody = (props: any) => {

  const isMobile = useBreakpointValue({
    base: false,
    md: true,
  })


  
  return (
      <AppBody 
        secondarynav={[
        {
          name: "Q&A Feed",
          to: "/qa"
        },
        {
          name: "Create Q&A",
          to: "/qa/create",
        },
        {
          name: "My Questions",
          to: "/qa/myquestions"
        },
      ]}
    >
      {props.children}
    </AppBody>
    )
  }


export default QAnsAppBody