import type { ReactNode } from "react";

/**
 * A UML notation on the left and the Java it turns into on the right; stacked on a phone.
 * <UmlCode title="Association" read="an Enclosure knows a Keeper" look="Solid line, arrowhead">
 * ```plantuml ... ```
 * ```java ... ```
 * </UmlCode>
 */
export default function UmlCode({
  title,
  read,
  look,
  children,
}: {
  title?: string;
  read?: string;
  look?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8">
      {title !== undefined && (
        <p className="mb-2 text-sm">
          <span className="font-semibold text-stone-900 dark:text-stone-100">{title}</span>
          {read !== undefined && (
            <span className="text-stone-600 dark:text-stone-400">: {read}</span>
          )}
        </p>
      )}
      <div className="grid items-center gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] [&>*]:my-0">
        {children}
      </div>
      {look !== undefined && (
        <p className="mt-2 text-sm text-accent-700 dark:text-accent-300">{look}</p>
      )}
    </div>
  );
}
