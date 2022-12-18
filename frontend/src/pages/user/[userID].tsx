import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Box, Grid, GridItem } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import API from "src/function/API"
import { authContext } from "src/context/AuthContext"
import UserProfile from "../../components/user/UserProfile"

interface AboutMeForm {
    phone: string
    sex: string
    hobbies: string
    birthdate: string
    year: number
    address: string
}

// Main component
function index() {
    const user = useContext(authContext)
    const [userExp, setUserExp] = useState<any>()
    const param = useParams();
    const [userData, setUserData] = useState<any>({})
    const [isMe, setIsMe] = useState<boolean>(false)
    const [rating, setRating] = useState<number>(0)

    // get user data
    const getCurrentExp = async () => {
        const res = await API.get(`/user/profile/exp/${param.userID}`)
        setUserExp(res.data)
    }

    // get user data
    const getUserData = async () => {
        const res = await API.get(`/user/friendprofile/${param.userID}`)
        setUserData(res.data.user)
    }

    // set user rating
    const getUserRating = async () => {
        const res = await API.get(`/user/profile/ratinguser/${param.userID}`)
        setRating(res.data.Rating)
    }

    useEffect(() => {
        getCurrentExp()
        getUserData()
        getUserRating()
        if (user.userId === param.userID) {
            setIsMe(true)
        }
    }, [])

    return (
        <AppBody>
            <Box bg="orange.50">
                <Grid
                    margin={"3"}
                    templateAreas={{ base: `"header" "nav" "nav2"`, md: `"header header" "nav main" "nav2 footer"` }}
                    gridTemplateColumns={{ base: "100%", md: "35% 1fr" }}
                    gap="1"
                    color="blackAlpha.700"
                    fontWeight="bold"
                    justifyContent="center"
                >
                    <GridItem alignItems="center" area={"header"}>
                        <UserProfile isMe={isMe} userData={userData} rating={rating} />
                    </GridItem>
                    <GridItem area={"nav"}>
                        <ExpSystem exp={userExp?.exp} level={userExp?.level} />
                        <AboutMe aboutMe={userData} />
                    </GridItem>
                    <GridItem area={{ base: "nav2", md: "main" }}>
                        <BlogHistory />
                    </GridItem>
                </Grid>
            </Box>
        </AppBody>
    )
}

export default index
