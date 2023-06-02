import React from 'react';
import { Container, Row, Col, Tab, Nav, Image, Form, Button, Badge } from 'react-bootstrap';
import { useThemeHook } from '../GlobalComponents/ThemeProvider';
import Heading from '../components/Heading';
import profilePix from '../images/profile-picture.png';
import { FaClipboardList, FaUser } from 'react-icons/fa';
import { GiWallet } from 'react-icons/gi';
import { IoLocationSharp } from 'react-icons/io5';
import './my-account.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../redux/apiRequest";
import { createAxios } from "../redux/createInstance";
import { logOutSuccess } from "../redux/authSlice";
import { NavLink } from 'react-router-dom';
import { TableControl } from 'react-bootstrap-table-control';
import { deleteUser } from "../redux/apiRequest";
import OrderCard from '../components/OrderCard';

const MyAccount = () => {
    const [theme] = useThemeHook();
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJWT = createAxios(user, dispatch, logOutSuccess);
    const accessToken = user?.accessToken;
    const id = user?._id;
    const msg = useSelector((state) => state.users?.msg);
    const userList = useSelector((state) => state.users.users?.allUsers);
    const handleLogout = () => {
        logOut(dispatch, id, navigate, accessToken, axiosJWT);
    }
    const handleDelete = (id) => {
        deleteUser(user?.accessToken, dispatch, id, axiosJWT);
    };
    return (
        <Container className="py-5 mt-5">
            <Heading heading="My Account" />
            <Tab.Container defaultActiveKey="my-orders">
                <Row className="justify-content-evenly mt-4 p-1">
                    <Col sm={3} className={`${theme ? 'text-light bg-dark' : 'text-black bg-light'} p-2 rounded h-100 mb-3 user-menu`}>
                        <Row className="mb-3 py-2">
                            <Col xs={3} className="pe-0">
                                <Image
                                    src={profilePix}
                                    thumbnail
                                    fluid
                                    roundedCircle
                                    className="p-0"
                                />
                            </Col>
                            <Col xs={9} className="pt-1">
                                {user ? (
                                    <>
                                        <p className="navbar-user">Hi, <span> {user.username}  </span> </p>
                                        <Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="navbar-login"> Login </Link>
                                    </>
                                )}
                            </Col>
                        </Row>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="my-orders">
                                    My Orders
                                    <FaClipboardList size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="account-details">
                                    Account Details
                                    <FaUser size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="about">
                                    About
                                    <IoLocationSharp size="1.4rem" />
                                </Nav.Link>
                                <Nav.Link eventKey="contact">
                                    Contact
                                    <GiWallet size="1.4rem" />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8} className={`${theme ? 'text-light bg-dark' : 'text-black bg-light'} p-2 rounded`}>
                        <Tab.Content>
                            <Tab.Pane eventKey="my-orders">
                                <Heading heading="My Orders" size="h3" />
                                {user ? (
                                    <>
                                        <OrderCard

                                        />

                                    </>
                                ) : (
                                    <>
                                        <span />
                                    </>
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="account-details">
                                <Heading heading="Account details" size="h3" />
                                <div>
                                    <TableControl
                                        header={[
                                            { key: "username", name: "UserName" },
                                            { key: "email", name: "Email" },
                                            { key: "delete", name: "Delete" },
                                            { key: "role", name: "Role" }
                                        ]}
                                        itens={[
                                            {
                                                username: <span>{user ? (
                                                    <>
                                                        <p className="navbar-user"><span> {user.username}  </span> </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span />
                                                    </>
                                                )}</span>
                                                , email: <span>{user ? (
                                                    <>
                                                        <p className="navbar-user"><span> {user.email}  </span> </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span />
                                                    </>
                                                )}</span>
                                                , delete: <span >
                                                    {user ? (
                                                        <>
                                                            <p className="navbar-user"><span> <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div></span> </p>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span />
                                                        </>
                                                    )}
                                                </span>
                                                , role: <span>
                                                    {`${user?.admin ? `admin` : `User`}`}
                                                </span>
                                            },
                                        ]}
                                    />
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="about">
                                <Heading heading="About" size="h3" />
                                <div className="container py-5 my-5">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h1 className="text-primary fw-bold mb-4">About Us</h1>
                                            <p className="lead mb-4" style={{ textAlign: 'justify' }}>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo molestiae earum rem doloremque, nihil delectus ullam error consectetur? Dicta, non exercitationem in consectetur totam dolorum at voluptate laudantium aliquam, officiis perspiciatis molestias reiciendis consequuntur ullam perferendis velit blanditiis distinctio assumenda a maxime reprehenderit atque. Nam eius rerum distinctio, a illo earum, optio molestias nostrum maxime quibusdam delectus, adipisci impedit? Nam corporis reiciendis minus quod eaque, laborum veritatis voluptatibus id maiores tempore accusantium recusandae perspiciatis, officia cum ad maxime fuga repellendus a magni consequatur. Unde adipisci hic provident est sint corporis, dolorem esse autem soluta molestiae optio quisquam eligendi obcaecati minima?
                                            </p>
                                            <NavLink to="/contact" className="btn btn-outline-primary px-3">Contact Us</NavLink>
                                        </div>
                                        <div className="col-md-6 d-flex justify-content-center">
                                            <img src="/assets/images/about.png" alt="About Us" height="400px" width="400px" />
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact">
                                <Heading heading="Contact" size="h3" />
                                <div className="container mb-5">
                                    <div className="row">
                                        <div className="col-12 text-center py-4 my-4">
                                            <h1>Have Some Question?</h1>
                                            <hr />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md 5 d-flex justify-content-center">
                                            <img src="/assets/images/contact.png" alt="Contact Us" height="300px" width="300px" />
                                        </div>
                                        <div className="col-md-6">
                                            <form >
                                                <div class="mb-3">
                                                    <label for="exampleForm" class="form-label">Full Name</label>
                                                    <input type="text" class="form-control" id="exampleForm" placeholder="John Smith" />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                                </div>
                                                <div class="mb-3">
                                                    <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
                                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                                </div>
                                                <button type="submit" class="btn btn-outline-primary">Send Message</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default MyAccount;