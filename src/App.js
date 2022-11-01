import React, { lazy, useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Loadable from "./utils/loadable";
import { Buffer } from "buffer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const Layout = Loadable(lazy(() => import("./layout")));
const Raffle = Loadable(lazy(() => import("./pages/raffle")));
const Callback = Loadable(lazy(() => import("./pages/callback")));

// eslint-disable-next-line no-undef
globalThis.Buffer = Buffer;

export default function App() {
  const [wallet, setWallet] = useState(undefined);

  useEffect(() => {
    console.log(wallet);
  },[wallet])

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route element={<Layout getWallet={setWallet} />}>
          <Route path="/auth/callback" element={<Callback />} />
          <Route path="/" element={<Raffle address={wallet} />} />
          <Route
            path="/raffles"
            element={<Raffle address={wallet}/>}
          />
          {/* <Route
            path="/coinflip"
            element={<CoinFlip walletFlag={walletFlag} />}
          /> */}
        </Route>
      </Routes>
    </Router>
  );
}
