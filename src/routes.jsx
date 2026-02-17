// // frontend/src/routes.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import App from "./App.jsx";

// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import UploadScan from "./pages/UploadScan.jsx";
// import ScanDetails from "./pages/ScanDetails.jsx";
// import Reports from "./pages/Reports.jsx";
// import AdminPanel from "./pages/AdminPanel.jsx";
// import Profile from "./pages/Profile.jsx";
// import NotFound from "./pages/NotFound.jsx";

// import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Layout wrapper */}
//       <Route element={<App />}>
//         {/* Public */}
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={
//             <LoginRedirectIfAuth>
//               <Login />
//             </LoginRedirectIfAuth>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <LoginRedirectIfAuth>
//               <Register />
//             </LoginRedirectIfAuth>
//           }
//         />

//         {/* Protected (User) */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <UploadScan />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/scans/:scanId"
//           element={
//             <ProtectedRoute>
//               <ScanDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected (Admin) */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute requireAdmin>
//               <AdminPanel />
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="/404" replace />} />
//       </Route>
//     </Routes>
//   );
// }

// function LoginRedirectIfAuth({ children }) {
//   const token = localStorage.getItem("token");
//   if (token) return <Navigate to="/dashboard" replace />;
//   return children;
// }


// // frontend/src/routes.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// import App from "./App.jsx";

// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import UploadScan from "./pages/UploadScan.jsx";
// import ScanDetails from "./pages/ScanDetails.jsx";
// import Reports from "./pages/Reports.jsx";
// import Profile from "./pages/Profile.jsx";
// import AdminPanel from "./pages/AdminPanel.jsx";
// import NotFound from "./pages/NotFound.jsx";

// import ProtectedRoute from "./components/common/ProtectedRoute.jsx";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route element={<App />}>
//         {/* Public */}
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/login"
//           element={
//             <LoginRedirectIfAuth>
//               <Login />
//             </LoginRedirectIfAuth>
//           }
//         />
//         <Route
//           path="/register"
//           element={
//             <LoginRedirectIfAuth>
//               <Register />
//             </LoginRedirectIfAuth>
//           }
//         />

//         {/* Protected (User) */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <UploadScan />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/scans/:scanId"
//           element={
//             <ProtectedRoute>
//               <ScanDetails />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/reports"
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         {/* Protected (Admin) */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute requireAdmin>
//               <AdminPanel />
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="/404" replace />} />
//       </Route>
//     </Routes>
//   );
// }

// function LoginRedirectIfAuth({ children }) {
//   const token = localStorage.getItem("token");
//   if (token) return <Navigate to="/dashboard" replace />;
//   return children;
// }

// frontend/src/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import App from "./App.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadScan from "./pages/UploadScan.jsx";
import ScanDetails from "./pages/ScanDetails.jsx";
import Reports from "./pages/Reports.jsx";
import Profile from "./pages/Profile.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import NotFound from "./pages/NotFound.jsx";

import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import AdminRoute from "./components/common/AdminRoute.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route element={<App />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRedirectIfAuth><Login /></LoginRedirectIfAuth>} />
        <Route path="/register" element={<LoginRedirectIfAuth><Register /></LoginRedirectIfAuth>} />

        {/* Protected (User) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><UploadScan /></ProtectedRoute>} />
        <Route path="/scans/:scanId" element={<ProtectedRoute><ScanDetails /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Protected (Admin) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        {/* 404 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}

function LoginRedirectIfAuth({ children }) {
  const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
  if (token) return <Navigate to="/dashboard" replace />;
  return children;
}
