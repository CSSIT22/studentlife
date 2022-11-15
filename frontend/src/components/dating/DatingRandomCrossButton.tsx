import { motion } from "framer-motion"
import { FC } from "react"
import { AiOutlineStop } from "react-icons/ai"
import { AnimationControls } from "framer-motion"

const DatingRandomCrossButton: FC<{ controlCross: AnimationControls; swipe: (dir: string) => Promise<void> }> = ({ controlCross, swipe }) => {
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
            onClick={() => swipe("left")}
            variants={{
                visible: {
                    scale: [1, 0.8, 1],
                    backgroundColor: ["#FFF2E6", "#E6702E", "#FFF2E6"],
                    transition: {
                        duration: 0.4,
                        ease: [0.075, 0.82, 0.165, 1],
                    },
                },
            }}
        >
            <AiOutlineStop size="62px" color="black" />
        </motion.div>
    )
}

export default DatingRandomCrossButton
