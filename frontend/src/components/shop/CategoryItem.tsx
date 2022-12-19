import { Center, Box, Image, LinkBox, Text, border, Flex } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC } from "react"
import { Link } from "react-router-dom"

type propsType = FC<{
    id: number
    name: string
    image: string
}>
const borderColor = "#E64200"
const styles = {
    categoryBox: {
        bg: "white",
        w: "9rem", h: "11rem",
        borderRadius: "lg",
        shadow: "md",
        overflow: "hidden",
        border: '1px solid ' + borderColor,
        _hover: { transform: "scale(1.1)" }, transitionDuration: "300ms"
    },
    image: {
        h: "7rem", w: "9rem", p: "2", m: 2, objectFit: "contain"
    },
    textStyle: {
        color: '#E65300',
        fontSize: "lg",
        fontWeight: "semibold",
        as: "h4",
        w: 'full',
        textAlign: 'center',
        lineHeight: "10",
        noOfLines: 1
    },
    animationStyles: {
        initial: { scale: 0.1 },
        animate: { scale: 1 },
        transition: { default: { ease: "backOut", duration: 0.5 } }
    }
}

const CategoryItem: propsType = ({ id, name, image }) => {
    return (
        <motion.div initial={styles.animationStyles.initial} animate={styles.animationStyles.animate} transition={styles.animationStyles.transition}>
            <Link to={"/shop/categories/" + id} state={{ catName: name }}>
                <Box sx={styles.categoryBox}>
                    <Flex direction='column' justify={"center"} align="center">
                        <Image src={image} alt={`Picture of ${name}`} sx={styles.image} />
                        <CustomDivider />
                        <Text sx={styles.textStyle}>{name}</Text>
                    </Flex>
                </Box>
            </Link>
        </motion.div>
    )
}

const CustomDivider = () => {
    return (
        <Box h="min" w="full" bg={borderColor} p="0.3"></Box>
    )
}
export default CategoryItem