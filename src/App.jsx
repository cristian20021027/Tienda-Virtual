import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import { CartProvider } from "./context/context"; // Importa el CartProvider

import Home from "./components/Home/Home";
import Login from "./components/login/login";
import Admin from "./PanelAdmin/Admin";
import AgregarGorra from "./PanelAdmin/AgregarGorra";
import AdminGorras from "./PanelAdmin/adminGorras";
import GorrasPage from "./components/PageGorras/page-gorras";
import CarritoPage from "./components/CarritoPage"; // Importa la nueva página del carrito

function App() {
  return (
    <CartProvider> {/* Envuelve toda tu aplicación con el CartProvider */}
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gorras" element={<GorrasPage/>}/>
          <Route path="/cart" element={<CarritoPage/>}/> {/* Nueva ruta del carrito */}
        </Route>

        {/* Rutas admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/agregar-gorra" element={<AgregarGorra />} />
          <Route path="/admin/admin-gorras" element={<AdminGorras/>}/>
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;