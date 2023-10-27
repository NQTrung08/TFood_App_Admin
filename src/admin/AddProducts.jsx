import React, { useState, } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { getDatabase, ref, push, get, set, child } from "firebase/database";
import { database } from "../firebase";
import { Navigate } from 'react-router-dom';

const AddProducts = () => {
  const [enterFoodName, setEnterFoodName] = useState('');
  const [enterDesc, setEnterDesc] = useState('');
  const [enterMenuId, setEnterMenuId] = useState('');
  const [enterFee, setEnterFee] = useState('');
  const [enterStar, setEnterStar] = useState('');
  const [enterFoodPic, setEnterFoodPic] = useState('');
  

  const addProduct = async (e) => {
    e.preventDefault();

    const maxFoodIdRef = ref(database, "Food");
    const maxFoodIdSnapshot = await get(maxFoodIdRef);
    let maxFoodId = 0;
    let formattedFoodId = 0;
    
    if (maxFoodIdSnapshot.exists()) {
      // Tìm giá trị lớn nhất hiện có trong bảng "Food"
      const foodData = maxFoodIdSnapshot.val();
      maxFoodId = Math.max(...Object.keys(foodData).map(foodId => parseInt(foodData[foodId].foodId)));
      console.log(maxFoodId);
    }
    
    console.log(maxFoodId);
   //Tính toán `newFoodId` bằng cách tăng giá trị lớn nhất lên 1
    const newFoodId = maxFoodId + 1;
    if (newFoodId <= 9){
      formattedFoodId = 0 + String(newFoodId) ;
      
    } else {
      formattedFoodId = String(newFoodId);
    }
    console.log(formattedFoodId);
    const product = {
      foodName: enterFoodName,
      description: enterDesc,
      menuId: parseInt(enterMenuId),
      fee: parseFloat(enterFee),
      star: parseInt(enterStar),
      foodPic: enterFoodPic,
      foodId: newFoodId,
    };
    try {
        // Thêm sản phẩm mới vào bảng "Food" với `foodId` mới
      const dbRef = ref(database, `Food/${formattedFoodId}`);
      set(dbRef, product);
      
      // Cập nhật "maxFoodId" với giá trị mới
      // set(ref(database, "maxFoodId"), newFoodId);
      toast.success('Product successfully added!');
      // Reset các trường về giá trị mặc định
      setEnterFoodName('');
      setEnterDesc('');
      setEnterMenuId('');
      setEnterFee('');
      setEnterStar('');
      setEnterFoodPic('');

    }catch(error) {
        // Xử lý lỗi và hiển thị thông báo lỗi
      toast.error('Error adding the product. Please try again.');
      console.error('Error:', error)
    }
    

  };
  const handlemenuid =()=> {

  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
                    <h4 className="mb-4">Add Product</h4>
                  <Form onSubmit={addProduct}>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="foodName" style={{float: 'left'}}>Food Name</Label>
                          <Input
                            type="text"
                            id="foodName"
                            placeholder="Food"
                            value={enterFoodName}
                            onChange={(e) => setEnterFoodName(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="description" style={{float: 'left'}}>Description</Label>
                          <Input
                            type="text"
                            id="description"
                            placeholder="Description....."
                            value={enterDesc}
                            onChange={(e) => setEnterDesc(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="fee" style={{float: 'left'}}>Fee</Label>
                          <Input
                            type="number"
                            id="fee"
                            placeholder="$10"
                            value={enterFee}
                            onChange={(e) => setEnterFee(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="menuId" style={{float: 'left'}}>Category</Label>
                          <Input
                            type="select"
                            id="menuId"
                            value={enterMenuId}
                            onChange={(e) => setEnterMenuId(e.target.value)}
                            required
                          >
                            <option value="0">Option...</option>

                            <option value="1">Pizza</option>
                            <option value="2">Burger</option>
                            <option value="3">Hotdog</option>
                            <option value="4">Drink</option>
                            <option value="5">Donut</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label for="star" style={{float: 'left'}}>Star</Label>
                          <Input
                            type="number"
                            id="star"
                            placeholder="4"
                            value={enterStar}
                            onChange={(e) => setEnterStar(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label for="foodImage" style={{float: 'left'}}>Food Image</Label>
                          <Input
                            type="text"
                            id="foodImage"
                            value={enterFoodPic}
                            onChange={(e) => setEnterFoodPic(e.target.value)}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button className="btn btn-primary" type="submit" style={{backgroundColor: '#000'}}>
                      Add Food
                    </Button>
                  </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddProducts;
