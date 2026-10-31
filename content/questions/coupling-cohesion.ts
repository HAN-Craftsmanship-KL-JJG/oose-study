import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "coupling-cohesion-multiplier",
    topic: "coupling-cohesion",
    source: "Practice exam 1b",
    kind: "choice",
    title: "Multiplier",
    prompt:
      "Look at the class `Multiplier`. Which statement about coupling and cohesion is correct?",
    code: `class Multiplier {
    public int i;
    public int j;

    public Multiplier(int i, int j) {
        this.i = i;
        this.j = j;
    }

    public int calculate() {
        return new Calculator().mul(i, j);
    }
}

class Calculator {
    public int mul(int i, int j) {
        return i * j;
    }
}`,
    options: [
      "Coupling and cohesion are both low.",
      "Coupling and cohesion are both high.",
      "Coupling is low, cohesion is high.",
      "Coupling is high, cohesion is low.",
    ],
    answer: 1,
    explain: `Multiplier creates the concrete class Calculator itself and calls it. It cannot work with another calculator without a code change, so coupling is high.

Multiplier does one small thing with its own two numbers, so cohesion is high. Answer B.`,
  },
  {
    id: "coupling-cohesion-move-f",
    topic: "coupling-cohesion",
    source: "Practice exam 1c",
    kind: "choice",
    title: "Moving f() from A to B",
    prompt:
      "A developer moves the method `f()` from `A` to `B`. What happens to coupling and cohesion?",
    code: `class A {
    private int i;
    private B b;

    public A(B b) { this.b = b; }

    public void c() { f(); }

    public void f() {
        System.out.println(b.getJ());
    }
}

class B {
    private int j;

    public int getJ() { return j; }
}`,
    options: [
      "Coupling between A and B goes down, and cohesion of A and B goes down.",
      "Coupling goes up, and cohesion goes up.",
      "Coupling stays the same, and cohesion goes down.",
      "Coupling stays the same, and cohesion goes up.",
    ],
    answer: 3,
    explain: `After the move, A still has a field of type B and calls one method on it (\`b.f()\` instead of \`b.getJ()\`). So coupling stays the same.

\`f()\` only uses \`j\`, which is data of B. Now it sits next to that data, so cohesion goes up. Answer D.`,
  },
  {
    id: "coupling-cohesion-rapport",
    topic: "coupling-cohesion",
    source: "Online quiz 12",
    kind: "choice",
    title: "A class with three tasks",
    prompt: "Which statement about `Report` is most correct?",
    code: `class Report {
    double calculateAverage(List<Grade> grades) { ... }
    void sendByEmail(String address) { ... }
    void saveInDatabase(Connection connection) { ... }
}`,
    options: [
      "Cohesion is high, because all methods are about a report.",
      "Coupling goes down if you make the three methods static.",
      "Cohesion is low; splitting it into three classes raises the cohesion.",
      "Coupling is low, because Report has no attributes.",
    ],
    answer: 2,
    explain: `Calculating, sending email and saving are three reasons to change, so cohesion is low (and SRP is broken). Splitting into three classes gives each class one job.

"About a report" is only a topic word; it does not make the cohesion high. Static methods still call the email and database APIs, so coupling stays. Coupling also comes from parameters and calls, not only from attributes.`,
  },
  {
    id: "coupling-cohesion-extra-sources",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "judge",
    title: "Is this coupling?",
    prompt: "Does each line make `Keeper` coupled to `FoodStore`?",
    labels: ["Coupling", "No coupling"],
    statements: [
      { text: "`Keeper` has a field `private FoodStore store;`", correct: true },
      { text: "`Keeper` has a method `void feed(FoodStore s)`", correct: true },
      { text: "`Keeper` calls the static method `FoodStore.order(...)`", correct: true },
      { text: "`Keeper` creates `new FoodStore()` inside a method", correct: true },
      {
        text: "`FoodStore` has a field of type `Keeper`, and `Keeper` never mentions `FoodStore`",
        correct: false,
      },
    ],
    explain: `A field, a parameter, a static call and \`new\` all make Keeper depend on FoodStore. If FoodStore changes, Keeper may have to change.

In the last case, FoodStore depends on Keeper, not the other way round. Coupling has a direction.`,
  },
  {
    id: "coupling-cohesion-extra-lower-coupling",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "choice",
    title: "Lower the coupling",
    prompt:
      "`Keeper` does `new Lion().eat(kg)` in its method `feed`. Which change lowers the coupling most?",
    options: [
      "Make `eat` a static method of `Lion`.",
      "Give `Keeper` a field of the interface type `Animal`, set through the constructor.",
      "Move all code of `Lion` into `Keeper`.",
      "Make `Keeper` a subclass of `Lion`.",
    ],
    answer: 1,
    explain: `With an interface field set from outside, Keeper no longer knows any concrete class. You can pass a Lion, a Penguin or a test stub.

A static method still ties Keeper to Lion. Moving the code into Keeper lowers cohesion a lot. Inheritance makes the coupling even stronger.`,
  },
  {
    id: "coupling-cohesion-extra-cohesion-rank",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "choice",
    title: "Highest cohesion",
    prompt: "Which class has the highest cohesion?",
    options: [
      "`Visitor` with `getName()`, `setAddress()`, `printInvoice()` and `calculateTax()`",
      "`FeedingSchedule` with `addFeeding()`, `removeFeeding()` and `getFeedingsToday()`",
      "`Helper` with `formatDate()`, `sendSms()` and `readFile()`",
      "`ZooApp` with `start()`, `showMenu()`, `save()` and `countPenguins()`",
    ],
    answer: 1,
    explain: `All methods of FeedingSchedule work on the same data, its feedings, for one goal.

Visitor mixes visitor data with invoices and tax. Helper is a classic "bag of tricks" with three unrelated jobs. ZooApp does everything.`,
  },
  {
    id: "coupling-cohesion-extra-want",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "match",
    title: "What do you want?",
    prompt: "Choose the right word for each sentence.",
    choices: ["low", "high", "the same"],
    pairs: [
      { item: "In a good design, coupling is …", answer: "low" },
      { item: "In a good design, cohesion is …", answer: "high" },
      {
        item: "After you move a method to the class whose data it uses, cohesion is …",
        answer: "high",
      },
      { item: "After you only make the methods static, coupling is …", answer: "the same" },
    ],
    explain: `Aim for low coupling and high cohesion. Moving a method to its data raises cohesion. Making methods static does not remove any dependency, so coupling stays the same.`,
  },
  {
    id: "coupling-cohesion-extra-srp",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "choice",
    title: "Which principle?",
    prompt:
      "A class has low cohesion because it has three reasons to change. Which SOLID principle does it break?",
    options: [
      "Single Responsibility Principle",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Dependency Inversion Principle",
    ],
    answer: 0,
    explain: `SRP says a class has only one reason to change. Low cohesion and breaking SRP almost always go together.

OCP is about extending without changing code. LSP is about subclasses that can replace their superclass. DIP is about depending on abstractions.`,
  },
  {
    id: "coupling-cohesion-extra-statements",
    topic: "coupling-cohesion",
    source: "Extra",
    kind: "judge",
    title: "True or false?",
    prompt: "Decide for each statement whether it is true.",
    statements: [
      { text: "A class without attributes always has low coupling.", correct: false },
      {
        text: "Depending on an interface gives lower coupling than depending on a concrete class.",
        correct: true,
      },
      {
        text: "Cohesion is about one class; coupling is about the relation between classes.",
        correct: true,
      },
      {
        text: "Splitting a class with three jobs into three classes lowers cohesion.",
        correct: false,
      },
      { text: "Information Expert often raises cohesion.", correct: true },
    ],
    explain: `Coupling also comes from parameters, \`new\` and calls, so no attributes says little. An interface hides the concrete class. Cohesion is measured inside one class. Splitting a class with three jobs raises cohesion. Giving a task to the class that has the data (Information Expert) keeps data and behaviour together, so cohesion goes up.`,
  },
];
