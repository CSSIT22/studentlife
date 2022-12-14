import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper"
import { Box, Flex, VStack, Text, Icon } from "@chakra-ui/react";
import { MdPhoneIphone, MdDesktopWindows, MdTabletMac } from "react-icons/md"
import CustomModal from "./CustomModal";

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
                      Device {index + 1}
                    </Text>
                    <Box bg={"white"} borderRadius={"full"} w={"100%"} h={"100%"}>
                      {item.detail.deviceInfo === "desktop" && (
                        <Flex alignItems={"center"} justifyContent={"center"}>
                          <Icon as={MdDesktopWindows} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                        </Flex>
                      )}
                      {item.detail.deviceInfo === "tablet" && (
                        <Flex alignItems={"center"} justifyContent={"center"}>
                          <Icon as={MdTabletMac} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                        </Flex>
                      )}
                      {item.detail.deviceInfo === "smartphone" && (
                        <Flex alignItems={"center"} justifyContent={"center"}>
                          <Icon as={MdPhoneIphone} w="50%" h="166" justifySelf={"center"} alignSelf={"center"} />
                        </Flex>
                      )}
                    </Box>
                    <Text color={"white"}>Login Date: {item.detail.loginDate.substring(0, 10)}</Text>
                    <Text color={"white"}>Expired: {item.detail.tokenExpired.substring(0, 10)}</Text>
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