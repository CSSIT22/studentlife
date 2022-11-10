import FriendProfile from "../../components/user/FriendProfile"
import AboutMe from "../../components/user/AboutMe"
import BlogHistory from "../../components/user/BlogHistory"
import ExpSystem from "../../components/user/ExpSystem"
import AppBody from "../../components/share/app/AppBody"
import { Box, extendTheme, Flex, Grid, GridItem } from "@chakra-ui/react"

function index() {
    const breakpoints = {
        sm: "320px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px",
    }

    // 3. Extend the theme
    const theme = extendTheme({ breakpoints })
    return (
        <>
            <Box bg="orange.50">
                <Flex>
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
            </Box>
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
