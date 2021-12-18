import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { AppProvider } from "./context";
import App from "./App";

/**
 * W poniższym kodzie widać jak cała aplikacja <App /> zostaje umieszczona w kontekście Providera
 */

ReactDOM.render(  
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
