// Environment variables that next.config.mjs sets for the browser code.
declare namespace NodeJS {
  interface ProcessEnv {
    /** "/oose-study" on GitHub Pages, "" locally. */
    NEXT_PUBLIC_BASE_PATH?: string;
  }
}
