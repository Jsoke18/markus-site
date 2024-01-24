import { Flex, Spinner, Box } from "@chakra-ui/react";
import WorkCard from "../components/WorkCard"; // adjust the path if necessary
import Header from "../components/Header";
import Footer from "../components/Footer";

const Work = () => {
  return (
    <div>
      <Header mt={10}/>
      <Box mt={16}>

      <Flex direction="column" align="center" justify="center" minHeight="80vh">
        {/* WorkCard now handles fetching and displaying multiple items */}
        <WorkCard mt='10%' />
      </Flex>
      </Box>
          <Footer />

    </div>

  );
};

export default Work;
