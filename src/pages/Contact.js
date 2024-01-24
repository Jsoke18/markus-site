import React, { useState } from "react";
import {
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MotionBox = motion(Box);

const Contact = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const response = await fetch("http://127.0.0.1:5000/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: data,
      });

      console.log(response, "wtf");
      const result = await response.json();
      console.log(result, "wtf2");

      setResponseMessage(result.message);
      setIsError(false);
      setShowAlert(true);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Failed to send the message. Please try again.");
      setIsError(true);
      setShowAlert(true);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  }; 

  return (
    <div>
      <Header mt={10}/>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        p={5}
        w="300px"
        mx="auto"
      >
        {showAlert && (
          <Alert status={isError ? "error" : "success"} variant="solid">
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>{isError ? "Error!" : "Success!"}</AlertTitle>
              <AlertDescription display="block">
                {responseMessage}
              </AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={closeAlert}
            />
          </Alert>
        )}
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="md"
          p={8}
          w="300px" // Increase width

          borderRadius="md"
          border="1px solid rgba(255, 255, 255, 0.18)"
          mt="30%"
        >
          <Heading mb={4} fontSize={"large"} textColor="white">
            Send a Message
          </Heading>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4} textColor={"white"}>
              <FormLabel fontSize={"small"} textColor={"white"}>
                Name
              </FormLabel>
              <Input type="text" name="name" />
            </FormControl>
            <FormControl mb={4} textColor={"white"}>
              <FormLabel fontSize={"small"} textColor={"white"}>
                Email
              </FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl mb={4} textColor={"white"}>
              <FormLabel fontSize={"small"} textColor={"white"}>
                Message
              </FormLabel>
              <Textarea name="message"  textColor={"white"} placeholder="Enter your message here" />
            </FormControl>

            <Button colorScheme="blue" type="submit"   _hover={{ transform: "scale(1.1)" }}
 >
              Submit
            </Button>
          </form>
        </Box>
      </MotionBox>
      <Footer />

    </div>
  );
};

export default Contact;
