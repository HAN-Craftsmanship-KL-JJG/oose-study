import type { Question } from "@/lib/questions";

export const questions: Question[] = [
  {
    id: "grasp-1i-controller-spel",
    topic: "grasp",
    source: "Practice exam 1i",
    kind: "choice",
    title: "Controller for the game",
    prompt: `The domain model has four concepts: a Game has one GameBoard, a GameBoard consists of many Squares, and each Character stands on a Square.

Which of these concepts is best as Facade (or Controller), seen from the user interface?`,
    options: ["Character", "Game", "GameBoard", "Square"],
    answer: 1,
    explain: `Game represents the whole system. So it is the natural first object behind the user interface (a facade controller).

Character, GameBoard and Square are only parts of the game. They do not represent the whole system.`,
  },
  {
    id: "grasp-1j-creator-vakje",
    topic: "grasp",
    source: "Practice exam 1j",
    kind: "choice",
    title: "Creator of Square",
    prompt: `Use the same domain model: a Game has one GameBoard, a GameBoard consists of many Squares, and each Character stands on a Square.

Which of these concepts is best as Creator of Square?`,
    options: ["Character", "Game", "GameBoard", "Square"],
    answer: 2,
    explain: `A GameBoard consists of Squares: it contains them. Containing is the strongest reason for Creator, so GameBoard creates the Squares.

Game only knows the GameBoard. A Character stands on a Square, but it does not contain Squares. A Square cannot create itself.`,
  },
  {
    id: "grasp-q9-expert-boetes",
    topic: "grasp",
    source: "Online quiz 9",
    kind: "choice",
    title: "Open fines",
    prompt: `Use the library domain model: Library has Borrowers and Books, a Borrower has Loans, and each Loan is about one Book (with \`finePerDay\`).

Which class is, according to Information Expert, the best candidate to calculate the total open fines of one borrower?`,
    options: ["Borrower", "Library", "Book", "Loan"],
    answer: 0,
    explain: `The total needs all loans of one borrower, and Borrower knows them. So Borrower is the expert.

Loan is the expert for the fine of one loan. Borrower asks each loan for its fine and adds them up. Book only knows the rate per day, not the loans of a borrower. Library would need data from other classes.`,
  },
  {
    id: "grasp-q10-creator-bestelregel",
    topic: "grasp",
    source: "Online quiz 10",
    kind: "choice",
    title: "Who creates the order line?",
    prompt:
      "An Order consists of (composition) one or more OrderLine objects. Each line refers to a Product. A Customer places orders in the Webshop. Which class is, according to Creator, the best candidate to create an OrderLine?",
    options: ["Customer", "Product", "Webshop", "Order"],
    answer: 3,
    explain: `Order contains its lines (composition), so Order creates them.

Product is used by a line, but it does not contain lines. Customer and Webshop are further away: they do not contain or record lines.`,
  },
  {
    id: "grasp-q11-controller-knop",
    topic: "grasp",
    source: "Online quiz 11",
    kind: "choice",
    title: "Logic in the button",
    prompt:
      "This is the click handler of the button Lend in the user interface. Which GRASP principle does it break most clearly?",
    code: `void onLendClicked() {
    Borrower borrower = library.findBorrower(cardNumberField.getText());
    Book book = library.findBook(isbnField.getText());
    Loan loan = new Loan(borrower, book, LocalDate.now());
    borrower.add(loan);
    book.setLent(true);
}`,
    options: ["Controller", "Polymorphism", "Information Expert", "Creator"],
    answer: 0,
    explain: `The UI coordinates a system operation itself. It should pass the event on to a controller in the domain layer, for example \`library.lend(cardNumber, isbn)\`. Then the UI stays thin, and you can reuse and test the logic without the UI.

The UI also calls \`new Loan(...)\`, which is a Creator problem. But that follows from the missing controller. There is no polymorphism here.`,
  },
  {
    id: "grasp-controller-webshop",
    topic: "grasp",
    source: "Extra",
    kind: "choice",
    title: "Controller in a zoo app",
    prompt:
      "A visitor clicks the button Buy ticket. The system operation is `buyTicket()`. Which class is the best Controller?",
    options: [
      "`BuyButton`, the button in the UI",
      "`Zoo`, the class for the whole system",
      "`Ticket`",
      "`Animal`",
    ],
    answer: 1,
    explain: `Zoo represents the whole system and sits in the domain layer, so it is a good facade controller.

The button is part of the UI. The UI should only pass the event on. Ticket and Animal are small parts of the domain and do not represent the system.`,
  },
  {
    id: "grasp-controller-statements",
    topic: "grasp",
    source: "Extra",
    kind: "judge",
    title: "True or false: Controller",
    prompt: "Mark each statement about the GRASP Controller as true or false.",
    statements: [
      { text: "The Controller does all the work of a system operation itself.", correct: false },
      {
        text: "The UI should only read the input and pass it on to the Controller.",
        correct: true,
      },
      {
        text: "A class for one use case, such as `LendHandler`, can be a Controller.",
        correct: true,
      },
      { text: "The Controller is part of the user interface layer.", correct: false },
      {
        text: "With a Controller you can test the logic without the user interface.",
        correct: true,
      },
    ],
    explain: `The Controller coordinates: it delegates the steps to other objects. It sits in the domain layer, not in the UI. It can be a class for the whole system (facade controller) or a class for one use case. Because the logic is not in the UI, you can test it without a screen.`,
  },
  {
    id: "grasp-creator-uitlening",
    topic: "grasp",
    source: "Extra",
    kind: "choice",
    title: "Who creates a Loan?",
    prompt:
      "In the library, a Borrower keeps a list of its Loans. According to Creator, which class should create a new `Loan`?",
    options: ["`Book`", "`Borrower`", "`LoanScreen`", "`Employee`"],
    answer: 1,
    explain: `Borrower records its loans (it keeps them in a list), so Borrower creates them. That is why the controller calls \`borrower.borrow(book)\`.

Book does not keep the loans. LoanScreen is the UI, which should not create domain objects. Employee is an actor, a person outside the system.`,
  },
  {
    id: "grasp-expert-subtotaal",
    topic: "grasp",
    source: "Extra",
    kind: "choice",
    title: "The subtotal of one line",
    prompt:
      "An OrderLine knows its Product and its `quantity`. A Product knows its `price`. Which class should calculate the subtotal of one order line?",
    options: ["`Order`", "`OrderLine`", "`Product`", "`CashRegister`"],
    answer: 1,
    explain: `OrderLine knows the quantity and can ask its Product for the price. So it has the information: it is the Information Expert.

Product knows the price but not the quantity. Order and CashRegister would need to get both values from other objects.`,
  },
  {
    id: "grasp-expert-total",
    topic: "grasp",
    source: "Extra",
    kind: "choice",
    title: "The total of an order",
    prompt: "Which class should calculate the total price of a whole order?",
    options: ["`CashRegister`", "`Customer`", "`Order`", "`Product`"],
    answer: 2,
    explain: `Order knows all its lines, so it is the expert for the total. It asks each OrderLine for its subtotal and adds them up.

CashRegister can ask Order for the total (delegation), but it should not calculate it itself.`,
  },
  {
    id: "grasp-match-situations",
    topic: "grasp",
    source: "Extra",
    kind: "match",
    title: "Which principle is this?",
    prompt: "Match each design decision to the GRASP principle that explains it.",
    choices: ["Controller", "Creator", "Information Expert"],
    pairs: [
      { item: "GameBoard creates the Squares.", answer: "Creator" },
      { item: "Borrower calculates its total open fines.", answer: "Information Expert" },
      { item: "Game receives `startGame()` from the UI.", answer: "Controller" },
      { item: "Loan calculates the fine of one loan.", answer: "Information Expert" },
      { item: "Order creates its OrderLines.", answer: "Creator" },
      { item: "The UI calls `library.lend(cardNumber, isbn)`.", answer: "Controller" },
    ],
    explain: `Creating objects is Creator. Calculating with your own data is Information Expert. Receiving a system operation from the UI is Controller.`,
  },
  {
    id: "grasp-expert-text",
    topic: "grasp",
    source: "Extra",
    kind: "text",
    title: "Expert for one fine",
    prompt: "Type the name of the class that is the Information Expert for the fine of one loan.",
    accept: ["Loan"],
    explain: `Loan knows its return date and its book (which knows the rate per day). So Loan calculates the fine of one loan.`,
  },
  {
    id: "grasp-thin-ui",
    topic: "grasp",
    source: "Extra",
    kind: "choice",
    title: "Why a thin UI?",
    prompt: "Why should the user interface pass a system operation on to a Controller?",
    options: [
      "Because the UI is not allowed to call methods.",
      "Because then the logic can be reused and tested without the UI.",
      "Because the Controller makes the program faster.",
      "Because the UI cannot know any domain class.",
    ],
    answer: 1,
    explain: `With the logic in the domain layer, you can use it from another UI (for example an app) and test it without a screen.

The UI may call methods: it calls the Controller. Speed is not the reason. The UI does know the Controller class.`,
  },
];
