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

const Mainsection = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 60 },
    },
  );

  const data: Product[] = await res.json();

  const increasedProducts = data
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct);

  const decreasedProducts = data
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct);

  return (
    <section id="সব-পণ্য" className="mx-auto max-w-7xl px-4 py-12">
      {/* দাম বেড়েছে */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">📈 দাম বেড়েছে</h2>

          <p className="mt-1 text-sm text-gray-500">
            যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {increasedProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Emoji */}
              <Link href={`/detailspage/${product.slug}`}>
                <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50">
                  <span className="text-5xl">{product.image}</span>
                </div>

                {/* Name */}
                <h3 className="mt-3 truncate text-base font-bold text-gray-900">
                  {product.nameBn}
                </h3>

                {/* Unit */}
                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>

                {/* Price */}
                <p className="mt-3 text-lg font-extrabold text-gray-900">
                  ৳{product.today}
                </p>

                {/* Change */}
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                  <span>↑</span>
                  <span>{product.change.pct}%</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* দাম কমেছে */}
      <div className="mt-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">📉 দাম কমেছে</h2>

          <p className="mt-1 text-sm text-gray-500">যেসব পণ্যের দাম কমেছে</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {decreasedProducts.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Emoji */}
              <Link href={`/detailspage/${product.slug}`}>
                <div className="flex h-20 items-center justify-center rounded-xl bg-gray-50">
                  <span className="text-5xl">{product.image}</span>
                </div>

                {/* Name */}
                <h3 className="mt-3 truncate text-base font-bold text-gray-900">
                  {product.nameBn}
                </h3>

                {/* Unit */}
                <p className="mt-1 text-xs text-gray-500">
                  প্রতি {product.unit}
                </p>

                {/* Price */}
                <p className="mt-3 text-lg font-extrabold text-gray-900">
                  ৳{product.today}
                </p>

                {/* Change */}
                <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-600">
                  <span>↓</span>
                  <span>{product.change.pct}%</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mainsection;
