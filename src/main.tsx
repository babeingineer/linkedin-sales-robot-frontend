import axios from "axios";
import ScrollToTop from "./base-components/ScrollToTop";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import SpinnerProvider from "./providers/SpinnerProvider";
import AuthProvider from "./providers/AuthProvider";
import Router from "./router";
import { setAxiosUrl } from "./utils/axios";
import { SERVER_URL } from "./config";
import "./assets/css/app.css";

setAxiosUrl(SERVER_URL);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <AuthProvider>
        <SpinnerProvider>
          <Router />
        </SpinnerProvider>
      </AuthProvider>
    </Provider>
    <ScrollToTop />
  </BrowserRouter>
);
