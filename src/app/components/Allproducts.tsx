import React from 'react';
import AllProductsCard from './AllProductsCard';
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
const Allproducts = async() => {
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
        <div className='mx-auto max-w-7xl px-4 py-12'>
            <h3 className='text-3xl font-bold mb-3'>সব পণ্য</h3>
            <p className='text-[1.3rem] font-semibold'>মোট {data.length}টি পণ্য দেখানো হচ্ছে</p>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-4'>

            {
                data.map((item:Product)=> <AllProductsCard key={item.id} item={item}></AllProductsCard>  )
            }
        </div>  
        </div>

    );
};

export default Allproducts;