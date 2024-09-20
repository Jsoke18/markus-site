import React, { useState, useEffect, forwardRef } from 'react';
import { Box } from "@chakra-ui/react";
import Carousel from "./Carroussel";
import { v4 as uuidv4 } from "uuid";
import Card from "./card";
import { queryNotion } from "../services/notionService";

const Hero = forwardRef((props, ref) => {
  const [cards, setCards] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  useEffect(() => {
    if (sessionId) {
      loadImages();
    }
  }, [sessionId]);

  const loadImages = async () => {
    try {
      const data = await queryNotion(sessionId, true);
      const allImages = data.image_data;
      
      // Randomly select 20 images
      const randomImages = allImages.sort(() => 0.5 - Math.random()).slice(0, 20);

      const newCards = randomImages.map(image => ({
        key: uuidv4(),
        content: <Card imagen={image.url} title={image.title} />,
      }));

      setCards(newCards);
    } catch (error) {
      console.error('Error loading images:', error);
    }
  };

  return (
    <Box textAlign="center" py="20" ref={ref}>
      <Carousel
        cards={cards}
        height="700px"
        width="100%"
        margin="0 auto"
        offset={2}
        showArrows={false}
      />
    </Box>
  );
});

export default Hero;