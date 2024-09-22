import { Flex, Box } from "@chakra-ui/react";
import WorkCard from "../components/WorkCard"; // Adjust the path if necessary
import Header from "../components/Header";
import Footer from "../components/Footer";

const Work = () => {
  return (
    <div>
      {/* Lower z-index for the Header */}
      <Box position="relative" zIndex="1">
        <Header />
      </Box>

      {/* Ensure WorkCard has higher z-index */}
      <Box mt={16} zIndex="10" position="relative">
        <Flex direction="column" align="center" justify="center" minHeight="80vh">
          <WorkCard />
        </Flex>
      </Box>

      <Footer />
    </div>
  );
};

export default Work;
