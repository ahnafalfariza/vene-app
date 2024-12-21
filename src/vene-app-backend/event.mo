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
    eventName : Text;
    description : Text;
    location : Text;
    category : Text;
    coverPhoto : Text;
    eventDate : Time.Time;
    ticketType : TicketType;
    ticketPrice : ?Float;
    maxParticipants : Nat;
    registrationDeadline : Time.Time;
    status : EventStatus;
    createdAt : Time.Time;
  };

  type PaymentDetails = {
    amount : Float;
    tokenType : TokenType;
    transactionId : Text;
  };

  type TokenType = {
    #ICP;
    #ICRC1;
    // Add other token types as needed
  };

  type TicketType = {
    #free;
    #paid;
  };

  type Registration = {
    userId : Principal;
    eventId : Text;
    status : RegistrationStatus;
    registrationDate : Time.Time;
    payment : ?PaymentDetails;
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
    eventName : Text,
    description : Text,
    location : Text,
    category : Text,
    coverPhoto : Text,
    eventDate : Time.Time,
    ticketType : TicketType,
    ticketPrice : ?Float,
    maxParticipants : Nat,
    registrationDeadline : Time.Time,
  ) : async Result.Result<Text, Text> {
    try {
      // let userExists = await userProfileCanister.userExists(msg.caller);
      // if (not userExists) {
      //   return #err("User profile not found");
      // };

      switch (ticketType) {
        case (#paid) {
          switch (ticketPrice) {
            case (null) {
              return #err("Ticket price is required for paid events");
            };
            case (?price) {
              if (price < 0) {
                return #err("Ticket price must be non-negative");
              };
            };
          };
        };
        case (#free) {};
      };

      eventIdCounter += 1;
      let eventId = Int.toText(eventIdCounter);

      let newEvent : Event = {
        id = eventId;
        creator = msg.caller;
        eventName = eventName;
        description = description;
        location = location;
        category = category;
        coverPhoto = coverPhoto;
        eventDate = eventDate;
        ticketType = ticketType;
        ticketPrice = ticketPrice;
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
            payment = null;
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

  public query func getEventsByCategory(category : Text, offset : Nat, limit : Nat) : async {
    events : [Event];
    total : Nat;
  } {
    let filteredEvents = Iter.toArray(
      Iter.filter(
        events.vals(),
        func(event : Event) : Bool {
          event.category == category;
        },
      )
    );

    let total = filteredEvents.size();
    let start = if (offset >= total) { total } else { offset };
    let end = if (start + limit > total) { total } else { start + limit };

    let paginatedEvents = Array.tabulate<Event>(
      end - start,
      func(i) { filteredEvents[start + i] },
    );

    {
      events = paginatedEvents;
      total = total;
    };
  };

  public query (msg) func isRegisteredForEvent(eventId : Text) : async Result.Result<Bool, Text> {
    switch (events.get(eventId)) {
      case (null) { #err("Event not found") };
      case (?_event) {
        switch (registrations.get(eventId)) {
          case (null) { #ok(false) };
          case (?regs) {
            let reg = Array.find<Registration>(
              regs,
              func(reg) {
                reg.userId == msg.caller;
              },
            );
            switch (reg) {
              case (null) { #ok(false) };
              case (?_reg) { #ok(true) };
            };
          };
        };
      };
    };
  };

  public query func getUserRegisteredEvents(userId : Principal) : async Result.Result<[Event], Text> {
    var userEvents : [Event] = [];

    for ((eventId, regs) in registrations.entries()) {
      let userReg = Array.find<Registration>(
        regs,
        func(reg) { reg.userId == userId },
      );

      switch (userReg) {
        case (null) {};
        case (?reg) {
          switch (events.get(eventId)) {
            case (null) {};
            case (?event) {
              userEvents := Array.append(userEvents, [event]);
            };
          };
        };
      };
    };

    #ok(userEvents);
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
                    payment = null;
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
