import { redirect } from "next/navigation";

// Immediately redirect this route to the home page
export default function Page() {
  redirect("/");
}
