import { Routes, Route } from "react-router-dom";
import { Authpage } from "./components/LoginPage/Authpage";
import Dashboard from "./components/FirstPage/Dashboard";
import Demo1 from "./components/CounterApp/Demo1";
import Demo2 from "./components/ToDoListApp/Demo2";
import MovieSearch from "./components/MovieSearchApp/MovieSearch";
import SignUpForm from "./components/LoginPage/SignUpForm";
import ShoppingHome from "./components/shopping-cart App/ShoppingHome";
import ProductDetail from "./components/shopping-cart App/ProductDetail";
import Cart from "./components/shopping-cart App/Cart";
import Wishlist from "./components/shopping-cart App/Wishlist";
import Profile from "./components/FirstPage/Profile";
import PlaceOrder from "./components/shopping-cart App/PlaceOrder";
import ProtectedRoutes from "./components/ProtectedRoutes";
import BloggingHome from "./components/BloggingApp/BloggingHome";
import MyOrders from "./components/shopping-cart App/MyOrders";
import ArticleDetail from "./components/BloggingApp/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authpage />} />
      <Route path="/signup" element={<SignUpForm />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/profile"
        element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/counter-app"
        element={
          <ProtectedRoutes>
            <Demo1 />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/todo-list"
        element={
          <ProtectedRoutes>
            <Demo2 />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/movie-search"
        element={
          <ProtectedRoutes>
            <MovieSearch />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart"
        element={
          <ProtectedRoutes>
            <ShoppingHome />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart/product/:source/:productId"
        element={
          <ProtectedRoutes>
            <ProductDetail />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart/cart"
        element={
          <ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart/wishlist"
        element={
          <ProtectedRoutes>
            <Wishlist />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart/my-orders"
        element={
          <ProtectedRoutes>
            <MyOrders />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/dashboard/e-shopping-cart/placeOrder"
        element={
          <ProtectedRoutes>
            <PlaceOrder />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/dashboard/blogging-app"
        element={
          <ProtectedRoutes>
            <BloggingHome/>
          </ProtectedRoutes>
        }
      />

<Route
        path="/dashboard/blogging-app/article/:id"
        element={
          <ProtectedRoutes>
            <ArticleDetail />
          </ProtectedRoutes>
        }
      />

      
    </Routes>
  );
}

export default App;
