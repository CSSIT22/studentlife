import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Flex, Grid, GridItem } from "@chakra-ui/react"

function index() {
    return (
        <>
            <Flex display="flex" position="static">
                <AppBody />
            </Flex>
            <Grid
                margin={"5"}
                templateAreas={`"header header"
                  "nav main"
                  "nav2 footer"`}
                gridTemplateColumns={{ base: "100%", md: "35% 1fr" }}
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                justifyContent="center"
            >
                <GridItem area={"header"}>
                    <FriendProfile />
                </GridItem>
                <GridItem area={"nav"}>
                    <ExpSystem />
                    <AboutMe />
                </GridItem>
                <GridItem area={{ base: "nav2", md: "main" }}>
                    <BlogHistory />
                </GridItem>
            </Grid>
        </>

        // <>
        //     <AppBody />
        //     <UserProfile />
        //     <ExpSystem />
        //     <AboutMe />
        //     <BlogHistory />
        // </>
    )
}

export default index
