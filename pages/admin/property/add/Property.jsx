import React, { useEffect, useState } from "react";
import Listing from "../../api/Listing";
import Router, { useRouter } from "next/router";
import Image from 'next/image'
import toast from "react-hot-toast";
import axios from "axios";
import Aminites from "./Amenities";
import HouseRules from "./HouseRules";
import CancelPolicy from "./CancelPolicy";
import { House, Add } from "iconsax-react";
import {
  MdOutlineFreeBreakfast,
} from "react-icons/md";
import {
  FaBuilding,
  FaHome,
  FaWarehouse,
  FaDoorOpen,
  FaHotel,
  FaBed,
  FaCouch,
} from "react-icons/fa";
import Guest from "./Guest";
const mapStyles = {
  width: '100%',
  height: '400px',
};


const propertyTypes = [
  { value: "flat", label: "Flat & Apartment" },
  { value: "house", label: "House" },
  { value: "unique_space", label: "Unique Space" },
  { value: "guest_house", label: "Guest House" },
  { value: "hotel", label: "Hotel" },
  { value: "single_room", label: "Single Room" },
  { value: "boutique_hotel", label: "Boutique Hotel" },
  { value: "fram", label: "Fram" },
  { value: "breakfast", label: "Bed & Breakfast" },
];

export default function Property(props) {
  const { isEdit, p, onClose, fetchProperties } = props;
  const {
    uuid,
    location,
    properties_type,
    name,
    no_of_pet_allowed,
    price,
    description,
    bedrooms,
    safety_amenity, standout_amenity, long_term_policy, standard_policy, house_manuals, direction, pet_allowed, events_allowed, smoking_allowed, quiet_hours_allowed, photography_allowed, step_completed,
    guests, pet_fee, extra_guest_fee, flexible_check_in, check_in,
    bathrooms, cleaning_fee, wifiPassword, wifiusername,
    amenities, check_out, additional_rules,
    property_image, status


  } = p ? p : {};

  const router = useRouter();
  const [step, setStep] = useState(step_completed || 0);
  const [Loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [PType, setPType] = useState(properties_type);
  const lstring = location ? JSON.parse(location.replace('/\\"/g', '"')) : null;
  const l = JSON.parse(lstring);

  const [address, setAddress] = useState({
    street_address: l && l.street_address ? l.street_address : "",
    flat_house: l && l.flat_house ? l.flat_house : "",
    district: l && l.district ? l.district : "",
    nearby: l && l.nearby ? l.nearby : "",
    city: l && l.city ? l.city : "",
    state: l && l.state ? l.state : "",
    pin: l && l.pin ? l.pin : "",
    location: l && l.location ? l.location : "",
    latitude: l && l.latitude ? l.latitude : "",
    longitude: l && l.longitude ? l.longitude : "",
  });

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };
  const [typeHere, setTypeHere] = useState("entire_place");


  const [checkinStart, setCheckinStart] = useState(check_in || "12:00");
  const [checkinEnd, setCheckinEnd] = useState(flexible_check_in || "flexible");
  const [checkout, setCheckout] = useState(check_out || "12:00");
  const [item, setItem] = useState({
    name: name || "",
    about: description || "",
    price: price || "",
    propertytype: PType || "",
    pets: no_of_pet_allowed || "1",
    free_cancel_time: "",
    cleaning: cleaning_fee || "",
    pet: pet_fee || "",
    extra_guest: extra_guest_fee || "",
    direction: direction || "",
    housemanual: house_manuals || "",
    wifi: wifiusername || '',
    additonalrule: additional_rules || "",
    wifiPassword: wifiPassword || ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleFileChange = async (e) => {
    let files = Array.from(e.target.files);
    let arr = [];
    files.forEach((element) => {
      arr.push(element);
    });
    setImages([...images, ...arr]);
  };

  const removeImage = (f) => {
    const filter = images && images?.filter((file, index) => file !== f);
    setImages(filter);
  };
  function stringToArray(inputString) {
    return inputString.split(",");
  }

  const [selectedOption, setSelectedOption] = useState(status || '1');
  const [Guests, setGuests] = useState(guests || 1);
  const [Bedrooms, setBedrooms] = useState(bedrooms || 1);
  const [Bathrooms, setBathrooms] = useState(bathrooms || 0.5);
  const [pets, setPets] = useState(no_of_pet_allowed || 1);
  const [selectedAmenity, setSelectedAmenity] = useState(amenities ? stringToArray(amenities) : []);
  const [Amenity, setAmenity] = useState(safety_amenity ? stringToArray(safety_amenity) : []);
  const [standoutAmenity, setstandoutAmenity] = useState(standout_amenity ? stringToArray(standout_amenity) : []);
  const [longTermPolicy, setLongTermPolicy] = useState(long_term_policy || null);
  const [selectedPolicy, setSelectedPolicy] = useState(standard_policy || null);
  const [showFlexible, setShowFlexible] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [petsAllowed, setPetsAllowed] = useState(pet_allowed || 0);
  const [eventsAllowed, setEventsAllowed] = useState(events_allowed || 0);
  const [smokingAllowed, setSmokingAllowed] = useState(smoking_allowed || 0);
  const [quietHours, setQuietHours] = useState(quiet_hours_allowed || 0);
  const [PhotographyAllowed, setPhotographyAllowed] = useState(photography_allowed || 0);
  const prevStep = () => setStep((prev) => prev - 1);

  const nextStep = async () => {
    // if (step === 0 && PType == '') {
    //   toast.error("Please choose a property type which one you want to list.");
    // }
    // if (step === 1 && (item?.name === "" || item?.price === "" || item?.about === "")) {
    //   toast.error(`All fields are required.`);
    //   return false;
    // }
    // if (step === 1 && (!item?.about || item?.about?.trim()?.length === 0 || item?.about?.length < 100)) {
    //   toast.error("Property description is too short. Description should be a minimum of 100 words.");
    //   return false;
    // }
    // if (step === 2 && (
    //   address?.pin === "" || address?.pin?.length < 5 ||
    //   address?.state === "" ||
    //   address?.city === "" ||
    //   address?.street_address === "" ||
    //   address?.district === "")) {
    //   toast.error(`Incomplete address. Please enter complete address.`);
    //   return false;
    // }
    // if (step == 4 && item?.selectedAmenities && item?.selectedAmenities?.length < 4) {
    //   toast.error("Please choose atleast 4 amenities.");
    //   return false;
    // }
    setStep((prev) => prev + 1);
  };
  const [locationupdate, setLocationupdate] = useState([]);
  const getNavigator = () => {
    if (typeof navigator !== "undefined") {
      return navigator;
    } else {
      console.error("navigator is not available");
      return null;
    }
  };

  const fetchLocationData = async () => {
    setLoading(true);
    const navigatorObj = getNavigator();

    if (navigatorObj && navigatorObj.geolocation) {
      navigatorObj.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            let locationData;
            if (!isEdit) {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              locationData = response.data;
            } else {
              const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${address?.latitude}&lon=${address?.longitude}&format=json`
              );
              locationData = response.data;
              setLocationupdate(locationData?.address);
            }
            setAddress({
              location: locationData.display_name,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              street_address:
                locationData?.address?.road || locationupdate?.road,
              district:
                locationData?.address?.state_district ||
                locationupdate?.state_district,
              nearby: locationData?.address?.suburb || locationupdate?.suburb,
              city: locationData?.address?.city || locationupdate?.city,
              state: locationData?.address?.state || locationupdate?.state,
              pin: locationData?.address?.postcode || locationupdate?.postcode,
            });
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log("Error fetching data:", error);
          }
        },
        () => {
          setLoading(false);
          console.log("Geolocation failed");
        }
      );
    }
  };

  const fetchLocation = async () => {
    const formattedAddress = `${address.street_address}, ${address.nearby}, ${address.district}, ${address.city}, ${address.state}, ${address.pin}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formattedAddress
        )}&key=AIzaSyDzPG91wtUKY3vd_iD3QWorkUCSdofTS58`
      );
      const { results } = response.data;
      if (results && results.length > 0) {
        setAddress({
          ...address,
          location: results[0]?.formatted_address,
          latitude: results[0]?.geometry?.location?.lat,
          longitude: results[0]?.geometry?.location?.lng,
        });
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const [imageproperty, setImagesproperty] = useState(property_image);

  const deletePropertyImage = (recordUUID, itemUUID) => {
    const main = new Listing();
    main
      .propertyImagedelete(recordUUID, itemUUID)
      .then((response) => {
        toast.success(response.data.message);
        setImagesproperty(
          imageproperty.filter((item) => item.uuid !== itemUUID)
        );
        property_image.filter((item) => item.uuid !== itemUUID);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEdit && step === 5 && images?.length < 5) {
      toast.error("Please select at least five images.");
      return false;
    }
    if (isEdit && step === 5 && images?.length + imageproperty?.length < 5) {
      toast.error("Please select at least five images.");
      return false;
    }
    setLoading(true);
    const main = new Listing();
    const formData = new FormData();
    formData.append("type", typeHere);
    formData.append("properties_type", PType);
    formData.append("name", item?.name);
    formData.append("no_of_pet_allowed", pets);
    formData.append("description", item?.about);
    formData.append("price", item?.price);
    formData.append("bedrooms", Bedrooms);
    formData.append("bathrooms", Bathrooms);
    formData.append("guests", Guests);
    formData.append("address", JSON.stringify(address));
    formData.append("amenities", selectedAmenity);
    formData.append("standout_amenity", standoutAmenity);
    formData.append("safety_amenity", Amenity);
    formData.append("cleaning_fee", item?.cleaning);
    formData.append("extra_guest_fee", item?.extra_guest);
    formData.append("pet_fee", item?.pet);
    formData.append("flexible_check_in", checkinEnd);
    formData.append("check_in", checkinStart);
    formData.append("check_out", checkout);
    formData.append("status", selectedOption);
    formData.append("step_completed", step);
    formData.append("standard_policy", selectedPolicy);
    formData.append("wifi_username", item?.wifi);
    formData.append("wifi_password", item?.wifiPassword);
    formData.append("long_term_policy", longTermPolicy);
    formData.append("house_manuals", item?.housemanual);
    formData.append("pet_allowed", petsAllowed);
    formData.append("events_allowed", eventsAllowed);
    formData.append("direction", item?.direction);
    formData.append("smoking_allowed", smokingAllowed);
    formData.append("quiet_hours_allowed", quietHours);
    formData.append("photography_allowed", PhotographyAllowed);
    formData.append("additional_rules", PhotographyAllowed);
    images.forEach((image, index) => {
      formData.append("property_image[]", image);
    });
    const response = isEdit
      ? main.propertyedit(uuid, formData)
      : main.addproperty(formData);
    response
      .then((res) => {
        if (res?.data?.status === true) {
          if (isEdit) {
            onClose();
            toast.success(res.data.message);
            fetchProperties && fetchProperties();
          } else {
            router.push("/admin/property");
            toast.success(res.data.message);
          }
        } else {
          toast.error(res.data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  useEffect(() => { }, [images]);
  const [propertyDuplicated, setpropertyDuplicated] = useState(false);



  return (
    <>
      <style>{`
      .ammenties-checked-lists input:checked+ label { background: #006fc7;color:#fff;}
      // .property-type:checked + label { color :#000 !important;border-color:#000 !important;}
      // .property-type:checked + label h2 { color :#000 !important;border-color:#000 !important;}
    `}</style>

      {isEdit ? (
        !propertyDuplicated ? (
          <div
            className={`${step === 0 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}
          >
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize" onClick={() => { Router.back("/admin/property/add") }}>
              Add New Property
            </button>
            <button
              onClick={() => {
                setpropertyDuplicated(true);
              }}
              className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize"
            >
              Duplicate Existing Property
            </button>
          </div>
        ) : (
          <>
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
              Edit Entire Property
            </button>
            <button className="border-gray border-2 px-8 py-8 rounded-full w-3/5 capitalize">
              Only Edit Image
            </button>
          </>
        )
      ) : (
        <div className="flex justify-end mt-5">
          <button
            onClick={handleSubmit}
            className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {Loading ? "Processing..." : "Save/Exit"}
          </button>
        </div>

        
      )}

      <div className={`w-full  flex items-center justify-center px-6 py-8 `}>
        <div className="max-w-4xl w-full space-y-8 w-full ">
          <div
            className={`pages-wrapper  ${uuid ? " max-w-[100%]" : ""} m-auto `}
          >
            

            <div
              className={`${step === 1 ? "" : "display-none"
                } max-w-[100%] m-auto table w-full`}
            >
              <h2 className="text-3xl text-center font-bold mb-8">
                Describes your place?
              </h2>
              <div className="mt-4">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Property Name"
                  id="name"
                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                  value={item?.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative mt-4 text-sm font-medium text-gray-700">
                <input
                  required
                  type="number"
                  name="price"
                  placeholder="Property Price Per Night"
                  id="name"
                  className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                  value={item?.price}
                  onChange={handleInputChange}
                />
                <div className="mt-4">
                  <textarea
                    required
                    id="about"
                    name="about"
                    minCol={"5"}
                    minRow={"5"}
                    value={item?.about}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 bg-white min-h-[250px] rounded-xl shadow-sm focus:outline-0 focus:border-indigo-500  text-normal p-4"
                    placeholder="Tell more about your property..."
                  />
                  <div className="flex flex-wrap justify-between">
                    <label className="block text-sm mb-2 font-medium text-start text-gray-700 mt-3">
                      {item?.about ? (
                        <span>{item?.about.length}/100 characters</span>
                      ) : (
                        <span>0/100 characters</span>
                      )}
                    </label>
                    <label className="block text-sm mb-2 font-medium text-end text-gray-700 mt-3">
                      Minimum 100 words.
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${step === 2 ? "" : "display-none"}`}>
              <h2 className="text-3xl text-center font-bold mb-2">
                Where's your place located?
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                Your address is only shared with guests after they’ve made a
                reservation.
              </p>
              <div className="table w-full m-auto max-w-[500px] space-y-4 text-center">
                <p>{address?.location}</p>
                <div class="w-full mt-4">
                  <button
                    className="btn sort w-full"
                    onClick={fetchLocationData}
                  >
                    {Loading ? "...." : "Use Current Location"}
                  </button>
                </div>
                <div class="flex items-center justify-center space-x-4">
                  <div class="font-semibold text-gray-400 py-3 text-center">
                    OR
                  </div>
                </div>
                <div className="w-full border border-gray-300 rounded-lg overflow-hidden">
                  <input
                    value={address.flat_house}
                    name="flat_house"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Flat, house, etc. (if applicable)"
                    className="w-full border border-gray-300 rounded-0 border-t-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.street_address}
                    name="street_address"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Street Address"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.nearby}
                    name="nearby"
                    onChange={handleAddress}
                    type="text"
                    placeholder="Nearby Landmark (if applicable)"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.district}
                    name="district"
                    onChange={handleAddress}
                    type="text"
                    placeholder="District/Locality"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.city}
                    name="city"
                    onChange={handleAddress}
                    type="text"
                    placeholder="City/Town"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.state}
                    name="state"
                    onChange={handleAddress}
                    type="text"
                    placeholder="State"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                  <input
                    onBlur={fetchLocation}
                    value={address.pin}
                    name="pin"
                    onChange={handleAddress}
                    type="text"
                    placeholder="PIN Code"
                    className="w-full border border-gray-300 rounded-0 border-b-0 border-s-0 border-r-0 p-3 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-3xl text-center font-bold mb-2 mt-5 capitalize">
                  Show your specific location
                </h2>
                <p className="text-normal text-center text-gray-500 mb-8 mt-4">
                  Make it clear to guests where your place is located. We'll
                  only share your address after they've made a reservation
                </p>

                <div>
                  <iframe
                    src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
                      ` ${address?.location}`
                    )}&t=&z=14&ie=UTF8&iwloc=B&output=embed`}
                    width="100%"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className={`${step === 3 ? "" : "display-none"}`}>
              <Guest Guests={Guests} setGuests={setGuests}
                Bedrooms={Bedrooms} setBedrooms={setBedrooms} Bathrooms={Bathrooms} setBathrooms={setBathrooms} pets={pets} setPets={setPets}
              />
            </div>

            <div className={`${step === 4 ? "" : "display-none"}`}>
              <Aminites selectedAmenity={selectedAmenity} standoutAmenity={standoutAmenity} Amenity={Amenity} setAmenity={setAmenity} setstandoutAmenity={setstandoutAmenity} setSelectedAmenity={setSelectedAmenity} />
            </div>

            <div
              className={`${step === 5 ? "" : "display-none"
                } max-w-[600px] m-auto`}
            >
              <h2 className="text-3xl text-center font-bold mb-2">
                Add some photos of your{" "}
                {PType ? PType.replace("_", " ") : "house"}
              </h2>
              <p className="text-normal text-center text-gray-500 mb-8">
                You'll need 5 photos to get started. You can add more or make
                changes later.
              </p>

              {isEdit ? (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full mt-5 mb-4   justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  "
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Add size="100" color="#ccc" />
                      <p className="mb-2 text-lg text-gray-500 text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        Choose atleast 5 images
                      </p>
                      <p className="text-normal text-gray-500 text-gray-400">
                        (jpg, jpeg, png, gif, bmp, tif, tiff, svg, webp, avif)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .tiff, .svg, .webp, .avif"
                      onChange={handleFileChange}
                      name="images"
                      required
                      multiple
                    />
                  </label>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4  mt-16 ">
                {isEdit
                  ? imageproperty?.map((item, index) => (
                    <div key={index} className="relative isedits">
                      <Image
                        className="image-preview object-cover border min-h-[150px] max-h-[200px] h-full w-full max-w-full rounded-lg"
                        src={item?.image_url || ""}
                        width={200}
                        height={200}
                        alt={`Preview ${index}`}
                      />
                      <button
                        type="button"
                        onClick={() => deletePropertyImage(uuid, item?.uuid)}
                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                  : ""}

                {images &&
                  images.map((file, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={URL.createObjectURL(file)}
                        width={200}
                        height={200}
                        alt={`Preview ${index}`}
                        className="image-preview h-full object-cover border min-h-[150px] max-h-[200px] w-full max-w-full rounded-lg"
                        onLoad={() => URL.revokeObjectURL(file)}
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(file)}
                        className="absolute text-xs right-2 top-2 bg-red-500 text-white rounded-lg px-3 py-1 m-1"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <div className={`${step === 6 ? "" : "display-none"}`}>
              <div className="max-w-[100%] m-auto w-full mt-10">
                <h2 className="text-2xl font-bold mb-4">
                  Please enter the following details
                </h2>
                <div className="flex justify-between mt-4 text-sm font-medium text-gray-700 space-x-4">
                  <div className="flex flex-col w-1/3">
                    <label>Cleaning Fees</label>
                    <input
                      required
                      type="number"
                      name="cleaning"
                      placeholder="Cleaning Fees Per Day"
                      id="cleaning"
                      className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                      value={item?.cleaning}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label>Pet Fees</label>
                    <input
                      type="number"
                      name="pet"
                      placeholder="Pet Fees"
                      id="pet"
                      className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                      value={item?.pet}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col w-1/3">
                    <label>Extra Guest Fees (Per Guest)</label>
                    <input
                      required
                      type="number"
                      name="extra_guest"
                      placeholder="Extra Guest Fees"
                      id="guest"
                      className="mt-1 p-3 px-4 focus:outline-0 border rounded-xl w-full"
                      value={item?.extra_guest}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="max-w-[100%] m-auto w-full mt-10 ">
                <h2 className="text-2xl font-bold mb-4">Check-in & checkout times</h2>
                <div className="flex justify-between mb-4 space-x-4">
                  <div className="w-2/3">
                    <label className="block mb-2 font-semibold">Check-in window</label>
                    <div className="flex justify-between space-x-4">
                      <div className="w-1/2 relative">
                        <label className="absolute top-1 left-1 text-xs text-gray-500">
                          Start time
                        </label>
                        <select
                          value={checkinStart}
                          onChange={(e) => setCheckinStart(e.target.value)}
                          className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                        >
                          <option value="flexible">Flexible</option>
                          <option value="00:00">12:00 AM</option>
                          <option value="01:00">1:00 AM</option>
                          <option value="02:00">2:00 AM</option>
                          <option value="03:00">3:00 AM</option>
                          <option value="04:00">4:00 AM</option>
                          <option value="05:00">5:00 AM</option>
                          <option value="06:00">6:00 AM</option>
                          <option value="07:00">7:00 AM</option>
                          <option value="08:00">8:00 AM</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="19:00">7:00 PM</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="21:00">9:00 PM</option>
                          <option value="22:00">10:00 PM</option>
                          <option value="23:00">11:00 PM</option>
                        </select>
                      </div>
                      <div className="w-1/2 relative">
                        <label className="absolute top-1 left-1 text-xs text-gray-500">
                          End time
                        </label>
                        <select
                          value={checkinEnd}
                          onChange={(e) => setCheckinEnd(e.target.value)}
                          className="block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                        >
                        
                          <option value="flexible">Flexible</option>
                          <option value="00:00">12:00 AM</option>
                          <option value="01:00">1:00 AM</option>
                          <option value="02:00">2:00 AM</option>
                          <option value="03:00">3:00 AM</option>
                          <option value="04:00">4:00 AM</option>
                          <option value="05:00">5:00 AM</option>
                          <option value="06:00">6:00 AM</option>
                          <option value="07:00">7:00 AM</option>
                          <option value="08:00">8:00 AM</option>
                          <option value="09:00">9:00 AM</option>
                          <option value="10:00">10:00 AM</option>
                          <option value="11:00">11:00 AM</option>
                          <option value="12:00">12:00 PM</option>
                          <option value="13:00">1:00 PM</option>
                          <option value="14:00">2:00 PM</option>
                          <option value="15:00">3:00 PM</option>
                          <option value="16:00">4:00 PM</option>
                          <option value="17:00">5:00 PM</option>
                          <option value="18:00">6:00 PM</option>
                          <option value="19:00">7:00 PM</option>
                          <option value="20:00">8:00 PM</option>
                          <option value="21:00">9:00 PM</option>
                          <option value="22:00">10:00 PM</option>
                          <option value="23:00">11:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/3">
                    <label className="block mb-2 font-semibold">Checkout time</label>
                    <select
                      value={checkout}
                      onChange={(e) => setCheckout(e.target.value)}
                      className="mt-1 block w-full px-3 py-4 border border-gray-300 bg-white rounded-md shadow-sm sm:text-sm"
                    >
                      <option value="00:00">12:00 AM</option>
                      <option value="01:00">1:00 AM</option>
                      <option value="02:00">2:00 AM</option>
                      <option value="03:00">3:00 AM</option>
                      <option value="04:00">4:00 AM</option>
                      <option value="05:00">5:00 AM</option>
                      <option value="06:00">6:00 AM</option>
                      <option value="07:00">7:00 AM</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                      <option value="18:00">6:00 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="21:00">9:00 PM</option>
                      <option value="22:00">10:00 PM</option>
                      <option value="23:00">11:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="max-w-[100%] m-auto w-full mt-10 ">
                <h2 className="text-2xl font-bold mb-4">
                  Please select an option
                </h2>

                <div className="flex items-center space-x-4 mb-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="1"
                      checked={selectedOption === '1'}
                      onChange={handleOptionChange}
                      className="form-radio"
                    />
                    <span>List Property</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="0"
                      checked={selectedOption === '0'}
                      onChange={handleOptionChange}
                      className="form-radio"
                    />
                    <span>Unlist Property</span>
                  </label>

                </div>
              </div>
            </div>

            <div className={`${step === 7 ? "" : "display-none"}`}>
              <CancelPolicy showFirm={showFirm} setShowFirm={setShowFirm} setShowFlexible={setShowFlexible} selectedPolicy={selectedPolicy} setSelectedPolicy={setSelectedPolicy} showFlexible={showFlexible} longTermPolicy={longTermPolicy} setLongTermPolicy={setLongTermPolicy} />

            </div>

            <div className={`${step === 8 ? "" : "display-none"}`}>
              <HouseRules petsAllowed={petsAllowed} setPetsAllowed={setPetsAllowed} quietHours={quietHours} setEventsAllowed={setEventsAllowed} setQuietHours={setQuietHours} eventsAllowed={eventsAllowed} PhotographyAllowed={PhotographyAllowed} setPhotographyAllowed={setPhotographyAllowed} smokingAllowed={smokingAllowed} setSmokingAllowed={setSmokingAllowed} />

              <div className="flex flex-col items-center p-4">
                <label htmlFor="directions" className="block font-medium text-gray-700">
                  Additonal Rules
                </label>
                <textarea
                  id="directions"
                  name="additonalrule"
                  rows={5}
                  className="shadow-sm p-4 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
                  placeholder="Enter directions here..."
                  value={item?.additonalrule}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={`${step === 9 ? "" : "display-none"
              } max-w-[100%] m-auto table w-full`}>

              <div className="flex flex-col items-center p-4">
                <label htmlFor="directions" className="block font-medium text-gray-700">
                  Directions
                </label>
                <textarea
                  id="directions"
                  name="direction"
                  rows={5}
                  className="shadow-sm p-4 w-4/5 mt-1 block w-full sm:text-sm border rounded-xl"
                  placeholder="Enter directions here..."
                  value={item?.direction}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-center p-4">
                <label htmlFor="directions" className="block font-medium text-gray-700">
                  House Manual
                </label>
                <textarea
                  id="manual"
                  name="housemanual"
                  rows={5}
                  className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
                  placeholder="Enter some instructions for your guest..."
                  value={item?.housemanual}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col items-center p-4">
                <h1 className="capitalize text-lg font-bold my-8">Please enter your wifi details</h1>
                <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
                  Wifi Name
                </label>
                <input
                  id="wifi"
                  name="wifi"
                  type="text"
                  className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
                  placeholder="Enter your wifi name..."
                  value={item?.wifi}
                  onChange={handleInputChange}
                />
                <label htmlFor="directions" className="block font-medium text-gray-700 my-2">
                  Wifi Password
                </label>
                <input
                  id="wifiPassword"
                  name="wifiPassword"
                  type="password"
                  className="shadow-sm p-4 w-4/5 mt-1 block sm:text-sm border rounded-xl"
                  placeholder="Enter your wifi Password here..."
                  value={item?.wifiPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="pt-6 flex justify-between max-w-[500px] table m-auto">
              {step == 0 ? (
                <> </>
              ) : (
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back
                </button>
              )}

              {step < 9 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="inline-flex mx-2 justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  {Loading ? "processing.. " : "Submit"}
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
