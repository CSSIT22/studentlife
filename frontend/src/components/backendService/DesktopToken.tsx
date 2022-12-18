import { Flex, Icon } from "@chakra-ui/react"
import { MdDesktopWindows } from "react-icons/md"

const DesktopToken = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"}>
      <Icon as={MdDesktopWindows} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
    </Flex>
  );
}

export default DesktopToken