import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "technical-design-e1-switch-alternative",
    topic: "technical-design",
    source: "Online quiz 20b",
    kind: "judge",
    title: "Judge an alternative for E1",
    prompt:
      "A colleague wants to solve E1 (tariffs that are easy to extend) with a `switch` on an attribute `rateType` in `Ride.calculatePrice()`. Which statements about this alternative are true?",
    statements: [
      {
        text: "For every new tariff, `Ride` must change. That breaks the Open/Closed Principle.",
        correct: true,
      },
      {
        text: "The cohesion of `Ride` drops, because `Ride` must know all tariff rules.",
        correct: true,
      },
      {
        text: "It works for the two tariffs of today, but it scales badly when more tariffs come.",
        correct: true,
      },
      {
        text: "The coupling goes down, because there are fewer classes and no interface.",
        correct: false,
      },
      {
        text: "One big method with all tariff rules is easier to unit-test than small separate strategies.",
        correct: false,
      },
    ],
    explain: `The switch works, but every new tariff changes existing, tested code. Ride must know all tariff rules, so its cohesion drops.

There is less abstraction, but the coupling does not go down: Ride now knows every tariff rule itself. Small strategy classes are easier to test one by one than one big method.

Comparing your design with an alternative like this is a strong part of a motivation.`,
  },
  {
    id: "technical-design-e2-pattern",
    topic: "technical-design",
    source: "Online quiz 20c",
    kind: "choice",
    title: "Pattern for E2",
    prompt:
      "E2: the bike locks come from two vendors, each with its own library: `LockItSdk` with `unlockBike(String id)` and `SmartLockApi` with `open(int nr, String token)`. A third vendor must be added later without changing the domain logic. Which pattern fits best?",
    options: [
      "Proxy: a class in front of each library with the same interface as that library",
      "Adapter: per vendor a class that translates the domain interface `BikeLock` to that library",
      "Strategy: `Bike` chooses an unlock algorithm per ride",
      "Facade: one class `LockFacade` with a method per vendor",
    ],
    answer: 1,
    explain: `The libraries have different interfaces, and you cannot change them. An Adapter translates the interface the domain expects (\`BikeLock\`) to each library.

A Proxy has the same interface as the real object; here the interfaces are different. A Facade with a method per vendor changes for every new vendor (breaks OCP).`,
  },
  {
    id: "technical-design-e2-who-knows-library",
    topic: "technical-design",
    source: "Online quiz 20d",
    kind: "choice",
    title: "Who knows the external library?",
    prompt: "In the design for E2, which class depends directly on `SmartLockApi`?",
    options: ["`Bike`", "`BikeLock`", "`LockFactory`", "`SmartLockBikeLock`"],
    answer: 3,
    explain: `Only the adapter \`SmartLockBikeLock\` calls \`SmartLockApi\`. If the vendor changes its API, only that one class changes.

\`Bike\` and \`BikeLock\` are in the domain and know no external library. \`LockFactory\` creates the adapter, but does not need to know the API of the library.`,
  },
  {
    id: "technical-design-strong-motivation",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Which motivation is strongest?",
    prompt: "You designed E1 with Strategy. Which motivation sentence is best?",
    options: [
      "I used the Strategy pattern, because it is a good and flexible pattern.",
      "My design follows all SOLID principles and uses many interfaces.",
      "`Ride` delegates the price to a `RateStrategy` (Strategy). This covers E1: a new tariff is a new class and `Ride` does not change (OCP). A `switch` in `Ride` is worse, because every new tariff changes `Ride`.",
      "Strategy is used by many companies, so it is a safe choice.",
    ],
    answer: 2,
    explain: `A good motivation has three things: relevant alternatives, parts of the design linked to the requirements, and principles applied.

Only option C does all three: it links \`RateStrategy\` to requirement E1, names OCP with a reason, and compares with an alternative. The other options only name things without a reason.`,
  },
  {
    id: "technical-design-rubric-13",
    topic: "technical-design",
    source: "Extra",
    kind: "judge",
    title: "What does the motivation need?",
    prompt: "Which of these are part of a good motivation?",
    labels: ["Needed", "Not needed"],
    statements: [
      { text: "At least 1 relevant alternative, and why your design is better", correct: true },
      { text: "Parts of the design linked to the requirements of the feature", correct: true },
      { text: "Principles and patterns applied, with a reason", correct: true },
      { text: "The full Java code of every class", correct: false },
      { text: "As many pattern names as possible, also ones you did not use", correct: false },
    ],
    explain: `A good motivation has three things: relevant alternatives, a link between design parts and requirements, and the application of principles.

You do not need to write code. Naming patterns you did not use does not help; each principle needs a reason.`,
  },
  {
    id: "technical-design-diagram-choice",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Which diagram is the main one?",
    prompt:
      "You design F1: more question types must be easy to add. Which diagram shows your design best?",
    options: [
      "A design class diagram with an abstract class `Question` and one subclass per type",
      "A domain model with the concepts Quiz and Question",
      "A system sequence diagram with the actor GameLeader",
      "A use case diagram with the use case Prepare Quiz",
    ],
    answer: 0,
    explain: `F1 is about structure: which classes exist and how they relate. A design class diagram shows classes, an abstract class, inheritance and methods.

A domain model has no methods or software classes. An SSD and a use case diagram are analysis diagrams; they do not show your design.`,
  },
  {
    id: "technical-design-when-sequence",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "When do you add a sequence diagram?",
    prompt: "When is it a good idea to add a sequence diagram to your class diagram?",
    options: [
      "Always: a design without a sequence diagram is incomplete",
      "When the feature is about how objects work together, in which order, such as finding the winner",
      "Only when the feature has a user interface",
      "Never: a design has only one diagram",
    ],
    answer: 1,
    explain: `A class diagram shows the structure. A sequence diagram shows the collaboration: who calls whom, in which order.

Add one when the order of the calls matters for the requirement, such as "the fastest right answer to the bonus question wins" in F3. Then write one sentence about why you chose both diagrams.`,
  },
  {
    id: "technical-design-pattern-encrypt",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Optional encryption",
    prompt:
      'Feature: "The answers must optionally be stored encrypted. This is set in a configuration file." Storage already works through the interface `QuestionStorage`. What fits best?',
    options: [
      "A Decorator that also implements `QuestionStorage`, encrypts and then calls the storage it wraps; a factory reads the configuration",
      "An `if (encrypt)` in every storage adapter",
      "A Singleton `Encryption` that every class calls",
      "A subclass of `QuestionManager` called `EncryptingQuestionManager`",
    ],
    answer: 0,
    explain: `Encryption is extra work around an existing object, with the same interface. That is a Decorator. It works with every storage (OCP), and \`QuestionManager\` does not change.

The factory is the one place that reads the configuration file. An \`if\` in every adapter repeats code. A Singleton hides the dependency and is hard to test.`,
  },
  {
    id: "technical-design-pattern-steps",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Same steps, different details",
    prompt:
      'Feature: "Every feeding round always does the same steps: prepare the food, give the food, write a log entry. Only how the food is given differs for a Lion and a Penguin." Which pattern fits best?',
    options: ["Adapter", "Template Method", "Facade", "Proxy"],
    answer: 1,
    explain: `A fixed order of steps, where only some steps differ per type, is Template Method. The superclass has the method with the fixed steps; each subclass fills in how the food is given.`,
  },
  {
    id: "technical-design-pattern-access",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Only for vets",
    prompt:
      'Feature: "Before the real `MedicalRecordService` of an animal runs, the system must check that the user is a vet. `MedicalRecordService` itself must not change." Which pattern fits best?',
    options: ["Strategy", "Factory Method", "Proxy", "Adapter"],
    answer: 2,
    explain: `A Proxy has the same interface as the real object and stands in front of it. It checks the access and then passes the call on.

An Adapter changes an interface; here the interface stays the same.`,
  },
  {
    id: "technical-design-requirement-to-pattern",
    topic: "technical-design",
    source: "Extra",
    kind: "match",
    title: "From requirement words to a solution",
    prompt: "Match each phrase from a feature text to the solution it points to.",
    choices: ["Strategy", "Adapter", "Factory", "Decorator", "Polymorphism with an abstract class"],
    pairs: [
      { item: '"The user can choose the scoring system per quiz."', answer: "Strategy" },
      {
        item: '"The vendor\'s library has its own method names, and we cannot change it."',
        answer: "Adapter",
      },
      { item: '"Which storage is used is set in a configuration file."', answer: "Factory" },
      {
        item: '"On top of the normal points, a question with an external source gives 3 extra points."',
        answer: "Decorator",
      },
      {
        item: '"In the future there will be more question types, each checked in its own way."',
        answer: "Polymorphism with an abstract class",
      },
    ],
    explain: `A choice of calculation is Strategy. A different external interface is Adapter. "Which class is created" is a Factory. Extra behaviour on top of any object is a Decorator. New kinds of a thing, each with its own behaviour, is polymorphism.`,
  },
  {
    id: "technical-design-f4-one-method",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Only one method may change",
    prompt:
      "F4: a new scoring system must be easy to add. Only one method of the existing code may change. You use Strategy with the interface `ScoringSystem`. Which method is the one that changes when you add a system?",
    options: [
      "`Quiz.calculateScore()`",
      "`ScoringSystem.calculate()`",
      "A factory method such as `ScoringSystemFactory.create(choice)` that creates the chosen strategy",
      "The constructor of every existing scoring class",
    ],
    answer: 2,
    explain: `With Strategy, \`Quiz\` and the existing strategies do not change. But some code must create the new strategy when the game leader chooses it. Put that in one factory method; that is the one method that changes.

This shows that you read the requirement exactly.`,
  },
  {
    id: "technical-design-f5-interface",
    topic: "technical-design",
    source: "Practice exam 3 (F5)",
    kind: "text",
    title: "The interface in the F5 design",
    prompt:
      "In the design for F5, `QuestionManager` does not know `FlatFileStore` or `RelDBStore`. What is the name of the interface it uses instead?",
    accept: ["QuestionStorage"],
    explain: `\`QuestionManager\` depends on the interface \`QuestionStorage\`. The adapters \`FlatFileQuestionStorage\` and \`SQLQuestionStorage\` implement it. That follows the Dependency Inversion Principle.`,
  },
  {
    id: "technical-design-composition-vs-inheritance",
    topic: "technical-design",
    source: "Extra",
    kind: "choice",
    title: "Why composition?",
    prompt:
      "Why is Strategy (composition) often a better choice than Template Method (inheritance) for E1?",
    options: [
      "Composition needs fewer classes",
      "With composition you can choose or swap the tariff per ride, also while the program runs; with inheritance the tariff is fixed to the type of the object",
      "Inheritance is not allowed in UML class diagrams",
      "Composition makes all methods static",
    ],
    answer: 1,
    explain: `With Strategy, \`Ride\` holds a \`RateStrategy\` object, and you can give it any tariff. With Template Method, the tariff is the subclass of \`Ride\`, so it is fixed when you create the object, and combinations need more subclasses.

"Composition is more flexible than inheritance" is a strong sentence for your motivation, if you add why.`,
  },
];
