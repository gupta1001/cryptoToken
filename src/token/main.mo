import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token{
    Debug.print("Hello");
    let owner: Principal = Principal.fromText("7v3ey-czolv-aqbna-stnwc-z26d7-k5tmq-taevr-ax42y-vf42f-4pxdl-jae");
    let totalSuppy: Nat = 1000000000;
    let symbol: Text = "DANG";

    private stable var balanceEntries: [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

    // to assign the tokens to the owner of project
    // when the project is freshly downloady from the resource or deployed on ICP
    // in case you are running the project for the first time hence never ran it before  
    if (balances.size() < 1){
        balances.put(owner, totalSuppy);
    }

    public query func getSymbol(): async Text{
        return symbol;
    };

    public query func balanceOf(who: Principal) : async Nat{
        let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
        };
        return balance;
    };

    public shared(msg) func payOut(): async Text{
        // Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
            let amount = 10000;
            Debug.print(debug_show(amount));
            let result = await transfer(msg.caller, amount);
            return result;
        }
        else{
            return "Already Claimed"
        }
    };

    public shared(msg) func transfer(to: Principal, amount: Nat): async Text{
        let fromBalance = await  balanceOf(msg.caller);
        if (fromBalance > amount){
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);
            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            return "Success";
        }
        else{
            return "Insufficient funds";
        }
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        
        // this code will give the initial balance to the owner only in the case of upgrade
        // if this project is directly downloaded and run this will not work
        // as there is no upgrade
        // To handle this edge case we need to define this if case out the function as well
        if (balances.size() < 1){
            balances.put(owner, totalSuppy);
        }
    };
 }