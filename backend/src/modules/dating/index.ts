import express from "express"
import allPollRoutes from "./routes/allpoll"
import appliedPollRoutes from "./routes/appliedpoll"
import createAPollRoutes from "./routes/create"
import discoveryRoutes from "./routes/discovery"
import interestsRoutes from "./routes/interests"
import likedYouRoutes from "./routes/likedyou"
import matchesRoutes from "./routes/matches"
import optionRoutes from "./routes/option"
import ratingRoutes from "./routes/rating"
import tutorialRoutes from "./routes/tutorial"
import verifyEnrollRoutes from "./routes/verifyEnroll"
import youLikedRoutes from "./routes/youliked"
import yourActivityPollRoutes from "./routes/youractivitypoll"
import yourPollRoutes from "./routes/yourpoll"

const datingRoutes = express()

datingRoutes.use(express.json())

datingRoutes.get("/", (_, res) => {
    return res.send("Dating Module API")
})

datingRoutes.use("/interests", interestsRoutes)
datingRoutes.use("/option", optionRoutes)
datingRoutes.use("/create", createAPollRoutes)
datingRoutes.use("/discovery", discoveryRoutes)
datingRoutes.use("/likedyou", likedYouRoutes)
datingRoutes.use("/youliked", youLikedRoutes)
datingRoutes.use("/matches", matchesRoutes)
datingRoutes.use("/allpoll", allPollRoutes)
datingRoutes.use("/youractivitypoll", yourActivityPollRoutes)
datingRoutes.use("/yourpoll", yourPollRoutes)
datingRoutes.use("/appliedpoll", appliedPollRoutes)
datingRoutes.use("/tutorial", tutorialRoutes)
datingRoutes.use("/rating", ratingRoutes)
datingRoutes.use("/verifyEnroll", verifyEnrollRoutes)

export default datingRoutes
