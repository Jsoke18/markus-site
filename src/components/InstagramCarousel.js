// InstagramCarousel.js
import React from "react";
import InstagramEmbed from "./InstagramPosts"; 
import { Box, Heading } from "@chakra-ui/react";

const InstagramCarousel = () => {
  const instagramPostUrls = [
    "https://www.instagram.com/p/C194RL7Lk0L/?utm_source=ig_embed&amp%3Butm_campaign=loading",
    "https://www.instagram.com/p/C2QCWxkISIk/?utm_source=ig_embed&amp;utm_campaign=loading",
    "https://www.instagram.com/p/C0PM_mtgZ9E/?utm_source=ig_embed&amp;utm_campaign=loading",
  ];

  const [currentPostIndex, setCurrentPostIndex] = React.useState(0);

  const goToNextPost = () => {
    setCurrentPostIndex(
      (prevIndex) => (prevIndex + 1) % instagramPostUrls.length
    );
  };

  const goToPreviousPost = () => {
    setCurrentPostIndex(
      (prevIndex) =>
        (prevIndex - 1 + instagramPostUrls.length) % instagramPostUrls.length
    );
  };

  return (
    <Box maxW="lg" mx="auto" p={5} textAlign="center">
      <Heading as="h2" size="xl" mb={5}>
        Instagram Carousel
      </Heading>
      <InstagramEmbed
        urls={instagramPostUrls}
        currentPostIndex={currentPostIndex}
        goToNextPost={goToNextPost}
        goToPreviousPost={goToPreviousPost}
        key={currentPostIndex} // Add this line
      />
    </Box>
  );
};

export default InstagramCarousel;
