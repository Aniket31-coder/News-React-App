import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

function DataVertical({totalData, loading, setTotalData }) {

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }

    const handleDelete = (id, e) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
            console.log("Deleted Successfully"+response);
            const deleteData = totalData.filter(data => data.id !== id);
            setTotalData(deleteData);
        })
        .catch(error => {
        console.error('There was an error!', error);
        });
    }
    
    return (
        <div>
            {((totalData.length>0) && !loading) ? 
                totalData.map((dataOne) => (
                  <Row key={dataOne.id} className="justify-content-center">
                    <Col md={10}>
                        <Card className="border-2 rounded-3 py-3 my-3 shadow" style={{cursor: "pointer"}} data-toggle="modal" data-target={`#${dataOne.id}`} onClick={handleClick}>
                            <div className="d-flex">
                                <div className="px-3 mx-auto d-flex align-items-center">
                                    <div className="bg-secondary rounded-circle" style={{width: "65px", height: "65px"}}>
                                    </div>
                                </div>
                                <div>
                                    <Card.Title>{dataOne.title}</Card.Title>
                                    <Card.Body className="px-0 pt-1">{dataOne.body}</Card.Body>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col md={1} className="py-3 my-auto">
                      <div style={{maxWidth:"fit-content"}}>
                        {/* {setDeleteData(dataOne.id)} */}
                        <Button className="btn-transparent close-icon bg-white rounded-circle pb-2 shadow-sm" onClick={(e) => handleDelete(dataOne.id,e)}>&times;</Button>
                        </div>
                    </Col>
                  </Row>
                ))
              : null
            }
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body style={{minWidth:"80vw", minHeight: "90vh"}}>
                <iframe src="https://peakeduapp.netlify.app/" title="PEAK Education" style={{minWidth:"78vw", minHeight: "80vh"}}>
                </iframe>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DataVertical;
