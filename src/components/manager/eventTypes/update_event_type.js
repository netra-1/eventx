import "./add_event.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEventType = () => {
  const { eventTypeId } = useParams();

//   const config = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("adminTicket"),
//     },
//   };

  const [event_type_name, setEventType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/event-type/" + eventTypeId)
      .then((response) => {
        console.log(response);
        setEventType(response.data.data.name);
        setDescription(response.data.data.description);
        console.log(response.data.data.name)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newEventType = {
        name: event_type_name,
        description : description,
      };

      await axios
        .put(
          "http://localhost:8000/api/event-type/" + eventTypeId,
          newEventType
        )
        .then(() => {
          window.location.replace("/event-type");
          toast.success("Updated successfully");
        })
        .catch((e) => {
          toast.failed("Failed to update");
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top mt-5">
            <h1 className="text-center pb-4">Update Event Type</h1>
          </div>
          <div className="bottom">
            <div className="right">
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Name
                  </label>
                  <input size="50" onChange={(e) => setEventType(e.target.value)} value={event_type_name} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter event type" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Description
                  </label>
                  <textarea rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} value={description} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="textarea" placeholder="Enter description" />
                </div>
              </div>
              <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Update Event Type
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

export default UpdateEventType;
