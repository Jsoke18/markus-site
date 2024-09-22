import React, { useRef } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import LocationText from "../components/LocationText";
import PinIcon from "../components/PinIcon";
import IconTest from "../components/icon";
import { Box } from "@chakra-ui/react";

const Home = () => {
  const heroRef = useRef(null);

  return (
    <>
      <Header marginTop={10} />
      <Hero ref={heroRef} />
      <LocationText heroRef={heroRef} />
      <PinIcon heroRef={heroRef} />
      <Box mt="-105vh">  {/* Reduced margin between LocationText and IconTest */}
        <IconTest />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
