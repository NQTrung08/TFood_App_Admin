

import React from 'react'
import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { getDatabase, ref, push, get, set, child } from "firebase/database";
import { database } from "../firebase";
import { AiOutlineDelete } from 'react-icons/ai'

const User = () => {
    const [users, setUsers] = useState(null)
    const dbRef = ref(database);
    useEffect(()=>{
      get(child(dbRef, `User`)).then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
          // setUsers(snapshot.val());
          // Convert the data object to an array
          const dataArray = Object.keys(snapshot.val()).map(key => ({ id: key, ...snapshot.val()[key] }));
          setUsers(dataArray);
          
          
            
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    },[])
    
    
  console.log(users);
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Users name</th>
                  <th>Telephone number</th>
                  <th>Address</th>
                </tr>
              </thead>

              <tbody>
                {users && users.map((user, index) => {
                    return (
                        <tr key={user.id}>
                            <td> {index + 1} </td>
                            <td> {user.name} </td>
                            <td> {user.id}</td>
                            <td>{user.address}</td>
                            
                        </tr>
                    )
                })}
             </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )

}

export default User;