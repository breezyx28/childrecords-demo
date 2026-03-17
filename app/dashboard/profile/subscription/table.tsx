"use client";

import { useSubscriptionHistoryQuery } from "@/redux/endpoints/subscription";
import React from "react";

const SubscriptionTable = () => {
  const { data, isLoading } = useSubscriptionHistoryQuery(undefined);
  const billingHistory = data?.billing_history ?? [];

  return (
    <div className="w-full">
      <p className="py-[12px] text-black text-[16px] font-[800] leading-[21.82px]">
        Billing History
      </p>
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                  Date
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                  Description
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                  Price
                </p>
              </th>
              <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                  Status
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((item: any, index: number) => (
              <tr key={item?.id ?? index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                    {item?.date}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                    {[item?.plan, item?.payment_method].filter(Boolean).join(" · ")}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                    {item?.amount}
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  {item?.status === "paid" ? (
                    <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                      Paid
                    </p>
                  ) : (
                    <p className="text-error-600 text-[14px] font-[700] leading-[18.2px]">
                      Failed
                    </p>
                  )}
                  <a
                    href={item?.invoice ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 underline text-[14px] font-[700] leading-[18.2px]"
                  >
                    View invoice
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionTable;
