import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <nav className="border-b p-4 h-16 flex items-center justify-between">
      <div className="text-2xl text-primary font-bold">Compilo</div>
      <div>
        <Link href={"/dashboard"}>
          <Button asChild variant="outline">
            Claim your Compilo
          </Button>
        </Link>
      </div>
    </nav>
  );
}
