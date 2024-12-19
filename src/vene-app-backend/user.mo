import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor UserProfile {
  type User = {
    email : Text;
    fullName : Text;
    avatar : Text;
    bio : Text;
    headline : Text;
    createdAt : Time.Time;
  };

  private let users = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

  public shared (msg) func updateProfile(
    email : Text,
    fullName : Text,
    avatar : Text,
    bio : Text,
    headline : Text,
  ) : async Bool {
    let caller = msg.caller;
    let updatedUser : User = {
      email = email;
      fullName = fullName;
      avatar = avatar;
      bio = bio;
      headline = headline;
      createdAt = Time.now();
    };

    users.put(caller, updatedUser);
    return true;
  };

  public query func getAllUsers() : async [(Principal, User)] {
    Iter.toArray(users.entries());
  };

  public query func getProfile(userId : Principal) : async ?User {
    users.get(userId);
  };

  // Verify if user exists (to be called by Event canister)
  public query func userExists(userId : Principal) : async Bool {
    Option.isSome(users.get(userId));
  };
};
