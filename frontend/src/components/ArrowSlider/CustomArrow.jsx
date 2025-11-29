import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

// Minimalist Next Arrow
const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-blue-600 border border-gray-200 hover:border-blue-600 flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer rounded-full group"
  >
    <FiChevronRight className="text-gray-700 group-hover:text-white text-xl group-hover:translate-x-0.5 transition-all" />
  </div>
);

// Minimalist Prev Arrow
const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 left-[-15px] transform -translate-y-1/2 z-10 w-10 h-10 bg-white hover:bg-blue-600 border border-gray-200 hover:border-blue-600 flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer rounded-full group"
  >
    <FiChevronLeft className="text-gray-700 group-hover:text-white text-xl group-hover:-translate-x-0.5 transition-all" />
  </div>
);

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 600,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: false,
  pauseOnHover: true,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

export { sliderSettings, CustomNextArrow, CustomPrevArrow };
