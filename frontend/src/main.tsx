import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrivyProvider } from "@privy-io/react-auth";
import "./index.css";
import App from "./App.tsx";
import { baseSepolia } from "viem/chains";

const APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={APP_ID}
      config={{
        // Display email and wallet as login methods
        loginMethods: ["wallet"],
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia],
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
