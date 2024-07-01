import React, { useEffect, useState } from "react";
import Listing from "../api/Listing";
import toast from "react-hot-toast";
import Link from "next/link";
import NoRecord from "../hook/NoRecord";
import AdminLayout from "../AdminLayout";
import Loading from "../hook/loading";
import { useRouter } from "next/router";
import { MdAdd } from "react-icons/md";
import { FaTableCellsLarge } from "react-icons/fa6";
import { CgViewComfortable } from "react-icons/cg";
import { formatMultiPrice } from "../../../hooks/ValueData";

export default function Index() {
  const router = useRouter();
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const fetchProperties = () => {
    const main = new Listing();
    main
      .Adminproperty()
      .then((res) => {
        let properties = res?.data?.data;
        if (properties) {
          setRecord(properties);
          setIsLoading(false);
        } else {
          toast.error("No properties found");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchProperties();
  }, [router && router.pathname]);

  const handleDelete = (uuid) => {
    setSelectedProperty(uuid);
    setShowConfirmation(true);
  };

  const deleteProperty = (uuid) => {
    const main = new Listing();
    main
      .propertydelete(uuid)
      .then((response) => {
        if (response.data.status === true) {
          toast.success(response.data.message);
          setRecord(record.filter((item) => item.uuid !== uuid));
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting property:", error);
      });
  };

  const handleConfirmation = () => {
    deleteProperty(selectedProperty);
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleEditEntireProperty = (uuid) => {
    router.push(`/admin/property/edit/${uuid}`);
  };

  const parseLocation = (location) => {
    if (!location) {
      return "Location not available";
    }
    try {
      const parsedLocation = JSON.parse(location);
      const detailedLocation = JSON.parse(parsedLocation.location);
      return detailedLocation;
    } catch (error) {
      console.error("Error parsing location:", error);
      return "Invalid location";
    }
  };

  return (
    <>
      <AdminLayout heading="Properties">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap  pt-4 justify-between">
              <h3 className="text-xl font-bold text-black capitalize">
                Your listings
              </h3>
              <div className="flex">
              <form className="group relative ">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  />
                </svg>
                <input
                  className="focus:ring-0 bg-[#f7f7f7] focus:ring-blue-0 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-[6px] pl-10  "
                  type="text"
                  aria-label="Filter projects"
                  placeholder="Filter projects..."
                />
              </form>
                <div className="bg-[#f7f7f7] rounded-3xl w-9 mx-2 h-9 flex justify-center items-center cursor-pointer">
                  <FaTableCellsLarge />
                </div>
                <div className="bg-[#f7f7f7] rounded-3xl w-9 mr-2 h-9 flex justify-center items-center cursor-pointer">
                  <CgViewComfortable />
                </div>
                <div className="bg-[#f7f7f7] rounded-3xl w-9 h-9 flex justify-center items-center cursor-pointer">
                  <MdAdd
                    onClick={() => {
                      router.push("/admin/property/become");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap  py-5 pt-0">
              {record.length ? (
                record.map((item, index) => (
                  <div
                    className="w-full sm:w-1/1  lg:w-1/2 xl:w-1/3 sm:px-3 mt-4"
                    key={index}
                  >
                    <div className="relative border rounded-lg overflow-hidden shadow-md">
                      <img
                        className="w-full h-48 object-cover object-center"
                        src={
                          item?.property_image[0]?.image_url
                            ? item?.property_image[0]?.image_url
                            : "https://agoldbergphoto.com/wp-content/uploads/residential/Residential-13-2000x1333.jpg"
                        }
                        alt={item?.name}
                      />
                      <button
                        className="absolute text-xs top-3 right-3 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
                        onClick={() => handleDelete(item?.uuid)}
                      >
                        Remove
                      </button>
                      {item?.step_completed !== 11 ? (
                        <button className="absolute text-xs top-3 left-3 bg-indigo-600 text-white px-3 py-2 rounded-md">
                          In Progress
                        </button>
                      ) : (
                        <button className="absolute text-xs top-3 left-3 bg-green-600 text-white px-3 py-2 rounded-md">
                          Completed
                        </button>
                      )}
                      <div className="p-4">
                        <div className="flex space-x-1">
                          <h2 className="text-lg font-medium mb-2 heading-property">
                            {item.name}
                            {/* <span className="text-base">🛈</span> */}
                          </h2>
                          <div className="tooltip-container ">
                            <span className="text-base">🛈</span>
                            <div className=" tooltip-text text-sm max-w-fit p-2">
                              <span>Booking method: Instant </span>
                              <span>
                                Property Status:
                                {item?.step_completed !== 11
                                  ? "In Progress"
                                  : "Completed"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <h3 className="text-sm font-medium desc-property">
                          {/* {parseLocation(item?.location)} */}
                          {item?.description}
                        </h3>
                        <p className="text-sm text-gray-600 mt-3 capitalize">
                          {item?.type
                            ? `${item?.type?.replace("_", " ")} .`
                            : ""}
                          {item.bedrooms} Bedrooms. {item.beds} Beds.{" "}
                          {item.guests} guests. {item.bathrooms} Bathrooms.
                          {item.no_of_pet_allowed} Pets
                        </p>
                        <p className="text-sm text-gray-600 mt-3 font-bold">
                          {formatMultiPrice(item?.price)} Night
                        </p>
                        <div className="mt-4">
                          <Link href={`/admin/property/${item?.uuid}`}>
                            <div className="text-normal text-underline btn sort rounded text-gray-500 w-full mt-3 px-5 py-2 cursor-pointer font-medium">
                              View
                            </div>
                          </Link>
                          <button
                            className="text-normal text-underline btn sort rounded text-gray-500 px-5 py-2 w-full mt-3 cursor-pointer font-medium"
                            onClick={() => handleEditEntireProperty(item?.uuid)}
                          >
                            Edit Property
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <NoRecord heading={"No Record Found !!"} />
              )}
            </div>
          </>
        )}
        {showConfirmation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center mt-6 mb-6">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white px-8 rounded shadow-lg z-50 relative rounded-lg max-w-[33%]">
              <p className="text-lg font-semibold mb-4 mt-6">
                Are you sure you want to delete this property?
              </p>
              <div className="flex justify-center mb-5">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-700"
                  onClick={handleConfirmation}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
