import React from 'react';
import { Flex, Box, useBreakpointValue } from "@chakra-ui/react";
import WorkCard from "../components/WorkCard"; // Adjust the path if necessary
import Header from "../components/Header";
import Footer from "../components/Footer";

const Work = () => {
  const headerZIndex = useBreakpointValue({ base: 1000, md: 1 });
  const contentZIndex = useBreakpointValue({ base: 1, md: 5 });

  return (
    <Box position="relative">
      <Box position="relative" zIndex={headerZIndex}>
        <Header />
      </Box>

      <Box mt={16} zIndex={contentZIndex} position="relative">
        <Flex direction="column" align="center" justify="center" minHeight="80vh">
          <WorkCard />
        </Flex>
      </Box>

      <Footer />
    </Box>
  );
};

export default Work;