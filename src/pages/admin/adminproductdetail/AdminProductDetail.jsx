import React, { useState } from 'react'
import "./adminProductDetail.scss"
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import AdminNavBar from '../../../components/admin/adminNavbar/AdminNavBar'
import AdminLeftBar from '../../../components/admin/adminLeftBar/AdminLeftBar'
import Chart from '../../../components/admin/chart/Chart'
import { productData } from "../../../data/chartData"
import PublishIcon from '@mui/icons-material/Publish';
import { useDispatch, useSelector } from 'react-redux'
import { formatCurrency } from "../../../utilities/formatCurrency"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../../utilities/firebase";
import { updateProduct } from '../../../redux/apiCalls'

function AdminProductDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const productID = location.pathname.split("/")[2];

    const product = useSelector((state) => state.product.products.find((product) => product._id === productID));

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch()

    const handleCheckboxChange = (event) => {
        const { checked, value } = event.target;
        if (checked) {
            setCategories(prev => [...prev, value]);
        }
    }

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        // To make name of image file unique
        const fileName = new Date().getTime() + file.name
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName);

        // Firebase copy
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
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
                    const upDatedProduct = { ...inputs, img: downloadURL, categories: categories };
                    console.log(product._id, upDatedProduct);
                    updateProduct(product._id, upDatedProduct, dispatch)
                    navigate("/adminProductList", { state: "Updated" })
                });
            }
        );
    }

    return (
        <div className='detail-user-container'>
            <AdminNavBar />
            <div className='detail-user-bottom'>
                <AdminLeftBar />
                <div className='bottom-right'>
                    <div className="user-title-container">
                        <h1 className='user-title'>Update Product</h1>
                        <NavLink to="/newProduct">
                            <button className="user-add-btn">Create</button>
                        </NavLink>
                    </div>
                    <div className="product-top">
                        <div className="product-top-left">
                            <Chart data={productData} title="Sales Performance" dataKey="Sales" />
                        </div>
                        <div className="product-top-right">
                            <div className="product-info-top">
                                <img src={product.img} alt="" className="product-info-img" />
                                <div className="product-name">{product.title}</div>
                            </div>
                            <div className="product-info-bottom">
                                <div className="product-info-item">
                                    <div className="product-info-key">id: </div>
                                    <div className="product-info-value">{product._id}</div>
                                </div>
                                <div className="product-info-item">
                                    <div className="product-info-key">price:</div>
                                    <div className="product-info-value">{formatCurrency(product.price)}</div>
                                </div>
                                <div className="product-info-item">
                                    <div className="product-info-key">DIY:</div>
                                    <div className="product-info-value">{product.inStock + ""}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product-bottom">
                        <form className="product-form">
                            <div className="product-form-left">
                                <label> Product Name </label>
                                <input onChange={handleChange} name="title" type="text" placeholder={product.title} />
                                <label> Product Description </label>
                                <input onChange={handleChange} name='desc' type="text" placeholder={product.desc} />
                                <label> Price </label>
                                <input onChange={handleChange} name="price" type="number" placeholder={formatCurrency(product.price)} />
                                <label> DIY </label>
                                <select onChange={handleChange} name="inStock" id="inStock">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select>
                                <label style={{ marginBottom: "10px" }}>Materials</label>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }} className="new-product-materials">
                                    <input type="checkbox" name='materials' id="love" value="love" onChange={handleCheckboxChange} />
                                    <label for="love">Mosaic Picture</label>
                                    <input type="checkbox" name='materials' id="thanks" value="thanks" onChange={handleCheckboxChange} />
                                    <label for="thanks">Lót ly</label>
                                    <input type="checkbox" name='materials' id="graduation" value="graduation" onChange={handleCheckboxChange} />
                                    <label for="graduation">Mosaics</label>
                                    {/* <input type="checkbox" name='materials' id="baby" value="baby" onChange={handleCheckboxChange} />
                                    <label for="baby">Baby</label>
                                    <input type="checkbox" name='materials' id="birthday" value="birthday" onChange={handleCheckboxChange} />
                                    <label for="birthday">Birthday</label> */}
                                </div>
                            </div>
                            <div className="product-form-right">
                                <div className="product-upload">
                                    <img src={product.img} alt="product_img" className="product-upload-img" />
                                    <label for="file">
                                        <PublishIcon style={{ cursor: "pointer" }} />
                                    </label>
                                    <input onChange={e => setFile(e.target.files[0])} type="file" id="file" style={{ display: "none" }} />
                                </div>
                                <button onClick={handleUpdateProduct} className="product-btn">Update</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminProductDetail