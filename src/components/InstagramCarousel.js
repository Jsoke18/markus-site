import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, IconButton, Spinner } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const InstagramCarousel = () => {
  const instagramPostUrls = [
    "https://www.instagram.com/p/C194RL7Lk0L/?utm_source=ig_embed&amp%3Butm_campaign=loading",
    "https://www.instagram.com/p/C2QCWxkISIk/?utm_source=ig_embed&amp;utm_campaign=loading",
    "https://www.instagram.com/p/C0PM_mtgZ9E/?utm_source=ig_embed&amp;utm_campaign=loading",
  ];

  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const embedRef = useRef(null);

  useEffect(() => {
    const loadInstagramEmbed = () => {
      setIsLoading(true);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        setTimeout(() => setIsLoading(false), 700); // Give some time for the embed to load
      } else {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.instagram.com/embed.js";
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
            setTimeout(() => setIsLoading(false), 700); // Give some time for the embed to load
          }
        };
        script.onerror = () => {
          console.error("Failed to load Instagram embed script");
          setIsLoading(false);
        };
        document.body.appendChild(script);
      }
    };

    loadInstagramEmbed();
  }, [currentPostIndex]);

  const goToNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % instagramPostUrls.length);
  };

  const goToPreviousPost = () => {
    setCurrentPostIndex((prevIndex) =>
      (prevIndex - 1 + instagramPostUrls.length) % instagramPostUrls.length
    );
  };

  return (
    <MotionBox
      maxW="540px"
      mx="auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Flex align="center" justify="center" position="relative">
        <IconButton
          icon={<ChevronLeftIcon boxSize={6} />}
          onClick={goToPreviousPost}
          position="absolute"
          left="-50px"
          zIndex={2}
          colorScheme="whiteAlpha"
          color="white"
          bg="rgba(0,0,0,0.3)"
          rounded="full"
          size="lg"
          aria-label="Previous post"
        />
        <Box position="relative" width="100%" minHeight="600px">
          <AnimatePresence>
            {isLoading && (
              <MotionBox
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={1}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Spinner size="xl" color="white" thickness="4px" />
              </MotionBox>
            )}
          </AnimatePresence>
          <Box ref={embedRef} key={currentPostIndex}>
            <blockquote
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={instagramPostUrls[currentPostIndex]}
              data-instgrm-version="14"
              style={{
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: '99.375%',
                width: '-webkit-calc(100% - 2px)',
                width: 'calc(100% - 2px)',
              }}
            />
          </Box>
        </Box>
        <IconButton
          icon={<ChevronRightIcon boxSize={6} />}
          onClick={goToNextPost}
          position="absolute"
          right="-50px"
          zIndex={2}
          colorScheme="whiteAlpha"
          color="white"
          bg="rgba(0,0,0,0.3)"
          rounded="full"
          size="lg"
          aria-label="Next post"
        />
      </Flex>
      <Flex justify="center" mt={4}>
        {instagramPostUrls.map((_, index) => (
          <MotionBox
            key={index}
            w={2}
            h={2}
            borderRadius="full"
            bg={index === currentPostIndex ? "white" : "gray.500"}
            mx={1}
            cursor="pointer"
            onClick={() => setCurrentPostIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </Flex>
    </MotionBox>
  );
};

export default InstagramCarousel;