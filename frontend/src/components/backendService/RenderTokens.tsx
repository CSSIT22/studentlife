import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper"
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import CustomModal from "./CustomModal";
import DesktopToken from "./DesktopToken";
import TabletToken from "./TabletToken";
import MobileToken from "./MobileToken";

const breakpoints = {
  1200: {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: true,
  },
  960: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  820: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  390: {
    slidesPerView: 1,
  },
}

function findTime(date: string): string {
  const timeData = new Date(date).toString().split(" ")
  const result = `${timeData[2]} ${timeData[1]} ${timeData[3]} At ${timeData[4]}`
  return result
}

const RenderTokens: React.FC<{ tokens: Array<any>, handleRevoke: Function }> = ({ tokens, handleRevoke }) => {
  return (
    <>
      <Swiper
        breakpoints={breakpoints}
        pagination={{ clickable: true, }}
        modules={[Navigation]}
      >
        {tokens.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Box bg={"gray.400"} borderRadius={"lg"} w={"100%"} h={"100%"} boxShadow="lg" border="1px" borderColor="gray.300">
                <Flex alignItems="center" justifyContent={"center"}>
                  <VStack alignItems="center" justifyContent={"center"} m={"6"}>
                    <Text color={"white"} fontSize={"2xl"}>
                      {item.currentDevice ? "Current Device" : "Device " + (index + 1)}
                    </Text>
                    <Box bg={"white"} borderRadius={"full"} w={"100%"} h={"100%"}>
                      {item.detail.deviceInfo === "desktop" && <DesktopToken />}
                      {item.detail.deviceInfo === "tablet" && <TabletToken />}
                      {item.detail.deviceInfo === "smartphone" && <MobileToken />}
                    </Box>
                    <Box>
                      <Text color={"green"} fontWeight={"medium"}>Login Date:</Text>
                      <Text color={"white"}>{findTime(item.detail.loginDate)}</Text>
                    </Box>
                    <Box>
                      <Text color={"red"} fontWeight={"medium"}>Expired:</Text>
                      <Text color={"white"}>{findTime(item.detail.tokenExpired)}</Text>
                    </Box>
                    <CustomModal
                      onClick={handleRevoke}
                      modalHeader="Are you sure?"
                      token={item.token}
                      isCurrentDevice={item.currentDevice}
                    />
                  </VStack>
                </Flex>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default RenderTokens