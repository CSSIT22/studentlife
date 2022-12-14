import React from 'react'
import AppBody from '../share/app/AppBody'

const AnnounceNav = (props:any) => {
  return (
    <AppBody
            secondarynav={[
                { name: "Announcement", to: "/announcement" },
                { name: "Approval", to: "/announcement/approval" },
                { name: "History", to: "/announcement/history" },
                { name: "Recycle bin", to: "/announcement/recyclebin" },
            ]}
            p={{ md: "3rem" }}
            
        >
            {props.children}
        </AppBody>
  )
}

export default AnnounceNav