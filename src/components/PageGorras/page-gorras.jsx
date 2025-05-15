import React, { useState, useEffect,useMemo } from "react";
import { supabase } from "../../supabaseClient";
import ProductsCard from "../ProductCard/ProductCard";
import { useCart } from "../../context/context";

const GorrasPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(["Todas"]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useCart();

  // Cargar productos solo una vez
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.from("gorras").select("*");
        if (error) throw error;
        
        const productsWithCartData = data.map(product => {
          const cartItem = cart.find(item => item.id === product.id);
          return cartItem ? { ...product, quantity: cartItem.quantity } : product;
        });
        
        setAllProducts(productsWithCartData || []);
        
        const uniqueCategories = [
          "Todas",
          ...new Set(data.map(p => p.categoria).filter(Boolean))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Productos filtrados memoizados
  const filteredProducts = useMemo(() => {
    return selectedCategory === "Todas"
      ? allProducts
      : allProducts.filter(p => p.categoria === selectedCategory);
  }, [allProducts, selectedCategory]);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  if (error) return <div className="text-red-500 p-4 text-center">{error}</div>;

  return (
    <div className="bg-neutral-800 w-full mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
        Nuestra Colección de Gorras
      </h1>
      
      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryFilter(category)}
            className={`cursor-pointer uppercase font-bold px-4 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando productos...</p>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}{" "}
              {selectedCategory !== "Todas" && `en "${selectedCategory}"`}
            </p>
          </div>
          <ProductsCard 
            products={filteredProducts}
            key={selectedCategory}
          />
        </>
      )}
    </div>
  );
};

export default GorrasPage;