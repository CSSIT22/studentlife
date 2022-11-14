import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { AiOutlineStop } from "react-icons/ai"


const DatingLikedYouCrossButton: FC<{isMobile: boolean | undefined; handleClick: (type: string, UserId: string) => void; UserId: string;}> = ({isMobile, handleClick, UserId}) => {
  return (
    <Box
    w={{ base: "40px", md: "60px" }}
    h={{ base: "40px", md: "60px" }}
    cursor="pointer"
    onClick={() => handleClick("skip", UserId)}
>
    {isMobile ? <AiOutlineStop size="60px" color="black" /> : <AiOutlineStop size="40px" color="black" />}
</Box>
  )
}

export default DatingLikedYouCrossButton