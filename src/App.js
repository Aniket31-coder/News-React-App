import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button, Card, Container, ButtonGroup, Pagination } from 'react-bootstrap';

import './App.css';
import DataHorizontal from './components/DataHorizontal';
import DataVertical from './components/DataVertical';
import FeedbackForm from './components/FeedbackForm';

function App() {

  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const dataPerPage = 6;
  const limitOfPages = [1,2,3];
  const [showFeedback, setShowFeedback] = useState(false); //Modal-Feedback
  const [horizontalOrVertical, setHorizontalOrVertical] = useState(false); //True if Horizontal

  useEffect(()=> { 
    async function getData() {
      setLoading(true);
      await axios.get('https://jsonplaceholder.typicode.com/posts',{params: {
        _limit: 20
       }}).then((res) => {
        console.log(res.data)
        setData(res.data)
       }).catch(function (error) {
          console.log(JSON.stringify(error))
        })
        setLoading(false);
    }
    
  
  
    getData()
  },[]);
  
  const lastIndex = currentPageNumber*dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const dataPage = data.slice(firstIndex,lastIndex);
  console.log(dataPage);
  // const handleChange = (e) => {
  //   setHorizontalOrVertical(e.target.value);
  //   console.log(horizontalOrVertical);
  // }

  return (
    <div className="bg-light">
      <Container fluid className="mx-auto">
      <Row>
        {
        !showFeedback ?
        <Col sm={5} md={4} lg={3}>
          {/* SideBar */}
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white border-end" style={{backgroundColor:'#E9F0F6', height: "100%"}}>
            <hr />
            <Card className="text-black p-2 shadow">
              <Row className="d-flex justify-content-center align-items-center">
                <Col md={3} className="px-auto">
                  <div className="bg-secondary rounded-circle" style={{width: "65px", height: "65px"}}>

                  </div>
                </Col>
                <Col md={8}>
                  <Card.Title className="pt-2 pb-0">Hi Reader,</Card.Title>
                  <Card.Body className="p-0">Here's your News!</Card.Body>
                </Col>
              </Row>
            </Card>
            <hr />
            <Card className="text-black p-2 shadow">
              <Card.Title className="h4 mx-auto">View Toggle</Card.Title>
              <ButtonGroup className="w-75 my-2 mx-auto"  onClick={() => setHorizontalOrVertical(!horizontalOrVertical)}>
              <Button variant="light" className={horizontalOrVertical === true ? 'active activeHorV' : 'horiVerti'}>Horizontal</Button>
                <Button variant="light" className={horizontalOrVertical === false ? 'active activeHorV' : 'horiVerti'}>Vertical</Button>
              </ButtonGroup>
            </Card>
            <hr />
            <Card className="text-black p-2 shadow">
              <Card.Title className="h4 mx-auto">Have a Feedback</Card.Title>
                <Button className="w-75 my-2 mx-auto activeHorV fw-bold" style={{height:"50px"}} variant="light" onClick={() => setShowFeedback(true)}>We're listening!</Button>
            </Card>
          </div>
        </Col>
        : null
        }
        {
        showFeedback ?  
          <Row>
            <Col sm={5} md={4} lg={3} className="pe-0">
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{backgroundColor:'#E9F0F6', height: "100%"}}>
        <hr />
        <Card className="text-black p-2 shadow">
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={3} className="px-auto">
              <div className="bg-secondary rounded-circle" style={{width: "65px", height: "65px"}}>

              </div>
            </Col>
            <Col md={8}>
              <Card.Title className="pt-2 pb-0">Hi Reader,</Card.Title>
              <Card.Body className="p-0">Here's your News!</Card.Body>
            </Col>
          </Row>
        </Card>
        <hr />
        <Card className="text-black p-2 shadow">
          <Card.Title className="h4 mx-auto">Have a Feedback</Card.Title>
            <Button className="w-75 my-2 mx-auto feedbackActive fw-bold" style={{height:"50px"}} variant="light" onClick={() => setShowFeedback(true)}>We're listening!</Button>
        </Card>
        </div>
        </Col>
        <Col sm={5} md={6} lg={7} className="px-0 border-end">
          <FeedbackForm setShowFeedback={setShowFeedback} />
          </Col>
        </Row> : null
        }
        { !showFeedback ?
        <Col sm={7} md={8} lg={9}>
         {console.log(horizontalOrVertical)}
          <Row className="justify-content-center">
            {!horizontalOrVertical ? 
              <DataVertical totalData={dataPage} loading={loading} />
            :
            <DataHorizontal totalData={dataPage} loading={loading} />
            }
            
            <Pagination className="justify-content-center">
                {
                limitOfPages.map(number => (
                    <Pagination.Item key={number} className={currentPageNumber === number ? 'active ' : ''} onClick={() => setCurrentPageNumber(number)}>
                    {number}
                    </Pagination.Item>
                ))
            }     
            </Pagination> 
            {/*  */}
          </Row>
        </Col>
        : null}
      </Row>
      </Container>
    </div>
  )
}

export default App;
