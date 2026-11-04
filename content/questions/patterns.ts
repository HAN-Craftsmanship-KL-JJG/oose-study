import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "patterns-exam-1g",
    topic: "patterns",
    source: "Practice exam 1g",
    kind: "choice",
    title: "Which pattern does the diagram show?",
    prompt: `A client uses an interface. A class implements that interface by calling an existing class with a different interface.

Which pattern is this?`,
    uml: `interface Printer {
  +print(text : String) : void
}
class ThermalPrinting
class ThermalPrinter {
  +sendBytes(data : byte[]) : void
}
TicketShop --> Printer
ThermalPrinting ..|> Printer
ThermalPrinting --> ThermalPrinter`,
    options: ["Adapter", "Facade", "Proxy", "Strategy"],
    answer: 0,
    explain: `Adapter. The class in the middle translates the interface the client expects to the interface of the existing class.

Proxy keeps the same interface. Facade gives one simple entry to a whole subsystem. Strategy makes an algorithm swappable; it does not translate anything.`,
  },
  {
    id: "patterns-online-13",
    topic: "patterns",
    source: "Online quiz 13",
    kind: "choice",
    title: "Report with fixed steps",
    prompt: `The abstract class \`Report\` has a public method \`generate()\` that calls \`fetchData()\`, \`format()\` and \`writeFooter()\`, in that order. The first two are abstract. \`PdfReport\` and \`HtmlReport\` override them.

Which pattern is this?`,
    options: ["Strategy", "Template Method", "Factory Method", "Adapter"],
    answer: 1,
    explain: `Template Method. The superclass fixes the order of the steps, and the subclasses fill in the steps that vary (inheritance).

Strategy puts the varying behaviour in a separate object behind an interface (composition). Factory Method is a template method whose varying step creates an object; here nothing is created. Adapter translates an interface.`,
  },
  {
    id: "patterns-online-14",
    topic: "patterns",
    source: "Online quiz 14",
    kind: "choice",
    title: "An external payment service",
    prompt: `\`CashRegister\` uses the interface \`PaymentProvider\` with \`pay(amount: double): boolean\`. \`MolliePaymentProvider\` implements it and has an association to \`MollieClient\`. \`MollieClient\` comes from an external library that you cannot change, and has \`createPayment(amountInCents: int): PaymentResponse\`.

Which pattern is this?`,
    options: ["Facade", "Adapter", "Proxy", "Strategy"],
    answer: 1,
    explain: `Adapter. \`MolliePaymentProvider\` translates \`pay(double)\` to the different interface \`createPayment(int)\`.

A Proxy has the same interface as the object it stands for. A Facade is one simple entry to a whole subsystem. Strategy is about swappable algorithms, not about translating an interface.`,
  },
  {
    id: "patterns-online-19",
    topic: "patterns",
    source: "Online quiz 19",
    kind: "text",
    title: "Name the pattern",
    prompt: `An abstract class \`Game\` has a method \`start()\` that calls \`createBoard()\`. Subclasses such as \`ChessGame\` and \`DraughtsGame\` override \`createBoard()\`. In this way they decide which concrete board is created.

What is the name of this pattern?`,
    accept: ["Factory Method", "FactoryMethod", "Factory-Method", "Factory method pattern"],
    explain: `Factory Method. A superclass leaves the creation of an object to a method that subclasses override.

It looks like Template Method, but the varying step returns a new object.`,
  },
  {
    id: "patterns-online-20a",
    topic: "patterns",
    source: "Online quiz 20a",
    kind: "choice",
    title: "A pattern for extensible prices",
    prompt: `In the bike sharing app TrapNu, the price calculation must be easy to extend. Now there is a rate per minute and a rate per day. Later a student subscription and a weekend offer will follow. The rate is chosen per ride.

Which pattern fits best?`,
    options: [
      "Template Method: an abstract class `Ride` with a subclass per rate",
      "Singleton: one central `RateManager` that knows all rates",
      "Strategy: `Ride` uses a swappable `RateStrategy`",
      "Facade: one class `RateFacade` that calculates all rates in one method",
    ],
    answer: 2,
    explain: `Strategy. \`Ride\` gets a \`RateStrategy\` through its constructor, and \`calculatePrice()\` delegates to it. A new rate is a new class, so \`Ride\` does not change (Open/Closed).

Template Method is worse: the rate is fixed to the type of the \`Ride\` object, and combinations need extra subclasses. A Singleton does not make anything easy to extend. A Facade with one method for all rates must change for every new rate.`,
  },
  {
    id: "patterns-online-20b",
    topic: "patterns",
    source: "Online quiz 20b",
    kind: "judge",
    title: "Judge an alternative: a switch",
    prompt: `A colleague wants to make prices extensible with a \`switch\` on an attribute \`rateType\` in \`Ride.calculatePrice()\`.

Which statements about this alternative are right?`,
    labels: ["Right", "Wrong"],
    statements: [
      {
        text: "For every new rate you must change `Ride`, which breaks the Open/Closed Principle.",
        correct: true,
      },
      {
        text: "The cohesion of `Ride` goes down, because `Ride` must know all rate rules.",
        correct: true,
      },
      {
        text: "It works for the two rates of today, but it scales badly when more rates come.",
        correct: true,
      },
      { text: "The coupling goes down, because there are fewer classes.", correct: false },
      {
        text: "One big method with all rate rules is easier to unit-test than small strategy classes.",
        correct: false,
      },
    ],
    explain: `The switch works, but every new rate touches existing code that was already tested. That breaks Open/Closed.

There are fewer classes, but the coupling does not go down: \`Ride\` must now know all rate rules itself. One big method is harder to test than small, separate strategies.

Comparing your design with an alternative like this makes a strong motivation.`,
  },
  {
    id: "patterns-online-20c",
    topic: "patterns",
    source: "Online quiz 20c",
    kind: "choice",
    title: "A pattern for two lock suppliers",
    prompt: `In TrapNu, the locks come from two suppliers, each with its own library: \`LockItSdk\` with \`unlockBike(String id)\` and \`SmartLockApi\` with \`open(int nr, String token)\`. A third supplier must be possible later, without a change in the domain logic.

Which pattern fits best?`,
    options: [
      "Proxy: a class with the same interface in front of each library",
      "Adapter: per supplier a class that translates an own interface `BikeLock` to that library",
      "Template Method: an abstract class `Lock` with a subclass per supplier",
      "Singleton: one `LockManager` for all suppliers",
    ],
    answer: 1,
    explain: `Adapter. The domain defines its own interface \`BikeLock\` and depends only on it (Dependency Inversion). Per supplier, an adapter translates that interface to the library. A new supplier is a new adapter class (Open/Closed).

Proxy does not fit: a proxy has the same interface as the real object, but here the interfaces are different. Template Method and Singleton do not solve the problem of different interfaces.`,
  },
  {
    id: "patterns-online-20d",
    topic: "patterns",
    source: "Online quiz 20d",
    kind: "choice",
    title: "Who knows the external library?",
    prompt:
      "In the bike lock design with `LockItAdapter` and `SmartLockAdapter`, which class depends directly on `SmartLockApi`?",
    options: ["`Bike`", "`BikeLock`", "`SmartLockAdapter`", "`LockFactory`"],
    answer: 2,
    explain: `Only the adapter \`SmartLockAdapter\` calls \`SmartLockApi\`. If the supplier changes its API, you change only that one class.

\`Bike\` and \`BikeLock\` are in the domain and know no external library. \`LockFactory\` creates the adapter, but does not need to know the API of the library.`,
  },
  {
    id: "patterns-match-goal",
    topic: "patterns",
    source: "Extra",
    kind: "match",
    title: "Match the pattern to what it does",
    prompt: "Choose the pattern for each description.",
    choices: [
      "Strategy",
      "Template Method",
      "Factory Method",
      "Adapter",
      "Proxy",
      "Decorator",
      "Facade",
    ],
    pairs: [
      {
        item: "Translates the interface your code expects to the different interface of an existing class.",
        answer: "Adapter",
      },
      {
        item: "Has the same interface as the real object and controls the access to it.",
        answer: "Proxy",
      },
      { item: "Gives a client one simple entry to a whole subsystem.", answer: "Facade" },
      {
        item: "Puts each variant of an algorithm in its own class, so the context can swap it.",
        answer: "Strategy",
      },
      {
        item: "A superclass fixes the order of the steps; subclasses fill in some steps.",
        answer: "Template Method",
      },
      {
        item: "A subclass overrides a method that decides which object is created.",
        answer: "Factory Method",
      },
      {
        item: "Wraps an object with the same interface and adds behaviour; you can stack them.",
        answer: "Decorator",
      },
    ],
    explain: `Use the key word of each pattern: Adapter translates, Proxy controls access, Facade simplifies, Strategy swaps, Template Method fixes the order, Factory Method creates in a subclass, Decorator adds in layers.`,
  },
  {
    id: "patterns-extra-sorting",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Sorting in different ways",
    prompt: `A zoo app shows an \`AnimalList\`. A keeper can sort it by name, by age or by weight, and can change the order at any moment.

Which pattern fits best?`,
    options: ["Template Method", "Strategy", "Facade", "Adapter"],
    answer: 1,
    explain: `Strategy. Each sort order is a class behind one interface, for example \`SortOrder\`. \`AnimalList\` holds one and can get another one at run time.

Template Method would fix the order in a subclass, so you could not change it at run time. Facade and Adapter do not make an algorithm swappable.`,
  },
  {
    id: "patterns-extra-xml-library",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "A sensor library with another interface",
    prompt: `Your zoo app uses the interface \`TemperatureSource\` with \`temperature(enclosure: String): double\`. You want to use an external library \`SensorHubClient\` with \`readSensor(sensorId: int): Reading\`. You cannot change the library.

Which pattern do you use?`,
    options: ["Adapter", "Proxy", "Decorator", "Factory Method"],
    answer: 0,
    explain: `Adapter. A class \`SensorHubTemperatureSource\` implements \`TemperatureSource\` and translates: it finds the sensor of the enclosure, calls \`readSensor\` and takes the temperature from the \`Reading\`.

Proxy and Decorator keep the same interface, but here the interfaces are different. Factory Method is about creating objects.`,
  },
  {
    id: "patterns-extra-cache",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Remember slow answers",
    prompt: `\`AnimalRegistry\` is an interface with \`find(chipNumber: String): Animal\`. The real implementation asks a slow national web service. You add a class \`CachedAnimalRegistry\` that also implements \`AnimalRegistry\`. It keeps answers in memory and only calls the real registry when it does not know the answer yet.

Which pattern is \`CachedAnimalRegistry\`?`,
    options: ["Facade", "Adapter", "Proxy", "Strategy"],
    answer: 2,
    explain: `Proxy. It has the same interface as the real object, stands in front of it, and controls the access: it only passes the call on when needed. Caching is a typical job of a proxy.

An Adapter would change the interface. A Facade would combine many classes. Strategy is about swapping an algorithm.`,
  },
  {
    id: "patterns-extra-code-template",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Recognise the pattern in code",
    prompt: "Which pattern does this code show?",
    code: `public abstract class FeedingRound {
    public final void feed() {
        checkStock();
        prepareFood();
        serve();
    }
    protected abstract void prepareFood();
    protected abstract void serve();
    private void checkStock() { /* the same for all */ }
}

public class LionFeeding extends FeedingRound { ... }
public class PenguinFeeding extends FeedingRound { ... }`,
    options: ["Strategy", "Factory Method", "Template Method", "Facade"],
    answer: 2,
    explain: `Template Method. \`feed()\` fixes the order of the steps, the varying steps are abstract, and the subclasses fill them in. The word \`final\` stops subclasses from changing the order.

It is not Factory Method, because no step creates an object. It is not Strategy, because there is no separate object behind an interface.`,
  },
  {
    id: "patterns-extra-code-strategy",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Recognise the pattern in code (2)",
    prompt: "Which pattern does this code show?",
    code: `public interface TicketDiscount {
    double calculate(Ticket t);
}

public class Ticket {
    private TicketDiscount discount;

    public Ticket(TicketDiscount discount) {
        this.discount = discount;
    }

    public double price() {
        return basePrice() - discount.calculate(this);
    }
}`,
    options: ["Template Method", "Strategy", "Adapter", "Proxy"],
    answer: 1,
    explain: `Strategy. \`Ticket\` is the context. It holds an object of the interface \`TicketDiscount\` and delegates the calculation to it. Each kind of discount (child, student, member) is its own class.

There is no superclass with fixed steps, so it is not Template Method. Nothing is translated, so it is not Adapter. \`Ticket\` does not have the same interface as \`TicketDiscount\`, so it is not Proxy.`,
  },
  {
    id: "patterns-extra-code-factory",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Recognise the pattern in code (3)",
    prompt: "Which pattern does this code show?",
    code: `public abstract class Enclosure {
    public void open() {
        Habitat h = createHabitat();
        h.prepare();
    }
    protected abstract Habitat createHabitat();
}

public class PenguinEnclosure extends Enclosure {
    protected Habitat createHabitat() { return new IceHabitat(); }
}`,
    options: ["Factory Method", "Facade", "Decorator", "Strategy"],
    answer: 0,
    explain: `Factory Method. The superclass calls the abstract method \`createHabitat()\`, and the subclass decides which concrete \`Habitat\` is created.

It is also a kind of Template Method, but the varying step creates an object. That is exactly what makes it Factory Method.`,
  },
  {
    id: "patterns-extra-decorator",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Extras on a zoo ticket",
    prompt: `In a zoo app, \`Ticket\` is an interface with \`price(): double\`. \`DayTicket\` implements it. The classes \`WithFeedingShow\` and \`WithGuidedTour\` also implement \`Ticket\`, and each holds another \`Ticket\`. A visitor can buy \`new WithGuidedTour(new WithFeedingShow(new DayTicket()))\`.

Which pattern is this?`,
    options: ["Proxy", "Decorator", "Adapter", "Facade"],
    answer: 1,
    explain: `Decorator. Each extra wraps a \`Ticket\`, has the same interface and adds to the price. You can stack the extras in any combination.

A Proxy also has the same interface, but it controls access and does not change the result. Adapter changes the interface. Facade simplifies a subsystem.`,
  },
  {
    id: "patterns-extra-facade",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "One entry for the UI",
    prompt: `To book a zoo visit, the UI must call \`TicketService\`, \`ParkingService\`, \`TourService\` and \`PaymentService\`, in the right order. You add a class \`ZooDesk\` with one method \`bookVisit(...)\` that does all those calls. The UI only knows \`ZooDesk\`.

Which pattern is \`ZooDesk\`?`,
    options: ["Adapter", "Strategy", "Facade", "Template Method"],
    answer: 2,
    explain: `Facade. \`ZooDesk\` gives one simple entry to a subsystem of four services. The UI has low coupling: it knows one class instead of four.

An Adapter translates one interface to another. Strategy swaps an algorithm. Template Method fixes steps through inheritance.`,
  },
  {
    id: "patterns-extra-proxy-vs-adapter",
    topic: "patterns",
    source: "Extra",
    kind: "judge",
    title: "Proxy, Adapter or Decorator?",
    prompt: "Are these statements right or wrong?",
    labels: ["Right", "Wrong"],
    statements: [
      {
        text: "A Proxy has the same interface as the object it stands in front of.",
        correct: true,
      },
      { text: "An Adapter has the same interface as the class it calls.", correct: false },
      { text: "You can wrap a Decorator in another Decorator.", correct: true },
      { text: "A Facade implements the interfaces of all the classes behind it.", correct: false },
      { text: "In a class diagram, Proxy and Decorator can look exactly the same.", correct: true },
    ],
    explain: `A Proxy keeps the interface. An Adapter implements the interface your code expects, and calls a class with a different interface.

Decorators have the same interface as the object they wrap, so you can stack them. A Facade has its own, simpler interface.

Proxy and Decorator look the same in a diagram; the difference is the goal: control access or add behaviour.`,
  },
  {
    id: "patterns-extra-composition",
    topic: "patterns",
    source: "Extra",
    kind: "judge",
    title: "Composition or inheritance?",
    prompt: "Which mechanism does each pattern use? Mark the statements as right or wrong.",
    labels: ["Right", "Wrong"],
    statements: [
      { text: "Strategy uses composition: the context holds a strategy object.", correct: true },
      {
        text: "Template Method uses composition: the superclass holds the steps as objects.",
        correct: false,
      },
      {
        text: "Factory Method uses inheritance: a subclass overrides the creating method.",
        correct: true,
      },
      {
        text: "With Strategy you can change the behaviour of an object at run time.",
        correct: true,
      },
      {
        text: "With Template Method you can change the behaviour of an existing object at run time.",
        correct: false,
      },
    ],
    explain: `Strategy uses composition, so you can give the context another strategy at run time. Template Method and Factory Method use inheritance: the variant is fixed by the subclass you create.

This is why the course often says that composition is more flexible than inheritance.`,
  },
  {
    id: "patterns-extra-question-types",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "A bonus for questions from an external source",
    prompt: `In a quiz app, each question type has its own points. A question from an external source gets bonus points on top. Later more kinds of bonus may come, and a question can get more than one bonus.

Which pattern fits the bonus best?`,
    options: ["Decorator", "Facade", "Singleton", "Adapter"],
    answer: 0,
    explain: `Decorator. A bonus class wraps a \`Question\`, has the same interface, and adds points to the result of \`points()\`. Because decorators can be stacked, a question can get more than one bonus.

The question types themselves use polymorphism: each type returns its own points. Facade, Singleton and Adapter do not add behaviour to an object.`,
  },
  {
    id: "patterns-extra-factory-config",
    topic: "patterns",
    source: "Extra",
    kind: "choice",
    title: "Choose the storage from a configuration file",
    prompt: `In a quiz app, questions are stored in text files now, and in a database later. The choice is in a configuration file. \`QuestionManager\` must not know which storage class is used.

Which class reads the configuration and creates the right \`QuestionStorage\`?`,
    options: [
      "`QuestionManager` itself, with an `if` on the configuration",
      "A factory class, for example `StorageFactory.create(config)`, that returns a `QuestionStorage`",
      "The storage classes, each in a static method",
      "The user interface",
    ],
    answer: 1,
    explain: `A factory class. It is the only place that knows the concrete classes, and it returns the interface type. \`QuestionManager\` then only knows \`QuestionStorage\` (Dependency Inversion, low coupling).

If \`QuestionManager\` creates the classes itself, it knows all of them and must change for every new storage. The UI should not make this domain choice.`,
  },
];
