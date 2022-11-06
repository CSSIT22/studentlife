import UserProfile from "../../components/user/UserProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"

function index() {
    return (
        <>
            <UserProfile />
            <ExpSystem />
            <AboutMe />
            <BlogHistory />
        </>
    )
}

export default index
