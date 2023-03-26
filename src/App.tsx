import "./App.css";
import MenuPage from "./pages/MenuPage";
import OrderTablePage from "./pages/OrderTablePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KitchenPage from "./pages/KitchenPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPage />,
  },
  {
    path: "/orders",
    element: <OrderTablePage />,
  },
  {
    path: "/kitchen",
    element: <KitchenPage />,
  },
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
