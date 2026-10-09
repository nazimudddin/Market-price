
"use client";

import { useEffect, useState } from "react";
import { Link, Button } from "@heroui/react";
import { TiShoppingCart } from "react-icons/ti";
import moment from "moment";
interface navCategory { _id: string; nameBn: string; slug: string; icon?: string;  }


export default  function  Navbar() {
const [navcategory,setnavcategory] = useState<navCategory[]>([])
  useEffect(()=>{
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
    .then(res => res.json())
    .then(data => setnavcategory(data))

  },[])

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [date, setDate] = useState<string | null>(null);
 
   useEffect(() => {
     const timer = setInterval(() => {
       const formatted = new Intl.DateTimeFormat("bn-BD", {
         dateStyle: "full",
         timeStyle: "short",
       }).format(new Date());
 
       setDate(formatted);
     }, 1000);
 
     return () => clearInterval(timer);
   }, []);
  const Links = <>
  {
    navcategory.map((n,i)=> <li key={i}><Link href={`/category/${n.slug}`}>{n.icon} {n.nameBn}</Link></li> )
  }
  </>
  const dbuttons = <>
  <li className="  flex  gap-2 border-t border-separator ">
              <Link href="#" className="block py-2">
                Login
              </Link>

              <Button className="w-full">Sign Up</Button>
            </li>
  </>
  const mbuttons = <>
  <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              <Link href="#" className="block py-2">
                Login
              </Link>

              <Button className="w-full">Sign Up</Button>
            </li>
  </>

  return (
    <div>
            <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg py-2">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 ">
        
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>

            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <p className="flex h-10 w-10 items-center justify-center rounded bg-green-700 shadow-2xl">
              <TiShoppingCart className="text-[1.3rem]" />
            </p>

            <div>
              <p className="text-2xl font-bold">বাজার দর</p>
              <p className="text-sm">{date}</p>
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {dbuttons}
        </div>
      </header>
       <ul className="mx-auto hidden max-w-5xl items-center gap-4 px-5 py-2 md:falex">
        {Links}
      </ul>

      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {Links}

            {mbuttons}
          </ul>
        </div>
      )}
    </nav>
    <div className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
         <ul className="mx-auto hidden max-w-7xl items-center gap-6 px-5 py-2 md:flex ">
        {Links}
      </ul>
    </div>
    
    </div>

  );
}

