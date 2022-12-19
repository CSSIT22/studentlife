import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Box, Grid, GridItem, useBoolean } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import UserProfile from "../../components/user/UserProfile"
import NotFound from "src/config/pages/NotFound"


// Main component
function index() {
    const user = useContext(authContext)
    const [userExp, setUserExp] = useState<any>()
    const param = useParams();
    const [aboutMe, setaboutMe] = useState<any>({})
    const [userData, setUserData] = useState<any>({})
    const [isMe, setIsMe] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)
    const [isLoading, setisLoading] = useState(true)
    const [block, setblock] = useState(true)
    const navigate = useNavigate()
    const [isNotfound, setIsNotfound] = useBoolean(false)

    const getblock = async () => {
        const res = await API.get(`/user/profile/getblockuser/${param.userID}`)
        setblock(res.data)
    }

    // get user EXP
    const getCurrentExp = async () => {
        const res = await API.get(`/user/profile/exp/${param.userID}`)
        setUserExp(res.data)
    }

    // get user data
    const getUserData = async () => {
        try {
            const res = await API.get(`/user/friendprofile/${param.userID}`)
            setUserData(res.data.user)

        } catch (err) {
            setIsNotfound.on()
        }
    }

    // get user Aboutme
    const getAboutme = async () => {
        const res = await API.get(`/user/friendprofile/${param.userID}`)
        setaboutMe(res.data.user)
    }

    // set user rating
    const getUserRating = async () => {
        const res = await API.get(`/user/profile/ratinguser/${param.userID}`)
        setRating(res.data.Rating)
    }

    useEffect(() => {
        getblock()
        getAboutme()
        getCurrentExp()
        getUserData()
        getUserRating()
        setisLoading(false)
        if (user.userId === param.userID) {
            setIsMe(true)
        }
    }, [user.userId])
    if (isNotfound) {
        return <NotFound />
    }
    return (
        <AppBody>
            <Box bg="orange.50">
                <Grid
                    margin={"3"}
                    templateAreas=
                    {{
                        base: `
                            "header" 
                            "nav"
                            "nav2"`,
                        md: `
                        "header header"
                        "nav main" 
                        "nav2 footer"` }}

                    gridTemplateColumns={{ base: "100%", md: "40% 1fr" }}
                    gap="1"
                    color="blackAlpha.700"
                    fontWeight="bold"
                    justifyContent="center"
                >
                    <GridItem alignItems="center" area={"header"}>
                        {!isLoading && <UserProfile aboutMe={aboutMe} isMe={isMe} userData={userData} rating={rating} />}
                    </GridItem>
                    <GridItem area={"nav"} mt={"-6rem"}>
                        <ExpSystem exp={userExp?.exp} level={userExp?.level} />
                        <AboutMe aboutMe={userData} />
                    </GridItem>
                    <GridItem area={{ base: "nav2", md: "main" }} mt={{ base: "0rem", md: "-6rem" }} >
                        <BlogHistory />
                    </GridItem>
                </Grid>
            </Box>
        </AppBody>
    )
}

export default index
