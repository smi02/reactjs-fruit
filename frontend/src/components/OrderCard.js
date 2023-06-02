import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';

const OrderCard = (props) => {
    const {
        items,
    } = useCart();
    const [theme] = useThemeHook();
    var today = new Date();
    var datetoday = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var datetomorrow = today.getDate()+ 6 +'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    return (
       <Card className={`${theme? 'bg-light-black text-light' : 'bg-light text-black'} mb-3`} border={theme? 'warning' : 'primary'}>
            <Card.Header>
                <b>date: {datetoday}</b>
                <small className="float-end">Order ID: {items.id}</small>
            </Card.Header>
            <Row className="p-2">
                <tbody>
                    {items.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <td>
                                    <div style={{ background: 'white', height: '8rem', overflow: 'hidden', display: 'flex',
                                    justifyContent: 'center', alignItems: 'center' }}>
                                        <div style={{ padding: '.5rem'}}>
                                            <img src={item.image} style={{ width: '4rem'}} alt={item.title} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h6 style={{ whiteSpace: 'nowrap', width: '30rem', overflow: 'hidden', textOverFlow: 'ellipsis'}}>
                                        {item.title}
                                    </h6>
                                </td>
                                <td>Rs. {item.price}.000/kg</td>
                                <td>Quantity ({item.quantity})</td>
                            </tr>
                        )
                    })}
                </tbody>
                <Col>
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>
                            <Badge pill bg="success">
                                Delivered on {datetomorrow}
                            </Badge>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
       </Card>
    );
};

export default OrderCard;