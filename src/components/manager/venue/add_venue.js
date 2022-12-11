import "./add_venue.scss";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddVenue = () => {

  const [venue_name, setVenue] = useState("");
  const [contact, setContact] =useState("");
  const [location, setLocation] =useState("");
  const [capacity, setCapacity] =useState([]);
  const [price, setPrice] =useState("");

  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("adminTicket"),
  //   },
  // };

  const handleClick = async (e) => {
    e.preventDefault();
    const capacities = capacity.split(",").map((number) => ({ max: number }));


    const data = {
      name : venue_name,
      location : location,
      contact : contact,
      capacity : capacity,
      price : price,
    }

    try {
      await axios
        .post("http://localhost:90/venue/insert", data)
        .then((response) => {
          window.location.replace("/venue");
          toast.success("Successfully added");
          console.log(response.data.msg);
        });
    } catch (e) {
      toast.failed("Failed to add");
      console.log(e);
    }
  };  

  return (
    <>
      <div className="new">
        <div className="newContainer mt-1">
          <div className="top mt-5">
            <h1 className="text-center pb-4">Add Venue</h1>
          </div>
          <div className="bottom">
            {/* <div className="left">
              <img
                src={
                  event_
                    ? URL.createObjectURL(event_)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div> */}
            <div className="right">
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3 md:-mb-2">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Name
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter venue name" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Location
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-last-name" type="text" placeholder="Enter venue's location" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Contact
                  </label>
                  <input size={50} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-password" type="text" placeholder="Enter venue's contact (separate numbers by comma)" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Capacity
                  </label>
                  <input size={50} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-password" type="text" placeholder="Enter venue's capacity" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Price
                  </label>
                  <input size={50} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-password" type="text" placeholder="Enter venue's price" />
                </div>
              </div>
              {/* <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3 md:-mb-2">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Name
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter venue name" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Location
                  </label>
                  <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-last-name" type="text" placeholder="Enter venue's location" />
                </div>
              </div> */}
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Add Venue
              </button>
          </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default AddVenue;
