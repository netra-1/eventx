import "./add_event.scss";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEventType = () => {

  const [event_type, setEventType] = useState("");
  const [description, setDescription] = useState("");

  // const config = {
  //   headers: {
  //     Authorization: "Bearer " + localStorage.getItem("adminTicket"),
  //   },
  // };

  const handleClick = async (e) => {
    e.preventDefault();

    const data = {
      name : event_type,
      description : description
    }

    try {
      await axios
        .post("http://localhost:8000/api/event-type/", data)
        .then((response) => {
          window.location.replace("/event-type");
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
        <div className="newContainer mt-5">
          <div className="top mb-5">
            <h1 className="text-center pb-4">Add Event Type</h1>
          </div>
          <div className="bottom mt-3">
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
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Name
                  </label>
                  <input size="50" onChange={(e) => setEventType(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter event type" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Description
                  </label>
                  <textarea rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter description" />
                </div>
              </div>
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Add Event Type
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

export default AddEventType;
