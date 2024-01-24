/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import "@fontsource/permanent-marker";
import "@fontsource/goldman";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mavClicked, setNavClicked] = useState(false);

  const isActiveRoute = (route) => location.pathname === route;
  const activeButtonStyle = css`
    transform: scale(1.4); /* Enlarge text */
    z-index: 1;
    color: #7d7d7d;
  `;
  return (
    <Flex
      as="nav"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontFamily="goldman"
        color="white"
        fontSize="5xl"
        mb="4"
        marginRight="1%"
      >
        Markus Rettger
      </Text>
      <Box textAlign="center">
        <Link to="/home" onClick={() => setNavClicked(true)}>
          <Button
            colorScheme="white"
            color="white"
            mr="8"
            css={css`
            ${isActiveRoute('/home') ? activeButtonStyle : ''}
            position: relative;
              transition: all 0.5s;
              &:after {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                margin: auto;
                width: 0%;
                content: ".";
                color: transparent;
                background: transparent; /* Remove purple line */
                height: 1px;
                transition: all 1s;
              }
              &:hover {
                color: #7d7d7d;
                transform: scale(1.4); /* Enlarge text */
                z-index: 1;
              }
              &:hover:after {
                width: 0%;
                z-index: -10;
                opacity: 0;
              }
            `}
          >
            Home
          </Button>
        </Link>
        <Link to="/work" onClick={() => setNavClicked(true)}>
          <Button
            colorScheme="white"
            color="white"
            mr="8"
            css={css`
              ${isActiveRoute("/work") && activeButtonStyle}

              position: relative;
              transition: all 0.5s;
              &:after {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                margin: auto;
                width: 0%;
                content: ".";
                color: transparent;
                background: transparent; /* Remove purple line */
                height: 1px;
                transition: all 1s;
              }
              &:hover {
                color: #7d7d7d;
                transform: scale(1.4); /* Enlarge text */
                z-index: 1;
              }
              &:hover:after {
                width: 0%;
                z-index: -10;
                opacity: 0;
              }
            `}
          >
            Work
          </Button>
        </Link>
        <Link to="/press" onClick={() => setNavClicked(true)}>
          {" "}
          <Button
            colorScheme="white"
            color="white"
            mr="8"
            css={css`
              ${isActiveRoute("/press") && activeButtonStyle}

              position: relative;
              transition: all 0.5s;
              &:after {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                margin: auto;
                width: 0%;
                content: ".";
                color: transparent;
                background: transparent; /* Remove purple line */
                height: 1px;
                transition: all 1s;
              }
              &:hover {
                color: #7d7d7d;
                transform: scale(1.4); /* Enlarge text */
                z-index: 1;
              }
              &:hover:after {
                width: 0%;
                z-index: -10;
                opacity: 0;
              }
            `}
          >
            Press
          </Button>
        </Link>
        <Link to="/contact" onClick={() => setNavClicked(true)}>
          <Button
            colorScheme="white"
            color="white"
            mr="8"
            css={css`
              ${isActiveRoute("/contact") && activeButtonStyle}

              position: relative;
              transition: all 0.5s;
              &:after {
                position: absolute;
                bottom: 10px;
                left: 0;
                right: 0;
                margin: auto;
                width: 0%;
                content: ".";
                color: transparent;
                background: transparent; /* Remove purple line */
                height: 1px;
                transition: all 1s;
              }
              &:hover {
                color: #7d7d7d;
                transform: scale(1.4); /* Enlarge text */
                z-index: 1;
              }
              &:hover:after {
                width: 0%;
                z-index: -10;
                opacity: 0;
              }
            `}
          >
            Contact
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Header;
