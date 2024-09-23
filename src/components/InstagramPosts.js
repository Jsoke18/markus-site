import React, { useEffect, useState, useRef } from 'react';
import { IconButton, Box, Spinner, useColorModeValue } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

const InstagramEmbed = ({ urls, currentPostIndex, goToNextPost, goToPreviousPost }) => {
  const currentUrl = urls[currentPostIndex];
  const [isLoading, setIsLoading] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef(null);

  const bgColor = useColorModeValue("white", "gray.800");
  const iconColor = useColorModeValue("gray.800", "white");

  useEffect(() => {
    setIsLoading(true);
    const loadScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
        setIsLoading(false);
      };

      return script;
    };

    let existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }
    const newScript = loadScript();

    return () => {
      if (newScript) {
        newScript.remove();
      }
    };
  }, [currentPostIndex]);

  useEffect(() => {
    const updateContainerHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  return (
    <MotionBox
      position="relative"
      maxWidth="540px"
      margin="auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <IconButton
        icon={<ArrowBackIcon />}
        onClick={goToPreviousPost}
        position="absolute"
        left="-50px"
        top="50%"
        transform="translateY(-50%)"
        bg="rgba(0,0,0,0.3)"
        color={iconColor}
        _hover={{ bg: "rgba(0,0,0,0.5)" }}
        zIndex={2}
      />

      <Box position="relative" ref={containerRef}>
        <AnimatePresence>
          {isLoading && (
            <MotionBox
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={bgColor}
              zIndex={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: `${containerHeight}px`,
                minHeight: '300px', // Fallback minimum height
              }}
            >
              <Spinner size="xl" color="gray.500" />
            </MotionBox>
          )}
        </AnimatePresence>

        <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink={currentUrl}
          data-instgrm-version="14"
          style={{
            background: bgColor,
            border: '0',
            borderRadius: '12px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: '0',
            width: '99.375%',
            width: '-webkit-calc(100% - 2px)',
            width: 'calc(100% - 2px)'
          }}
        >
          {/* Content of the Instagram post will be dynamically inserted by Instagram's script */}
        </blockquote>
      </Box>

      <IconButton
        icon={<ArrowForwardIcon />}
        onClick={goToNextPost}
        position="absolute"
        right="-50px"
        top="50%"
        transform="translateY(-50%)"
        bg="rgba(0,0,0,0.3)"
        color={iconColor}
        _hover={{ bg: "rgba(0,0,0,0.5)" }}
        zIndex={2}
      />
    </MotionBox>
  );
};

export default InstagramEmbed;