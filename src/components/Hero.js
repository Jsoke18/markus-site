import { Box, Heading, Text, Image } from "@chakra-ui/react";
import Carousel from "./Carroussel"; // Import the Carousel component
import { v4 as uuidv4 } from "uuid";
import React, { forwardRef } from "react";

// Supports weights 200-800
import "@fontsource-variable/karla";
import Card from "./card";
const Hero = forwardRef((props, ref) => {
  // Use forwardRef here
  let cards = [
    {
      key: uuidv4(),
      content: <Card imagen="/assets/MGM_markus_versace.jpg" />,
    },

    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/MGM Markus 8117bbc6-bc5d-4685-9162-e60f54c2cc8e.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/MGM Markus cb4db64e-819a-4434-b25d-632949ad4318.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/MGM Markus 1af4422e-1b61-4599-b188-55c2953cf033.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/Rick-Owens-Markus-Rettger-Blow-Models-31.jpeg" />
      ),
    },
    {
      key: uuidv4(),
      content: <Card imagen="/assets/download.jpg" />,
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/334144183_583296047055612_5435294609931353865_n.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/319897202_136104982600989_8353262841863602913_n.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/367518403_204123789308513_3478129185995059867_n.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/317485404_1228807097712449_4210808123994041067_n.jpg" />
      ),
    },{
      key: uuidv4(),
      content: (
        <Card imagen="/assets/338182737_170657235857729_8807397794338382161_n.jpg" />
      ),
    },{
      key: uuidv4(),
      content: (
        <Card imagen="/assets/367542682_253486944248676_6767889492001471663_n.jpg" />
      ),
    },{
      key: uuidv4(),
      content: (
        <Card imagen="/assets/glasses.jpg" />
      ),
    },{
      key: uuidv4(),
      content: (
        <Card imagen="/assets/310683438_164459792858743_4327932082322040688_n.jpg" />
      ),
    },{
      key: uuidv4(),
      content: (
        <Card imagen="/assets/307273002_411780607563492_7469281628518653715_n.jpg" />
      ),
    },
    {
      key: uuidv4(),
      content: (
        <Card imagen="/assets/335936599_134307222912070_603935039368978923_n.jpg" />
      ),
    },
  ];

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
