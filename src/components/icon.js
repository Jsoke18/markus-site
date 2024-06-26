import React, { useEffect, useState } from "react";
import { Box, Heading, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "@fontsource/ubuntu";

import '@fontsource-variable/lexend';
const MotionBox = motion(Box);
const MotionImage = motion(Image);

const IconTest = () => {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false);
  const [areIconsVisible, setAreIconsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const headingTriggerHeight = window.innerHeight / 1; // Adjust this value as needed
      const iconsTriggerHeight = window.innerHeight; // Adjust this value as needed

      // For the heading
      if (scrollPosition > headingTriggerHeight) {
        setIsHeadingVisible(true);
      } else {
        setIsHeadingVisible(false); // Reset the state when scrolling up
      }

      // For the icons
      setAreIconsVisible(scrollPosition > iconsTriggerHeight);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const images = [
    {
      src: "/assets/blow_models.jpg",
      link: "https://blowmodels.com/men/markus-rettger/",
    },
    {
      src: "/assets/folio.jpg",
      link: "https://foliomanagement.com/en/models/markus",
    },
    {
      src: "/assets/willy4.jpg",
      link: "https://www.wilhelmina.com/new-york/men/development/22515-markus-rettger",
    },
    {
      src: "/assets/MGM.jpg",
      link: "https://www.mgm-models.de/sedcard/markus",
    },
    {
      src: "/assets/brave.jpg",
      link: "https://www.bravemodels.com/model/5562/markus-rettger?div=MMAI",
    },
  ];

  const imageVariants = {
    visible: (index) => ({
      x: 0,
      opacity: 1,
      transition: { delay: index * 0.2 + 0.5 },
    }),
    hidden: (index) => ({
      x: index % 2 === 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  const headingVariants = {
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 1 } }, // Increased duration
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="150vh"
      pt="100vh"
      mt="-110vh"
    >
      <MotionBox
        initial="hidden"
        animate={isHeadingVisible ? "visible" : "hidden"}
        variants={headingVariants}
      >
        <Heading as="h1" size="3xl" color="white" mb="40%" fontWeight="300" fontFamily="Lexend Variable">
          Agencies
        </Heading>
      </MotionBox>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        {images.map((image, index) => (
          <MotionBox
            key={image}
            borderRadius="full"
            variants={imageVariants}
            custom={index}
            initial="hidden"
            animate={areIconsVisible ? "visible" : "hidden"}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            m={2}
          >
            <a
              href={image.link}
              onClick={(event) => {
                event.preventDefault();
                window.open(image.link, "_blank", "noopener,noreferrer");
              }}
            >
              <MotionImage
                src={image.src}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
              />
            </a>
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default IconTest;
