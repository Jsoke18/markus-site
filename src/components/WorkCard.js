import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Box,
  Image,
  Flex,
  Alert,
  AlertIcon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { queryNotion } from "../services/notionService";

const WorkCard = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const observer = useRef();
  const mountedRef = useRef(true);

  const resetState = useCallback(() => {
    setCards([]);
    setIsLoading(false);
    setError("");
    setHasMore(true);
    setSessionId(Date.now().toString());
    setIsInitialLoad(true);
  }, []);

  const lastCardRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Last card is intersecting, fetching more unique images");
          fetchMoreData();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchMoreData = useCallback(async () => {
    if (isLoading || !hasMore || !mountedRef.current || !sessionId) return;
    setIsLoading(true);
    console.log(
      "Fetching more unique images for session ID:",
      sessionId,
      "Initial load:",
      isInitialLoad
    );
    try {
      const data = await queryNotion(sessionId, isInitialLoad);
      console.log("Received data:", data);
      if (mountedRef.current) {
        if (data && data.image_data) {
          console.log("Received image data:", data.image_data);
          const newCards = data.image_data.map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            isLoading: true,
          }));
          setCards((prevCards) => [...prevCards, ...newCards]);
          setHasMore(data.has_more);
          setIsInitialLoad(false);
        } else {
          setError("Received unexpected data format from server.");
        }
      }
    } catch (error) {
      if (mountedRef.current) {
        setError("Failed to fetch images. Please try again later.");
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [isLoading, hasMore, sessionId, isInitialLoad]);

  useEffect(() => {
    mountedRef.current = true;
    resetState();
    return () => {
      mountedRef.current = false;
      if (observer.current) observer.current.disconnect();
    };
  }, [resetState]);

  useEffect(() => {
    if (sessionId) {
      fetchMoreData();
    }
  }, [sessionId, fetchMoreData]);

  const handleImageLoad = useCallback((id) => {
    if (!mountedRef.current) return;
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, isLoading: false } : card
      )
    );
  }, []);

  const handleImageClick = (card) => {
    setSelectedImage(card);
    document.body.style.overflow = "hidden"; // Disable scrolling
  };

  const handleCloseEnlarged = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  if (!sessionId) {
    return (
      <Alert status="error">
        <AlertIcon />
        Invalid session. Please refresh the page and try again.
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Flex direction="column" align="center">
      <Flex wrap="wrap" justify="center">
        {cards.map((card, index) => (
          <Box
            key={card.id}
            ref={index === cards.length - 1 ? lastCardRef : null}
            maxW="xs"
            borderWidth="1px"
            borderRadius="lg"
            borderColor="grey"
            overflow="hidden"
            mt="5%"
            mb={6}
            mx={4}
            flexBasis={["100%", "50%", "25%"]}
            visibility={card.isLoading ? "hidden" : "visible"}
            position="relative"
            onClick={() => handleImageClick(card)}
            cursor="pointer"
            zIndex="9" // Make sure cards are below the header
            _hover={{
              "& > .title-overlay": {
                transform: "translateY(0)",
              },
            }}
          >
            <Image
              src={card.url}
              alt={card.title}
              width="100%"
              height="100%"
              objectFit="cover"
              onLoad={() => handleImageLoad(card.id)}
              loading="lazy"
            />
            <Box
              className="title-overlay"
              position="absolute"
              bottom={0}
              left={0}
              width="100%"
              bg="rgba(255, 255, 255, 0.9)"
              color="black"
              transform="translateY(100%)"
              transition="transform 0.3s ease-in-out"
            >
              <Text p={3} fontSize="md" fontWeight="600">
                {card.title}
              </Text>
            </Box>
          </Box>
        ))}
      </Flex>
      {isLoading && (
        <Spinner
          size="xl"
          color="white"
          style={{ width: "50px", height: "50px" }}
          my={4}
        />
      )}
      {selectedImage && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bg="rgba(0,0,0,0.8)"
          zIndex={9999} // Ensure this is higher than the header's zIndex
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={handleCloseEnlarged}
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.title}
            maxHeight="90%"
            maxWidth="90%"
            objectFit="contain"
            onClick={(e) => e.stopPropagation()}
          />
          <Text
            position="absolute"
            bottom="20px"
            left="50%"
            transform="translateX(-50%)"
            color="white"
            fontSize="xl"
            fontWeight="bold"
          >
            {selectedImage.title}
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default WorkCard;
