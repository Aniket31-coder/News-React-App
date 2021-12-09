import React, {useState} from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';


function DataHorizontal({totalData, loading, setTotalData }) {
    
    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    }
    
    const handleDelete = (id, e) => {
        const proxyURL = "https://news-react-app-kalpas.netlify.app/";
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        axios.delete(proxyURL+url)
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
            <Row className="justify-content-center">
            {
            ((totalData.length>0) && !loading) ? 
                totalData.map((dataOne) => (
                    <Col md={4} key={dataOne.id}>
                        <div>
                            <Card className="border-2 rounded-3 py-4 my-3 shadow px-3">
                            <Button className="btn-transparent close-icon bg-white pb-0 pt-0 px-1" style={{position: "absolute", top:"-1px", right:"0px", height: "30px"}} onClick={(e) => handleDelete(dataOne.id,e)}>&times;</Button>
                                <Card.Title style={{height: "30px", cursor: "pointer"}} data-toggle="modal" onClick={handleClick}>{dataOne.title.slice(0,60)}</Card.Title>
                                <Card.Body className="px-0 pt-1 mt-2">{dataOne.body.slice(0,70)}...</Card.Body>
                                <div className="mx-auto bg-secondary" style={{width: "100%", height: "120px"}}>
                                </div>
                            </Card>
                        </div>    
                    </Col>
                    // <Col md={1} className="py-3 my-auto">
                    //     <div style={{maxWidth:"fit-content"}}>
                    //     {/* {setDeleteData(dataOne.id)} */}
                    //     <Button className="btn-transparent close-icon bg-white rounded-circle pb-2 shadow-sm">&times;</Button>
                    //     </div>
                    // </Col>
                ))
              : null
            }
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Body style={{minWidth:"80vw", minHeight: "90vh"}}>
                <iframe src="https://peakeduapp.netlify.app/" title="PEAK Education" style={{minWidth:"78vw", minHeight: "80vh"}}>
                </iframe>
                </Modal.Body>
            </Modal>
            </Row>
            
        </div>
    )
}

export default DataHorizontal;
