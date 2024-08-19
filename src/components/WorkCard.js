import React, { useEffect, useState, useCallback, useRef } from "react";
import { Box, Image, Flex, Alert, AlertIcon, Spinner, Text } from "@chakra-ui/react";
import { queryNotion } from "../services/notionService";

const WorkCard = () => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
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
    console.log("Fetching more unique images for session ID:", sessionId, "Initial load:", isInitialLoad);
    try {
      const data = await queryNotion(sessionId, isInitialLoad);
      console.log("Received data:", data);
      if (mountedRef.current) {
        if (data && data.image_data) {
          console.log("Received image data:", data.image_data);
          data.image_data.forEach(item => {
            console.log(`ID: ${item.id}, Title: ${item.title}, URL: ${item.url}`);
          });
          const newCards = data.image_data.map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
            isLoading: true,
          }));
          setCards((prevCards) => {
            const updatedCards = [...prevCards, ...newCards];
            console.log(`Total unique images shown: ${updatedCards.length}`);
            return updatedCards;
          });
          setHasMore(data.has_more);
          setIsInitialLoad(false);
          console.log("Has more unique images:", data.has_more);
        } else {
          console.error("Unexpected response format:", data);
          setError("Received unexpected data format from server.");
        }
      }
    } catch (error) {
      console.error("Error fetching unique images:", error);
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
    console.log("Component mounted");
    mountedRef.current = true;
    resetState();

    return () => {
      console.log("Component unmounting");
      mountedRef.current = false;
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (sessionId) {
      fetchMoreData();
    }
  }, [sessionId]);

  const handleImageLoad = useCallback((id) => {
    if (!mountedRef.current) return;
    setCards((prevCards) => {
      const updatedCards = prevCards.map((card) =>
        card.id === id ? { ...card, isLoading: false } : card
      );
      console.log(`Total unique images loaded: ${updatedCards.filter(card => !card.isLoading).length}`);
      return updatedCards;
    });
  }, []);

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
              <Text 
                p={3} 
                fontSize="md" 
                fontWeight="600"
                fontFamily="'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
                letterSpacing="0.5px"
                lineHeight="1.2"
              >
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
    </Flex>
  );
};

export default WorkCard;