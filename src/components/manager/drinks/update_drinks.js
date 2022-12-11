import "./add_drink.scss";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateDrink = () => {
  const { drinkId } = useParams();

//   const config = {
//     headers: {
//       Authorization: "Bearer " + localStorage.getItem("adminTicket"),
//     },
//   };

const [name, setDrinkName] = useState("");
const [description, setDescription] =useState("");
const [price, setPrice] =useState("");
const [image, setImage] =useState("");

const [category, setCategory] =useState("");
const [alcoholic, setAlcoholic] =useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/drink/" + drinkId)
      .then((response) => {
        console.log(response);
        setDrinkName(response.data.data.name);
        setDescription(response.data.data.description);
        setPrice(response.data.data.price);
        setCategory(response.data.data.category);
        setAlcoholic(response.data.data.alcoholic);
        console.log(response.data.data.name);
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
    data.append("image", image);
    data.append("category",category);
    data.append("alcoholic",alcoholic);

      await axios
        .put(
          "http://localhost:8000/api/drink/" + drinkId,
          data
        )
        .then(() => {
          window.location.replace("/drink");
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
        <div className="newContainer mt-1">
          <div className="top mt-5">
            <h1 className="text-center pb-4">Update Drink</h1>
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
                  <input value={name} onChange={(e) => setDrinkName(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter drink name" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                    Price
                  </label>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-last-name" type="number" placeholder="Enter price" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Description
                  </label>
                  <input value={description} onChange={(e) => setDescription(e.target.value)} size={50} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-password" type="text" placeholder="Enter drink's description" />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Category
                  </label>
                  <input value={category} onChange={(e) => setCategory(e.target.value)} size={50} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-300" id="grid-password" type="text" placeholder="Enter drink's category" />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3">
                <div class="w-full md:w-1/2 px-3 md:-mb-2">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                    Alcoholic
                  </label>
                  <input value={alcoholic} onChange={(e) => setAlcoholic(e.target.value)} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Is alcoholic?" />
                </div>
                <div class="w-full md:w-1/2 px-3">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
              <input 
              onChange={(e) => setImage(e.target.files[0])} 
              class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
              </div>
              </div>
          </form>
              <button class="bg-gray-300 mt-7 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mt-3 rounded inline-flex items-center" onClick={handleClick}>
              Update Drink
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

export default UpdateDrink;
