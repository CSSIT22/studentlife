import { Box } from "@chakra-ui/react"
import { FC } from "react"
import { Link } from "react-router-dom"
import NoProfileImg from "../dating/pic/noprofile.png"
import { motion } from "framer-motion"

const DatingCheckImage: FC<{
    url: string; image: {
        type: string;
        data: number[];
    }
}> = ({ url, image }) => {

    let link = "/user/" + url
    return (

        <Link to={link}>
            {image ?
                <motion.div
                    whileHover={{ scale: 1.1, }}
                    whileTap={{
                        scale: 0.9,
                    }}

                >
                    <Box
                        mt={{ base: "32px", md: "46px" }}
                        backgroundImage={(import.meta.env.VITE_APP_ORIGIN || "") + "/user/profile/" + url}
                        backgroundPosition="center"
                        w={{ base: "159px", md: "205px" }}
                        h={{ base: "223px", md: "250px" }}
                        backgroundSize="cover"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        borderRadius="10px"
                    />        </motion.div> :
                <motion.div
                    whileHover={{ scale: 1.1, }}
                    whileTap={{
                        scale: 0.9,
                    }}><Box
                        mt={{ base: "32px", md: "46px" }}
                        backgroundImage={NoProfileImg}
                        backgroundPosition="center"
                        w={{ base: "159px", md: "205px" }}
                        h={{ base: "223px", md: "250px" }}
                        backgroundSize="cover"
                        boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)"
                        borderRadius="10px"
                    /></motion.div>}

        </Link>

    )
}

export default DatingCheckImage
