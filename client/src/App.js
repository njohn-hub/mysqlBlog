import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss"


const Layout = () => {
  return(
    <>
      <Navbar/>
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path:"/",
        element: <Home />
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/single/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ]
  },
 
]); 

function App() {
  return (
    <div className="App">
    <div className="container">
    <RouterProvider router={router} />
    </div>
    </div>
  );
}

export default App;
