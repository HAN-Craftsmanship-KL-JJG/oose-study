import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "diagrams-1k-samenwerking",
    topic: "diagrams",
    source: "Practice exam 1k",
    kind: "choice",
    title: "Collaboration between classes",
    prompt:
      "You want to illustrate a design in which it is essential how classes and objects work together. Which diagram fits best?",
    options: [
      "Component diagram",
      "Design class diagram",
      "Sequence diagram",
      "System sequence diagram",
    ],
    answer: 2,
    explain: `A sequence diagram shows the messages between objects in time order. That is the collaboration.

A design class diagram shows the structure, not the order of calls. A system sequence diagram treats the system as one black box, so you see no objects inside. A component diagram shows large parts, not objects.`,
  },
  {
    id: "diagrams-q18-ssd",
    topic: "diagrams",
    source: "Online quiz 18",
    kind: "choice",
    title: "The system as a black box",
    prompt:
      "For one use case, you want to show which system operations an actor calls on the system as a whole, without the classes inside. Which diagram fits best?",
    options: [
      "Sequence diagram",
      "System sequence diagram",
      "Design class diagram",
      "Domain model",
    ],
    answer: 1,
    explain: `A system sequence diagram (SSD) shows the actor and the system as one black box, with the system operations of one scenario.

A sequence diagram shows the objects inside the system. A design class diagram and a domain model show structure, not messages.`,
  },
  {
    id: "diagrams-real-world",
    topic: "diagrams",
    source: "Extra",
    kind: "choice",
    title: "Concepts of the real world",
    prompt:
      "You want to show the concepts of a zoo and how they relate, before you think about software. Which diagram fits best?",
    options: ["Design class diagram", "Domain model", "Sequence diagram", "Component diagram"],
    answer: 1,
    explain: `A domain model shows concepts of the real world with attributes and associations, without methods or types.

A design class diagram is about the software. A sequence diagram shows messages in time. A component diagram shows parts of the software.`,
  },
  {
    id: "diagrams-which-dcd",
    topic: "diagrams",
    source: "Extra",
    kind: "choice",
    title: "Types and navigability",
    prompt:
      "Your diagram must show attributes with data types, methods with parameters, visibility and navigability arrows. Which diagram is it?",
    options: [
      "Domain model",
      "System sequence diagram",
      "Design class diagram",
      "Activity diagram",
    ],
    answer: 2,
    explain: `Only the design class diagram has types, methods, visibility and navigability. It is close to the code.

A domain model has none of these. An SSD and an activity diagram do not show classes.`,
  },
  {
    id: "diagrams-analysis-multi",
    topic: "diagrams",
    source: "Extra",
    kind: "choice",
    title: "Analysis diagrams",
    prompt:
      "Which diagrams belong to analysis: they describe the problem, not the software solution?",
    options: [
      "Domain model",
      "Design class diagram",
      "System sequence diagram",
      "Sequence diagram",
    ],
    answer: [0, 2],
    explain: `The domain model and the SSD describe the problem: the real world and what the actor asks the system.

The design class diagram and the sequence diagram describe the software solution: classes and objects inside the system.`,
  },
  {
    id: "diagrams-match-purpose",
    topic: "diagrams",
    source: "Extra",
    kind: "match",
    title: "Which diagram answers this?",
    prompt: "Match each question to the diagram that answers it.",
    choices: [
      "Domain model",
      "System sequence diagram",
      "Sequence diagram",
      "Design class diagram",
      "Component diagram",
    ],
    pairs: [
      { item: "Which concepts exist in the business?", answer: "Domain model" },
      {
        item: "Which system operations does the actor call in one use case?",
        answer: "System sequence diagram",
      },
      { item: "In which order do the objects call each other?", answer: "Sequence diagram" },
      {
        item: "Which attributes, methods and types does each class have?",
        answer: "Design class diagram",
      },
      {
        item: "Which large parts does the system have, and which interfaces connect them?",
        answer: "Component diagram",
      },
    ],
    explain: `Real world: domain model. Black box with system operations: SSD. Objects in time: sequence diagram. Classes for the code: design class diagram. Large parts with interfaces: component diagram.`,
  },
  {
    id: "diagrams-domain-errors",
    topic: "diagrams",
    source: "Extra",
    kind: "judge",
    title: "Spot the notation error: domain model",
    prompt: "A student drew a domain model. Is each element allowed in a domain model?",
    labels: ["Allowed", "Error"],
    statements: [
      { text: "An attribute `name` without a type.", correct: true },
      { text: "An attribute `- chipNumber : int`.", correct: false },
      { text: "A method `feed(food)` in Animal.", correct: false },
      { text: "The association name `lives in ▶` with a reading direction.", correct: true },
      { text: "The multiplicities `1` and `*` at the ends of a line.", correct: true },
      { text: "A class `Database`.", correct: false },
      { text: "A navigability arrow from Keeper to Animal.", correct: false },
      { text: "A generalization: Penguin is a kind of Animal.", correct: true },
    ],
    explain: `A domain model shows the real world. It has concepts, attributes without types, named associations, multiplicities and generalization.

Types, visibility, methods, navigability arrows and software classes such as Database belong in the design class diagram, not in the domain model.`,
  },
  {
    id: "diagrams-multiplicity",
    topic: "diagrams",
    source: "Extra",
    kind: "match",
    title: "Multiplicities",
    prompt: "Match each multiplicity to its meaning.",
    choices: ["Exactly one", "Zero or one", "Zero or more", "One or more"],
    pairs: [
      { item: "`1`", answer: "Exactly one" },
      { item: "`0..1`", answer: "Zero or one" },
      { item: "`*`", answer: "Zero or more" },
      { item: "`1..*`", answer: "One or more" },
    ],
    explain: `The number at the end of an association says how many objects at that end belong to one object at the other end. \`*\` is the same as \`0..*\`.`,
  },
  {
    id: "diagrams-sd-symbols",
    topic: "diagrams",
    source: "Extra",
    kind: "match",
    title: "Sequence diagram symbols",
    prompt: "Match each symbol in a sequence diagram to its meaning.",
    choices: [
      "An object a of class Animal",
      "The object is busy with a method",
      "A method call; the caller waits",
      "A return value",
      "Only one of the parts runs",
      "The part repeats",
      "The part runs only if the guard is true",
    ],
    pairs: [
      { item: "`a : Animal` at the top of a lifeline", answer: "An object a of class Animal" },
      {
        item: "{{activation}}",
        answer: "The object is busy with a method",
      },
      { item: "{{message}}", answer: "A method call; the caller waits" },
      { item: "{{return}}", answer: "A return value" },
      { item: "{{frame alt}}", answer: "Only one of the parts runs" },
      { item: "{{frame loop}}", answer: "The part repeats" },
      { item: "{{frame opt}}", answer: "The part runs only if the guard is true" },
    ],
    explain: `Lifelines are objects (name : Class). Activation bars show when an object is busy. Solid arrows are synchronous calls, dashed arrows are returns. Frames: alt chooses one part, opt is optional, loop repeats.`,
  },
  {
    id: "diagrams-sd-errors",
    topic: "diagrams",
    source: "Extra",
    kind: "judge",
    title: "Spot the error: sequence diagram",
    prompt:
      "A sequence diagram has these messages. The DCD has the classes Zoo, Animal and Feeding, with an association from Zoo to Animal only. Is each message correct?",
    labels: ["Correct", "Error"],
    statements: [
      {
        text: "`Zoo` sends `a = findAnimal(animalId)` to itself, and the DCD has `findAnimal` in Zoo.",
        correct: true,
      },
      {
        text: "`Zoo` sends `add(f)` to `a : Animal`, but the DCD has no method `add` in Animal.",
        correct: false,
      },
      {
        text: "`Animal` sends `create(...)` to a new `f : Feeding`, and stores it in its list, but the DCD has no association from Animal to Feeding.",
        correct: false,
      },
      { text: "The message `ok = isHungry()` has no dashed return arrow.", correct: true },
      {
        text: "The FeedingScreen sends a message to the actor Keeper to ask for the animal id.",
        correct: false,
      },
    ],
    explain: `Every message must be a method in the DCD on the receiver's class. To store the new Feeding, Animal needs an association to Feeding in the DCD.

A return arrow is optional when the assignment (\`ok = ...\`) already shows the return value. Objects inside the system do not send messages to an actor: the actor gives input to the UI.`,
  },
  {
    id: "diagrams-dcd-symbols",
    topic: "diagrams",
    source: "Extra",
    kind: "match",
    title: "Design class diagram symbols",
    prompt: "Match each symbol in a design class diagram to its meaning.",
    choices: [
      "public",
      "private",
      "protected",
      "package",
      "implements (realization)",
      "extends (generalization)",
      "dependency",
      "composition",
    ],
    pairs: [
      { item: "`+`", answer: "public" },
      { item: "`-`", answer: "private" },
      { item: "`#`", answer: "protected" },
      { item: "`~`", answer: "package" },
      { item: "{{realization}}", answer: "implements (realization)" },
      { item: "{{generalization}}", answer: "extends (generalization)" },
      { item: "{{dependency}}", answer: "dependency" },
      { item: "{{composition}}", answer: "composition" },
    ],
    explain: `Visibility: + public, - private, # protected, ~ package. A triangle means inheritance: dashed for an interface (implements), solid for a class (extends). A dashed open arrow is a short use (dependency). A filled diamond is composition: the whole owns its parts.`,
  },
  {
    id: "diagrams-dcd-errors",
    topic: "diagrams",
    source: "Extra",
    kind: "judge",
    title: "Spot the notation error: DCD",
    prompt: "Is each element written correctly in a design class diagram?",
    labels: ["Correct", "Error"],
    statements: [
      { text: "`- ticketsSold : int`", correct: true },
      { text: "`+ pay(amount : double) : boolean`", correct: true },
      {
        text: "`CardPayment` connected to the interface `PaymentMethod` with a solid line and an open triangle.",
        correct: false,
      },
      {
        text: "`TicketDesk --> PaymentMethod` with the role name `method` at the arrow end.",
        correct: true,
      },
      { text: "An attribute `ticketsSold` without a type.", correct: false },
      { text: "An abstract class shown with `«abstract»` above the name.", correct: true },
    ],
    explain: `A class that implements an interface gets a dashed line with an open triangle; a solid line is extends. In a DCD every attribute has a type; only a domain model leaves types out.`,
  },
  {
    id: "diagrams-ssd-text",
    topic: "diagrams",
    source: "Extra",
    kind: "text",
    title: "Short name",
    prompt:
      "Type the short name (abbreviation) of the diagram that shows the system as one black box.",
    accept: ["SSD", "system sequence diagram"],
    explain: `SSD: system sequence diagram. It shows the actor, the system as one box, and the system operations.`,
  },
  {
    id: "diagrams-component-lollipop",
    topic: "diagrams",
    source: "Extra",
    kind: "choice",
    title: "Lollipop and socket",
    prompt: "In a component diagram, what does a lollipop {{provided}} mean?",
    options: [
      "The component needs this interface from another component.",
      "The component offers (provides) this interface.",
      "The component is a database.",
      "The component is an actor.",
    ],
    answer: 1,
    explain: `A lollipop is a provided interface: the component offers it. A half circle (socket) is a required interface: the component needs it.`,
  },
];
