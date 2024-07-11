import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import { useRouter } from "next/router";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { House } from "iconsax-react";
import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";
import Guest from "../add/Guest";
import CancelPolicy from "../add/CancelPolicy";
import HouseRules from "../add/HouseRules";
import { set } from "date-fns";

const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "farm", label: "Farm" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Edit() {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);
  const [editguide, setEditguide] = useState("space");
  const [record, setRecord] = useState({
    loading: true,
    data: {},
  });

  console.log("record", record)
  const fetchProperty = async (slug) => {
    if (slug) {
      setLoading(true);
      const main = new Listing();
      try {
        const response = await main.viewproperty(slug || "");
        setRecord({
          loading: false,
          data: response?.data?.data,
        });
      } catch (err) {
        setRecord({
          loading: true,
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchProperty(slug);
  }, [slug]);

  useEffect(() => {
    if (!record.loading) {
      setItem({
        Guests: record?.data?.guests || "",
        name: record?.data?.name || "",
        about: record?.data?.description || "",
        propertytype: record?.data?.property_type || "flat",
        customLink: record?.data?.custom_link || "",
        price: record?.data?.price || "",
        discount: record?.data?.discount_offer || ""
      });
      setGuests(record?.data?.guests || 1)
      setBeds(record?.data?.beds || 1)
      setBeds(record?.data?.beds || 1)
      setBathrooms(record?.data?.bathrooms || 0.5)
      setBedrooms(record?.data?.bedrooms || 1)
      setPType(record?.data?.property_type || "flat");
      setSelectedPolicy(record?.data?.property_rule?.standard_policy)
      setPetsAllowed(record?.data?.property_rule?.pet_allowed || 0);
      setEventsAllowed(record?.data?.property_rule?.events_allowed || 0);
      setSmokingAllowed(record?.data?.property_rule?.smoking_allowed || 0);
      setQuietHours(record?.data?.property_rule?.quiet_hours_allowed || 0);
      setPhotographyAllowed(record?.data?.property_rule?.photography_allowed || 0);
      setPets(record?.data?.property_rule?.pet_allowed || 0);
      setLongTermPolicy(record?.data?.property_rule?.long_term_policy);
      setCheckinStart(record?.data?.check_in || "00:00");
      setCheckinquiet(record?.data?.property_rule?.quite_hours_in_time || "00:00")
      setCheckoutquiet(record?.data?.property_rule?.quite_hours_out_time || "00:00")
    }
  }, [record]);

  const [Guests, setGuests] = useState();
  const [Beds, setBeds] = useState();
  const [Bathrooms, setBathrooms] = useState();

  const [Bedrooms, setBedrooms] = useState();
  const [pets, setPets] = useState();
  const [checkinStart, setCheckinStart] = useState();
  const [checkinquet, setCheckinquiet] = useState(
  );
  const [checkoutquet, setCheckoutquiet] = useState(
  );

  const [PType, setPType] = useState(record?.data?.property_type || "flat");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const [selectbooking, setSelectedbooking] = useState('instant');
  const handleBookingChange = (option) => {
    setSelectedbooking(option);
  };
  
  console.log("record", record)
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [longTermPolicy, setLongTermPolicy] = useState(null);
  const [showFlexible, setShowFlexible] = useState(true);
  const [showFirm, setShowFirm] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(

  );
  const [eventsAllowed, setEventsAllowed] = useState(
  );
  const [smokingAllowed, setSmokingAllowed] = useState(
  );
  const [quietHours, setQuietHours] = useState(
  );
  const [PhotographyAllowed, setPhotographyAllowed] = useState(
  );
  const [item, setItem] = useState({
    about: "",
    propertytype: "",
    name: "",
    Guests: "",
    Beds: "",
    Bedrooms: "",
    Bathrooms: "",
    customLink: '',
    discount: '',
    price: ''

  });

  console.log("desc", item)
  const baseurl = "https://quant-stay.vercel.app/properties/";
  const fulllink = baseurl + item?.customLink;

  const copyToClipboard = () => {
    const textToCopy = `${baseurl}${item?.customLink}`;
    console.log("textToCopy", textToCopy);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => { })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleTabClick = (value) => {
    setEditguide(value);
  };

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            {loading ? (
              <div className="flex justify-center">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                <Property
                  fetchProperties={() => fetchProperty(slug)}
                  isEdit={true}
                  stepdata={false}
                  p={record.data}
                />
                {/* <div className="container mx-auto flex">
                  <div className="w-1/3">
                    <div className="flex items-left space-x-2" onClick={() => { router.back(-1) }}>
                      <IoArrowBack />
                      <h2>Listing Editor</h2>
                    </div>
                    <div className="flex justify-left space-x-4 my-4">
                      <button
                        id="tab--navigation-tabs--0"
                        value={"space"}
                        onClick={() => handleTabClick("space")}
                        className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "space"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                          }`}
                        role="tab"
                        aria-selected={editguide === "space"}
                      >
                        Your space
                      </button>
                      <button
                        id="tab--navigation-tabs--1"
                        value={"guide"}
                        onClick={() => handleTabClick("guide")}
                        className={`py-2 px-4 rounded-lg focus:outline-none ${editguide === "guide"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-gray-700"
                          }`}
                        role="tab"
                        aria-selected={editguide === "guide"}
                      >
                        Arrival guide
                      </button>
                    </div>
                    {editguide === "space" && (
                      <>
                        <div className=" p-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 0 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(0)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Title</h3>
                            <p className="font-normal text-sm">{record?.data?.name}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 1 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(1)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2 ">Property Type</h3>
                            <p className="font-normal text-sm capitalize ">{record?.data?.type?.replace("_", " ")} {PType} </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 2 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(2)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Number of Guests  </h3>
                            <p className="font-normal text-sm">{record?.data?.guests}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 3 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(3)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Description </h3>
                            <p className="font-normal text-sm line-clamp-3">{record?.data?.description}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 5 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(5)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Booking System  </h3>
                            <p className="font-normal text-sm capitalize"> {selectbooking} Book</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 8 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(8)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">House Rule </h3>
                            <p className="font-normal text-sm capitalize">Add Details </p>
                          </div>
                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 6 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(6)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Cancel Policy  </h3>
                            <p className="font-normal text-sm capitalize"> {longTermPolicy || selectedPolicy}</p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 7 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(7)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2">Custom Link  </h3>
                            <p className="font-normal text-sm">
                              {item?.customLink || "Add Details"}
                            </p>
                          </div>

                          <div
                            className={`cursor-pointer border border-gray-300 rounded-md p-4 mt-3 ${expandedIndex === 9 && "hover:text-black bg-border-600"
                              }`}
                            onClick={() => toggleExpanded(9)}
                          >
                            <h3 className="font-bold text-2xl mt-3 mb-2"> Pricing  </h3>
                            <p className="font-normal text-sm">{record?.data?.price}</p>
                          </div>
                        </div>
                        <div className="w-0.5 bg-gray-300"></div>
                      </>
                    )}

                  </div>
                  <div className="w-2/3 mt-4  ">
                    {editguide === "space" && (

                      <div className="">
                        {expandedIndex === 9 && (
                          <div className="p-4">
                            <h1 className="uppercase text-lg sm:text-sm">
                              Proprety Pricing
                            </h1>

                            <p className="text-sm capitalize ">
                              These settings apply to all nights, unless you customise them by date.
                            </p>

                            <div className="flex flex-col mb-2">
                              <h1 className="capitalize text-lg font-bold my-4">
                                Nightly price
                              </h1>

                              <input
                                required
                                type="number"
                                name="price"
                                placeholder="Property Price Per Night"
                                id="name"
                                className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                                min="0"
                                value={item?.price}
                                onChange={handleInputChange}
                              />
                            </div>


                            <div className="flex flex-col mb-2">
                              <h1 className="capitalize text-lg font-bold my-4">
                                Discount offer (%){" "}
                              </h1>
                              <label className="flex items-center space-x-2 text-xl font-normal">
                                <input
                                  className="p-4 py-2 w-36 md:w-full mt-1 block text-[16px] md:text-lg border border-[#ccc] rounded-md"
                                  placeholder="% Discount offer"
                                  type="number"
                                  name="discount"
                                  value={item?.discount}
                                  onChange={handleInputChange}
                                />
                              </label>
                            </div>
                          </div>
                        )}
                        {expandedIndex === 0 && (
                          <div className="p-4">
                            <h1>
                              Proprety Name
                            </h1>
                            <textarea
                              required
                              id="about"
                              name="name"
                              minCol={"5"}
                              minRow={"5"}
                              value={item?.name}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                            />
                            <div className="flex flex-wrap justify-between">
                              <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                                {item?.name ? (
                                  <span>{item?.name.length}/32 characters</span>
                                ) : (
                                  <span>0/32 characters</span>
                                )}
                              </label>
                              <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                                Minimum 32 words.
                              </label>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 8 && (
                          <div className="p-4">

                            <HouseRules
                              petsAllowed={petsAllowed}
                              setPetsAllowed={setPetsAllowed}
                              quietHours={quietHours}
                              pets={pets}
                              setPets={setPets}
                              checkinTime={checkinquet}
                              setCheckinTime={setCheckinquiet}
                              checkoutTime={checkoutquet}
                              setCheckoutTime={setCheckoutquiet}
                              setEventsAllowed={setEventsAllowed}
                              setQuietHours={setQuietHours}
                              eventsAllowed={eventsAllowed}
                              PhotographyAllowed={PhotographyAllowed}
                              setPhotographyAllowed={setPhotographyAllowed}
                              smokingAllowed={smokingAllowed}
                              setSmokingAllowed={setSmokingAllowed}
                            />
                          </div>
                        )}

                        {expandedIndex === 1 && (
                          <div className="p-4">
                            <h2 className="text-black font-bold capitalize text-2xl mt-2 mb-2 ">
                              Property type
                            </h2>

                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                              {propertyTypes &&
                                propertyTypes.map((p, i) => (
                                  <div key={i} className="">
                                    <div
                                      onClick={() => setPType(p?.value)}
                                      className={`property-type-wrap cursor-pointer p-4 hover:shadow-[0_0px_0px_1.5px_#222] shadow-[0_0px_0px_1px_#ccc] rounded-[8px] ${p?.value === PType
                                        ? "bg-[#efefef] shadow-[0_0px_0px_1px_#efefef] text-slate-700"
                                        : ""
                                        }`}
                                    >
                                      {p.value === "flat" && (
                                        <FaBuilding
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "house" && (
                                        <FaHome
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "unique_space" && <House size={30} />}
                                      {p.value === "guest_house" && (
                                        <FaDoorOpen
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "hotel" && (
                                        <FaHotel
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "single_room" && (
                                        <FaBed
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "boutique_hotel" && (
                                        <FaCouch
                                          style={{ color: "#222222", fontSize: "30px" }}
                                        />
                                      )}
                                      {p.value === "breakfast" && (
                                        <MdOutlineFreeBreakfast size={30} />
                                      )}
                                      {p.value === "farm" && (
                                        <FaWarehouse style={{ fontSize: "30px" }} />
                                      )}
                                      <h2
                                        className={`text-[16px] mt-[10px] font-normal ${p.value === PType
                                          ? "text-[#222222]"
                                          : "text-[#222222]"
                                          }`}
                                      >
                                        {p.label}
                                      </h2>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        )}

                        {expandedIndex === 2
                          && (
                            <Guest
                              Guests={Guests}
                              setGuests={setGuests}
                              Beds={Beds}
                              setBeds={setBeds}
                              Bedrooms={Bedrooms}
                              setBedrooms={setBedrooms}
                              Bathrooms={Bathrooms}
                              setBathrooms={setBathrooms}
                            />
                          )}

                        {expandedIndex === 3 && (
                          <div className="p-4">
                            <textarea
                              required
                              id="about"
                              name="description"
                              value={item?.about}
                              onChange={handleInputChange}
                              className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                            />
                            <div className="flex flex-wrap justify-between">
                              <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                                {item?.about ? (
                                  <span>{item?.about.length}/500 characters</span>
                                ) : (
                                  <span>0/500 characters</span>
                                )}
                              </label>
                              <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                                Minimum 500 words.
                              </label>
                            </div>
                          </div>
                        )}

                        {expandedIndex === 5
                          && (
                            <div className="transition-opacity duration-600">
                              <div className="space-y-4">
                                <div className="flex flex-col items-start space-y-2" style={{ animationDelay: '400ms' }}>
                                  <h1 className="text-2xl font-bold" tabIndex="-1">Decide how you’ll confirm reservations</h1>
                                </div>
                                <div className="space-y-4">
                                  <div className="flex flex-col space-y-4" role="radiogroup">
                                    <div className="flex items-center space-x-4" style={{ '--list_animation-delay': '400ms' }}>
                                      <button
                                        className={`flex items-center space-x-4 p-4 border rounded-lg ${selectbooking === 'instant' ? 'border-black' : 'border-gray-300'}`}
                                        type="button"
                                        role="radio"
                                        aria-checked={selectbooking === 'instant'}
                                        onClick={() => handleBookingChange('instant')}
                                      >
                                        <div className="flex flex-col space-y-1">
                                          <h2 className="text-lg font-semibold">Use Instant Book</h2>
                                          <div className="text-gray-600">Guests can book automatically.</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="h-8 w-8 fill-current text-black">
                                            <path d="M17.16 1.46L6.19 17.42l-.1.17c-.05.12-.06.18-.08.4l.04.13c.19.65.23.67.97.88H13v10.97l.04.22c.05.28.1.33.4.61l.27.09c.51.16.59.1 1.13-.35l10.97-15.96.1-.18c.05-.11.06-.17.08-.39l-.04-.13c-.19-.66-.23-.67-.97-.88H19V2.03l-.04-.22c-.05-.28-.1-.33-.4-.61l-.27-.09c-.51-.16-.59-.1-1.13.35zM17 5.22V15h6.1L15 26.78V17H8.9L17 5.22z"></path>
                                          </svg>
                                        </div>
                                      </button>
                                    </div>
                                    <div className="flex items-center space-x-4" style={{ '--list_animation-delay': '449.7412007086385ms' }}>
                                      <button
                                        className={`flex items-center space-x-4 p-4 border rounded-lg ${selectbooking === 'request' ? 'border-black' : 'border-gray-300'}`}
                                        type="button"
                                        role="radio"
                                        aria-checked={selectbooking === 'request'}
                                        onClick={() => handleBookingChange('request')}
                                      >
                                        <div className="flex flex-col space-y-1">
                                          <h2 className="text-lg font-semibold">Approve or decline requests</h2>
                                          <div className="text-gray-600">Guests must ask if they can book.</div>
                                        </div>
                                        <div className="flex-shrink-0">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" className="h-8 w-8 fill-current text-black">
                                            <path d="M26 1a5 5 0 0 1 5 4.78v10.9a5 5 0 0 1-4.78 5H26a5 5 0 0 1-4.78 5h-4l-3.72 4.36-3.72-4.36H6a5 5 0 0 1-4.98-4.56L1 21.9 1 21.68V11a5 5 0 0 1 4.78-5H6a5 5 0 0 1 4.78-5H26zm-5 7H6a3 3 0 0 0-3 2.82v10.86a3 3 0 0 0 2.82 3h4.88l2.8 3.28 2.8-3.28H21a3 3 0 0 0 3-2.82V11a3 3 0 0 0-3-3zm-1 10v2H6v-2h14zm6-15H11a3 3 0 0 0-3 2.82V6h13a5 5 0 0 1 5 4.78v8.9a3 3 0 0 0 3-2.82V6a3 3 0 0 0-2.82-3H26zM15 13v2H6v-2h9z"></path>
                                          </svg>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                        {expandedIndex === 6 &&
                          <CancelPolicy
                            showFirm={showFirm}
                            setShowFirm={setShowFirm}
                            setShowFlexible={setShowFlexible}
                            selectedPolicy={selectedPolicy}
                            setSelectedPolicy={setSelectedPolicy}
                            showFlexible={showFlexible}
                            longTermPolicy={longTermPolicy}
                            setLongTermPolicy={setLongTermPolicy}
                          />
                        }

                        {expandedIndex === 7 && (
                          <div className="flex flex-col mb-2">
                            <h1
                              htmlFor="customLink"
                              className="text-[20px] md:text-2xl font-bold"
                            >
                              Custom Link
                            </h1>
                            <div className="relative mt-2 mb-4">
                              <div className="flex w-full">
                                <span className="inline-block bg-gray-200 p-2 rounded-l flex-shrink-0">
                                  {baseurl}
                                </span>
                                <textarea
                                  rows={5}
                                  cols={5}
                                  type="text"
                                  className="form-control flex-1 py-2 px-4 border border-l-0 rounded-r"
                                  id="customLink"
                                  name="customLink"
                                  aria-describedby="basic-addon3"
                                  placeholder="Enter your custom link here"
                                  value={item.customLink}
                                  onChange={handleInputChange}
                                />
                                <svg
                                  onClick={copyToClipboard}
                                  className="cursor-pointer h-7 w-7 absolute right-2 top-2"
                                  viewBox="0 0 448 512"
                                >
                                  <path d="M208 0H332.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H208c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128h80v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
                                </svg>
                              </div>
                              <div className="text-right text-sm text-gray-500">
                                {baseurl.length + item.customLink.length}/{100}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="border-t-[7px]">
                          <div className="flex justify-end fixed  z-50 bottom-4 right-4 border-t-[7px]">
                            <button className="text-white bg-black p-3 border-2 rounded-md">
                              Submit
                            </button>
                          </div>
                        </div>



                      </div>)}
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>

    </>
  );
}


