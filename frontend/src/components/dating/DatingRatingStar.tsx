import { Center, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { FC, useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

// size={{ base: "0px", md: "5px" }}
const star = [<AiOutlineStar color="#E65300" size="30px" />, <AiFillStar color="#E65300" size="30px" />]

// const DatingRatingStar = (props: any) => {
const DatingRatingStar: FC<{
    isFill: boolean
    status: number
    thisStar: any
}> = ({ isFill, status, thisStar }) => {
    const [selected, setSelected] = useState<boolean>(isFill)

    function handleClick() {
        // setSelected(!selected)
        setSelected(!isFill)
        //thisStar.onClick(thisStar.children)
        // props.onClick(props.children)
    }

    return (
        <Center pt="12px">
            {/* Please don't delete this!*/}
            {/* The logic of star giving: the star have 2 state fill/blank.
                     There are 3 main rule that we need to consider which are
                     0. Fetch the star status (int) and fill in the star bar. 
                     1. If the star is "blank" and user click on it will fill itself and
                        fill all star before it. 
                     2. If the star is "fill" when user click on the star:
                        A.) If the star after it "fill" => all star after it will be "blank"
                        B.) If the star after it "blank" => all the star will be "blank"*/}
            <IconButton
                aria-label="Search database"
                pr={{ base: "0px", md: "12px" }}
                //icon={star[selected == false ? 0 : 1]}
                icon={star[selected == false ? 0 : 1]}
                colorScheme="none"
                variant="unstyled"
                size={{ base: "0px", md: "20px" }}
                onClick={handleClick}
            />
        </Center>
    )
}

export default DatingRatingStar
