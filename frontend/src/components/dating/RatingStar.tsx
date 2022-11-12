import { Center, IconButton, useBreakpointValue } from "@chakra-ui/react"
import { is } from "@react-spring/shared"
import { useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"

// size={{ base: "0px", md: "5px" }}
const star = [<AiOutlineStar color="yellow" size="30px" />, <AiFillStar color="yellow" size="30px" />]

const RatingStar = (props: any) => {
    const [selected, setSelected] = useState<boolean>(false)

    function handleClick() {
        setSelected(!selected)
        props.onClick(props.children)
    }

    return (
        <Center pt="10px">
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
                pr={{ base: "0px", md: "10px" }}
                icon={star[selected == false ? 0 : 1]}
                colorScheme="none"
                variant="unstyled"
                size={{ base: "0px", md: "10px" }}
                onClick={handleClick}
            />
        </Center>
    )
}

export default RatingStar
