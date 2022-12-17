// import UserProfile from "../../components/user/UserProfile"
// import AboutMe from "../../components/user/AboutMe"
// import BlogHistory from "../../components/user/BlogHistory"
// import ExpSystem from "../../components/user/ExpSystem"
// import AppBody from "../../components/share/app/AppBody"
// import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"

// function index() {

//     return (
//         <>
//             <Box bg="orange.50">
//                 <Flex display="flex" position="static">
//                     <AppBody />
//                 </Flex>
//                 <Grid
//                     margin={"3"}
//                     templateAreas={{
//                         base: `"header"
//                     "nav"
//                     "nav2"`,
//                         md: `"header header"
//                   "nav main"
//                   "nav2 footer"`,
//                     }}
//                     gridTemplateColumns={{ base: "100%", md: "35% 1fr" }}
//                     gap="1"
//                     color="blackAlpha.700"
//                     fontWeight="bold"
//                     justifyContent="center"
//                 >
//                     <GridItem alignItems="center" area={"header"}>
//                         <UserProfile onClick={() => { }} />
//                     </GridItem>
//                     <GridItem area={"nav"}>
//                         <ExpSystem />
//                         <AboutMe />
//                     </GridItem>
//                     <GridItem area={{ base: "nav2", md: "main" }}>
//                         <BlogHistory />
//                     </GridItem>
//                 </Grid>
//             </Box>
//         </>
//     )
// }

// export default index
