import React, { useState, useEffect, forwardRef } from 'react';
import { Box, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Carousel from "./Carroussel";
import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import { queryNotion } from "../services/notionService";
import { Link } from "react-router-dom";

const Hero = forwardRef((props, ref) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await queryNotion(uuidv4(), true);
        const allImages = data.image_data;

        const randomImages = allImages
          .sort(() => 0.5 - Math.random())
          .slice(0, 20);

        const newCards = randomImages.map(image => ({
          key: uuidv4(),
          content: <Card imagen={image.url} title={image.title} />,
        }));

        setCards(newCards);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  return (
    <Box 
      textAlign="center" 
      py="20" 
      ref={ref} 
      position="relative"
    >
      <Carousel
        cards={cards}
        height="700px"
        width="100%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />

      <Link to="/work">
        <Text
          as="span"
          fontSize="lg"
          color="white"
          position="absolute"
          right="4rem"
          bottom="3rem"
          display="flex"
          alignItems="center"
          _hover={{ color: "teal.400", textDecoration: "underline" }}
          zIndex="999"  // Ensure this is above the carousel but below the menu
        >
          View More <ArrowForwardIcon ml={1} />
        </Text>
      </Link>
    </Box>
  );
});

export default Hero;