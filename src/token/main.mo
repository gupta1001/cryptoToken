import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";


actor Token{
    var owner: Principal = Principal.fromText("7v3ey-czolv-aqbna-stnwc-z26d7-k5tmq-taevr-ax42y-vf42f-4pxdl-jae");
    var totalSuppy: Nat = 1000000000;
    var symbol: Text = "DANG";

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    balances.put(owner, totalSuppy);

    public query func getSymbol(): async Text{
        return symbol;
    };

    public query func balanceOf(who: Principal) : async Nat{
        let balance : Nat = switch (balances.get(who)) {
        case null 0;
        case (?result) result;
        };
        Debug.print(debug_show(balance));
        return balance;
    };
 }