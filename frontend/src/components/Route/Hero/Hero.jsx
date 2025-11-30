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
      "Upgrade your tech game with massive savings on smartphones, laptops, and accessories. Hurry before it's gone!",
    buttonText: "Grab Tech Deals",
    buttonLink: "/products?category=Computers and Laptops",
  },
  {
    image:
      "https://res.cloudinary.com/cloudwithharsh/image/upload/f_auto,q_auto/CurioMart/home-banner.jpg",
    title: "Festive Shopping Extravaganza",
    description:
      "Celebrate in style with exclusive festive deals on fashion, lifestyle, and home essentials. Shop your favorites now!",
    buttonText: "Celebrate & Save",
    buttonLink: "/events",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    pauseOnHover: true,
    accessibility: true,
    dotsClass: "slick-dots hero-dots",
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-900"
      aria-label="Hero slider"
    >
      <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[85vh]">
        <Slider {...settings}>
          {sliderContent.map((slide, index) => (
            <div key={index}>
              <article className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh]">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="w-full h-full object-cover"
                  />
                  {/* Multi-layer gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex items-center">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-xl lg:max-w-2xl">
                      {/* Badge/Label - Optional enhancement */}
                      <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm font-medium text-white">
                          Limited Time Offer
                        </span>
                      </div>

                      {/* Main Heading */}
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6 drop-shadow-2xl">
                        {slide.title}
                      </h1>

                      {/* Description */}
                      <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-lg drop-shadow-lg">
                        {slide.description}
                      </p>

                      {/* CTA Button */}
                      <Link to={slide.buttonLink}>
                        <button
                          className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-gray-900 font-semibold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
                          aria-label={`${slide.buttonText} - ${slide.title}`}
                        >
                          <span>{slide.buttonText}</span>
                          <svg
                            className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </Link>

                      {/* Optional: Secondary CTA or Info */}
                      <div className="mt-6 flex items-center gap-6 text-white/80 text-sm">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="hidden sm:inline">
                            Premium Quality
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="hidden sm:inline">
                            Free Shipping
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </Slider>
      </div>

      {/* Custom Slider Dots Styling */}
      <style jsx>{`
        .hero-dots {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex !important;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(8px);
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hero-dots li {
          margin: 0;
        }

        .hero-dots li button:before {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .hero-dots li.slick-active button:before {
          color: white;
          opacity: 1;
          transform: scale(1.2);
        }

        .hero-dots li button:hover:before {
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 640px) {
          .hero-dots {
            bottom: 1rem;
            padding: 0.5rem 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
