
"use client";

import Link from "next/link";
import React, { useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

interface CategoryProductsProps {
  products: Product[];
}

const CategoryProducts = ({
  products,
}: CategoryProductsProps) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low-to-high") {
      return a.today - b.today;
    }

    if (sort === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>

      {/* Sort Bar */}
      <div className="mb-4 flex items-center justify-between">

        <p className="text-lg font-semibold text-gray-900">
          সকল পণ্য
        </p>

        <div className="flex items-center gap-2">
          <label
            htmlFor="sort"
            className="text-sm font-medium text-gray-600"
          >
            Sort By:
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low-to-high">
              কম থেকে বেশি
            </option>

            <option value="high-to-low">
              বেশি থেকে কম
            </option>
          </select>
        </div>

      </div>

      {/* Products */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

        {sortedProducts.map((item) => {

          const isUp = item.change.dir === "up";

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >

              {/* Product Image */}
              <Link href={`/detailspage/${item.slug}`}>
              <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50">
                <span className="text-5xl">
                  {item.image}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="mt-3 truncate text-base font-bold text-gray-900">
                {item.nameBn}
              </h3>

              {/* Unit */}
              <p className="mt-1 text-xs text-gray-500">
                প্রতি {item.unit}
              </p>

              {/* Price */}
              <p className="mt-3 text-lg font-extrabold text-gray-900">
                ৳{item.today}
              </p>

              {/* Price Change */}
              <div
                className={`mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  isUp
                    ? "bg-red-50 text-red-600"
                    : "bg-green-50 text-green-600"
                }`}
              >
                <span>
                  {isUp ? "↑" : "↓"}
                </span>

                <span>
                  {item.change.pct}%
                </span>
              </div>
              </Link>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default CategoryProducts;
