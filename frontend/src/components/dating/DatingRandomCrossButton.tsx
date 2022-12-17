import { motion } from "framer-motion"
import { FC } from "react"
import { AiOutlineStop } from "react-icons/ai"
import { AnimationControls } from "framer-motion"

const DatingRandomCrossButton: FC<{
    controlCross: AnimationControls
    swipe: (dir: string) => Promise<void>
}> = ({ controlCross, swipe }) => {
    return (
        <motion.div
            style={{
                marginRight: "58px",
                width: "80px",
                height: "80px",
                borderRadius: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF2E6",
                cursor: "pointer",
            }}
            animate={controlCross}
            onClick={() => {
                swipe("left")
            }}
            whileTap={{
                scale: 1,
                backgroundColor: "#E6702E",
                transition: {
                    duration: 0.001,
                },
            }}
            whileHover={{ scale: 1.2, }}
            variants={{
                visible: {
                    scale: [1, 1.2],
                    backgroundColor: ["#FFF2E6", "#E6702E"],
                    transition: {
                        duration: 0.001,
                    },
                },
                hidden: {
                    scale: 1,
                    backgroundColor: "#FFF2E6",
                },
            }}
        >
            <AiOutlineStop size="62px" color="black" />
        </motion.div>
    )
}

export default DatingRandomCrossButton
