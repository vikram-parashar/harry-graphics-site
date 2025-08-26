import { redirect } from "next/navigation";

export default function Page() {
  console.log("Redirecting to /explore");
  redirect("/explore");
}
