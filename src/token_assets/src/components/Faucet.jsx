import React, { useState } from "react";
import { AuthClient } from '@dfinity/auth-client';
import { token, canisterId, createActor  } from "../../../declarations/token";

function Faucet() {
  const [isDisabled, setDisable] = useState(false);
  const [buttonText, setText] = useState("Gimme gimme")
  async function handleClick(event) {
    setDisable(true);
    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    
    // if it is deployed on ICP blockchain we can get an actual authenticated canister
    // method to deploy the project on ICP can be found in Read.me
    // authencticatedCanister.payOut() with send the principal to payOut method of token actor
    // msg.caller with then have the principal of the logged in user and hence tokens can be given on that basis
    // uncomment the code below once deployed on ICP
    // let result = await authenticatedCanister.payOut();

    let result = await token.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DAngela tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
