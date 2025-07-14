
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <SignedIn>

    <div className="bg-red-600">home</div>
    </SignedIn>
    </>
   
  );
}
