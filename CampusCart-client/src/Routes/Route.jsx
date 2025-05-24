import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import AddTask from "../Components/AddTask/AddTask";
import Home from "../Components/Home/Home";
import BrowseTasks from "../Components/BrowseTasks/BrowseTasks";
import MyTasks from "../Components/MyTasks/MyTasks";
import Login from "../Components/Login/Login";
import SignUp from "../Components/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../Components/Error/ErrorPage";
import CardDetails from "../Components/CardDetails/CardDetails";
import UpdateTask from "../Components/UpdateTask/UpdateTask";
import Loading from "../Components/Loading/Loading";
import UpdateUserProfile from "../Components/UpdateUserInfo/UpdateUserInfo";
import AdminPanel from "../Components/AdminPanel/AdminPanel";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: () => fetch("http://localhost:3000/products/featuredProducts"),
        hydrateFallbackElement: <Loading></Loading>,
        element: <Home></Home>,
      },
      {
        path: "/addListing",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path:'/adminPanel',
        loader:()=>fetch('http://localhost:3000/users'),
        element:<AdminPanel></AdminPanel>
      },
      {
        path: "/exploreProducts",
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement: <Loading></Loading>,
        element: <BrowseTasks></BrowseTasks>,
      },
      {
        path: "/exploreProducts/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <CardDetails></CardDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProfile",
        element: (
          <PrivateRoute>
            <UpdateUserProfile></UpdateUserProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/myProducts",
        loader: () => fetch("http://localhost:3000/products"),
        hydrateFallbackElement: <Loading></Loading>,
        element: (
          <PrivateRoute>
            <MyTasks></MyTasks>
          </PrivateRoute>
        ),
      },
      {
        path: "/updateProduct/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
        element: <UpdateTask></UpdateTask>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);
