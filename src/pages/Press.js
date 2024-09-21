import React, { useState } from "react";
import { Box, Link, Image, Flex, Grid, Text, Spinner, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramCarousel from "../components/InstagramCarousel";

const MotionBox = motion(Box);
const PressItem = ({ href, src, alt, title }) => (
  <MotionBox
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <Link href={href} isExternal>
      <VStack spacing={4} align="stretch">
        <Image
          src={src}
          alt={alt}
          width="100%"
          height="250px"
          objectFit="cover"
          borderRadius="md"
          boxShadow="lg"
        />
        <Text fontWeight="bold" color="white" textAlign="center">
          {title}
        </Text>
      </VStack>
    </Link>
  </MotionBox>
);

const Pressy = () => {
  const [isYoutubeLoading, setIsYoutubeLoading] = useState(true);

  return (
    <Box minH="100vh" bg="transparent">
      <Header mt={15} />
      <Box maxW="1200px" mx="auto" px={4} py={8} mt={20}> {/* Added mt={20} here */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={24}
        >
          <Text fontSize="3xl" fontWeight="bold" color="white" mb={8} textAlign="center">
            Featured Video
          </Text>
          <Box
            position="relative"
            width="100%"
            paddingBottom="56.25%"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
          >
            {isYoutubeLoading && (
              <Flex
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                align="center"
                justify="center"
                bg="rgba(0,0,0,0.5)"
              >
                <Spinner size="xl" color="white" />
              </Flex>
            )}
            <iframe
              src="https://www.youtube.com/embed/wtIEnuyYSac?start=2"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              onLoad={() => setIsYoutubeLoading(false)}
            />
          </Box>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          mb={16}
        >
          <Text fontSize="3xl" fontWeight="bold" color="white" mb={8} textAlign="center">
            Press Features
          </Text>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={8}>
            <PressItem
              href="https://www.thefashionisto.com/rudsak-campaign-fall-2022/"
              src="/assets/Screenshot 2024-01-23 202432.png"
              alt="Rudsak Campaign"
              title="Rudsak Highlights Its Modern Outerwear Heroes"
            />
            <PressItem
              href="https://bench.ca/blogs/bench-stories/10-outfits-to-wear-in-a-city-that-never-sleeps"
              src="/assets/bench.png"
              alt="Bench Campaign"
              title="10 Outfits to Wear in a City that Never Sleeps"
            />
            <PressItem
              href="https://mojeh.com/fashion/versace-jeans-coutures-galactic-aw22-collection-is-delightfully-dizzying/"
              src="/assets/mojeh.png"
              alt="Versace Jeans Couture"
              title="Versace Jeans Couture's Galactic AW22 Collection"
            />
          </Grid>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          mb={16}
        >
          <Text fontSize="3xl" fontWeight="bold" color="white" mb={8} textAlign="center">
            Popular Posts
          </Text>
          <InstagramCarousel />
        </MotionBox>
      </Box>
      <Footer />
    </Box>
  );
};

export default Pressy;