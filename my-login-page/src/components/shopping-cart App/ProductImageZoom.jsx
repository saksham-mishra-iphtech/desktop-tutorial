import ReactImageMagnify from 'react-image-magnify';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductImageZoom = ({ product, selectedImageIndex, goToPreviousImage, goToNextImage }) => {
  const currentImage =
    product.images?.[selectedImageIndex] ||
    product.image ||
    product.thumbnail ||
    "https://via.placeholder.com/300";

  return (
    <div className="w-full flex justify-center">
    <div className="relative flex w-full max-w-[1000px] ">
  
      <div className="relative w-full md:w-[800px] ">
      <ReactImageMagnify
  {...{
    smallImage: {
      alt: `Product ${selectedImageIndex}`,
      isFluidWidth: true,
      src: currentImage,
    },
    largeImage: {
      src: currentImage,
      width: 1000,
      height: 1200,
    },
    enlargedImageContainerDimensions: {
      width: '230%',
      height: '162%',
    },
    enlargedImagePosition: "beside",
    isHintEnabled: true,
    shouldUsePositiveSpaceLens: true,
    enlargedImageContainerStyle: {
      zIndex: 20,
      position: 'absolute',
      pointerEvents: 'none', 
      backgroundColor:'white',
      
    },
  }}
  className="rounded-md shadow-md bg-white p-4"
/>


        {/* Image Navigation Buttons */}
        {product.images?.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
            >
              <FaChevronLeft className="text-lg" />
            </button>
            <button
              onClick={goToNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-200 z-10"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default ProductImageZoom;

