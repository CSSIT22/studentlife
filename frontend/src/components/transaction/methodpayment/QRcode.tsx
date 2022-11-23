import React, { FC } from "react"
import { Center, Image } from "@chakra-ui/react"

const QRcode: FC<{
    qrurl: string
}> = ({ qrurl }) => {
    return (
        <div>
            <Center>
                <Image w={"lg"} src={qrurl}></Image>
            </Center>
        </div>
    )
}

export default QRcode
