import React, { useState, useEffect, useContext } from "react";
import { Box, Image, Text, Spinner, Grid, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { motion } from "framer-motion";
import { toaster } from "@/components/ui/toaster"; // Adjust the import path accordingly
import { Button as MaterialButton } from "@material-tailwind/react";
import Title from "../components/Title"; // Adjust the path to where your Title component is located

const MotionBox = motion(Box);

const VTon = () => {
  const { productId } = useParams();
  const [image, setImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const { products } = useContext(ShopContext);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB.");
        return;
      }

      const reader = new FileReader();
      setLoading(true);
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setLoading(false);

        // Trigger the toaster promise after the image is uploaded
        const promise = new Promise((resolve, reject) => {
          // Simulate a successful upload
          setTimeout(() => {
            resolve(); // Resolve the promise
          }, 1000); // Simulate a delay for the upload
        });

        toaster.promise(promise, {
          success: {
            title: "Successfully uploaded!",
            description: "Looks great",
          },
          error: {
            title: "Upload failed",
            description: "Something went wrong with the upload",
          },
          loading: { title: "Uploading...", description: "Please wait" },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    if (uploadedImage) {
      const link = document.createElement("a");
      link.href = uploadedImage;
      link.download = "uploaded-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) {
    return (
      <Text p={4} color="red.500">
        Product not found. Please check the product ID.
      </Text>
    );
  }

  return (
    <div className="my-0">
      <div className="text-center py-8 text-3xl">
        <Title text1={"VIRTUAL"} text2={"TRY ON"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          alias repellat architecto excepturi minima.
        </p>
      </div>

      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}
        gap={6}
        p={6}
        maxWidth="1200px"
        mx="auto"
      >
        {/* First Box: Display Product Images */}
        <MotionBox
          borderWidth="2px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
          transition="transform 0.2s"
          _hover={{ transform: "scale(1.02)" }}
          height="400px" // Set a fixed height
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.700"
            mb={2}
            _hover={{ color: "black", cursor: "pointer" }}
          >
            Product Images
          </Text>
          {productData.image.map((item, index) => (
            <Image
              onClick={() => setImage(item)}
              src={item}
              key={index}
              boxSize="100%" // Ensure the image takes full width and height
              objectFit="cover" // Maintain aspect ratio without overflow
              className="mb-3 flex-shrink-0"
              alt={productData.name}
            />
          ))}
        </MotionBox>

        {/* Second Box: Upload Image */}
        <MotionBox
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
          height="400px" // Set a fixed height
          position="relative" // Position relative for absolute positioning of button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.700"
            _hover={{ color: "black", cursor: "pointer" }}
          >
            Your Image
          </Text>

          {uploadedImage ? (
            <Image
              src={uploadedImage}
              alt="Uploaded"
              boxSize="100%"
              objectFit="cover"
              borderRadius="md"
              mb={2}
            />
          ) : (
            <Text color="gray.500">No image uploaded yet.</Text>
          )}

          {/* Upload Button */}
          <Button
            variant="solid" // Change to solid for a background color
            className="flex items-center gap-3 bg-black text-white hover:bg-zinc-950 text-sm font-medium rounded-sm transition duration-200" // Add hover effect
            onClick={() => document.getElementById("image-upload").click()} // Trigger file input click
            colorScheme="blue" // This will set the button's background color
            position="absolute"
            bottom="10px"
            left="0"
            right="0"
            margin="0 auto"
            width="50%"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 hover:text-white" // Change SVG color
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
            Upload Image
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }} // Hide the actual input
          />
        </MotionBox>

        {/* Third Box: Display Uploaded Image */}
        <MotionBox
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
          height="400px" // Set a fixed height
          position="relative" // Position relative for absolute positioning of button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="gray.700"
            mb={2}
            _hover={{ color: "black", cursor: "pointer" }}
          >
            VTon Result
          </Text>
          {loading ? (
            <Spinner size="xl" />
          ) : (
            uploadedImage && (
              <Box position="relative" height="100%">
                <Image
                  src={uploadedImage}
                  alt="Uploaded"
                  boxSize="100%"
                  objectFit="cover"
                  borderRadius="md"
                />

                {/* Download Button */}
                <Button
                  variant="solid" // Change to solid for a background color
                  className="flex items-center gap-3 bg-black text-white hover:bg-zinc-950 text-sm font-medium rounded-sm transition duration-200" // Add hover effect
                  onClick={downloadImage} // Trigger download function
                  colorScheme="blue" // This will set the button's background color
                  position="absolute"
                  bottom="20px"
                  left="0"
                  right="0"
                  margin="0 auto"
                  width="55%"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5" // Use strokeWidth instead of stroke-width for JSX
                    stroke="currentColor"
                    className="h-5 w-5 hover:text-white" // Change SVG color
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                  Download
                </Button>
              </Box>
            )
          )}
        </MotionBox>
      </Grid>
    </div>
  );
};

export default VTon;
