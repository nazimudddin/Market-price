"use client";

import benner from "../../../public/bazar-hero.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    const updateDate = () => {
      const formatted = new Intl.DateTimeFormat("bn-BD", {
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date());

      setDate(formatted);
    };

    updateDate();

    const timer = setInterval(updateDate, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-white px-4 py-8 sm:px-6 lg:px-8">
      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-linear-to-br from-green-50 via-white to-emerald-50 shadow-sm ring-1 ring-green-100">
        <div className="grid items-center gap-10 px-6 py-10 sm:px-10 md:py-14 lg:grid-cols-2 lg:gap-16 lg:px-14">
          
          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">

            {/* Eyebrow / Small Text */}
            <div className="mb-5">
              <p className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 ring-1 ring-green-200">
                {date ?? "সময় লোড হচ্ছে..."}
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              আজকের{" "}
              <span className="text-green-700">
                বাজারের দাম
              </span>{" "}
              এক নজরে
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-gray-600 sm:text-lg lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
              দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* CTA */}
            <div className="mt-8">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center rounded-xl bg-green-700 px-7 py-3.5 font-bold text-white shadow-md transition duration-200 hover:bg-green-800 hover:shadow-lg active:scale-95"
              >
                সব পণ্য দেখুন
                <span className="ml-2 text-lg">↓</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE HERO IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              {/* Image Background Glow */}
              <div className="absolute inset-10 rounded-full bg-green-200/50 blur-3xl" />

              <Image
                src={benner}
                width={500}
                height={500}
                alt="বাজারের পণ্য"
                priority
                className="relative mx-auto h-auto w-full object-contain drop-shadow-xl"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}

    </main>
  );
};

export default HomePage;