import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toaster } from "@/components/ui/toaster"; // Import the custom toaster
import { Button } from "@chakra-ui/react"; // Import Button from Chakra UI
import { motion } from "framer-motion"; // Import motion
import { Rating } from "@material-tailwind/react"; // Import Rating

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]); // State for reviews
  const [newReview, setNewReview] = useState(""); // State for new review
  const [newRating, setNewRating] = useState(0); // State for new rating
  const [showReviews, setShowReviews] = useState(false); // State to toggle reviews
  const [showReviewForm, setShowReviewForm] = useState(true); // State to toggle review form
  const [showAddReviewIcon, setShowAddReviewIcon] = useState(false); // State to show the SVG icon

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  };

  const handleClearSize = () => {
    setSize(""); // Reset the size state to default
  };

  const onAddCartHandler = (event) => {
    event.preventDefault();
    if (size) {
      addToCart(productData._id, size);
      toaster.create({
        title: "Item added to cart!",
        description: `${productData.name} has been added to your cart.`,
        type: "success", // Success toast
        backgroundColor: "green.500",
        color: "white",
      });
    } else {
      toaster.create({
        title: "Select a size",
        description: "Please select a size before adding to cart.",
        type: "error", // Error toast
        backgroundColor: "red.500",
        color: "white",
      });
    }
  };

  const handleAddReview = (event) => {
    event.preventDefault();
    if (newReview && newRating) {
      const review = {
        text: newReview,
        rating: newRating,
      };
      setReviews([...reviews, review]); // Add new review to the list
      setNewReview(""); // Clear the input
      setNewRating(0); // Reset the rating
      setShowReviewForm(false); // Hide the review form after submission
      setShowAddReviewIcon(true); // Show the SVG icon after submission
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <motion.div
      className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
      initial={{ opacity: 0, y: 20 }} // Initial state for appearance
      animate={{ opacity: 1, y: 0 }} // Animate to this state
      exit={{ opacity: 0, y: 20 }} // Exit animation
      transition={{ duration: 0.5 }} // Transition duration for smooth appearance and closing
    >
      {/*-------- Product Data--------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*---------- Product Images--------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] relative">
            <img className="w-full h-auto" src={image} alt={productData.name} />
            {/* Circular Button for VTon */}
            <motion.div
              className="w-10 h-10 sm:w-14 sm:h-14 bg-white rounded-full absolute top-4 right-4 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }} // Scale up on hover
              whileTap={{ scale: 0.9 }} // Scale down on click
              transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth spring transition
            >
              <Button
                className="virtual-try flex items-center justify-center" // Center the button content
                onClick={() => navigate(`/vton/${productId}`)}
                variant="ghost" // Use ghost variant for a transparent button
              >
                <motion.img
                  className="w-6 h-6 object-cover"
                  src={assets.hanger_icon}
                  alt="Hanger Icon"
                  initial={{ rotate: 0, scale: 1 }} // Initial state
                  whileHover={{ scale: 1.2 }} // Scale up on hover
                  whileTap={{ rotate: 140, scale: 0.8 }} // Rotate and scale down on click
                  transition={{ type: "spring", stiffness: 300, damping: 10 }} // Smooth spring transition
                />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ----------Product Info ---------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_icon} alt="Star" className="w-3" />
            <img src={assets.star_dull_icon} alt="Dull Star" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes && productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))/* {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))} */}
              {size && ( // Show the clear text only if a size is selected
              <p
                className="text-sm ml-2 mt-3 text-black hover:text-orange-500 cursor-pointer"
                onClick={handleClearSize}
              >
                clear
              </p>
            )}
            </div>
            
          </div>
          <Button
            type="button"
            onClick={onAddCartHandler}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </Button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/*-------------Description and Review section---------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p
            className="border px-5 py-3 text-sm cursor-pointer"
            onClick={() => setShowReviews(!showReviews)} // Toggle reviews on click
          >
            Reviews ({reviews.length})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
            unde modi libero dicta perspiciatis quis laborum odit deserunt iusto
            inventore, expedita quo beatae tempora consequatur natus sit error
            at. Eligendi.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut
            obcaecati voluptates, incidunt nulla dolorum sapiente sunt nihil
            optio id veritatis deleniti quibusdam culpa eum corporis recusandae
            unde? Alias, praesentium sit.
          </p>
        </div>

        {/* Review Section */}
        {showReviews && (
          <motion.div
            className="mt-6 p-4 border rounded-lg shadow-md bg-white"
            initial={{ opacity: 0, y: 20 }} // Initial state for appearance
            animate={{ opacity: 1, y: 0 }} // Animate to this state
            exit={{ opacity: 0, y: 20 }} // Exit animation
            transition={{ duration: 0.3 }} // Transition duration for smooth appearance and closing
          >
            <h2 className="text-lg font-semibold mb-4">User Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border-b py-2">
                  <div className="flex items-center">
                    <Rating
                      value={review.rating}
                      readOnly
                      className="text-sm"
                    />
                    <p className="text-gray-700 ml-2 text-xs">{review.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to review!</p>
            )}
            {showReviewForm && (
              <form onSubmit={handleAddReview} className="mt-4">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Write your review here..."
                  style={{
                    border: "1px solid #d1d5db",
                    padding: "8px",
                    width: "100%",
                    borderRadius: "6px",
                    marginBottom: "16px",
                    resize: "none",
                  }}
                  rows="4"
                  required
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "16px",
                  }}
                >
                  <Rating
                    value={newRating}
                    onChange={(value) => setNewRating(value)}
                    style={{ fontSize: "14px" }}
                  />
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#000000",
                      color: "#fff",
                      padding: "8px 24px",
                      borderRadius: "6px",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    SUBMIT REVIEW
                  </Button>
                </div>
              </form>
            )}
            {showAddReviewIcon && (
              <div className="mt-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 w-6 h-6 cursor-pointer"
                  onClick={() => {
                    setShowReviewForm(true);
                    setShowAddReviewIcon(false);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c ```javascript
                    0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* ----------------display related products------------ */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </motion.div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
