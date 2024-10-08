import React, { useContext } from "react";
import Star from "../../public/_svgs/star";
import Dates from "../SingleListingComponents/Dates";
import Guests from "../SingleListingComponents/Guests";
import { format } from "date-fns";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Context } from "../../pages/_app";
import { formatMultiPrice } from "./../../hooks/ValueData";
import StartRating from "../../pages/elements/StartRating";

const Date_GuestsPickerCard = React.forwardRef(
  (
    {
      selection,
      setSelection,
      selectedDay,
      selectEnd,
      setSelectedDay,
      setSelectEnd,
      result,
      guests,
      setGuests,
      listing,
      loading,
    },
    ref
  ) => {
    const router = useRouter();
    const { auth, setOpenLogin } = useContext(Context);

    return (
      <>
        {loading ? (
          <div className="sticky animate-pulse top-28 left-0 min-w-[25rem] min-h-[500px] bg-gray-200 rounded-md"></div>
        ) : (
          <div className="sticky top-28 left-0 sm:min-w-[25rem]">
            <div className="rounded-xl shadow border border-[#efa3a3] py-5 px-4 sm:p-5">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-md font-bold">
                  <span className=" text-theme text-2xl">
                    {formatMultiPrice(listing?.price) ?? 0}
                  </span>{" "}
                  /night
                </h1>
                <span className="flex items-center gap-1 sm:gap-2">
                  <span className="flex items-center gap-1">
                  <StartRating size={15} value={parseFloat( listing?.rating && listing?.rating?.toFixed(2)) ?? 0} color={"#000000"}/>
                  </span>
                </span>
              </div>
              <div className="rounded-lg border border-[#efa3a3] mb-6 relative">
                <Dates 
                  selection={selection}
                  setSelection={setSelection}
                  selectedDay={selectedDay}
                  selectEnd={selectEnd}
                  setSelectedDay={setSelectedDay}
                  setSelectEnd={setSelectEnd}
                  position={`calendar`}
                /> 
                <Guests
                  selection={selection}
                  setSelection={setSelection}
                  result={result}
                  guests={guests}
                  setGuests={setGuests}
                />
              </div>

              <div ref={ref}>
                {auth && auth?.name ? (
                  <button
                    className=" btn w-full mt-4 hover:bg-[#efa3a3] border-2 border-[#efa3a3] hover:border-[#efa3a3] text-[#efa3a3] hover:text-[#fff]"
                    onClick={() => {
                      if (selectedDay == null || selectEnd == null) {
                        toast.error("Date not selected");
                        return;
                      }
                      if (guests?.adults?.value == null || guests?.adults?.value == 0) {
                        toast.error("Please choose alteast one adult.");
                        return;
                      }
                      router.push(
                        `/book/${encodeURIComponent(
                          listing?.uuid
                        )}?numberOfAdults=${
                          guests?.adults?.value
                        }&numberOfChildren=${
                          guests?.children?.value
                        }&numberOfInfants=${
                          guests?.infants?.value
                        }&numberOfPets=${guests?.pets?.value}&checkin=${format(
                          selectedDay,
                          "yyyy-MM-dd"
                        )}&checkout=${format(selectEnd, "yyyy-MM-dd")}`
                      );
                    }}
                  >
                    Check Availability
                  </button>
                ) : (
                  <button
                    onClick={() => setOpenLogin(true)}
                    className=" btn w-full mt-4 hover:bg-[#efa3a3] border-2 border-[#efa3a3] hover:border-[#efa3a3] text-[#efa3a3] hover:text-[#fff]">
                    Check Availability
                  </button>
                )}

                <button
                  className=" btn w-full mt-4 hover:bg-[#efa3a3] border-2 border-[#efa3a3] hover:border-[#efa3a3] text-[#efa3a3] hover:text-[#fff]"
                  onClick={() => {
                    router.push(`/about`);
                  }} >
                  Contact
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default Date_GuestsPickerCard;
