import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import '@fontsource/ubuntu';
// Supports weights 100-900
import '@fontsource-variable/lexend';
const LocationText = ({ heroRef }) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const [animationProps, setAnimationProps] = useState({
    initial: { x: -100, opacity: 0 },
    animate: { x: -100, opacity: 0 },
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        requestAnimationFrame(() => {
          setHeroHeight(entry.contentRect.height);
        });
      }
    });

    if (heroRef.current) {
      resizeObserver.observe(heroRef.current);
    }

    const handleScroll = () => {
      const triggerHeight = heroHeight * 0.30;

      if (window.scrollY > triggerHeight) {
        setAnimationProps({
          ...animationProps,
          animate: { x: 0, opacity: 1, transition: { duration: 1 } },
        });
      } else {
        setAnimationProps({
          ...animationProps,
          animate: { x: -100, opacity: 0 },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [heroRef, heroHeight, animationProps]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      mt="-37vh"
    >
      <motion.div {...animationProps}>
        <Text  fontSize="6xl" fontWeight="bold" color="white" fontFamily="Lexend Variable">
          Located In
        </Text>
      </motion.div>
    </Box>
  );
};

export default LocationText;
