import React, { use, useEffect } from "react";
import Navbar from "../Components/Header/Navbar";
import { Outlet, useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Components/Loading/Loading";
import Footer from "../Components/Footer/Footer";

const MainLayout = () => {




  const location = useLocation();


  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("Logged in Successfully");
    }
  }, [location]);

      const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }

  
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="max-w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MainLayout;
