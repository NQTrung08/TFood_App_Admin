import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getDatabase, ref, get, child } from 'firebase/database';
import { database } from '../firebase';
import { AiOutlineDelete } from 'react-icons/ai';

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, 'Order'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Lặp qua từng đối tượng con bên trong Order
          const ordersArray = [];
          Object.keys(snapshot.val()).forEach((orderId) => {
            const orderData = snapshot.val()[orderId];
            // Chuyển đổi mỗi đối tượng con thành một mảng
            const orderArray = Object.keys(orderData).map((key) => ({
              id: key,
              ...orderData[key],
            }));
            // Thêm mảng con vào mảng tổng
            ordersArray.push(orderArray);
          });

          setOrders(ordersArray);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(orders);

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Customer</th>
                  <th>Telephone number</th>
                  <th>Address</th>
                  <th>Total Order</th>
                  <th>Total Quantities</th>
                </tr>
              </thead>

              <tbody>
                {orders !== null &&
                  orders.map((orderArray, index) => (
                    orderArray.map((order, subIndex) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.phone}</td>
                        <td>{order.address}</td>
                        <td>{order.totalOrder}</td>
                        <td>{order.totalQuantities}</td>
                      </tr>
                    ))
                  ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Orders;
