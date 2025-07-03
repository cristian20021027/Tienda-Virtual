import React from "react";

const About = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-black">
    <div className="absolute top-20 left-0 w-full">
      <div
        className="relative flex items-center justify-center h-40 md:h-56 w-full mb-8 rounded-none overflow-hidden"
        style={{
          backgroundImage: "url('/src/assets/img/img1.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center" />
        <h1 className="relative z-10 text-3xl md:text-5xl font-bold text-white drop-shadow-lg">¿Quiénes Somos?</h1>
      </div>
    </div>
    <div className="max-w-2xl w-full py-16 px-4 text-center bg-black rounded-lg shadow-lg mt-48 md:mt-60 z-10 relative">
      <p className="text-gray-300 text-lg mb-6">
        Somos una tienda apasionada por las gorras urbanas y de moda. Nuestro objetivo es ofrecerte los mejores estilos, calidad y precios para que expreses tu personalidad en cada outfit.
      </p>
      <p className="text-gray-400 mb-4">
        Nacimos con la idea de que cada persona merece una gorra única. Trabajamos con marcas reconocidas y también apoyamos a diseñadores independientes. Nos esforzamos por brindarte una experiencia de compra fácil, segura y rápida.
      </p>
      <p className="text-gray-400 mb-4">
        ¡Gracias por confiar en nosotros y ser parte de nuestra comunidad! Si tienes dudas o sugerencias, no dudes en contactarnos.
      </p>
      <span className="block mt-8 text-red-900 font-semibold">Street Cap</span>
    </div>
  </div>
);

export default About;
