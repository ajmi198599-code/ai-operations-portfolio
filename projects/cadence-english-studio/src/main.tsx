import React from "react";
import { createRoot } from "react-dom/client";
import Cadence from "./index";
const mount = document.getElementById("root");
if (!mount) throw new Error("Missing application root");
createRoot(mount).render(<React.StrictMode><Cadence /></React.StrictMode>);
