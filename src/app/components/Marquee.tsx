import Link from "next/link";
import React from "react";
import FastMarquee from "react-fast-marquee";

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

const MarqueeSection = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 60,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return (
    <div className="bg-white border-y py-2">
      <FastMarquee speed={70} pauseOnHover>
        {data.map((item) => (
          <Link
            key={item.id}
            href={`/detailspage/${item.slug}`}
            className="flex items-center gap-2 whitespace-nowrap mr-10"
          >
            <span className="text-xl">{item.categoryIcon}</span>

            <span className="font-semibold">
              {item.nameBn}
            </span>

            <span>
              {item.today} টাকা/{item.unit}
            </span>

            {item.change.dir === "up" ? (
              <span className="text-red-500">
                ▲ {item.change.pct}%
              </span>
            ) : (
              <span className="text-green-500">
                ▼ {item.change.pct}%
              </span>
            )}
          </Link>
        ))}
      </FastMarquee>
    </div>
  );
};

export default MarqueeSection;