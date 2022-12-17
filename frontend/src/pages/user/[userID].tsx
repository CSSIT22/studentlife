import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Flex, Grid, GridItem } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
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

function index() {
    const user = useContext(authContext)
    const navigate = useNavigate()
    const [currentExp, setCurrentExp] = useState<number>(0)
    const param = useParams();
    const [userData, setUserData] = useState<any>({})
    const [isMe, setIsMe] = useState<boolean>(false)
    const getCurrentExp = async () => {
        const res = await API.get(`/user/profile/exp/${param.userID}`)
        setCurrentExp(res.data.exp)
    }

    const getUserData = async () => {
        const res = await API.get(`/user/friendprofile/${param.userID}`)
        setUserData(res.data)
    }
    console.log(userData)
    console.log(currentExp)

    useEffect(() => {
        getCurrentExp()
        getUserData()
        setDetail()

        if (user.userId === param.userID) {
            setIsMe(true)
        }

    }, [])


    const [aboutmeForm, setAboutmeForm] = useState<AboutMeForm>({
        phone: userData.phone,
        sex: userData.sex,
        hobbies: userData.hobbies,
        birthdate: userData.birthdate,
        year: userData.year,
        address: userData.address,
    })
    const setDetail = () => {
        setAboutmeForm({
            phone: userData.phone,
            sex: userData.sex,
            hobbies: userData.hobbies,
            birthdate: userData.birthdate,
            year: userData.year,
            address: userData.address,
        });
    };

    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    const handleSubmit = (data: AboutMeForm) => {
        setAboutmeForm(data)
    }

    // 3. Extend the theme
    return (
        <>
            {

            }
            <Box bg="orange.50">
                <Flex display="flex" position="static">
                    <AppBody />
                </Flex>
                <Grid
                    margin={"3"}
                    templateAreas={{
                        base: `"header"
                    "nav"
                    "nav2"`,
                        md: `"header header"
                  "nav main"
                  "nav2 footer"`,
                    }}
                    gridTemplateColumns={{ base: "100%", md: "35% 1fr" }}
                    gap="1"
                    color="blackAlpha.700"
                    fontWeight="bold"
                    justifyContent="center"
                >
                    <GridItem alignItems="center" area={"header"}>
                        {isMe ? <UserProfile onClick={() => { }} /> : <FriendProfile />}

                    </GridItem>
                    <GridItem area={"nav"}>
                        <ExpSystem />
                        <AboutMe />
                    </GridItem>
                    <GridItem area={{ base: "nav2", md: "main" }}>
                        <BlogHistory />
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}

export default index
