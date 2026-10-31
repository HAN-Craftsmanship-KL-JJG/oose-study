import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "oo-terms-match-practice-1a",
    topic: "oo-terms",
    source: "Practice exam 1a",
    kind: "match",
    title: "Match each description to a term",
    prompt: "Choose the right term for each description. Every term is used once.",
    choices: ["delegation", "encapsulation", "class", "interface", "association", "coupling"],
    pairs: [
      {
        item: "Collecting in one module the properties and the functions that have access to these properties.",
        answer: "encapsulation",
      },
      {
        item: "A blueprint for a family of objects. It describes which properties the objects of that family have, and which functions you can use on them.",
        answer: "class",
      },
      { item: "The degree to which classes depend on each other.", answer: "coupling" },
      {
        item: "A relation between classes that shows that an object of class A may call functions of an object of class B.",
        answer: "association",
      },
      {
        item: "Handing over the responsibility of a class to another class that can do it better.",
        answer: "delegation",
      },
      {
        item: "A type with which behaviour can be defined without implementing it.",
        answer: "interface",
      },
    ],
    explain: `Key words help you: "blueprint" is class, "depend on" is coupling, "may call" is association, "handing over the responsibility" is delegation, "without implementing" is interface.

Encapsulation is the one about putting data and the functions that use it together in one module.`,
  },
  {
    id: "oo-terms-match-online-1",
    topic: "oo-terms",
    source: "Online quiz 1a–1e",
    kind: "match",
    title: "Match each description to a term",
    prompt: "Choose the right term for each description. One term is not used.",
    choices: ["class", "interface", "inheritance", "encapsulation", "coupling", "polymorphism"],
    pairs: [
      {
        item: "Shielding the internal state of an object, so that other objects can use that state only through the public operations of that object.",
        answer: "encapsulation",
      },
      { item: "The degree to which a class depends on other classes.", answer: "coupling" },
      {
        item: "The fact that the same call, for example paymentMethod.pay(amount), gives different behaviour depending on the concrete object that receives the call.",
        answer: "polymorphism",
      },
      {
        item: "A contract that states which operations a type offers, without implementing those operations.",
        answer: "interface",
      },
      {
        item: 'An "is a" relation in which a subclass takes over the non-private properties and operations of a superclass and can extend them.',
        answer: "inheritance",
      },
    ],
    explain: `"Shielding the internal state" is encapsulation. "Depends on" is coupling. "Same call, different behaviour" is polymorphism. "Contract without implementation" is interface. "Is a" is inheritance.

Class is not used here.`,
  },
  {
    id: "oo-terms-delegatie-kassa",
    topic: "oo-terms",
    source: "Online quiz 6",
    kind: "choice",
    title: "CashRegister and Order",
    prompt:
      "Order adds up the prices of its own lines. Which OO term fits best with what `CashRegister` does here?",
    code: `class CashRegister {
    double amountDue(Order order) {
        return order.getTotal();
    }
}`,
    options: ["Inheritance", "Delegation", "Composition", "Interface segregation"],
    answer: 1,
    explain: `CashRegister passes the task to Order, the class that knows the lines. That is delegation.

Composition describes that Order owns its lines; it is not about passing a task. There is no subclass, so it is not inheritance. Interface segregation is a SOLID principle about small interfaces.`,
  },
  {
    id: "oo-terms-extra-object-vs-class",
    topic: "oo-terms",
    source: "Extra",
    kind: "choice",
    title: "Class or object?",
    prompt: "This code runs once. How many classes and how many objects are there?",
    code: `Keeper a = new Keeper("Anna", "Reptiles");
Keeper b = new Keeper("Ben", "Birds");
Keeper c = a;`,
    options: [
      "1 class, 3 objects",
      "1 class, 2 objects",
      "3 classes, 3 objects",
      "2 classes, 2 objects",
    ],
    answer: 1,
    explain: `There is one class: \`Keeper\`. Only \`new\` makes an object, and \`new\` runs twice, so there are 2 objects.

\`c = a\` does not make a new object. The variable \`c\` points to the same object as \`a\`.`,
  },
  {
    id: "oo-terms-extra-encapsulation-code",
    topic: "oo-terms",
    source: "Extra",
    kind: "choice",
    title: "Which class uses encapsulation?",
    prompt: "Which version of `FoodStore` follows encapsulation best?",
    options: [
      "`class FoodStore { public double stockKg; }`",
      "`class FoodStore { private double stockKg; public void setStockKg(double s) { stockKg = s; } }`",
      "`class FoodStore { private double stockKg; public void take(double kg) { if (kg > stockKg) throw ...; stockKg -= kg; } }`",
      "`class FoodStore { protected double stockKg; }`",
    ],
    answer: 2,
    explain: `Encapsulation hides the data and lets the class check every change. Option C does that: \`stockKg\` is private, and \`take\` checks the rule.

Option A has public data. Option B looks private, but \`setStockKg\` lets anyone set any value without a check, so it shields almost nothing. Option D lets subclasses and the whole package change the data.`,
  },
  {
    id: "oo-terms-extra-association-or-not",
    topic: "oo-terms",
    source: "Extra",
    kind: "judge",
    title: "Association or not?",
    prompt: "For each piece of code: is there an association from `Enclosure` to `Animal`?",
    labels: ["Association", "No association"],
    statements: [
      { text: "`class Enclosure { private Animal animal; }`", correct: true },
      {
        text: "`class Enclosure { void print(Animal a) { System.out.println(a); } }`",
        correct: false,
      },
      { text: "`class Enclosure { private List<Animal> animals; }`", correct: true },
      { text: "`class Enclosure { void make() { Animal a = new Lion(); } }`", correct: false },
    ],
    explain: `An association is a lasting relation: \`Enclosure\` keeps an \`Animal\` (or a list of them) in a field.

A parameter or a local variable is only used for a moment. That is a dependency, a weaker relation, drawn as a dashed arrow.`,
  },
  {
    id: "oo-terms-extra-polymorphism",
    topic: "oo-terms",
    source: "Extra",
    kind: "choice",
    title: "What does this code print?",
    prompt: "`Lion` and `Penguin` both implement `Animal`. What is printed?",
    code: `Animal a = new Penguin();
System.out.println(a.makeSound());
a = new Lion();
System.out.println(a.makeSound());`,
    options: [
      'Twice "Roar", because the type of `a` does not change',
      'First "Squawk", then "Roar"',
      "Nothing, because `Animal` has no code",
      "A compile error, because `a` is an interface",
    ],
    answer: 1,
    explain: `This is polymorphism. The variable has the type \`Animal\`, but the object decides which \`makeSound\` runs. First \`a\` points to a Penguin, then to a Lion.

A variable may have an interface type; only \`new Animal()\` would be an error.`,
  },
  {
    id: "oo-terms-extra-inheritance-private",
    topic: "oo-terms",
    source: "Extra",
    kind: "choice",
    title: "Inheritance and private",
    prompt:
      "`Bird` has `private String name` and a public method `getName()`. `Penguin extends Bird`. Which line inside `Penguin` compiles?",
    options: [
      '`name = name + " the penguin";`',
      "`String n = getName();`",
      '`super.name = "Pip";`',
      '`this.name += "!";`',
    ],
    answer: 1,
    explain: `A subclass takes over everything that is not private. \`getName()\` is public, so the subclass can call it.

The field \`name\` is private, so only \`Bird\` itself can use it. All other options use the field directly and do not compile.`,
  },
  {
    id: "oo-terms-extra-composition-or-delegation",
    topic: "oo-terms",
    source: "Extra",
    kind: "match",
    title: "Which term fits the situation?",
    prompt: "Choose the term that fits each situation best.",
    choices: ["composition", "delegation", "inheritance", "association", "interface"],
    pairs: [
      {
        item: "A `Zoo` creates its `Enclosure` objects, and the enclosures are gone when the zoo is gone.",
        answer: "composition",
      },
      { item: "`Keeper.feed()` only calls `foodStore.take(kg)`.", answer: "delegation" },
      {
        item: "A `Lion` is a `BigCat` and gets all its public methods.",
        answer: "inheritance",
      },
      {
        item: "A `Visitor` keeps a field with its favourite `Animal`. The animal exists without the visitor.",
        answer: "association",
      },
      {
        item: "`Feedable` lists `eat()` and `sleep()` but has no code for them.",
        answer: "interface",
      },
    ],
    explain: `Composition: the whole owns and creates its parts. Delegation: one class passes the task to another. Inheritance: "is a". Association: one object knows another, but does not own it. Interface: operations without code.`,
  },
  {
    id: "oo-terms-extra-both-composition-delegation",
    topic: "oo-terms",
    source: "Extra",
    kind: "choice",
    title: "Composition, delegation or both?",
    prompt:
      "`Order` creates its `OrderLine` objects and keeps them in a private list. `getTotal()` calls `subtotal()` on each line. Which terms fit `Order`? Choose all that fit.",
    code: `class Order {
    private final List<OrderLine> lines = new ArrayList<>();

    void add(double price, int qty) { lines.add(new OrderLine(price, qty)); }

    double getTotal() {
        double total = 0;
        for (OrderLine line : lines) total += line.subtotal();
        return total;
    }
}`,
    options: ["Composition", "Delegation", "Inheritance", "Realization"],
    answer: [0, 1],
    explain: `Order owns and creates its lines: composition, the structure. \`getTotal()\` hands each subtotal to the line: delegation, the behaviour. One class can do both.

There is no \`extends\` and no \`implements\`, so there is no inheritance or realization.`,
  },
  {
    id: "oo-terms-extra-uml-symbols",
    topic: "oo-terms",
    source: "Extra",
    kind: "match",
    title: "Read the UML symbol",
    prompt: "What does each UML symbol mean?",
    choices: [
      "inheritance (extends)",
      "implements an interface",
      "association",
      "composition",
      "aggregation",
    ],
    pairs: [
      { item: "{{generalization}}", answer: "inheritance (extends)" },
      { item: "{{realization}}", answer: "implements an interface" },
      { item: "{{association}}", answer: "association" },
      { item: "{{composition}}", answer: "composition" },
      { item: "{{aggregation}}", answer: "aggregation" },
    ],
    explain: `A triangle always means "is a": solid for a class (extends), dashed for an interface (implements). An arrow means "knows". A diamond sits at the whole: filled means it owns the parts (composition), open means a weak "has a" (aggregation).`,
  },
  {
    id: "oo-terms-extra-statements",
    topic: "oo-terms",
    source: "Extra",
    kind: "judge",
    title: "True or false?",
    prompt: "Decide for each statement whether it is true.",
    statements: [
      { text: "An interface can contain the code of its operations.", correct: false },
      {
        text: "Polymorphism lets you add a new `Animal` without changing the loop that calls `makeSound()`.",
        correct: true,
      },
      { text: "Delegation and composition mean the same thing.", correct: false },
      {
        text: "Low coupling makes a change in one class less likely to break other classes.",
        correct: true,
      },
      {
        text: "A subclass can use the private attributes of its superclass directly.",
        correct: false,
      },
    ],
    explain: `An interface only names operations (ignore Java default methods here). Polymorphism makes the calling code work with every implementation. Delegation is about passing a task; composition is about owning parts. Low coupling limits the effect of a change. Private members are only for the class itself, not for subclasses.`,
  },
];
