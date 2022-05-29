import logo from "./logo.svg";
import "./App.css";
import "core-js/actual";
import { listen } from "@ledgerhq/logs";
import AppBtc from "@ledgerhq/hw-app-btc";
import { useState } from "react";

import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import TransportWebHID from "@ledgerhq/hw-transport-webhid";

function App() {
  const [btcAddress, setBtcAddress] = useState(null);

  async function handleButton1() {
    // handler for click event on button1
    console.log("button1 clicked");
    try {
      // connect to ledger with USB protocol
      const transport = await TransportWebUSB.create();

      // listen to events send by the ledger packages
      listen(log => console.log("log: " + JSON.stringify(log)));

      // when the device is trying to display bitcoin address
      const appBtc = new AppBtc(transport);
      const { bitcoinAddress } = await appBtc.getWalletPublicKey(
        "44'/0'/0'/0/0",
        { verify: false, format: "legacy" }
      );

      setBtcAddress(bitcoinAddress);
    } catch (err) {
      console.log("error:");
      console.error(err);
    }
  }

  async function handleButton2() {
    // handler for click event on button2
    console.log("button2 clicked");
    // handler for click event on button1
    console.log("button1 clicked");
    try {
      // connect to ledger with USB protocol
      const transport = await TransportWebHID.create();

      // listen to events send by the ledger packages
      listen(log => console.log("log: " + JSON.stringify(log)));

      // when the device is trying to display bitcoin address
      const appBtc = new AppBtc(transport);
      const { bitcoinAddress } = await appBtc.getWalletPublicKey(
        "44'/0'/0'/0/0",
        { verify: false, format: "legacy" }
      );

      setBtcAddress(bitcoinAddress);
    } catch (err) {
      console.log("error:");
      console.error(err);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>Ledger test</h2>
        <p>
          Connect your Nano and open the bitcoin App. Click the buttons to test
        </p>
        <button className="App-button" onClick={handleButton1}>
          Connect 1
        </button>
        <button className="App-button" onClick={handleButton2}>
          Connect 2
        </button>
        <p>your btc address is: {btcAddress == null ? "" : btcAddress}</p>
      </header>
    </div>
  );
}

export default App;
