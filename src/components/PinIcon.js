import React, { useEffect, useState } from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
// Supports weights 100-900
import '@fontsource-variable/lexend';
const PinIcon = ({ heroRef }) => {
  const [heroHeight, setHeroHeight] = useState(0);
  const controls = useAnimation();

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
      const triggerHeight = heroHeight * 0.25;

      if (window.scrollY > triggerHeight) {
        controls.start({ x: 0, opacity: 1, transition: { duration: 1 } });
      } else {
        controls.start({ x: 100, opacity: 0 }); // Starts from 100px to the right
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [heroRef, heroHeight, controls]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      mt="-90vh"
      position="relative"
    >
      <motion.div initial={{ x: 100, opacity: 0 }} animate={controls}>
        <Flex alignItems="center">
          <Image
            src="/assets/pin.png"
            alt="Pin Icon"
            boxSize="40px" // Adjust size as needed
          />{" "}
          <Text fontSize="3xl" fontWeight="bold" color="white" mr="4" fontFamily="Lexend Variable">
            Montreal, Canada
          </Text>
        </Flex>
      </motion.div>
    </Box>
  );
};

export default PinIcon;
