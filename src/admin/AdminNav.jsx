
import React from 'react'
import {Container, Row} from "reactstrap"
import {RiSearchLine, RiNotification3Line, RiSettings2Line  } from "react-icons/ri";
import "../styles/admin-nav.css";

import { NavLink } from 'react-router-dom';


const admin__nav = [
  {
    display: 'Dashboard',
    path:'/dashboard'
  },
  {
    display: 'All Products',
    path:'/dashboard/all-products'
  },{
    display: 'Orders',
    path:'/dashboard/orders'
  },
  {
    display: 'Users',
    path:'/dashboard/user'
  },
]

const AdminNav = () => {
  return (
    <>
    
    <header className='admin__header'>
      <div className="admin__nav-top">
        <Container>
          <div className="admin__nav-wrapper-top">
            <div className="logo">
              <h2>TFood</h2>
            </div>

            <div className="search__box">
              <input type="text" placeholder='Search...'  />
              <span>
                <RiSearchLine/>
              </span>
            </div>

            <div className="admin__nav-top-right">
              <span><RiNotification3Line/></span>
              <span><RiSettings2Line/></span>
            </div>

          </div>
        </Container>
      </div>
    </header>

    <section className="admin__menu">
      <Container>
        <Row>
          <div className="admin__navigation">
            <ul className="admin__menu-list">
              {
                admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink to = {item.path} 
                      className={navClass=> 
                        navClass.isActive ? 'active__admin-menu' : ''}
                    >
                      {item.display}
                      </NavLink>
                  </li>
          
                ))
              }
            </ul>
          </div>
        </Row>
      </Container>
    </section>
    </>
  );
}

export default AdminNav;