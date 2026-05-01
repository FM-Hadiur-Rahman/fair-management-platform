import { Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/public/Home";
import Stalls from "./pages/public/Stalls";
import Sponsors from "./pages/public/Sponsors";
import ApplyStall from "./pages/public/ApplyStall";
import Login from "./pages/auth/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminOffers from "./pages/admin/AdminOffers";
import Gallery from "./pages/public/Gallery";
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />

      <Route
        path="/stalls"
        element={
          <PublicLayout>
            <Stalls />
          </PublicLayout>
        }
      />

      <Route
        path="/sponsors"
        element={
          <PublicLayout>
            <Sponsors />
          </PublicLayout>
        }
      />

      <Route
        path="/apply-stall"
        element={
          <PublicLayout>
            <ApplyStall />
          </PublicLayout>
        }
      />
      <Route
        path="/gallery"
        element={
          <PublicLayout>
            <Gallery />
          </PublicLayout>
        }
      />

      <Route
        path="/login"
        element={
          <PublicLayout>
            <Login />
          </PublicLayout>
        }
      />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="announcements" element={<AdminAnnouncements />} />
        <Route path="offers" element={<AdminOffers />} />
      </Route>
    </Routes>
  );
}
