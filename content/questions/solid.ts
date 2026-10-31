import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "solid-1e-strategy",
    topic: "solid",
    source: "Practice exam 1e",
    kind: "choice",
    title: "Strategy and SOLID",
    prompt: "Which SOLID principle does the Strategy design pattern follow most?",
    options: [
      "Open Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Dependency Inversion Principle",
    ],
    answer: 0,
    explain: `With Strategy you add a new algorithm as a new class, and the context class does not change. That is "open for extension, closed for modification": OCP.

Strategy also uses LSP and DIP a little, because every strategy must behave like the interface and the context depends on that interface. But the main goal of Strategy is extending without changing. ISP is about small interfaces, which Strategy does not need.`,
  },
  {
    id: "solid-q15-kortingsregel",
    topic: "solid",
    source: "Online quiz 15",
    kind: "choice",
    title: "A new discount rule",
    prompt: `In a till system, a developer adds a new promotion ("3 for the price of 2").
They write a new class that implements the interface \`DiscountRule\`.
Nothing changes in \`CashRegister\` or in the existing discount rules.
Which SOLID principle does this follow most clearly?`,
    options: [
      "Single Responsibility Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle",
      "Open/Closed Principle",
    ],
    answer: 3,
    explain: `Open for extension (a new class) and closed for modification (existing code stays the same): OCP.

Liskov also plays a part, because every rule must behave as a \`DiscountRule\`. But the question describes extending without changing. SRP and ISP are not about adding new variants.`,
  },
  {
    id: "solid-q16-betaalprovider",
    topic: "solid",
    source: "Online quiz 16",
    kind: "choice",
    title: "Depending on an abstraction",
    prompt: `First \`CashRegister\` depended directly on \`MollieClient\`, a class from an external library.
After refactoring, both \`CashRegister\` and \`MolliePaymentProvider\` depend on the interface \`PaymentProvider\`, which is defined in the domain layer.
Which SOLID principle was mainly applied?`,
    options: [
      "Dependency Inversion Principle",
      "Open/Closed Principle",
      "Single Responsibility Principle",
      "Interface Segregation Principle",
    ],
    answer: 0,
    explain: `The high level (\`CashRegister\`) no longer depends on a detail (\`MollieClient\`). Both depend on an abstraction that belongs to the high level. That is DIP.

Open/Closed is a result: you can now add another provider. But the change itself, turning the dependency around, is DIP. SRP and ISP are not about the direction of a dependency.`,
  },
  {
    id: "solid-match-principles",
    topic: "solid",
    source: "Extra",
    kind: "match",
    title: "Match each principle to its description",
    prompt: "Choose the right principle for each description.",
    choices: ["SRP", "OCP", "LSP", "ISP", "DIP"],
    pairs: [
      { item: "A class has only one reason to change.", answer: "SRP" },
      {
        item: "You add new behaviour with a new class, without changing existing code.",
        answer: "OCP",
      },
      { item: "Code that uses a base class works with every subclass.", answer: "LSP" },
      { item: "No client depends on methods it does not use.", answer: "ISP" },
      { item: "High-level and low-level classes both depend on an abstraction.", answer: "DIP" },
    ],
    explain: `SRP: one reason to change. OCP: extend, do not modify. LSP: a subclass can always replace its base class. ISP: small interfaces. DIP: depend on an abstraction that belongs to the high level.`,
  },
  {
    id: "solid-code-srp",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Which principle does this code break?",
    prompt: "Look at the class `Keeper`.",
    code: `class Keeper {
    double hoursWorked() { ... }
    void saveInDatabase(Connection connection) { ... }
    String makeHtmlSchedule() { ... }
}`,
    options: ["SRP", "OCP", "LSP", "ISP"],
    answer: 0,
    explain: `The class has three reasons to change: the work-hour rules, the database and the HTML layout. That breaks SRP, and the cohesion is low.

There is no switch on types (OCP), no subclass (LSP) and no interface (ISP).`,
  },
  {
    id: "solid-code-ocp",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Which principle does this code break?",
    prompt: "Every month, the zoo gets a new kind of animal.",
    code: `class FeedingPlan {
    double foodKg(String species, double weight) {
        if (species.equals("LION")) return weight * 0.05;
        else if (species.equals("PENGUIN")) return 1.5;
        else if (species.equals("ELEPHANT")) return 70.0;
        return 0;
    }
}`,
    options: ["SRP", "OCP", "LSP", "DIP"],
    answer: 1,
    explain: `Every new kind of animal means a new \`else if\` in existing code. So the class is not closed for modification: it breaks OCP.

The fix is an interface \`Diet\` with one class per species (Strategy). Then a new kind is a new class.`,
  },
  {
    id: "solid-code-lsp",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Which principle does this code break?",
    prompt: "`Animal` has a method `walk`.",
    code: `class Animal {
    void walk() { position += 1; }
}

class Fish extends Animal {
    @Override
    void walk() {
        throw new UnsupportedOperationException("Fish cannot walk");
    }
}`,
    options: ["SRP", "OCP", "LSP", "ISP"],
    answer: 2,
    explain: `Code that works with an \`Animal\` breaks when it gets a \`Fish\`. The subclass cannot keep the promise of the base class. That breaks LSP.

Fix: do not make \`Fish\` a subclass of a class that promises \`walk\`.`,
  },
  {
    id: "solid-code-isp",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Which principle does this code break?",
    prompt: "A robot cleans the enclosures. It does not eat.",
    code: `interface ZooWorker {
    void work();
    void eat();
}

class CleaningRobot implements ZooWorker {
    public void work() { ... }
    public void eat() { /* does nothing */ }
}`,
    options: ["SRP", "OCP", "LSP", "ISP"],
    answer: 3,
    explain: `\`CleaningRobot\` must implement \`eat()\`, a method it does not use. The interface is too big. That breaks ISP.

Fix: split it into \`Worker\` with \`work()\` and \`Eater\` with \`eat()\`.`,
  },
  {
    id: "solid-code-dip",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Which principle does this code break?",
    prompt: "`TicketService` is a domain class.",
    code: `class TicketService {
    private final MySqlTicketRepository repository = new MySqlTicketRepository();

    void sell(Ticket ticket) {
        repository.insert(ticket);
    }
}`,
    options: ["SRP", "OCP", "LSP", "DIP"],
    answer: 3,
    explain: `A high-level domain class depends directly on a low-level detail: a MySQL class. That breaks DIP.

Fix: define an interface \`TicketRepository\` in the domain, let \`MySqlTicketRepository\` implement it, and pass it in through the constructor.`,
  },
  {
    id: "solid-dip-where-interface",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "Where does the interface go?",
    prompt:
      "You apply DIP between the domain class `CashRegister` and an external payment library. In which layer do you put the interface `PaymentProvider`?",
    options: [
      "In the domain layer, next to `CashRegister`",
      "In the external library",
      "In the user interface",
      "It does not matter where it goes",
    ],
    answer: 0,
    explain: `In DIP the abstraction belongs to the high level. So the interface is in the domain layer. The payment code then depends on the domain, and not the other way around.

The external library is not yours, so you cannot change it. The user interface has nothing to do with payments.`,
  },
  {
    id: "solid-judge-statements",
    topic: "solid",
    source: "Extra",
    kind: "judge",
    title: "True or false?",
    prompt: "Decide for each statement whether it is true or false.",
    statements: [
      { text: "A class with high cohesion usually follows SRP.", correct: true },
      { text: "OCP means that you may never change any code again.", correct: false },
      {
        text: "A subclass that throws an error for an inherited method breaks LSP.",
        correct: true,
      },
      { text: "ISP says that a class may implement only one interface.", correct: false },
      {
        text: "In DIP, the domain class depends on an interface that belongs to the domain.",
        correct: true,
      },
      { text: "Strategy is a good way to follow OCP.", correct: true },
    ],
    explain: `OCP is about not changing code when you add a new variant; you can still fix bugs. ISP says interfaces must be small; a class can implement many small interfaces. The other statements are true.`,
  },
  {
    id: "solid-ocp-fix",
    topic: "solid",
    source: "Extra",
    kind: "choice",
    title: "The best fix",
    prompt:
      "`Ride.calculatePrice()` has a `switch` on the kind of rate. New rates come every month. What is the best change?",
    options: [
      "Add a `case` for every new rate.",
      "Make an interface `RateStrategy` with one class per rate, and let `Ride` delegate to it.",
      "Make `calculatePrice()` static.",
      "Move the `switch` to a Singleton `RateManager`.",
    ],
    answer: 1,
    explain: `With Strategy, a new rate is a new class and \`Ride\` does not change (OCP). The cohesion of \`Ride\` also stays high.

Another \`case\`, a static method or a Singleton still means changing existing code for every new rate.`,
  },
];
