import Link from "next/link";
import React from "react";

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

const AllProductsCard = ({ item }: { item: Product }) => {
  const isUp = item.change.dir === "up";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      
      {/* Emoji */}
     <Link href={`/detailspage/${item.slug}`}>
      <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50">
        <span className="text-5xl">{item.image}</span>
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
        <span>{isUp ? "↑" : "↓"}</span>

        <span>{item.change.pct}%</span>
      </div>
     </Link>
    </div>
  );
};

export default AllProductsCard;