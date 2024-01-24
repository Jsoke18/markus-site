import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}fontColor="grey" mt="10%">
      <Text textAlign="center" fontSize="sm" color="grey">
        &copy; {new Date().getFullYear()} Markus Rettger. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;