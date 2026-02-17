// // // frontend/src/main.jsx
// // import React from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";

// // import App from "./App.jsx";
// // import AppRoutes from "./routes.jsx";

// // import "./styles/tailwind.css";
// // import "./styles/globals.css";

// // /**
// //  * main.jsx
// //  * - Mounts React app
// //  * - Uses BrowserRouter + nested layout (App) + routes (AppRoutes)
// //  * - Tailwind + global styles included
// //  */
// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       <Routes>
// //         {/* Layout wrapper */}
// //         <Route path="/*" element={<App />}>
// //           {/* All routes live inside AppRoutes */}
// //           <Route path="*" element={<AppRoutes />} />
// //         </Route>
// //       </Routes>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );


// // frontend/src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";

// import AppRoutes from "./routes.jsx";

// import "./styles/tailwind.css";
// import "./styles/globals.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   </React.StrictMode>
// );
// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import AppRoutes from "./routes.jsx";
import { store } from "./store/store.js";

import "./styles/tailwind.css";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
