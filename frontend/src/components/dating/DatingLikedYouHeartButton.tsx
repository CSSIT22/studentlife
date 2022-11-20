import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineHeart } from "react-icons/ai"

const DatingLikedYouHeartButton: FC<{ isMobile: boolean | undefined; handleClick: (type: string, UserId: string) => void; UserId: string }> = ({
    isMobile,
    handleClick,
    UserId,
}) => {
    return (
        <Box w={{ base: "40px", md: "60px" }} h={{ base: "40px", md: "60px" }} cursor="pointer" onClick={() => handleClick("like", UserId)}>
            {isMobile ? <AiOutlineHeart size="60px" color="black" /> : <AiOutlineHeart size="40px" color="black" />}
        </Box>
    )
}

export default DatingLikedYouHeartButton
