import React from "react"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnRecycle from "../../components/annoucement/PostOnRecycle"
import AppBody from "../../components/share/app/AppBody"

const recyclebin = () => {
    return (
        <AppBody>
            <HeaderPage head="Recycle bin" />
            <PostOnRecycle topic="Hello world" sender="SAMO-SIT" expired="48:12:02" />
            <PostOnRecycle topic="Hi" sender="SAMO-MEDIA" expired="48:12:02" />
            <PostOnRecycle topic="Hi kub" sender="SAMO-SCI" expired="48:12:02" />
            <PostOnRecycle topic="Hi ka" sender="SAMO-ENGIN" expired="48:12:02" />
        </AppBody>
    )
}

export default recyclebin
