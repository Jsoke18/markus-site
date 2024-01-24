import { useEffect, useState } from "react";
import { Text, Box, Image, Flex, Alert, AlertIcon } from "@chakra-ui/react";
import { queryNotion } from "../services/notionService";

const WorkCard = () => {
  const [cards, setCards] = useState([]);
  const [displayCount, setDisplayCount] = useState(15); // State for tracking number of displayed images
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await queryNotion();
        if (data && data.image_urls) {
          const imageCards = data.image_urls.map((url) => ({
            url,
            isLoading: true,
          }));
          setCards([...imageCards].reverse());
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch images.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setDisplayCount((prevCount) => prevCount + 40); // Load more images when user reaches the bottom
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const handleImageLoad = (index) => {
    const updatedCards = cards.map((card, cardIndex) =>
      cardIndex === index ? { ...card, isLoading: false } : card
    );
    setCards(updatedCards);
  };

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }
  return (
    <Flex wrap="wrap" justify="center">
      {cards.slice(0, displayCount).map((card, index) => (
        <Box
          key={index}
          maxW="xs"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={"grey"}
          overflow="hidden"
          mt={"5%"} // Increase top margin
          mb={6} // Increase bottom margin
          mx={4} // Keep left and right margins the same
          flexBasis={["100%", "50%", "25%"]} // responsive flexBasis: 100% on small screens, 50% on medium screens, 25% on large screens
          visibility={card.isLoading ? "hidden" : "visible"}
        >
          <Image
            src={card.url}
            alt={`Image ${index + 1}`}
            width="100%"
            height="100%"
            objectFit="cover"
            onLoad={() => handleImageLoad(index)}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default WorkCard;
