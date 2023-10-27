
import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import { getDatabase, ref, push, get, set, child } from "firebase/database";
import { database } from "../firebase";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineUpload } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import '../styles/modal-edit.css';

const AllProducts = () => {

  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    foodName: '',
    fee: '',
    star: '',
    menuId: '',
    description: '',
    foodPic: '',
    foodId: '',
  });


  const dbRef = ref(database);

  useEffect(()=>{

    // Lấy dữ liệu từ bảng Category
    const categoryRef = ref(database);
    get(child(categoryRef, `Category`)).then((snapshot) => {
      if (snapshot.exists()) {
        const dataArray = Object.keys(snapshot.val()).map(key => ({ id: key, ...snapshot.val()[key] }));
        setCategories(dataArray);
    
      } else {
        console.log('No data available in Category');
      }
    }).catch((error) => {
      console.error(error);
    });

    console.log(categories);
      // Lấy dữ liệu từ bảng Food
    const foodRef = ref(database);
    get(child(foodRef, `Food`)).then((snapshot) => {
      if (snapshot.exists()) {
        // Convert the data object to an array
        console.log(snapshot.val());
        const dataArray = Object.keys(snapshot.val()).map(key => ({ id: key, ...snapshot.val()[key] }));

        // Sắp xếp theo foodId
         dataArray.sort((a, b) => a.foodId - b.foodId);

         
        setProducts(dataArray);
        
        
        
          
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  },[])

// ///////====== deleted -=============

  const handleDelete = async (id) => {  
      try {
        // Xóa sản phẩm với id tương ứng
        const productRef = ref(database, `Food/${id}`);
        await set(productRef, null); // đặt lại giá trị của sản phẩm bằng null

        //cập nhập sản phẩm 
        const updateProducts = products.filter(product => product.id !== id);
        setProducts(updateProducts);
        toast.success("Deleted successfully")
          
      } catch (error) {
          console.error("lỗi khi xóa sản phẩm:", error);
      }
  }



//===============  Edit product  =================

const openEditModal = (product) => {
  setIsModalOpen(true);
    setEditingProduct(product);
    setProductData({
      foodName: product.foodName || '',
      fee: product.fee || '',
      star: product.star || '',
      menuId: product.menuId || '',
      description: product.description || '',
      foodPic: product.foodPic || '',
      foodId: product.foodId || '',
    });
};

const closeEditModal = () => {
  setIsModalOpen(false);
  setEditingProduct(null);
};

const handleSaveEdit = async () => {
  if (editingProduct) {

    const productRef = ref(database, `Food/${editingProduct.id}`);


    const updateData = {
      foodName: productData.foodName,
      fee: parseFloat(productData.fee),// ép kiểu string sang float va int
      star: parseInt(productData.star),
      menuId: parseInt(productData.menuId),
      description: productData.description,
      foodPic: productData.foodPic,
      foodId: productData.foodId,
    };

    await set(productRef, updateData);

    const updatedProducts = products.map(product => {
      if (product.id === editingProduct.id) {
        return { id: editingProduct.id, ...updateData };
      }
      return product;
    });

    setProducts(updatedProducts);
    setIsModalOpen(false);
    toast.success('Product successfully updated!');
  }
};


  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Image</th>
                  <th>Food Name</th>
                  <th>Fee</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products && products.map((product, index) => {
                  // const categoryKey = product.menuId.toString().padStart(2, '0');
                  const categoryKey = product.menuId;
                  // const category = categories[categoryKey];
                  const category = categories.find( (categorie, index)=> Number(categorie.id) === categoryKey);

                  const categoryName = category ? category.categoryName : 'N/A';
                      return (
                          <tr key={index}>
                              <td> {index + 1} </td>
                              <td><img src={product.foodPic} style={{width:'60px'}}/></td>
                              <td> {product.foodName}</td>
                              <td> $ {product.fee}</td>
                              <td>{ categoryName }</td>
                              <td>
                                <div className='d-flex align-items-center justify-content-center'>
                                  <div style={{ color: 'blue', cursor: 'pointer', marginRight: '30px' }} onClick={() => openEditModal(product)}  >
                                      <AiOutlineEdit />
                                  </div>
                                  <div style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(product.id)} >
                                      <AiOutlineDelete />
                                  </div>

                                </div>
                              </td>
                          </tr>
                      )
                  })}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>


      {/* Nút để chuyển tới trang "Add Product" */}
      <Link to="/dashboard/add-product">
        <div style={{ cursor: 'pointer', position: 'fixed', top: '22%', right: '20px' }}>
          <span style={{
            fontSize: '20px',
            backgroundColor: '#0a1c32', // Màu xanh lam
            color: '#fff',
            borderRadius: '50%',
            padding: '12px', // Tăng kích thước để nút tròn hơn
            width: '40px', // Đảm bảo nút là hình tròn
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            +
          </span>
        </div>
      </Link>


      {editingProduct && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeEditModal}
          className="modal-container"
          overlayClassName="modal-overlay"
        >
          <h2 className="modal-title">Edit Product</h2>
          <label>Product Name:</label>
          <input
            type="text"
            value={productData.foodName}
            onChange={(e) => setProductData({ ...productData, foodName: e.target.value })}
            className="modal-input"
          />

          <label>Price:</label>
          <input
            type="text"
            value={productData.fee}
            onChange={(e) => setProductData({ ...productData, fee: e.target.value })}
            className="modal-input"
          />

          <label>Star:</label>
          <input
            type="text"
            value={productData.star}
            onChange={(e) => setProductData({ ...productData, star: e.target.value })}
            className="modal-input"
          />

          <label>Menu ID:</label>
          <Input
            type="select"
            value={productData.menuId}
            onChange={(e) => setProductData({ ...productData, menuId: e.target.value })}
            className="modal-input"
          >
            <option value="1">Pizza</option>
            <option value="2">Burger</option>
            <option value="3">Hotdog</option>
            <option value="4">Drink</option>
            <option value="5">Donut</option>
          </Input>

          <label>Description:</label>
          <textarea
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            className="modal-input"
          />

          <label>Image Food:</label>
          <textarea
            value={productData.foodPic}
            onChange={(e) => setProductData({ ...productData, foodPic: e.target.value })}
            className="modal-input"
          />

          <button onClick={handleSaveEdit} className="modal-button">Save</button>
          <button onClick={closeEditModal} className="modal-button cancel">Cancel</button>
        </Modal>
      )}



    </section>
  )
}

export default AllProducts;