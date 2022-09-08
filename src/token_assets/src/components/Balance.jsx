import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  
  const [inputValue, setInputValue] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [symbolResult, setSymbol] = useState("");
  const [isHidden, setHidden] = useState(true)

  async function handleClick() {
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    const symbol = await token.getSymbol();
    setBalance(balance.toLocaleString(balance));
    setSymbol(symbol);
    setHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balanceResult} {symbolResult}</p>
    </div>
  );
}

export default Balance;
