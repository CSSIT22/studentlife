import React from "react"
import { IoIosAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import HeaderPage from "../../components/annoucement/HeaderPage"
import PostOnAnnouncementPage from "../../components/annoucement/PostOnAnnouncementPage"
import AppBody from "../../components/share/app/AppBody"

const index = () => {
    const post = [
        { topic: "hello World", sender: "SAMO-SIT", status: false, id: 10 },
        { topic: "SIT Esport", sender: "SAMO-SIT", status: false, id: 11 },
        { topic: "SIT Valentine", sender: "SAMO-SIT", status: false, id: 12 },
        { topic: "SIT Volunteer", sender: "SAMO-SIT", status: false, id: 13 },
    ]
    const [allPost, setAllPost] = React.useState(post)
    const [selectPost, setSelectPost] = React.useState(Number)
    const onSelectPost = (postId: number) => {
        setSelectPost(postId)
        // console.log(postId);
    }
    // const detail = () => {
    //     return (
    //         <Link to="/announcement/detail/:postid">
    //             <DetailPost selectPost={selectPost} posts={allPost} />
    //         </Link>
    //     )
    // }
    return (
        <AppBody>
            <HeaderPage head="Announcement" Icon={IoIosAddCircle} />
            {allPost
                .filter((p) => {
                    return p.status == true
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.topic}
                            sender={el.sender}
                            status={el.status}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.id}
                            onSelectPost={onSelectPost}
                        />
                    )
                })}
            {allPost
                .filter((p) => {
                    return p.status == false
                })
                .map((el) => {
                    return (
                        <PostOnAnnouncementPage
                            topic={el.topic}
                            sender={el.sender}
                            status={el.status}
                            allPost={allPost}
                            setAllPost={setAllPost}
                            id={el.id}
                            onSelectPost={onSelectPost}
                        />
                    )
                })}
        </AppBody>
    )
}

export default index
