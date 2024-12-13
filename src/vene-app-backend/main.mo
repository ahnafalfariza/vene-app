import Time "mo:base/Time";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Int "mo:base/Int";

actor EventManagement {
  type Event = {
    id : Text;
    creator : Principal;
    title : Text;
    description : Text;
    venue : Text;
    eventDate : Time.Time;
    maxParticipants : Nat;
    registrationDeadline : Time.Time;
    status : EventStatus;
    createdAt : Time.Time;
  };

  type Registration = {
    userId : Principal;
    eventId : Text;
    status : RegistrationStatus;
    registrationDate : Time.Time;
  };

  type EventStatus = {
    #upcoming;
    #ongoing;
    #completed;
    #cancelled;
  };

  type RegistrationStatus = {
    #pending;
    #confirmed;
    #cancelled;
    #attended;
  };

  // private let userProfileCanister : actor {
  //   userExists : (Principal) -> async Bool;
  // } = actor ("bw4dl-smaaa-aaaaa-qaacq-cai");

  private stable var eventIdCounter : Nat = 0;
  private let events = HashMap.HashMap<Text, Event>(0, Text.equal, Text.hash);
  private let registrations = HashMap.HashMap<Text, [Registration]>(0, Text.equal, Text.hash);

  public shared (msg) func createEvent(
    title : Text,
    description : Text,
    venue : Text,
    eventDate : Time.Time,
    maxParticipants : Nat,
    registrationDeadline : Time.Time,
  ) : async Result.Result<Text, Text> {
    try {
      // let userExists = await userProfileCanister.userExists(msg.caller);
      // if (not userExists) {
      //   return #err("User profile not found");
      // };

      eventIdCounter += 1;
      let eventId = Int.toText(eventIdCounter);

      let newEvent : Event = {
        id = eventId;
        creator = msg.caller;
        title = title;
        description = description;
        venue = venue;
        eventDate = eventDate;
        maxParticipants = maxParticipants;
        registrationDeadline = registrationDeadline;
        status = #upcoming;
        createdAt = Time.now();
      };

      events.put(eventId, newEvent);
      #ok(eventId);
    } catch (e) {
      #err("Failed to create event: " # Error.message(e));
    };
  };

  // Register for event
  public shared (msg) func registerForEvent(eventId : Text) : async Result.Result<Bool, Text> {
    try {
      // let userExists = await userProfileCanister.userExists(msg.caller);
      // if (not userExists) {
      //   return #err("User profile not found");
      // };

      switch (events.get(eventId)) {
        case (null) { #err("Event not found") };
        case (?event) {
          if (Time.now() > event.registrationDeadline) {
            return #err("Registration deadline passed");
          };

          let newRegistration : Registration = {
            userId = msg.caller;
            eventId = eventId;
            status = #pending;
            registrationDate = Time.now();
          };

          switch (registrations.get(eventId)) {
            case (null) {
              registrations.put(eventId, [newRegistration]);
            };
            case (?existingRegs) {
              let newRegs = Array.append(existingRegs, [newRegistration]);
              registrations.put(eventId, newRegs);
            };
          };
          #ok(true);
        };
      };
    } catch (e) {
      #err("Failed to register: " # Error.message(e));
    };
  };

  // View event
  public query func getEvent(eventId : Text) : async ?Event {
    events.get(eventId);
  };

  // Get all events
  public query func getAllEvents(offset : Nat, limit : Nat) : async {
    events : [Event];
    total : Nat;
  } {
    let allEvents = Iter.toArray(events.vals());
    let total = allEvents.size();

    let start = if (offset >= total) { total } else { offset };
    let end = if (start + limit > total) { total } else { start + limit };

    let paginatedEvents = Array.tabulate<Event>(
      end - start,
      func(i) { allEvents[start + i] },
    );

    {
      events = paginatedEvents;
      total = total;
    };
  };

  public query func getEventParticipants(eventId : Text) : async Result.Result<[Registration], Text> {
    switch (events.get(eventId)) {
      case (null) { #err("Event not found") };
      case (?_event) {
        switch (registrations.get(eventId)) {
          case (null) { #ok([]) };
          case (?regs) { #ok(regs) };
        };
      };
    };
  };

  public shared (msg) func approveRegistration(eventId : Text, userId : Principal) : async Result.Result<Bool, Text> {
    switch (events.get(eventId)) {
      case (null) { #err("Event not found") };
      case (?event) {
        if (event.creator != msg.caller) {
          return #err("Not authorized");
        };

        switch (registrations.get(eventId)) {
          case (null) { #err("No registrations found") };
          case (?regs) {
            let updatedRegs = Array.map<Registration, Registration>(
              regs,
              func(reg) {
                if (reg.userId == userId) {
                  return {
                    userId = reg.userId;
                    eventId = reg.eventId;
                    status = #confirmed;
                    registrationDate = reg.registrationDate;
                  };
                };
                reg;
              },
            );
            registrations.put(eventId, updatedRegs);
            #ok(true);
          };
        };
      };
    };
  };
};
