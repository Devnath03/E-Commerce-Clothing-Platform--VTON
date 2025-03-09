import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { Box, Image, Text, Button, Stack, Flex } from "@chakra-ui/react";

const ProductItem = ({ id, image, name, price, colors }) => {
  const { currency } = useContext(ShopContext);
  const [isHovered, setIsHovered] = useState(false);

  // Safely extract color names and remove the "Colors: " prefix
  const colorNames = colors?.slice(1).map((color) => color.replace("-", "").trim()) || [];

  return (
    <Link to={`/product/${id}`} className="text-gray-700">
      <Box
        borderWidth="1px"
        borderRadius="sm"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.01)" }}
        position="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <Box position="relative" overflow="hidden">
          <Image
            src={image[0]}
            alt={name}
            width="100%"
            height="250px"
            objectFit="cover"
          />
          {/* Hover Button */}
          <Button
            className="bg-black text-white flex items-center justify-center"
            position="absolute"
            bottom="10px"
            left="70%"
            transition="transform 0.3s ease, opacity 0.3s ease"
            transform={isHovered ? "translateX(-50%)" : "translate(50%)"}
            opacity={isHovered ? 1 : 0}
            borderRadius="none"
            size="md"
            px={8}
            py={2}
            _hover={{ bg: "gray.900" }}
          >
            Try Me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0-3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              />
            </svg>
          </Button>
        </Box>

        {/* Product Details */}
        <Box p={4}>
          <Stack spacing={2}>
            <Text fontSize="md" fontWeight="500" noOfLines={1}>
              {name}
            </Text>
            <Text
              fontSize="sm"
              fontFamily="'Lato'"
              fontWeight="bold"
              color="gray.600"
              noOfLines={1}
            >
              {currency}
              {price}
            </Text>
            {/* Color Palette */}
            <Flex gap="3px" mt={3}>
              {colorNames.map((color, index) => (
                <Box
                  key={index}
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                  background={color.toLowerCase()}
                />
              ))}
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductItem;