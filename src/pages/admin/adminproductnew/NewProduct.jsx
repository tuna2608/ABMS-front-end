import React, { useState } from "react";
import "./newProduct.scss";
import AdminNavBar from "../../../components/admin/adminNavbar/AdminNavBar";
import AdminLeftBar from "../../../components/admin/adminLeftBar/AdminLeftBar";

import { useDispatch } from "react-redux";
import app from "../../../utilities/firebase";

// Upload images
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addProduct } from "../../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

function Newproduct() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setCategories((prev) => [...prev, value]);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    // To make name of image file unique
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    // Firebase copy
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categories,
          };
          addProduct(dispatch, product);
          navigate("/adminProductList", { state: "Created" });
        });
      }
    );
  };

  return (
    <div className="new-product-container">
      <AdminNavBar />
      <div className="new-product-bottom">
        <AdminLeftBar />
        <div className="bottom-right">
          <h1 className="new-product-title">New Product</h1>
          <form className="new-product-form">
            <div className="new-product-left">
              <div className="new-product-item">
                <label>Image</label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="new-product-item">
                <label>Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Simple Lily Rose"
                  onChange={handleChange}
                />
              </div>
              <div className="new-product-item">
                <label>DIY</label>
                <select name="inStock" onChange={handleChange}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <button onClick={handleCreateProduct} className="create-btn">
                Create
              </button>
            </div>
            <div className="new-product-right">
              <div className="new-product-item">
                <label>Description</label>
                <TextArea
                    name = "desc"
                //   value={value}
                  onChange={handleChange}
                  placeholder="Description"
                  autoSize={{
                    minRows: 1,
                    maxRows: 5,
                  }}
                />
                {/* <input
                  name="desc"
                  type="text"
                  placeholder="..."
                  onChange={handleChange}
                /> */}
              </div>
              <div className="new-product-item">
                <label>Price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="price"
                  onChange={handleChange}
                />
              </div>
              <div className="new-product-item">
                <label style={{ marginBottom: "10px" }}>Materials</label>
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="new-product-materials"
                >
                  <input
                    type="checkbox"
                    name="materials"
                    id="love"
                    value="love"
                    onChange={handleCheckboxChange}
                  />
                  <label for="love">Mosaic Picture</label>
                  <input
                    type="checkbox"
                    name="materials"
                    id="thanks"
                    value="thanks"
                    onChange={handleCheckboxChange}
                  />
                  <label for="thanks">Lót ly</label>
                  <input
                    type="checkbox"
                    name="materials"
                    id="graduation"
                    value="graduation"
                    onChange={handleCheckboxChange}
                  />
                  <label for="graduation">Mosaics</label>
                  {/* <input type="checkbox" name='materials' id="baby" value="baby" onChange={handleCheckboxChange} />
                                    <label for="baby">Baby</label>
                                    <input type="checkbox" name='materials' id="birthday" value="birthday" onChange={handleCheckboxChange} />
                                    <label for="birthday">Birthday</label> */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Newproduct;
