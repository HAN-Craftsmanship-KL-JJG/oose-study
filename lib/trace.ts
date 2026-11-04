// A trace walks through a code example one line at a time, as the program would run it.
// It lives in examples/<name>.trace.json, with a list of steps per language.

/** An object that exists while the program runs, drawn as a small box. */
export interface TraceObject {
  /** The name the code uses for it, such as "ride". */
  name: string;
  /** Its class, such as "Ride". */
  class: string;
  /** Its fields, such as { "rate": "→ rate" }. */
  fields?: Record<string, string>;
}

/** One step as it is written in the trace file. */
export interface TraceStepSource {
  /** A piece of the code line that runs now. It must match one line of the example. */
  at: string;
  /** Which match to take when the piece is on more than one line, counting from 1. */
  nth?: number;
  /** What happens, in plain words. Text between backticks shows as code. */
  say: string;
  /** A method starts: it goes on top of the call stack before this step shows. */
  call?: { on?: string; method: string };
  /** The method on top of the call stack ends after this step. */
  done?: boolean;
  /** Every object that exists from this step on. Leave it out to keep the previous list. */
  objects?: TraceObject[];
  /** A line the program prints. */
  print?: string;
}

/** A frame of the call stack: which method runs, on which object. */
export interface TraceFrame {
  on?: string;
  method: string;
}

/** One step, ready to show: the full state at that moment. */
export interface TraceStep {
  /** The line number as the reader sees it, counting from 1. */
  line: number;
  say: string;
  stack: TraceFrame[];
  objects: TraceObject[];
  output: string[];
}

const MARKER_ONLY = /^\s*(\/\/|#)\s*\[!code highlight\]\s*$/;

/** The lines as the reader sees them: a line with only a highlight marker is not shown. */
export function shownLines(code: string): string[] {
  return code
    .trimEnd()
    .split("\n")
    .filter((l) => !MARKER_ONLY.test(l));
}

function findLine(lines: string[], step: TraceStepSource, where: string): number {
  const hits = lines.flatMap((l, i) => (l.includes(step.at) ? [i + 1] : []));
  if (step.nth === undefined && hits.length !== 1) {
    throw new Error(`${where}: "${step.at}" is on ${String(hits.length)} lines, not 1`);
  }
  const line = hits[(step.nth ?? 1) - 1];
  if (line === undefined) {
    throw new Error(`${where}: "${step.at}" has no match ${String(step.nth)}`);
  }
  return line;
}

/** Turns the steps of a trace file into full states, and fails the build on a broken step. */
export function buildTrace(code: string, steps: TraceStepSource[], where: string): TraceStep[] {
  const lines = shownLines(code);
  const stack: TraceFrame[] = [];
  let objects: TraceObject[] = [];
  const output: string[] = [];

  return steps.map((step, i) => {
    const at = `${where}, step ${String(i + 1)}`;
    if (step.call) stack.push(step.call);
    if (step.objects) objects = step.objects;
    if (step.print !== undefined) output.push(step.print);
    const result: TraceStep = {
      line: findLine(lines, step, at),
      say: step.say,
      stack: [...stack],
      objects,
      output: [...output],
    };
    if (step.done && stack.pop() === undefined) throw new Error(`${at}: "done" with no method`);
    return result;
  });
}

/** The number of lines in highlighted HTML, to check that the trace counts lines the same way. */
export function countHtmlLines(html: string): number {
  return html.split('<span class="line').length - 1;
}
