import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderContent = [
  {
    image:
      "https://res.cloudinary.com/cloudwithharsh/image/upload/f_auto,q_auto/CurioMart/banner-3_nkyyxy.jpg",
    title: "Elegant Home Decor Finds",
    description:
      "Transform your living space with our handpicked selection of modern and traditional home decor essentials.",
    buttonText: "Shop Home Decor",
    buttonLink: "/products",
  },
  {
    image:
      "https://res.cloudinary.com/cloudwithharsh/image/upload/f_auto,q_auto/CurioMart/iphone-banner1_slfzrx.jpg",
    title: "Mega Electronics Blowout",
    description:
      "Upgrade your tech game with massive savings on smartphones, laptops, and accessories. Hurry before it’s gone!",
    buttonText: "Grab Tech Deals",
    buttonLink: "/products/Mobile and Tablets",
  },
  {
    image:
      "https://res.cloudinary.com/cloudwithharsh/image/upload/f_auto,q_auto/CurioMart/home-banner.jpg",
    title: "Festive Shopping Extravaganza",
    description:
      "Celebrate in style with exclusive festive deals on fashion, lifestyle, and home essentials. Shop your favorites now!",
    buttonText: "Celebrate & Save",
    buttonLink: "/products",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="relative w-full min-h-[70vh] 800px:min-h-[80vh]">
      <Slider {...settings}>
        {sliderContent.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-[70vh] 800px:h-[80vh] overflow-hidden">
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full flex items-center bg-black/30">
                <div className="ml-6 800px:ml-24 max-w-[90%] 800px:max-w-[55%] text-left text-white">
                  <h1 className="text-[32px] 800px:text-[60px] font-bold leading-tight drop-shadow-md capitalize">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-[16px] 800px:text-[18px] text-white/90 font-[Poppins]">
                    {slide.description}
                  </p>
                  <Link to={slide.buttonLink}>
                    <button className="mt-6 px-6 py-3 bg-white text-black text-[16px] font-medium rounded hover:bg-gray-200 transition-all font-[Poppins]">
                      {slide.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
