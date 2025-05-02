import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Custom Next Arrow
const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-[-45px] transform -translate-y-1/2 w-12 h-5/6 bg-white border border-gray-300 flex items-center justify-center shadow hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer rounded"
  >
    <FiChevronRight className="text-black text-2xl" />
  </div>
);

// Custom Prev Arrow
const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-[-45px] transform -translate-y-1/2 w-12 h-5/6 bg-white border border-gray-300 flex items-center justify-center shadow hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
  >
    <FiChevronLeft className="text-black text-2xl" />
  </div>
);

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 3 } },
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

export { sliderSettings, CustomNextArrow, CustomPrevArrow };
