"use client";

import ProductCard from "@/components/cards/products/product-card";
import { useGetActivityProductsQuery } from "@/redux/endpoints/milestones";
import { useParams } from "react-router-dom";
import React, { useMemo } from "react";
import NoProducts from "./no-products";
import ProductCardSkeleton from "@/components/skeletons/product-card";
import { PhotoPath } from "@/redux/ApiConfig";

const UsefulProducts = () => {
  const params = useParams();
  const { activity: activityId } = params;

  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetActivityProductsQuery({
    activity_id: activityId,
  });

  const cachedProducts = useMemo(() => products, [products]);

  return (
    <div className="w-full flex flex-col mt-[32px]">
      <div className="flex items-center w-full justify-between">
        <h4 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Useful Products
        </h4>
      </div>
      <div className="w-full flex flex-col divide divide-y">
        {isLoading || isFetching ? (
          [1, 2, 3]?.map((item: any, index: number) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : cachedProducts?.length > 0 ? (
          cachedProducts?.map((item: any, index: number) => (
            <ProductCard
              key={index}
              id={1}
              img={
                item?.photo
                  ? PhotoPath(item?.photo)
                  : "/assets/pages/no-image.jpg"
              }
              link={item?.amazon_url ?? "#"}
              store={item?.category}
              name={item?.name}
              details={item?.description}
            />
          ))
        ) : (
          <NoProducts />
        )}
      </div>
    </div>
  );
};

// const ProductsCardsData: React.ReactNode[] = [
//   <ProductCard
//     key={1}
//     id={1}
//     img="/assets/images/products/product-1.jpg"
//     link="#"
//     store="Mumzworld Toys"
//     name={"Musical Turtle Crawling Baby"}
//     details="Baby Toys 6 to 12 Months, Musical Turtle Crawling Baby Toys for 12-18 Months, Early Learning Educational Toy with Light & Sound, Birthday Toy for Infant Toddler Boy Girl 7 8 9 10 11 months"
//   />,
//   <ProductCard
//     key={2}
//     id={2}
//     img="/assets/images/products/product-2.jpg"
//     link="#"
//     store="Amazon"
//     name={"Musical Fish Crawling Baby"}
//     details="Baby Toys 6 to 12 Months, Musical Turtle Crawling Baby Toys for 12-18 Months, Early Learning Educational Toy with Light & Sound, Birthday Toy for Infant Toddler Boy Girl 7 8 9 10 11 months"
//   />,
//   <ProductCard
//     key={3}
//     id={3}
//     img="/assets/images/products/product-3.jpg"
//     link="#"
//     store="Noon Toys"
//     name={"Musical Crawling Roller"}
//     details="Baby Toys 6 to 12 Months, Musical Turtle Crawling Baby Toys for 12-18 Months, Early Learning Educational Toy with Light & Sound, Birthday Toy for Infant Toddler Boy Girl 7 8 9 10 11 months"
//   />,
// ];

export default UsefulProducts;
