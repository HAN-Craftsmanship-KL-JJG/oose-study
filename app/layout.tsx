import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import { PageQuestionsProvider } from "@/components/nav/QuizTicks";
import SectionsProvider from "@/components/nav/SectionsProvider";
import Pager from "@/components/Pager";
import Sidebar from "@/components/Sidebar";
import { questionsForTopic } from "@/content/questions";
import { PAGES, topicOf } from "@/lib/pages";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "OOSE-DT", template: "%s | OOSE-DT" },
  description:
    "The theory of object-oriented analysis and design, " +
    "with diagrams, examples and practice questions.",
};

const prose = [
  "prose prose-stone max-w-3xl dark:prose-invert prose-lg",
  "prose-headings:scroll-mt-24 prose-headings:font-medium prose-headings:tracking-normal",
  "prose-h1:text-4xl prose-h2:mt-16 prose-h2:border-t prose-h2:border-stone-300 prose-h2:pt-10",
  "dark:prose-h2:border-stone-800",
  "prose-a:text-accent-700 prose-a:decoration-accent-300 prose-a:underline-offset-3 dark:prose-a:text-accent-300",
  "prose-code:rounded prose-code:bg-stone-100 prose-code:px-1 prose-code:py-0.5",
  "prose-code:font-normal prose-code:text-[0.85em] prose-code:text-stone-800 dark:prose-code:bg-stone-800",
  "dark:prose-code:text-stone-200 prose-code:before:content-none prose-code:after:content-none",
  "prose-table:text-base prose-li:my-1",
].join(" ");

/** The question ids of each page, for the ticks in the menu. Only ids go to the browser. */
const pageQuestions = Object.fromEntries(
  PAGES.map((p) => [p.href, questionsForTopic(topicOf(p.href)).map((q) => q.id)]),
);

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="relative min-h-dvh bg-[#fbf8f1] font-sans text-stone-900 antialiased dark:bg-[#1a1814] dark:text-stone-100">
        <PageQuestionsProvider value={pageQuestions}>
          <SectionsProvider>
            <Header />
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[17rem_minmax(0,1fr)]">
              <Sidebar />
              <main className="min-w-0 px-4 pt-8 pb-24 sm:px-8 lg:px-12">
                <article className={prose}>{children}</article>
                <Pager />
              </main>
            </div>
          </SectionsProvider>
        </PageQuestionsProvider>
      </body>
    </html>
  );
}
