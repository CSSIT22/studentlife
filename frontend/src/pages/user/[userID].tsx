import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Flex, Grid, GridItem } from "@chakra-ui/react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import API from "src/function/API"



interface AboutMeForm {
    phone: string
    sex: string
    hobbies: string
    birthdate: string
    year: number
    address: string
}

function index() {
    const param = useParams();
    const [userData, setUserData] = useState<any>({})
    const getUserData = async () => {
        const res = await API.get(`/user/friendprofile/${param.userID}`)
        setUserData(res.data)
    }
    console.log(userData)
    useEffect(() => {

        getUserData()
    }, [])

    const [aboutmeForm, setAboutmeForm] = useState<AboutMeForm>({
        phone: "089XXXXXXX",
        sex: "Male",
        hobbies: "run walk",
        birthdate: "12/01/2020",
        year: 2,
        address: "Street: 723/106-107 Charansanitwong 53 Rd. City: Bang Phat State/province/area: Bangkok Phone number 66 0-2434-7113 Zip code 10700",
    })

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
    const theme = extendTheme({ breakpoints })
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
                        <FriendProfile />
                    </GridItem>
                    <GridItem area={"nav"}>
                        <ExpSystem />
                        <AboutMe {...aboutmeForm} />
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
