import React from 'react';
import { Outlet, Router, useLocation } from 'react-router-dom'
import AdminNav from '../../admin/AdminNav';
import Routers from '../../routers/Routers';
import { Col, Container, Row } from 'reactstrap';


const AppLayout = () => {

    const location = useLocation()

    return (
        <>

        {
            location.pathname.startsWith("/dashboard") ? <AdminNav/> : null
        }

        <Container>
            <Row>
                <Col>
                    <Routers/>
                </Col>
            </Row>
        </Container>
        </>
        
    );
}

export default AppLayout;