import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import ProductsCard from "../ProductCard/ProductCard";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import "../Navbar/navbar.css"
const images = ["/img/img1.jpg", "/img/img2.jpg", "/img/img3.jpg"];

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from("gorras")
        .select("*");
      if (!error && data) {
        // Mezcla aleatoria de productos
        const shuffled = data.sort(() => 0.5 - Math.random());
        // Toma solo 4 elementos
        setFeatured(shuffled.slice(0, 4));
      }
    };
    fetchFeatured();
  }, []);

  return (
    <>
    <div className="relative w-full h-screen overflow-hidden">
  {/* Fondo Slider - nivel más bajo */}
  <Swiper
    modules={[Autoplay]}
    autoplay={{ delay: 4000 }}
    loop={true}
    className="absolute inset-0 w-full h-full z-0"
  >
    {images.map((src, idx) => (
      <SwiperSlide key={idx}>
        <img
          src={src}
          alt={`slide-${idx}`}
          className="w-full h-screen object-cover"
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Capa negra semitransparente por encima del slider */}
  <div className="absolute inset-0 z-10 " style={{ backgroundColor: "rgba(0, 0, 0, 0.712)" }}></div>

  {/* Contenido encima de todo */}
  <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
    <motion.h1
      className="logo text-5xl md:text-7xl  mb-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Street Cap
    </motion.h1>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Link
        to="/gorras"
        className="bg-red-600 hover:bg-red-900 text-white px-8 py-4 rounded-full font-bold text-lg transition duration-300"
      >
        Ver Productos
      </Link>
    </motion.div>
  </div>
</div>

      {/* Productos destacados */}
      <section className="py-12 bg-gray-100 dark:bg-neutral-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Destacados</h2>
          <ProductsCard products={featured} />
        </div>
      </section>
    </>
  );
};

export default Home;
