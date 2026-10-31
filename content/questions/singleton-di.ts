import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "singleton-di-1f-testability",
    topic: "singleton-di",
    source: "Practice exam 1f",
    kind: "choice",
    title: "The testability of a Singleton client",
    prompt:
      "A class `Client` depends on this Singleton. What is the effect on the unit testability of `Client`?",
    code: `class Singleton {
    private static Singleton instance;
    private Singleton() {}
    public Singleton getInstance() {
        if (instance == null)
            instance = new Singleton();
        return instance;
    }
    public void saySomething() {
        System.out.println("Something");
    }
}`,
    options: [
      "`Client` is as easy to unit-test as classes that do not depend on the Singleton.",
      "`Client` is easier to unit-test than classes that do not depend on the Singleton.",
      "`Client` is harder to unit-test than classes that do not depend on the Singleton.",
    ],
    answer: 2,
    explain: `The dependency on the Singleton is hidden and cannot be replaced by a stub. So a test of \`Client\` always uses the real Singleton, and its shared state.

A Singleton never makes testing easier. It is not "as easy" either, because a class without that dependency can be tested on its own.`,
  },
  {
    id: "singleton-di-q17-tariefbron",
    topic: "singleton-di",
    source: "Online quiz 17",
    kind: "choice",
    title: "Making PriceCalculator testable",
    prompt: "You want to unit-test `PriceCalculator` without a database. Which change helps most?",
    code: `class PriceCalculator {
    double price(Ride ride) {
        double rate = Database.getInstance().getRate(ride.getBikeType());
        return rate * ride.getMinutes();
    }
}`,
    options: [
      "Make the method `price` static.",
      "Pass a `RateSource` interface through the constructor.",
      "Make `PriceCalculator` a Singleton too.",
      "Put the database call in a try/catch.",
    ],
    answer: 1,
    explain: `With dependency injection of an interface, a test can pass a simple fake \`RateSource\` (a stub or mock).

A static method and another Singleton make replacing the dependency harder. A try/catch does not remove the dependency on the database.`,
  },
  {
    id: "singleton-di-parts",
    topic: "singleton-di",
    source: "Extra",
    kind: "judge",
    title: "The parts of a Singleton",
    prompt: "Which of these are parts of a correct Singleton in Java?",
    labels: ["Part of it", "Not part of it"],
    statements: [
      { text: "A private static field that holds the one object", correct: true },
      { text: "A private constructor", correct: true },
      { text: "A public static method `getInstance()`", correct: true },
      { text: "A public constructor", correct: false },
      { text: "An interface that the Singleton implements", correct: false },
    ],
    explain: `A Singleton needs a private static field, a private constructor and a public static \`getInstance()\`. A public constructor would let anyone make a second object. An interface is not part of the pattern.`,
  },
  {
    id: "singleton-di-exam-bug",
    topic: "singleton-di",
    source: "Extra",
    kind: "choice",
    title: "A broken Singleton",
    prompt: "What is wrong with this Singleton? The constructor is private.",
    code: `public Singleton getInstance() {
    if (instance == null)
        instance = new Singleton();
    return instance;
}`,
    options: [
      "The field `instance` must be public.",
      "`getInstance()` is not static, so you need an object to call it, but nobody outside can make one.",
      "The constructor must be public.",
      "Nothing is wrong.",
    ],
    answer: 1,
    explain: `Without \`static\` you can only call \`getInstance()\` on an existing object. The constructor is private, so code outside the class can never get the first object.

Making the field or constructor public would break the idea of a Singleton.`,
  },
  {
    id: "singleton-di-match-terms",
    topic: "singleton-di",
    source: "Extra",
    kind: "match",
    title: "Match the terms",
    prompt: "Choose the right term for each description.",
    choices: ["Singleton", "Dependency injection", "Stub", "Mock", "Unit test"],
    pairs: [
      {
        item: "A class that has only one object, reachable through a static method.",
        answer: "Singleton",
      },
      {
        item: "A class gets its dependencies from outside, for example through the constructor.",
        answer: "Dependency injection",
      },
      { item: "A fake object that only returns fixed values.", answer: "Stub" },
      { item: "A fake object that also checks how it was called.", answer: "Mock" },
      { item: "A test of one class on its own, fast and without a database.", answer: "Unit test" },
    ],
    explain: `A stub only gives answers; a mock also checks calls. Dependency injection makes it possible to pass a stub or mock in a unit test.`,
  },
  {
    id: "singleton-di-hidden",
    topic: "singleton-di",
    source: "Extra",
    kind: "choice",
    title: "Why is the dependency hidden?",
    prompt: "Why do we call a dependency on a Singleton a hidden dependency?",
    options: [
      "Because the Singleton class is private.",
      "Because you cannot see it in the constructor or the parameters; it is inside the method code.",
      "Because the Singleton is in another package.",
      "Because Java hides static fields.",
    ],
    answer: 1,
    explain: `The class calls \`Database.getInstance()\` inside a method. Someone who looks at the constructor does not see that the class needs a database. With dependency injection, the constructor shows every dependency.`,
  },
  {
    id: "singleton-di-which-test",
    topic: "singleton-di",
    source: "Extra",
    kind: "choice",
    title: "What does the test pass?",
    prompt:
      "`PriceCalculator` now gets a `RateSource` through its constructor. What does a unit test pass to the constructor?",
    options: [
      "`Database.getInstance()`",
      "A stub such as `new FixedRateSource(0.25)`",
      "`null`",
      "Nothing; the test calls a static method",
    ],
    answer: 1,
    explain: `The test passes a stub that returns a fixed rate. Then the result is known (for example 0.25 × 30 = 7.5) and no database is needed.

\`Database.getInstance()\` would use the real database again. \`null\` would crash when \`price\` calls the rateSource.`,
  },
  {
    id: "singleton-di-dip",
    topic: "singleton-di",
    source: "Extra",
    kind: "choice",
    title: "Which principle?",
    prompt:
      "After the fix, `PriceCalculator` depends on the interface `RateSource` instead of the concrete class `Database`. Which SOLID principle does this follow?",
    options: ["SRP", "OCP", "LSP", "DIP"],
    answer: 3,
    explain: `The high-level class depends on an abstraction, not on a detail. That is the Dependency Inversion Principle. The other principles are not about the direction of a dependency.`,
  },
  {
    id: "singleton-di-judge",
    topic: "singleton-di",
    source: "Extra",
    kind: "judge",
    title: "True or false?",
    prompt: "Decide for each statement whether it is true or false.",
    statements: [
      {
        text: "A Singleton has shared state, so one test can change the result of another test.",
        correct: true,
      },
      { text: "Making a method static makes it easier to replace in a test.", correct: false },
      {
        text: "With constructor injection, the constructor shows what a class needs.",
        correct: true,
      },
      {
        text: "A class that uses a Singleton can always be tested without the real object.",
        correct: false,
      },
    ],
    explain: `Static methods and Singletons are fixed in the code, so a test cannot replace them. Constructor injection makes dependencies visible and replaceable.`,
  },
];
