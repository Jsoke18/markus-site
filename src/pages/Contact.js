import React, { useState } from "react";
import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  useBreakpointValue,
  useToast,
  VStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { sendEmail } from "../services/MailService";

const MotionBox = motion(Box);

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const formWidth = useBreakpointValue({ base: "90%", md: "500px" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);

    try {
      const result = await sendEmail(formData);
      console.log("Email sent result:", result);  // Add this line for debugging
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. We'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      event.target.reset(); // Clear the form after successful submission
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Message not sent",
        description: "There was an error sending your message. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div>
      <Header mt={10} />
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        maxW="full"
        mx="auto"
        mt={10}
        p={5}
      >
        <VStack spacing={8}>
          <Box textAlign="center">
            <Heading
              as="h2"
              size="xl"
              textColor="white"
              fontFamily="Lexend Variable"
              mb={4}
            >
              Contact Me
            </Heading>
            <Text color="gray.300" fontSize="lg">
              Send me a message and my team will get back to you as soon as possible.
            </Text>
          </Box>
          <Box
            bg="rgba(255, 255, 255, 0.05)"
            boxShadow="lg"
            p={8}
            w={formWidth}
            borderRadius="lg"
            border="1px solid rgba(255, 255, 255, 0.1)"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel textColor="white">Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    focusBorderColor="blue.500"
                    textColor="white"
                    bg="rgba(255, 255, 255, 0.1)"
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel textColor="white">Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    focusBorderColor="blue.500"
                    textColor="white"
                    bg="rgba(255, 255, 255, 0.1)"
                  />
                </FormControl>
                <FormControl id="message" isRequired>
                  <FormLabel textColor="white">Message</FormLabel>
                  <Textarea
                    name="message"
                    placeholder="Enter your message here..."
                    focusBorderColor="blue.500"
                    textColor="white"
                    bg="rgba(255, 255, 255, 0.1)"
                    resize="vertical"
                  />
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  isFullWidth
                  isLoading={isSubmitting}
                  loadingText="Sending"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  Send Message
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </MotionBox>
      <Footer />
    </div>
  );
};

export default Contact;