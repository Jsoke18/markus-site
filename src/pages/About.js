import React from "react";
import { Box, Flex, Text, Image, VStack, Heading, Link, Container, SimpleGrid } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import "@fontsource/permanent-marker";
import "@fontsource/goldman";

const MotionBox = motion(Box);

const About = () => {
  return (
    <AnimatePresence>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        minH="100vh"
        bg="transparent"
      >
        <Header />

        <Container maxW="container.xl" pt={{ base: 20, md: 28 }} pb={{ base: 20, md: 28 }}>
          <VStack spacing={12} align="stretch">
            <MotionBox
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Heading
                as="h1"
                size="2xl"
                mb={6}
                color="white"
                fontFamily="goldman"
                textAlign="center"
              >
                About Markus
              </Heading>
            </MotionBox>

            <Flex
              direction={{ base: "column", lg: "row" }}
              align="center"
              justify="space-between"
              bg="rgba(255, 255, 255, 0.1)"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="xl"
            >
              <Image
                src="/assets/MGM_markus_versace.jpg"
                alt="Markus Rettger"
                objectFit="cover"
                boxSize={{ base: "100%", lg: "500px" }}
                maxH={{ base: "400px", lg: "100%" }}
              />
              <VStack spacing={6} p={8} align="start" flex={1}>
                <Text fontSize="lg" color="white">
                  Markus Rettger is a versatile model based in Montreal, Canada. Represented by prestigious modeling agencies such as Brave Models in Milan, Blow Models, and Wilhelmina Models in New York, he has worked on campaigns and editorials for notable fashion brands including Rudsak and Versace Jeans Couture.
                </Text>
                <Text fontSize="lg" color="white">
                  His striking features and professional demeanor have helped him secure campaigns with renowned labels, positioning him as a rising talent in the modeling industry.
                </Text>
                <Link
                  href="https://www.instagram.com/markus_rettger/"
                  color="teal.200"
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ color: "teal.100" }}
                  isExternal
                >
                  Follow Markus on Instagram
                </Link>
              </VStack>
            </Flex>

            <Box mb={10}>  {/* Added margin bottom here */}
              <Heading
                as="h2"
                size="xl"
                mb={8}
                color="white"
                fontFamily="goldman"
                textAlign="center"
              >
                Physical Attributes
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
                <Attribute label="Height" value={`6'0.5" (184 cm)`} />
                <Attribute label="Chest" value={`35" (90 cm)`} />
                <Attribute label="Waist" value={`28" (73 cm)`} />
                <Attribute label="Hips" value={`34" (87 cm)`} />
                <Attribute label="Shoe Size" value={`10.5 US (44 EU)`} />
                <Attribute label="Eye Color" value="Green" />
                <Attribute label="Hair Color" value="Dark Blonde" />
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
      </MotionBox>
    </AnimatePresence>
  );
};

const Attribute = ({ label, value }) => (
  <Box
    bg="rgba(255, 255, 255, 0.1)"
    p={5}
    borderRadius="md"
    boxShadow="md"
    transition="all 0.3s"
    _hover={{ transform: "translateY(-5px)", boxShadow: "lg" }}
  >
    <Text fontWeight="bold" color="white" fontSize="lg" mb={2}>
      {label}
    </Text>
    <Text color="white" fontSize="md">
      {value}
    </Text>
  </Box>
);

export default About;