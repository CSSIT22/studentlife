import { AnimationControls, motion } from "framer-motion"
import { FC } from "react"
import { AiOutlineHeart } from "react-icons/ai"

const DatingRandomHeartButton: FC<{ controlHeart: AnimationControls; swipe: (dir: string) => Promise<void> }> = ({ controlHeart, swipe }) => {
    return (
        <motion.div
            style={{
                marginLeft: "58px",
                width: "80px",
                height: "80px",
                borderRadius: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#FFF2E6",
                cursor: "pointer",
            }}
            animate={controlHeart}
            onClick={() => swipe("right")}
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
            <AiOutlineHeart size="62px" color="black" />
        </motion.div>
    )
}

export default DatingRandomHeartButton
