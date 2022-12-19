import { Rating } from "@apiType/dating"
import { Center, Flex, IconButton, useToast } from "@chakra-ui/react"
import { FC, useState } from "react"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import API from "src/function/API"

const star = [<AiOutlineStar color="#E65300" size="30px" />, <AiFillStar color="#E65300" size="30px" />]
let index = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

declare global {
    var starState: boolean[]
}

const DatingRatingAllStar: FC<{
    defaultFill: number
    rateFor: string
}> = ({ defaultFill, rateFor }) => {
    const [timer, setTimer] = useState<boolean>(false)
    const [selected, setSelected] = useState<boolean[]>(handleFill(defaultFill))
    const toast = useToast()

    //First time fill
    globalThis.starState = [false, false, false, false, false, false, false, false, false, false]
    function handleFill(n: number) {
        let x = [false, false, false, false, false, false, false, false, false, false]
        for (let i = 0; i < 10; i++) {
            if (i < n) {
                x[i] = true
            } else {
                x[i] = false
            }
        }
        globalThis.starState = x
        return x
    }

    // When click
    function handleClick(position: number) {
        // If user click the blank star
        if (selected[position] === false) {
            for (let i = 0; i < 10; i++) {
                if (i <= position) {
                    globalThis.starState[i] = true
                }
            }
        }
        // If user click the filled star (not last)
        else if (selected[position] === true && selected[position + 1] === true) {
            for (let j = 0; j < 10; j++) {
                if (j <= position) {
                    globalThis.starState[j] = true
                } else {
                    globalThis.starState[j] = false
                }
            }
        }
        // If user click the last filled star
        else if (selected[position] === true && selected[position + 1] === false) {
            globalThis.starState = [false, false, false, false, false, false, false, false, false, false]
        }
        setSelected(globalThis.starState)

        // Get the rating score
        let value = 0
        for (let k = 0; k < 10; k++) {
            if (globalThis.starState[k] === true) {
                value = value + 1
            }
        }
        if (value != 0) {
            API.post<Rating>("/dating/rating/setRating", { anotherUserId: rateFor, score: value })
                .catch(() => API.put<Rating>("/dating/rating/updateRating", { anotherUserId: rateFor, score: value })
                    .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request " + err) })))
                .finally(() => setTimer(false))
        }
        else {
            const anotherUser: any = rateFor
            API.put<any>("/dating/rating/deleteRating", { anotherUserId: anotherUser })
                .catch((err) => toast({ status: "error", position: "top", title: "Error", description: ("Something wrong with request " + err) }))
                .finally(() => setTimer(false))
        }
    }

    return (
        <Flex direction="row" p="0px" m="0px">
            <Center pt="12px">
                {index.map((s) => {
                    return (
                        // Star button
                        <IconButton
                            key={s}
                            aria-label="Search database"
                            pr={{ base: "0px", md: "12px" }}
                            icon={star[selected[s] == false ? 0 : 1]}
                            colorScheme="none"
                            variant="unstyled"
                            size={{ base: "0px", md: "20px" }}
                            isDisabled={timer}
                            onClick={() => {
                                setTimer(true)
                                handleClick(s)
                            }
                            }
                        />
                    )
                })}
            </Center>
        </Flex>
    )
}
export default DatingRatingAllStar
