import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, IconButton, Spinner, useToast } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const InstagramCarousel = () => {
  const instagramPostUrls = [
    "https://www.instagram.com/p/ChP46qmO_aX/?img_index=1",
    "https://www.instagram.com/p/C2-jGa3J6-O/",
    "https://www.instagram.com/p/Cv-xgzygpIP/",
    "https://www.instagram.com/p/Cixn8gzA8kh/",
    "https://www.instagram.com/p/C2QCWxkISIk/",
    "https://www.instagram.com/p/C0PM_mtgZ9E/",
    "https://www.instagram.com/p/C-aYU_PxtAy/",
    "https://www.instagram.com/p/C5yYh9TrUGF/",
    "https://www.instagram.com/p/C5OYuL8ABsT/",
    "https://www.instagram.com/p/CtPGzBKr8Q8/?img_index=1",
    "https://www.instagram.com/p/CixflStLcHg/?img_index=1",
  ];

  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const embedRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    let isMounted = true;
    const scriptId = "instagram-embed-script";
    const existingScript = document.getElementById(scriptId);

    const loadInstagramEmbed = () => {
      setIsLoading(true);
      if (window.instgrm) {
        window.instgrm.Embeds.process();
        setTimeout(() => {
          if (isMounted) setIsLoading(false);
        }, 1000);
      } else {
        const script = document.createElement("script");
        script.id = scriptId;
        script.async = true;
        script.src = "https://www.instagram.com/embed.js";
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
            setTimeout(() => {
              if (isMounted) setIsLoading(false);
            }, 1000);
          }
        };
        script.onerror = () => {
          console.error("Failed to load Instagram embed script");
          if (isMounted) {
            setIsLoading(false);
            toast({
              title: "Error",
              description: "Failed to load Instagram embed. Please try again later.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        };
        document.body.appendChild(script);
      }
    };

    if (!existingScript) {
      loadInstagramEmbed();
    } else {
      loadInstagramEmbed();
    }

    return () => {
      isMounted = false;
    };
  }, [currentPostIndex, toast]);

  const goToNextPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % instagramPostUrls.length);
  };

  const goToPreviousPost = () => {
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + instagramPostUrls.length) % instagramPostUrls.length);
  };

  return (
    <MotionBox
      maxW={{ base: "100%", md: "640px" }}
      w="100%"
      mx="auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      px={{ base: "20px", md: "50px" }} // Adjusted padding
    >
      <Flex alignItems="center" justifyContent="center">
        <IconButton
          icon={<ChevronLeftIcon boxSize={{ base: 6, md: 6 }} />}
          onClick={goToPreviousPost}
          zIndex={2}
          colorScheme="whiteAlpha"
          color="white"
          bg="rgba(0,0,0,0.3)"
          rounded="full"
          size={{ base: "md", md: "lg" }}
          aria-label="Previous post"
          mr={{ base: 2, md: 4 }} // Margin right
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
          <MotionBox
            key={currentPostIndex}
            ref={embedRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoading ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              as="blockquote"
              className="instagram-media"
              data-instgrm-permalink={instagramPostUrls[currentPostIndex]}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: "0",
                borderRadius: "3px",
                boxShadow:
                  "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
                margin: "1px",
                maxWidth: "540px",
                minWidth: "326px",
                padding: "0",
                width: "99.375%",
                width: "-webkit-calc(100% - 2px)",
                width: "calc(100% - 2px)",
              }}
            />
          </MotionBox>
        </Box>
        <IconButton
          icon={<ChevronRightIcon boxSize={{ base: 6, md: 6 }} />}
          onClick={goToNextPost}
          zIndex={2}
          colorScheme="whiteAlpha"
          color="white"
          bg="rgba(0,0,0,0.3)"
          rounded="full"
          size={{ base: "md", md: "lg" }}
          aria-label="Next post"
          ml={{ base: 2, md: 4 }} // Margin left
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
