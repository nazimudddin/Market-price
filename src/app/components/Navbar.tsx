
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TiShoppingCart } from "react-icons/ti";
import {
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "@/app/lib/auth-client";

interface NavCategory {
  _id: string;
  nameBn: string;
  slug: string;
  icon?: string;
}

export default function Navbar() {
  const [navcategory, setNavcategory] = useState<NavCategory[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [date, setDate] = useState("");

  const { data: session, isPending } = useSession();
  const user = session?.user;

  // Fetch categories
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch(
          "https://api.api-store.workers.dev/api/bazardor/categories"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: NavCategory[] = await response.json();
        setNavcategory(data);
      } catch (error) {
        console.error("Category fetch error:", error);
      }
    }

    getCategories();
  }, []);

  // Bangla date and time
  useEffect(() => {
    function updateDate() {
      setDate(
        new Intl.DateTimeFormat("bn-BD", {
          dateStyle: "full",
          timeStyle: "short",
        }).format(new Date())
      );
    }

    updateDate();

    const timer = setInterval(updateDate, 60_000);

    return () => clearInterval(timer);
  }, []);

  // Close menus
  function closeMenus() {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }

  // Sign out
  async function handleSignOut() {
    try {
      await signOut();
      closeMenus();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }

  // Category navigation
  const categoryLinks = navcategory.map((category,i) => (
    <li key={i}>
      <Link
        href={`/category/${category.slug}`}
        onClick={closeMenus}
        className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 transition hover:bg-default-100"
      >
        {category.icon && <span>{category.icon}</span>}
        {category.nameBn}
      </Link>
    </li>
  ));

  // Login and signup links
  const authLinks = (
    <>
      <li className="list-none">
        <Link
          href="/sign-in"
          onClick={closeMenus}
          className="inline-flex items-center justify-center rounded-lg border border-separator px-4 py-2 transition hover:bg-default-100"
        >
          Login
        </Link>
      </li>

      <li className="list-none">
        <Link
          href="/sign-up"
          onClick={closeMenus}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </li>
    </>
  );

  // Desktop user menu
  const desktopUserMenu = (
    <li className="relative list-none">
      <button
        type="button"
        onClick={() => setIsDropdownOpen((previous) => !previous)}
        aria-expanded={isDropdownOpen}
        className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-default-100"
      >
        <FaUserCircle className="text-2xl" />

        <span className="max-w-32 truncate font-medium">
          {user?.name || "User"}
        </span>

        <FiChevronDown />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-separator bg-background p-3 shadow-xl">
          <div className="border-b border-separator px-2 pb-3">
            <p className="break-words font-semibold">
              {user?.name || "User"}
            </p>

            <p className="break-all text-sm text-default-500">
              {user?.email}
            </p>
          </div>

          <Link
            href="/profile"
            onClick={closeMenus}
            className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-default-100"
          >
            <FiUser />
            Profile
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-danger transition hover:bg-default-100"
          >
            <FiLogOut />
            Sign Out
          </button>
        </div>
      )}
    </li>
  );

  // Mobile user menu
  const mobileUserMenu = (
    <li className="mt-3 list-none border-t border-separator pt-3">
      <div className="flex items-center gap-3 px-2 py-3">
        <FaUserCircle className="shrink-0 text-3xl" />

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {user?.name || "User"}
          </p>

          <p className="break-all text-sm text-default-500">
            {user?.email}
          </p>
        </div>
      </div>

      <Link
        href="/profile"
        onClick={closeMenus}
        className="flex items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-default-100"
      >
        <FiUser />
        Profile
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-danger transition hover:bg-default-100"
      >
        <FiLogOut />
        Sign Out
      </button>
    </li>
  );

  return (
    <div>
      <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/90 py-2 backdrop-blur-lg">
        {/* Header */}
        <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              className="shrink-0 md:hidden"
              onClick={() => setIsMenuOpen((previous) => !previous)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            <Link
              href="/"
              onClick={closeMenus}
              className="flex items-center gap-3"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-700 shadow">
                <TiShoppingCart className="text-2xl text-white" />
              </span>

              <span className="min-w-0">
                <span className="block text-xl font-bold sm:text-2xl">
                  বাজার দর
                </span>

                <span className="block text-xs sm:text-sm">
                  {date}
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop authentication */}
          <ul className="hidden items-center gap-2 md:flex">
            {isPending ? (
              <li className="list-none text-sm">Loading...</li>
            ) : user ? (
              desktopUserMenu
            ) : (
              authLinks
            )}
          </ul>
        </header>

        {/* Desktop categories */}
        <ul className="mx-auto hidden max-w-7xl flex-wrap items-center gap-3 px-5 py-2 md:flex">
          {categoryLinks}
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="border-t border-separator md:hidden">
            <ul className="flex flex-col gap-1 p-4">
              {categoryLinks}

              {isPending ? (
                <li className="list-none py-2 text-sm">
                  Loading...
                </li>
              ) : user ? (
                mobileUserMenu
              ) : (
                <li className="mt-3 flex list-none flex-col gap-2 border-t border-separator pt-4">
                  {authLinks}
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}

