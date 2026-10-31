import { redirect } from "next/navigation";

/** The site has no start page: the first page in the menu is the start. */
export default function Home() {
  redirect("/uml-symbols");
}
