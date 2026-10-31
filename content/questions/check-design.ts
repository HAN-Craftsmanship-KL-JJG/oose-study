import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "check-design-21a",
    topic: "check-design",
    source: "Online quiz 21a",
    kind: "judge",
    title: "Lend a book: real problems?",
    labels: ["Real problem", "Not a problem"],
    prompt: `Look at the use case text, the sequence diagram and the DCD of "Lend a book" above.
Mark each point: is it a real problem in this design, or not?`,
    statements: [
      {
        text: "The UI (`LoanScreen`) coordinates the system operation and creates the `Loan` itself. There is no controller in the domain layer.",
        correct: true,
      },
      { text: "The check on the maximum of five borrowed books is missing.", correct: true },
      {
        text: "The fine check is given to `Book`, but `Borrower` knows its own loans.",
        correct: true,
      },
      { text: "The return date (`dueDate`) is not set or stored anywhere.", correct: true },
      {
        text: "The SD calls `l.add(u)`, but the DCD has no association from `Borrower` to `Loan`.",
        correct: true,
      },
      {
        text: "The SD has no return arrows, for example for `l = findBorrower(cardNumber)`.",
        correct: false,
      },
      {
        text: "`Library` gets methods in the design, but it has no attributes in the domain model.",
        correct: false,
      },
    ],
    explain: `The first five are real problems.

Return arrows are optional when the assignment (\`l = findBorrower(...)\`) already shows what comes back.
A class without attributes in the domain model may get operations in the design. The domain model never has methods.`,
  },
  {
    id: "check-design-21b",
    topic: "check-design",
    source: "Online quiz 21b",
    kind: "choice",
    title: "The best place for the fine check",
    prompt:
      "The system must check that the borrower has no open fine. Which solution fits GRASP best?",
    options: [
      "Keep `Book.hasFine(l)`: the book knows its fine per day.",
      "`Borrower.hasOpenFine()` asks each of its own `Loan` objects for its fine.",
      "`LoanScreen` loops over all loans and adds up the fines.",
      "A static helper class `FineHelper` calculates the fines for all borrowers.",
    ],
    answer: 1,
    explain: `Borrower knows its loans, and each Loan knows its dates and its book with \`finePerDay\`.
So each class gets the task it has the information for: Information Expert.
That gives high cohesion and low coupling.

Logic in the UI or in a static helper class takes the task away from the domain.
Book cannot know whether a borrower has a fine somewhere else.`,
  },
  {
    id: "check-design-21c",
    topic: "check-design",
    source: "Online quiz 21c",
    kind: "text",
    title: "The missing attribute",
    prompt: `The requirement says: the due date is three weeks after today.
Which attribute must you add to \`Loan\` in the DCD? Type only the name.`,
    accept: ["dueDate", "due date", "returnDate", "return date"],
    explain: `The domain model has the attribute \`dueDate\`, but the DCD does not.
So the DCD is also not consistent with the domain model.
Fix: add \`-dueDate: LocalDate\` to Loan and set it in the constructor to \`loanDate.plusWeeks(3)\`.`,
  },
  {
    id: "check-design-wordgame",
    topic: "check-design",
    source: "Practice exam 2",
    kind: "judge",
    title: "WordGame: real problems?",
    labels: ["Real problem", "Not a problem"],
    prompt: `Look at the WordGame requirements and the reconstructed design above.
Mark each point: is it a real problem, or not?`,
    statements: [
      {
        text: "The player can choose to search an opponent by name or by equal strength, but the design has only `startGame(name, opponentName)`.",
        correct: true,
      },
      {
        text: "The DCD has two associations between `WordGame` and `Player`, and one is navigable from Player to WordGame for no reason.",
        correct: true,
      },
      {
        text: "In play word, `remove()` and `add()` hang on the wrong activation bar. They belong inside `updateStock()`.",
        correct: true,
      },
      { text: "`playWord` gets an array of letters, but a word is a `String`.", correct: true },
      {
        text: "`getPoints()` and `increaseProfileStrength()` are sent to the actor instead of to a Player object.",
        correct: true,
      },
      { text: "`WordGame` is both the controller and one concrete game.", correct: true },
      {
        text: "The sequence diagrams do not show that both players must be logged in.",
        correct: false,
      },
      { text: "The SD has no return arrow for `correct = isWordCorrect(word)`.", correct: false },
    ],
    explain: `The first six are real problems; the sixth is the split of WordGame into WordGameManager and WordGame.

The case says that it left out the login on purpose, so that is not a mistake.
The assignment \`correct = ...\` already shows the return value, so no return arrow is needed.`,
  },
  {
    id: "check-design-webshop",
    topic: "check-design",
    source: "Extra",
    kind: "judge",
    title: "Zoo tickets: real problems?",
    labels: ["Real problem", "Not a problem"],
    prompt: "Look at practice case A, Buy tickets, above. Mark each point.",
    statements: [
      {
        text: "`TicketScreen` creates the `TicketLine` objects itself. TicketOrder should create them (Creator), through a controller.",
        correct: true,
      },
      {
        text: "The rule of at most 10 lines per ticket order has no place in the design.",
        correct: true,
      },
      {
        text: "`TicketType.calculateTotal(ticketOrder)` is at the wrong class. TicketOrder knows its lines (Information Expert).",
        correct: true,
      },
      { text: "The message `pay(total)` goes to the actor Visitor.", correct: true },
      { text: "The DCD has no association from `TicketOrder` to `TicketLine`.", correct: true },
      { text: "The SD has no return arrow for `p = findTicketType(code)`.", correct: false },
      {
        text: "`Zoo` has no attributes in the domain model, but gets methods in the DCD.",
        correct: false,
      },
    ],
    explain: `Five real problems.
Fixes: the UI only calls \`zoo.placeTicketOrder(...)\` and \`add(code, quantity)\`; TicketOrder creates its lines and checks \`lines.size() < 10\`; TicketOrder calculates its total; the iDEAL payment goes to a \`PaymentProvider\` object, not to the actor; add \`TicketOrder "1" --> "1..10" TicketLine\`.

Return arrows are optional when an assignment shows the result. A class without attributes may still get methods.`,
  },
  {
    id: "check-design-trapnu",
    topic: "check-design",
    source: "Extra",
    kind: "judge",
    title: "TrapNu: real problems?",
    labels: ["Real problem", "Not a problem"],
    prompt: "Look at practice case B, End ride, above. Mark each point.",
    statements: [
      {
        text: "`Ride` has no attribute `endTime`, but the system must store the end time.",
        correct: true,
      },
      {
        text: "`Bike.calculatePrice(ride)` is at the wrong class. Ride knows its times and its tariff.",
        correct: true,
      },
      {
        text: "The SD calls `g.deduct(price)`, but `User` has no method `deduct` in the DCD.",
        correct: true,
      },
      {
        text: "`Ride` calls a method on `User`, but the DCD has no association from Ride to User, and the User is no parameter.",
        correct: true,
      },
      {
        text: "`Ride` uses an interface `RateStrategy` instead of a concrete tariff class.",
        correct: false,
      },
      { text: "The DCD does not show getters and setters for every attribute.", correct: false },
    ],
    explain: `Four real problems.
Fixes: add \`-endTime: LocalDateTime\` to Ride; move the price calculation to \`Ride.calculatePrice()\`, which delegates to its RateStrategy; add \`+deduct(amount: double)\` to User; add the association \`Ride "*" --> "1" User\`.

An interface for the tariff is good design (Strategy). A DCD does not need to show every getter and setter.`,
  },
  {
    id: "check-design-message-needs",
    topic: "check-design",
    source: "Extra",
    kind: "choice",
    title: "What a message needs",
    prompt:
      "In a sequence diagram, `b : Library` sends `add(u)` to `l : Borrower`. What must the DCD contain?",
    options: [
      "Only a method `add` in Library.",
      "A method `add(u: Loan)` in Borrower, and a way for Library to reach Borrower: an association or a parameter.",
      "A class Loan with an attribute `add`.",
      "Nothing: a sequence diagram and a DCD do not have to match.",
    ],
    answer: 1,
    explain: `The receiver of a message must have that method.
The sender must be able to reach the receiver: through an association, a parameter, a local variable or a return value.
The SD and the DCD must always match.`,
  },
  {
    id: "check-design-return-arrow",
    topic: "check-design",
    source: "Extra",
    kind: "choice",
    title: "Missing return arrows",
    prompt:
      "A sequence diagram shows `l = findBorrower(cardNumber)` but no dashed return arrow. Is that a mistake?",
    options: [
      "Yes, every call needs a return arrow.",
      "No, the assignment already shows what comes back, so the return arrow is optional.",
      "Yes, because the method must then return void.",
      "No, return values are never shown in a sequence diagram.",
    ],
    answer: 1,
    explain:
      "Return arrows are optional when an assignment such as `l = findBorrower(...)` shows the result. So a missing return arrow is not a mistake.",
  },
  {
    id: "check-design-actor",
    topic: "check-design",
    source: "Practice exam 2",
    kind: "choice",
    title: "A message to the actor",
    prompt:
      "In a design sequence diagram, `:WordGame` sends `getPoints()` to the actor Player. What is wrong?",
    options: [
      "Nothing; the actor knows its points.",
      "An actor is a person outside the system. A design message must go to an object, here `player : Player`.",
      "The message needs a return arrow.",
      "`getPoints` must be static.",
    ],
    answer: 1,
    explain:
      "Software cannot call a method on a person. In a design SD, messages go to objects inside the system. Send `getPoints()` to the object `player : Player`.",
  },
  {
    id: "check-design-activation",
    topic: "check-design",
    source: "Extra",
    kind: "choice",
    title: "Activation bars",
    prompt: "What does a call that starts on the activation bar of `updateStock()` mean?",
    options: [
      "The call happens after `updateStock()` is finished.",
      "The call is part of `updateStock()`: that method makes the call.",
      "The call is made by the actor.",
      "Activation bars have no meaning; they are only decoration.",
    ],
    answer: 1,
    explain:
      "An activation bar shows that a method is running. A call that starts on that bar is made inside that method. A call on the wrong bar means the wrong method makes the call.",
  },
  {
    id: "check-design-notation",
    topic: "check-design",
    source: "Extra",
    kind: "match",
    title: "Read the DCD notation",
    prompt: "Match each piece of DCD notation to its meaning.",
    choices: [
      "private",
      "public",
      "protected",
      "package-private",
      "A knows B (navigability)",
      "one or more",
      "zero or one",
    ],
    pairs: [
      { item: "`-`", answer: "private" },
      { item: "`+`", answer: "public" },
      { item: "`#`", answer: "protected" },
      { item: "`~`", answer: "package-private" },
      { item: "`A --> B`", answer: "A knows B (navigability)" },
      { item: "`1..*`", answer: "one or more" },
      { item: "`0..1`", answer: "zero or one" },
    ],
    explain: "These symbols appear in every DCD. Learn them by heart.",
  },
  {
    id: "check-design-domain-vs-dcd",
    topic: "check-design",
    source: "Extra",
    kind: "judge",
    title: "Domain model or DCD?",
    labels: ["True", "False"],
    prompt: "Mark each statement as true or false.",
    statements: [
      { text: "A domain model has no methods.", correct: true },
      { text: "A DCD shows data types, parameters and return types.", correct: true },
      { text: "Navigability arrows belong in the domain model.", correct: false },
      {
        text: "An attribute that is in the domain model and needed for a requirement must also be in the DCD.",
        correct: true,
      },
      {
        text: "The UI class should hold the business rules, so the domain stays simple.",
        correct: false,
      },
    ],
    explain: `A domain model shows concepts of the real world: classes, attributes and associations, no methods or types.
A DCD shows the software: methods, types and navigability.
Business rules belong in the domain layer, not in the UI.`,
  },
];
