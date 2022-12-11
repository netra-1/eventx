import "./add_decoration.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDecoration = () => {
  const { decorationId } = useParams();

//   const config = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("adminTicket"),
//     },
//   };

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("");
    
  const [image, setImage] =useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/decoration/" + decorationId)
      .then((response) => {
        console.log(response);
        setName(response.data.data.name);
        setDescription(response.data.data.description);
        setPrice(response.data.data.price);
        setType(response.data.data.type);
        console.log(response.data.data.name)
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("type", type);
    data.append("image", image);

      await axios
        .put(
          "http://localhost:8000/api/decoration/" + decorationId,
          data
        )
        .then(() => {
          window.location.replace("/decoration");
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
            <h1 className="text-center pb-4">Update Decoration</h1>
          </div>
          <div className="bottom">
            <div className="right">
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Name
                  </label>
                  <input value={name} size="50" onChange={(e) => setName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter decoration name" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Type
                  </label>
                  <input value={type} onChange={(e) => setType(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter type" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 -mb-6">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Description
                  </label>
                  <textarea rows={3} cols={50} value={description} onChange={(e) => setDescription(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter description" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-3">
                <div class="w-full md:w1/2 px-3 md:mb-0">
                  <label class="block tracking-wide text-gray-700 text-m font-bold mb-2" for="grid-first-name">
                    Price
                  </label>
                  <input value={price} size="50" onChange={(e) => setPrice(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Enter price" />
                </div>
              </div>
              <input 
              onChange={(e) => setImage(e.target.files[0])} 
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
            
            </form>
              <button class="mt-5 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Update Decoration
              </button>
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

export default UpdateDecoration;
