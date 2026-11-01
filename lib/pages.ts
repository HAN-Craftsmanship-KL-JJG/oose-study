// The pages of the site, in reading order.
// The sidebar and the pager read this list.

export interface Page {
  href: string;
  title: string;
  section: string;
}

export const SECTIONS = ["Theory", "Apply", "Practise", "Extra"];

export const PAGES: Page[] = [
  {
    section: "Theory",
    href: "/java-basics",
    title: "Java basics",
  },
  {
    section: "Theory",
    href: "/uml-symbols",
    title: "UML symbols",
  },
  {
    section: "Theory",
    href: "/oo-terms",
    title: "OO terms",
  },
  {
    section: "Theory",
    href: "/coupling-cohesion",
    title: "Coupling and cohesion",
  },
  {
    section: "Theory",
    href: "/visibility",
    title: "Visibility and class diagrams",
  },
  { section: "Theory", href: "/solid", title: "SOLID" },
  {
    section: "Theory",
    href: "/singleton-di",
    title: "Singleton and dependency injection",
  },
  {
    section: "Theory",
    href: "/grasp",
    title: "GRASP",
  },
  {
    section: "Theory",
    href: "/patterns",
    title: "Design patterns",
  },
  {
    section: "Theory",
    href: "/diagrams",
    title: "UML diagrams and notation",
  },
  {
    section: "Apply",
    href: "/check-design",
    title: "Check and improve a design",
  },
  {
    section: "Apply",
    href: "/technical-design",
    title: "Make a technical design",
  },
  {
    section: "Practise",
    href: "/quiz",
    title: "Quiz",
  },
  {
    section: "Extra",
    href: "/other-topics",
    title: "Other topics",
  },
];

/** The slug of a page, which is also the topic of its questions. */
export function topicOf(href: string): string {
  return href.replace(/^\//, "");
}

/** The theory topics. The quiz draws its questions from these. */
export const THEORY_TOPICS = PAGES.filter((p) => p.section === "Theory").map((p) =>
  topicOf(p.href),
);
