import React, { useEffect, useState } from "react";
import { Box, Heading, Image, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import "@fontsource/ubuntu";
import "@fontsource-variable/lexend";

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const IconTest = () => {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerHeight = window.innerHeight * 0.3;
      setIsContentVisible(scrollPosition > triggerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const images = [
    {
      src: "/assets/blow_models.jpg",
      link: "https://blowmodels.com/men/markus-rettger/",
    },
    {
      src: "/assets/willy4.jpg",
      link: "https://www.wilhelmina.com/new-york/men/development/22515-markus-rettger",
    },
    {
      src: "/assets/haumannkind.png",
      link: "https://www.humankindmgmt.com/talent/markus",
    },
    {
      src: "/assets/brave.jpg",
      link: "https://www.bravemodels.com/model/5562/markus-rettger?div=MMAI",
    },
  ];

  const contentVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 1 },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={{ base: "90vh", md: "110vh" }}
      pt={{ base: "60vh", md: "50vh" }} // Increased padding top for mobile/desktop
      mt={{ base: "-20vh", md: "-40vh" }} // Adjusted margin-top to keep layout consistent
      zIndex="1"
      position="relative"
    >
      <MotionBox
        initial="hidden"
        animate={isContentVisible ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <Heading
          as="h1"
          size={{ base: "2xl", md: "3xl" }}
          color="white"
          mb={{ base: "8%", md: "10%" }}
          fontWeight="300"
          fontFamily="Lexend Variable"
        >
          Agencies
        </Heading>
      </MotionBox>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
        flexWrap={{ base: "nowrap", md: "wrap" }}
        maxWidth="100%"
      >
        {images.map((image, index) => (
          <MotionBox
            key={image.src}
            borderRadius="full"
            variants={imageVariants}
            custom={index}
            initial="hidden"
            animate={isContentVisible ? "visible" : "hidden"}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            m={{ base: 2, md: 2 }}
            zIndex="2"
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
                boxSize={{ base: "100px", md: "150px" }}
                objectFit="cover"
              />
            </a>
          </MotionBox>
        ))}
      </Flex>
    </Box>
  );
};

export default IconTest;
