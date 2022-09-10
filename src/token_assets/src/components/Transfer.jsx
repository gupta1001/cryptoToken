import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";
import { AuthClient } from '@dfinity/auth-client';
import { token, canisterId, createActor  } from "../../../declarations/token";

function Transfer() {
  const [feeback, setFeedback] = useState();
  const [isHidden, setHidden] = useState(true);
  const [recipientId, setId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);

  // const [transferInfo, setTransferInfo] = useState({
  //   account : "",
  //   amount : ""
  // })
  
  // function handleChange(event){
  //   let {name, value} = event.target;
  //   setTransferInfo((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value
  //     }
  //   });
  // }

  async function handleClick() {
    setDisabled(true);
    setHidden(true);
    let amountToTransfer = Number(amount);
    let principal = Principal.fromText(recipientId);

    const authClient = AuthClient.create();
    const identity = authClient.getIdentity();
    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })
    // if it is deployed on ICP blockchain we can get an actual authenticated canister
    // method to deploy the project on ICP can be found in Read.me
    // authencticatedCanister.payOut() with send the principal to payOut method of token actor
    // msg.caller with then have the principal of the logged in user and hence tokens can be given on that basis
    // uncomment the code below once deployed on ICP
    // let result = await authenticatedCanister.transfer(principal, amountToTransfer);

    const result = await token.transfer(principal, amountToTransfer);
    setFeedback(result);
    setHidden(false);
    setDisabled(false); 
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e) => setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick}
          disabled={isDisabled} >
            Transfer
          </button>
        </p>
        <p hidden={isHidden}>{feeback}</p>
      </div>
    </div>
  );
}

export default Transfer;
