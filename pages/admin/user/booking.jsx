import React, { useState, useEffect } from "react";
import Listing from "../api/Listing";
import Image from "next/image";

export default function Booking(props) {
  const {record } = props;
  // console.log("record",record)

  const [content, setContent] = useState("");

  useEffect(() => {
    const main = new Listing();
    const response = main.booking(record);
    response
      .then((res) => {
        // console.log("res", res);
        setContent(res?.data?.data?.user_booking_history);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [record]);

  return (
    <div className="">
      <div className="mx-auto mt-8 ">
        <div className="mt-6 overflow-hidden rounded-xl border shadow">
          <table className="min-w-[1200px] w-full border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b lg:table-header-group">
              <tr className="">
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6"> booking Date</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">booking Number </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Check In & Checkout Time </td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Amount</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Status</td>
                <td className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-6">Document Image and Type </td>
              </tr>
            </thead>

            <tbody className="lg:border-gray-300">
              {content && content.map((item, index) => (
                <tr className="" key={index}>

                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.booking_date}</td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">{item?.booking_number}</td>

                  <td  className="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
                    {item?.check_in} & {item?.check_out}
                  </td>

                  <td className="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
                    {item?.price}
                    <div className="flex mt-1 ml-auto w-fit items-center rounded-full bg-blue-600 py-2 px-3 text-left text-xs font-medium text-white lg:hidden">{item?.booking_status}</div>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-600 py-2 px-3 text-xs text-white">{item?.booking_status}</div>
                  </td>
                  <td className="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">
                      <Image  width={40} height={40 } className= "inline-flex items-center rounded-full " src={item?.front_url}/>
                  <div className="inline-flex items-center rounded-full">{item?.doc_type}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
