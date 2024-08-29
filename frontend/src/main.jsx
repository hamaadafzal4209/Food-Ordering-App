import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StoreContextProvider from "./context/StoreContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StoreContextProvider>
);
