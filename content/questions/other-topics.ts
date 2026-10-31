import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "other-topics-actor",
    topic: "other-topics",
    source: "Extra",
    kind: "choice",
    title: "What is an actor?",
    prompt: 'Which of these is an actor in the use case "Buy a ticket" at the zoo?',
    options: ["`Ticket`", "The visitor", "`Zoo`, the controller class", "The database"],
    answer: 1,
    explain: `An actor is a person or another system outside the system that uses it. The visitor buys the ticket, so the visitor is the actor.

Ticket and Zoo are classes inside the system. The database is part of the system, not a user of it.`,
  },
  {
    id: "other-topics-furps",
    topic: "other-topics",
    source: "Extra",
    kind: "match",
    title: "FURPS+ categories",
    prompt: "Match each requirement to its FURPS+ category.",
    choices: [
      "Functionality",
      "Usability",
      "Reliability",
      "Performance",
      "Supportability",
      "+ (constraint)",
    ],
    pairs: [
      { item: "The system registers a ticket sale with the visit date.", answer: "Functionality" },
      { item: "A new keeper can register a feeding without training.", answer: "Usability" },
      { item: "The system is available 99.9% of the time.", answer: "Reliability" },
      { item: "A search for an animal gives a result within 1 second.", answer: "Performance" },
      {
        item: "A new payment provider can be added without changing the domain logic.",
        answer: "Supportability",
      },
      { item: "The system must be written in Java.", answer: "+ (constraint)" },
    ],
    explain: `F is what the system does. U is ease of use. R is how often it fails. P is speed and capacity. S is how easy it is to change, test and install. The + covers constraints such as the programming language.`,
  },
  {
    id: "other-topics-postconditions",
    topic: "other-topics",
    source: "Extra",
    kind: "judge",
    title: "Postconditions of adoptAnimal",
    prompt:
      "Which of these are correct postconditions in the operation contract of `adoptAnimal(memberNumber, animalId)`?",
    labels: ["Correct", "Wrong"],
    statements: [
      { text: "An Adoption `a` was created.", correct: true },
      { text: "`a` was associated with the Member and with the Animal.", correct: true },
      { text: "`a.endDate` became today plus one year.", correct: true },
      { text: "The Zoo calls `findMember` and then `findAnimal`.", correct: false },
      { text: "A Member with this memberNumber exists.", correct: false },
    ],
    explain: `Postconditions describe the state after the operation: objects created, associations formed or broken, and attributes changed.

The order of calls is not a postcondition; the sequence diagram shows that. "A Member with this memberNumber exists" is true before the operation, so it is a precondition.`,
  },
  {
    id: "other-topics-activity-or-state",
    topic: "other-topics",
    source: "Extra",
    kind: "choice",
    title: "Activity or state?",
    prompt:
      "You want to show that an Enclosure can be Open, Closed or in Maintenance, and which events change that. Which diagram fits best?",
    options: ["Activity diagram", "State machine diagram", "Sequence diagram", "Domain model"],
    answer: 1,
    explain: `A state machine diagram shows the states of one object and the events that move it from one state to another.

An activity diagram shows the steps of a process. A sequence diagram shows messages between objects. A domain model shows concepts.`,
  },
  {
    id: "other-topics-observer",
    topic: "other-topics",
    source: "Extra",
    kind: "choice",
    title: "Which pattern?",
    prompt:
      "A class `Animal` keeps a `List<FeedingObserver>`, has the methods `subscribe` and `unsubscribe`, and calls `animalFed(this)` on every item in the list when the animal is fed. Which pattern is this?",
    options: ["Strategy", "Observer", "Adapter", "Singleton"],
    answer: 1,
    explain: `A list of listeners behind an interface, methods to register and unregister, and a loop that tells all of them about a change: that is Observer.

Strategy holds one algorithm, not a list. Adapter translates an interface. Singleton makes sure there is only one object.`,
  },
  {
    id: "other-topics-state-vs-strategy",
    topic: "other-topics",
    source: "Extra",
    kind: "choice",
    title: "State or Strategy?",
    prompt: "State and Strategy have the same class diagram. What is the main difference?",
    options: [
      "State uses inheritance and Strategy uses composition.",
      "With State the object changes its own state when events happen; with Strategy the client chooses the algorithm.",
      "State can only have two states.",
      "Strategy needs a Singleton.",
    ],
    answer: 1,
    explain: `Both use composition and an interface. The difference is the intent: State models an object that moves between states by itself, and the states know which state comes next. With Strategy, someone outside chooses the algorithm, such as a RateStrategy per Ride.`,
  },
  {
    id: "other-topics-brief-use-case",
    topic: "other-topics",
    source: "Extra",
    kind: "choice",
    title: "Brief or fully dressed?",
    prompt:
      'A use case written as one short paragraph: "An employee scans the card of a borrower and the barcode of a book...". What kind of use case description is this?',
    options: ["Fully dressed", "Brief", "Operation contract", "System sequence diagram"],
    answer: 1,
    explain: `A brief use case is one short paragraph about the main success scenario.

A fully dressed use case has numbered steps, extensions, preconditions and more. An operation contract describes one system operation, and an SSD is a diagram.`,
  },
];
