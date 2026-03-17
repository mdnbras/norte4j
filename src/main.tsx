import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAhF65THpBKzZoaaUxIAfT4Zwvtw4co_F8",
  authDomain: "norte4j.firebaseapp.com",
  projectId: "norte4j",
  storageBucket: "norte4j.firebasestorage.app",
  messagingSenderId: "483415335535",
  appId: "1:483415335535:web:7565088f793da36992e39a",
  measurementId: "G-NW28J6DWCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root")!).render(<App />);
