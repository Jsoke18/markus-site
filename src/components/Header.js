/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import "@fontsource/permanent-marker";
import "@fontsource/goldman";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const Header = () => {
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();

  const isActiveRoute = (route) => location.pathname === route;
  const activeButtonStyle = css`
    transform: scale(1.4);
    z-index: 1;
    color: #7d7d7d;
  `;

  const buttonStyle = css`
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
      background: transparent;
      height: 1px;
      transition: all 1s;
    }
    &:hover {
      color: #7d7d7d;
      transform: scale(1.4);
      z-index: 1;
    }
    &:hover:after {
      width: 0%;
      z-index: -10;
      opacity: 0;
    }
  `;

  const menuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  };

  const NavButton = ({ to, children, isMobile = false }) => (
    <Link to={to} onClick={isMobile ? onToggle : undefined}>
      <Button
        colorScheme={isMobile ? "blackAlpha" : "white"}
        color={isMobile ? "black" : "white"}
        mr={isMobile ? 0 : "8"}
        mb={isMobile ? 4 : 0}
        variant="ghost"
        css={css`
          ${isActiveRoute(to) && !isMobile ? activeButtonStyle : ''}
          ${!isMobile && buttonStyle}
          ${isMobile && css`
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          `}
        `}
      >
        {children}
      </Button>
    </Link>
  );

  return (
    <Box position="relative" zIndex="1000">
      <Flex
        as="nav"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={2}
        >
          <Box 
            display={{ base: "block", md: "none" }} 
            onClick={onToggle}
            zIndex="10000"
          >
            <HamburgerIcon color="white" boxSize={6} />
          </Box>
          <Text
            fontFamily="goldman"
            color="white"
            fontSize={{ base: "2xl", md: "5xl" }}
            textAlign={{ base: "center", md: "center" }}
            flexGrow={1}
          >
            Markus Rettger
          </Text>
        </Flex>
        <Box display={{ base: "none", md: "block" }} textAlign="center">
          <NavButton to="/home">Home</NavButton>
          <NavButton to="/work">Work</NavButton>
          <NavButton to="/about">About</NavButton>
          <NavButton to="/press">Press</NavButton>
          <NavButton to="/contact">Contact</NavButton>
        </Box>
      </Flex>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "250px",
              background: "white",
              zIndex: "10000",
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              boxShadow: "2px 0 5px rgba(0,0,0,0.2)"
            }}
          >
            <Flex justify="flex-end" mb={6}>
              <CloseIcon color="black" onClick={onToggle} cursor="pointer" />
            </Flex>
            <NavButton to="/home" isMobile>Home</NavButton>
            <NavButton to="/work" isMobile>Work</NavButton>
            <NavButton to="/about" isMobile>About</NavButton>
            <NavButton to="/press" isMobile>Press</NavButton>
            <NavButton to="/contact" isMobile>Contact</NavButton>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Header;