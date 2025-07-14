
import { SignedIn } from "@clerk/nextjs";


export default function Home() {
  return (
    <>
    <SignedIn>

    <div className="bg-red-600">home</div>
    </SignedIn>
    </>
   
  );
}
