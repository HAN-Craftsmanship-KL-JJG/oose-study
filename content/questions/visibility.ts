import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "visibility-artist",
    topic: "visibility",
    source: "Practice exam 1d",
    kind: "choice",
    title: "The class Artist",
    prompt:
      "Which modifier do you write on the dots to make the class visible only inside the package?",
    code: `package com.spotify.model;

… class Artist {
}`,
    options: ["`private`", "`protected`", "`public`", "None of these; no modifier is needed."],
    answer: 3,
    explain: `No modifier means package-private: only classes in \`com.spotify.model\` can use Artist.

\`private\` and \`protected\` are not allowed on a top-level class; the code does not compile. \`public\` makes the class visible everywhere.`,
  },
  {
    id: "visibility-lener",
    topic: "visibility",
    source: "Online quiz 7",
    kind: "choice",
    title: "The class Borrower",
    prompt: "Where is the class `Borrower` visible?",
    code: `package nl.han.library.domain;

class Borrower {
}`,
    options: [
      "Everywhere in the application",
      "Only in subclasses of Borrower",
      "Only in the file Borrower.java",
      "Only in the package nl.han.library.domain",
    ],
    answer: 3,
    explain: `Without a modifier, a class is package-private: only classes in the same package can use it.

For "everywhere" you need \`public\`. Visibility in Java is not limited to one file, and "only subclasses" is not a level for classes.`,
  },
  {
    id: "visibility-a-i",
    topic: "visibility",
    source: "Practice exam 1h",
    kind: "choice",
    title: "The relation between A and I",
    prompt:
      "In the class diagram, class A has an association with the interface I. Which code implements the relation between A and I?",
    options: [
      "`class B implements I { void execute() { ... } }`",
      "`class B extends I { void execute() { ... } }`",
      "`class A { private I i; public A(I i) { this.i = i; } }`",
    ],
    answer: 2,
    explain: `An association to an interface is a private field of that interface type, set through the constructor.

Options A and B are about B and I, not about A and I.`,
  },
  {
    id: "visibility-kassa-betaalmethode",
    topic: "visibility",
    source: "Online quiz 8",
    kind: "choice",
    title: "CashRegister and PaymentMethod",
    prompt:
      "In the diagram, there is a solid arrow from `CashRegister` to the interface `PaymentMethod`. `IDeal` and `CreditCard` implement `PaymentMethod`. Which code implements the relation between CashRegister and PaymentMethod?",
    uml: `class CashRegister
interface PaymentMethod {
  +pay(amount : double) : boolean
}
class IDeal
class CreditCard
CashRegister --> PaymentMethod
IDeal ..|> PaymentMethod
CreditCard ..|> PaymentMethod`,
    options: [
      "`class CashRegister implements PaymentMethod { ... }`",
      "`class CashRegister extends PaymentMethod { ... }`",
      "`class CashRegister { private PaymentMethod method; CashRegister(PaymentMethod m) { method = m; } }`",
      "`class CashRegister { void calculate() { new IDeal().pay(10); } }`",
    ],
    answer: 2,
    explain: `The solid arrow is an association: CashRegister keeps a PaymentMethod in a field.

\`implements\` belongs to the dashed line with a triangle, like IDeal has. \`extends\` belongs to inheritance between classes. The last option makes CashRegister depend on the concrete class IDeal; that is not an association with the interface.`,
  },
  {
    id: "visibility-extra-uml-symbols",
    topic: "visibility",
    source: "Extra",
    kind: "match",
    title: "UML visibility symbols",
    prompt: "Match each UML symbol to the Java modifier.",
    choices: ["public", "private", "protected", "no modifier (package-private)"],
    pairs: [
      { item: "`+`", answer: "public" },
      { item: "`-`", answer: "private" },
      { item: "`#`", answer: "protected" },
      { item: "`~`", answer: "no modifier (package-private)" },
    ],
    explain: `\`+\` public, \`-\` private, \`#\` protected, \`~\` package. A trick to remember: plus is open to all, minus is closed.`,
  },
  {
    id: "visibility-extra-who-sees",
    topic: "visibility",
    source: "Extra",
    kind: "judge",
    title: "Can this code use it?",
    prompt:
      "`Keeper` is in package `zoo.staff` and has the method `protected void checkBadge()`. Can each class call `checkBadge()`?",
    labels: ["Yes", "No"],
    statements: [
      { text: "`Zoo`, in package `zoo.staff`", correct: true },
      { text: "`HeadKeeper extends Keeper`, in package `zoo.extra`", correct: true },
      { text: "`TicketScreen`, in package `zoo.ui`, not a subclass", correct: false },
      { text: "`Keeper` itself", correct: true },
    ],
    explain: `\`protected\` gives access to the class itself, to every class in the same package, and to subclasses in other packages. A class in another package that is not a subclass cannot use it.`,
  },
  {
    id: "visibility-extra-line-to-code",
    topic: "visibility",
    source: "Extra",
    kind: "match",
    title: "From UML line to Java",
    prompt: "Which Java code belongs to each UML line from B to A?",
    choices: [
      "`class B implements A`",
      "`class B extends A`",
      "`private A a;` in B",
      "`A` only as a parameter or local variable in B",
    ],
    pairs: [
      {
        item: "{{realization B A}} (A is an interface)",
        answer: "`class B implements A`",
      },
      { item: "{{generalization B A}}", answer: "`class B extends A`" },
      { item: "{{association B A}}", answer: "`private A a;` in B" },
      {
        item: "{{dependency B A}}",
        answer: "`A` only as a parameter or local variable in B",
      },
    ],
    explain: `Triangles mean "is a": dashed for an interface (implements), solid for a class (extends). A solid arrow is an association: a field. A dashed arrow is a dependency: B uses A only for a moment.`,
  },
  {
    id: "visibility-extra-top-level",
    topic: "visibility",
    source: "Extra",
    kind: "judge",
    title: "Does it compile?",
    prompt: "Each line is a top-level class in its own file. Does it compile?",
    labels: ["Compiles", "Error"],
    statements: [
      { text: "`public class Lion { }`", correct: true },
      { text: "`class Lion { }`", correct: true },
      { text: "`private class Lion { }`", correct: false },
      { text: "`protected class Lion { }`", correct: false },
    ],
    explain: `A top-level class can only be \`public\` or have no modifier. \`private\` and \`protected\` are only allowed on members and on classes inside another class.`,
  },
  {
    id: "visibility-extra-attribute-default",
    topic: "visibility",
    source: "Extra",
    kind: "choice",
    title: "Best visibility for an attribute",
    prompt:
      "`Animal` has an attribute `birthDate`. Other classes must be able to read it, but only Animal may change it. What is the best design?",
    options: [
      "`public LocalDate birthDate;`",
      "`private LocalDate birthDate;` with a public `getBirthDate()`",
      "`protected LocalDate birthDate;`",
      "`LocalDate birthDate;` with no modifier",
    ],
    answer: 1,
    explain: `A private attribute with a public getter lets others read the value but not change it. That is encapsulation.

Public lets everyone change it. Protected and package-private let many other classes change it too.`,
  },
  {
    id: "visibility-extra-association-vs-dependency",
    topic: "visibility",
    source: "Extra",
    kind: "choice",
    title: "Association or dependency?",
    prompt: "Which UML line fits this code best?",
    code: `class Keeper {
    void feed(Animal animal) {
        animal.eat(2.0);
    }
}`,
    options: [
      "{{association Keeper Animal}}",
      "{{dependency Keeper Animal}}",
      "{{generalization Keeper Animal}}",
      "{{composition Keeper Animal}}",
    ],
    answer: 1,
    explain: `Keeper gets the Animal only as a parameter and does not keep it in a field. That is a dependency: a dashed arrow.

An association needs a field. A triangle means inheritance. A filled diamond means Keeper owns the Animal.`,
  },
  {
    id: "visibility-extra-type-field",
    topic: "visibility",
    source: "Extra",
    kind: "text",
    title: "Name the keyword",
    prompt:
      "The diagram has a dashed line with an open triangle from `Lion` to the interface `Animal`. Which Java keyword do you write after `class Lion`? Type only the keyword.",
    uml: `interface Animal
class Lion
Lion ..|> Animal`,
    accept: ["implements"],
    explain: `A dashed line with an open triangle is realization: the class implements the interface. You write \`class Lion implements Animal\`.`,
  },
];
