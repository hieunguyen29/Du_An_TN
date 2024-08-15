import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import persistor, { store } from "./app/store";
import "./index.css";
import "./page.css"
import { ContextProvider } from "./context/ContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ContextProvider> {/* Bổ sung ContextProvider ở đây */}
          <App />
        </ContextProvider>
      </PersistGate>
    </Provider>
  );
