import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "java-basics-override-typo",
    topic: "java-basics",
    source: "Extra",
    kind: "choice",
    title: "What @Override does",
    prompt: "`Animal` has the method `public String makeSound()`. What happens with this code?",
    code: `public class Lion extends Animal {
    @Override
    public String makesound() {
        return "Roar";
    }
}`,
    codeLang: "java",
    options: [
      'It compiles, and `makeSound()` on a Lion returns "Roar".',
      "It compiles, but Lion now has two methods: `makeSound()` and `makesound()`.",
      "It does not compile, because `makesound()` overrides nothing.",
      "It throws an exception when the program runs.",
    ],
    answer: 2,
    explain: `\`@Override\` asks the compiler to check that the method replaces an inherited method. \`makesound\` with a small s matches nothing in Animal, so the compiler gives an error.

Without \`@Override\`, the code would compile and quietly add a second method; that is the bug the annotation prevents.`,
  },
  {
    id: "java-basics-override-overload",
    topic: "java-basics",
    source: "Extra",
    kind: "match",
    title: "Overriding or overloading?",
    prompt:
      "`Animal` has `public void eat(Food food)`. Is each method in `Lion extends Animal` an override or an overload?",
    choices: ["override", "overload"],
    pairs: [
      { item: "`public void eat(Food food)`", answer: "override" },
      { item: "`public void eat(Food food, int kg)`", answer: "overload" },
      { item: "`public void eat()`", answer: "overload" },
    ],
    explain: `Overriding keeps the name and the parameters and gives a new body. Overloading keeps the name but changes the parameters, so it is a new method next to the old one.`,
  },
  {
    id: "java-basics-static",
    topic: "java-basics",
    source: "Extra",
    kind: "judge",
    title: "static",
    prompt: "`Ticket` has the field `private static int sold`. Is each statement true?",
    statements: [
      { text: "Every Ticket object has its own `sold`.", correct: false },
      {
        text: "You can call a static method as `Ticket.getSold()`, without an object.",
        correct: true,
      },
      { text: "A static method can use `this`.", correct: false },
      { text: "In a UML class diagram, `sold` is underlined.", correct: true },
    ],
    explain: `A static member belongs to the class: there is one \`sold\` for all tickets. A static method runs without an object, so there is no \`this\`. UML shows static members underlined.`,
  },
  {
    id: "java-basics-final",
    topic: "java-basics",
    source: "Extra",
    kind: "match",
    title: "final",
    prompt: "What does `final` mean in each place?",
    choices: ["gets a value only once", "no subclass can override it", "no class can extend it"],
    pairs: [
      { item: "`private final String name;`", answer: "gets a value only once" },
      { item: "`public final void feed()`", answer: "no subclass can override it" },
      { item: "`public final class Ticket`", answer: "no class can extend it" },
    ],
    explain: `\`final\` always means "cannot change": a field keeps its first value, a method keeps its body in every subclass, and a class gets no subclasses.`,
  },
  {
    id: "java-basics-package-import",
    topic: "java-basics",
    source: "Extra",
    kind: "choice",
    title: "Which import is needed?",
    prompt:
      "`Keeper` is in package `nl.han.zoo.staff`. It uses `String`, `List`, `Schedule` from `nl.han.zoo.staff` and `Animal` from `nl.han.zoo.animals`. Which classes need an `import`?",
    options: ["Only `Animal`", "`List` and `Animal`", "`String`, `List` and `Animal`", "All four"],
    answer: 1,
    explain: `\`List\` is in \`java.util\` and \`Animal\` is in another package, so both need an import.

\`String\` is in \`java.lang\`, which Java imports by itself. \`Schedule\` is in the same package as Keeper.`,
  },
  {
    id: "java-basics-module",
    topic: "java-basics",
    source: "Extra",
    kind: "choice",
    title: "A public class in a module",
    prompt:
      "The module `nl.han.zoo` exports only `nl.han.zoo.animals`. The class `Keeper` in `nl.han.zoo.staff` is `public`. Can a class in another module use Keeper?",
    options: [
      "Yes, because Keeper is public.",
      "No, because its package is not exported.",
      "Only when it is a subclass of Keeper.",
    ],
    answer: 1,
    explain: `A module hides every package it does not export. \`public\` then means public inside the module only.`,
  },
  {
    id: "java-basics-abstract-interface",
    topic: "java-basics",
    source: "Extra",
    kind: "judge",
    title: "Abstract class or interface",
    prompt: "Is each statement true?",
    statements: [
      { text: "You can create an abstract class with `new`.", correct: false },
      { text: "An abstract class can have fields and a constructor.", correct: true },
      { text: "A class can extend two abstract classes.", correct: false },
      { text: "A class can implement two interfaces.", correct: true },
      { text: "A method in an interface is public without the word `public`.", correct: true },
    ],
    explain: `An abstract class is a class with gaps: it can hold fields, a constructor and code, but you cannot create it. A class extends at most one class but can implement many interfaces. Interface methods are always public.`,
  },
  {
    id: "java-basics-reference",
    topic: "java-basics",
    source: "Extra",
    kind: "choice",
    title: "Two references",
    prompt: "What does the last line print?",
    code: `Keeper a = new Keeper("Anna");
Keeper b = a;
b.setName("Bea");
System.out.println(a.getName());`,
    codeLang: "java",
    options: ["Anna", "Bea", "null", "It does not compile."],
    answer: 1,
    explain: `\`Keeper b = a\` copies the reference, not the object. Both variables point to the same Keeper, so the change through \`b\` is visible through \`a\`.`,
  },
  {
    id: "java-basics-field-local",
    topic: "java-basics",
    source: "Extra",
    kind: "match",
    title: "Field, parameter or local variable",
    prompt: "What is each variable in this code?",
    code: `public class Enclosure {
    private int capacity;

    public boolean hasRoom(int extra) {
        int total = countAnimals() + extra;
        return total <= capacity;
    }
}`,
    codeLang: "java",
    choices: ["field", "parameter", "local variable"],
    pairs: [
      { item: "`capacity`", answer: "field" },
      { item: "`extra`", answer: "parameter" },
      { item: "`total`", answer: "local variable" },
    ],
    explain: `A field is declared in the class and lives as long as the object. A parameter is the input of a method. A local variable is declared inside the method and is gone after the call.`,
  },
];
