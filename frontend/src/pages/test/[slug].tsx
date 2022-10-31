import { Heading } from "@chakra-ui/react"
import { FC } from "react"
import { useParams } from "react-router-dom"

const Test: FC<any> = (props) => {
    let param = useParams()

    return <Heading>Test ! {param.slug}</Heading>
}

export default Test
