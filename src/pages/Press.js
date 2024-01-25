import React from "react";
import { Box, Link, Image, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramCarousel from "../components/InstagramCarousel";

const Pressy = () => {
  return (
    <div>
      <Header mt={10} />{" "}
      <Box
        width="960px"
        height="615px"
        borderRadius="100%"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.18)"
        m="auto"
        mt="5%"
      >
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/wtIEnuyYSac?start=2"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </Box>
      <Flex justify="center" mt="17%">
        <Box width="30%" height="30%" border="1px solid #ccc" mr="4%">
          <Link
            href="https://www.thefashionisto.com/rudsak-campaign-fall-2022/"
            isExternal
          >
            <Image
              src="/assets/Screenshot 2024-01-23 202432.png"
              alt="Link to The Fashionisto"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Link>
        </Box>
        <Box width="40%" height="60%" border="1px solid #ccc" ml="2%">
          <Link
            href="https://bench.ca/blogs/bench-stories/10-outfits-to-wear-in-a-city-that-never-sleeps"
            isExternal
          >
            <Image
              src="/assets/bench.png"
              alt="Link to The Fashionisto"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Link>
        </Box>{" "}
      </Flex>{" "}
      <Flex justify="center" mt="5%">
        {" "}
        <Box width="50%" height="70%" border="1px solid #ccc" mt="5%" ml="2%">
          <Link
            href="https://mojeh.com/fashion/versace-jeans-coutures-galactic-aw22-collection-is-delightfully-dizzying/"
            isExternal
          >
            <Image
              src="/assets/mojeh.png"
              alt="Link to The Fashionisto"
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Link>
        </Box>
      </Flex>
      <Flex justify="center" mt="10%">
        <InstagramCarousel />
      </Flex>
      <Footer />
    </div>
  );
};

export default Pressy;
