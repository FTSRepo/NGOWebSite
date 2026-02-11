import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React from "react";

import Layout from "../layout/Layout";
import Home from "../component/home/Home";
import About from "../component/about/About";
import Gallery from "../component/gallery/Gallery";
import Blog from "../component/blog/Blog";
import Contact from "../component/contact/Contact";
import Causes from "../component/causes/Causes";
import Donate from "../component/donate/Donate";
import Events from "../component/events/Events";

import AdminLogin from "../component/admin/auth/LoginForm";
import AdminDashboard from "../component/admin/AdminDashboard";
import ImageUpload from "../component/admin/ImageUpload";
import AdminContact from "../component/admin/Contact";
import Subscribers from "../component/admin/Subscribers";
import Donation from "../component/admin/Donation";
import UpiManager from "../component/admin/payments/UpiManager";
import ChangePassword from "../component/admin/auth/ChangePassword";

import DashboardLayout from "../sidebar/DashboardLayout";

import ProtectedRoute from "../component/admin/auth/ProtectedRoute";

// PublicRoute component to prevent logged-in users from accessing login page
const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/admin-panel" replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC SITE */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="contact" element={<Contact />} />
        <Route path="causes" element={<Causes />} />
        <Route path="donate" element={<Donate />} />
        <Route path="events" element={<Events />} />
      </Route>

      {/* ADMIN LOGIN - Redirect to dashboard if already logged in */}
      <Route
        path="/admin"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

      {/* ADMIN DASHBOARD (PROTECTED ROUTES WITH SIDEBAR LAYOUT) */}
      <Route
        path="/admin-panel"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="image-upload" element={<ImageUpload />} />
        <Route path="donation" element={<Donation />} />
        <Route path="contact" element={<AdminContact />} />
        <Route path="subscribers" element={<Subscribers />} />
        <Route path="upi-manager" element={<UpiManager />} />
        <Route path="change-password" element={<ChangePassword />} />
      </Route>

      {/* 404 - Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>,
  ),
);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;