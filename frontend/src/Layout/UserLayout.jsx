import React from 'react'
import styled from 'styled-components';
import { FaBarsStaggered } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { MdNotificationImportant } from "react-icons/md"
import { MdDashboard } from "react-icons/md";
import PersonalDetailIcon from "../assets/Icons/personalcard.png"
import LogoI from "../assets/Logo.png"
import User from "../assets/Avatar.png"
import ServiceIcon from "../assets/Icons/2.png"
import EventsIcon from "../assets/Icons/Events Participation.png"
import PaymentPortalIcon from "../assets/Icons/wallet.png"
import SecurityProtocallIcon from "../assets/Icons/Frame.png"
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoMdClose } from "react-icons/io";
import { FaGreaterThan } from "react-icons/fa6";




export default function UserLayout({ component }) {
    const [show, setShow] = useState(false);
    const naviget = useNavigate()
    const [serch, setserch] = useState(0)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [showFinancialSubmenu2, setShowFinancialSubmenu2] = useState(false);
    const [showFinancialSubmenu3, setShowFinancialSubmenu3] = useState(false);




    // Toggle Financial Management submenu
    const toggleFinancialSubmenu = () => setShowFinancialSubmenu2(!showFinancialSubmenu2);
    const toggleFinancialSubmenu1 = () => setShowFinancialSubmenu3(!showFinancialSubmenu3);


    // notification 


    const [isOpen, setIsOpen] = useState(false);


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const handleAccept = (id) => {
        alert(`Accepted notification with ID ${id}`);
    };

    const handleDecline = (id) => {
        alert(`Declined notification with ID ${id}`);
    };

    const clearAll = () => {
        setNotifications([]);
    };


    const [notifications, setNotifications] = useState([
        {
            id: 1,
            img: "src/assets/notification-img.png",
            title: "Evelyn Harper (A-101)",
            time: "Monday 11:41 AM",
            message: "Evelyn Harper gave a fund of 1000 rupees for Navratri.",
            linkText: "1000 rupees",
            timeAgo: "32 Minutes ago",
        },
        {
            id: 2,
            img: "src/assets/notification-img.png",
            title: "Maintenance (A-101)",
            time: "Tuesday 11:41 AM",
            message: "Evelyn Harper gave a Maintenance of 1000 rupees.",
            linkText: "Maintenance of 1000 rupees",
            timeAgo: "2 days ago",
        },
        {
            id: 3,
            img: "src/assets/notification-img.png",
            title: "Ganesh Chaturthi (A-101)",
            time: "Saturday 11:41 AM",
            message: "Per Person Amount : ₹1,500\nThe celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in OurResident.",
            linkText: "₹1,500",
            timeAgo: "2 days ago",
        },
    ]);

    const SearchBar = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: none;
  width: 250px;
background-color: #F6F8FB;

  
`;
    const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

    const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 14px;
`;

    const UserName = styled.span`
  font-size: 16px;
`;
    const Notifiction = styled.span`
  font-size: 16px;
  margin-left: 14px;

`;
    const Search_Icon = styled.span`
  font-size: 16px;
  margin-left: 14px;
 


`;
    const Submenu = styled.ul`
list-style-type: none;
padding-left: 20px;
margin-top: 5px;
`;

    const SubmenuItem = styled.li`
padding: 10px;
color: #202224;
cursor: pointer;

`;
    const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  
`;


    const NavLink = styled.li`
  padding: 14px ;
  margin:14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  color: #4F4F4F;
  cursor: pointer;
  &:hover {
   background: linear-gradient(90deg, #FE512E 0%, #F09619 100%);
  color:white;
  }
`;

    const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  text-align: center;
`;

    const SidebarMiniButton = styled.div`
  width: 10px;
  height: 50px;
  padding: 14px ;
left:-23px;
  background: linear-gradient(180deg, #ff5722, #ff9800);
  border-radius: 6px;
   border-right:2px solid black
  cursor: pointer;
  position: relative;
  
 Optional shadow for a bit of 3D effect
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;
    return (
        <div className='container-fulid' style={{ overflow: "hidden" }}>

            <div className="row ">
                <div className=" d-flex">

                    <div className="  layout  col-12 col-md-3 side-bar   ">
                        <Logo>
                            <Link to={"/deshbord"}>
                                <img className='sidebar-logo my-4 mx-2' src={LogoI} alt="Logo" />
                            </Link>
                            <center>
                                <div style={{ border: "1px solid #F4F4F4" }} className="">
                                </div>
                            </center>
                        </Logo>
                        <NavLinks className='h-50'>


                            <Link className='link-tag' to={"/user/deshbord"}  > <div className='side-design' style={{ display: location.pathname === "/user/deshbord" ? "block" : "none" }}><SidebarMiniButton /> </div>    <NavLink style={{ background: location.pathname === "/user/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/user/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>



                            <Link className='link-tag' to={"/personaldetail"} >  <div className='side-design' style={{ display: location.pathname === "/personaldetail" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/personaldetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/personaldetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={PersonalDetailIcon} alt="" /> Personal Detail</NavLink></Link>



                            <Link className='link-tag' to={"/serviceandcomplaint"} >  <div className='side-design' style={{ display: location.pathname === "/serviceandcomplaint" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/serviceandcomplaint" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/serviceandcomplaint" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={ServiceIcon} alt="" /> Service And Complaint</NavLink></Link>



                            <Link className='link-tag' to={"/eventsparticipation"} >  <div className='side-design' style={{ display: location.pathname === "/eventsparticipation" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/eventsparticipation" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/eventsparticipation" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={EventsIcon} alt="" /> Events Participation</NavLink></Link>



                            <Link className='link-tag' to={"/paymentportal"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/paymentportal" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/paymentportal" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/paymentportal" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={PaymentPortalIcon} alt="" /> Payment Portal</NavLink></Link>


                            {
                                location.pathname === "/paymentportal" || location.pathname === "/otherinvoices" ? <div> {showFinancialSubmenu2 && (
                                    <Submenu>
                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/paymentportal" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/paymentportal")} >Maintenance Invoices</span></SubmenuItem>
                                        <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/otherinvoices" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/otherinvoices")}> Other Invoices</span></SubmenuItem>

                                    </Submenu>
                                )} </div> : ""
                            }



                            <Link className='link-tag' to={"/securityprotocall"} >  <div className='side-design' style={{ display: location.pathname === "/securityprotocall" ? "block" : "none" }}><SidebarMiniButton /> </div>  <NavLink style={{ background: location.pathname === "/securityprotocall" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/securityprotocall" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={SecurityProtocallIcon} alt="" /> Security Protocall</NavLink></Link>




                            <p className='mt-5 text-danger' style={{ margin: " 10px", padding: "15px", cursor: "pointer", borderTop: "1px solid #F4F4F4" }}> <TbLogout className='fs-3' />  Logout</p>
                        </NavLinks>
                    </div>
                    <div className="col-12 col-md-9 ">
                        <div style={{ borderLeft: "2px solid #F6F8FB" }} className="navbar p-4">
                            <div className="app-bar ">
                                <FaBarsStaggered variant="primary" onClick={handleShow} />
                                <Offcanvas show={show} onHide={handleClose}>
                                    <Offcanvas.Header closeButton className='fs-3' />
                                    <Offcanvas.Title>
                                        <Logo className="mt-1">
                                            <Link to={"/deshbord"}>
                                                <img className='h-75 w-75' src={LogoI} alt="Logo" />
                                            </Link>
                                            <center>
                                                <div style={{ border: "1px solid #F4F4F4" }} className="mt-5 ">
                                                </div>
                                            </center>
                                        </Logo>
                                    </Offcanvas.Title>
                                    <Offcanvas.Body>



                                        {/* sidebar for A mobail sceen */}
                                        <NavLinks>


                                            <Link className='link-tag' to={"/user/deshbord"}  > <div className='side-design ' style={{ display: location.pathname === "/user/deshbord" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>    <NavLink style={{ background: location.pathname === "/user/deshbord" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/user/deshbord" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious link-tag'>    <MdDashboard className=' fs-3 mb-1' />Dashboard  </NavLink></Link>




                                            <Link className='link-tag' to={"/personaldetail"} >  <div className='side-design' style={{ display: location.pathname === "/personaldetail" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/personaldetail" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/personaldetail" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={PersonalDetailIcon} alt="" /> Personal Detail</NavLink></Link>




                                            <Link className='link-tag' to={"/serviceandcomplaint"} >  <div className='side-design' style={{ display: location.pathname === "/serviceandcomplaint" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/serviceandcomplaint" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/serviceandcomplaint" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={ServiceIcon} alt="" /> Service And Complaint</NavLink></Link>




                                            <Link className='link-tag' to={"/eventsparticipation"} >  <div className='side-design' style={{ display: location.pathname === "/eventsparticipation" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/eventsparticipation" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/eventsparticipation" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={EventsIcon} alt="" /> Events Participation</NavLink></Link>




                                            <Link className='link-tag' to={"/paymentportal"} onClick={toggleFinancialSubmenu} >  <div className='side-design' style={{ display: location.pathname === "/paymentportal" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/paymentportal" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/paymentportal" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={PaymentPortalIcon} alt="" /> Payment Portal</NavLink></Link>


                                            {
                                                location.pathname === "/paymentportal" || location.pathname === "/otherinvoices" ? <div> {showFinancialSubmenu2 && (
                                                    <Submenu>
                                                        <SubmenuItem> <span className='p-1' style={{ borderLeft: location.pathname === "/paymentportal" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/paymentportal")} >Maintenance Invoices</span></SubmenuItem>
                                                        <SubmenuItem>   <span className='p-1' style={{ borderLeft: location.pathname === "/otherinvoices" ? "2px solid black" : "2px solid gray" }} onClick={() => naviget("/otherinvoices")}> Other Invoices</span></SubmenuItem>

                                                    </Submenu>
                                                )} </div> : ""
                                            }




                                            <Link className='link-tag' to={"/securityprotocall"} >  <div className='side-design' style={{ display: location.pathname === "/securityprotocall" ? "block" : "none" }}><SidebarMiniButton style={{ left: "-34px" }} /> </div>  <NavLink style={{ background: location.pathname === "/securityprotocall" ? "linear-gradient(90deg, #FE512E 0%, #F09619 100%)" : "", color: location.pathname === "/securityprotocall" ? "white" : "", textDecoration: "none" }} className=' d-flex gap-3 radious'> <img src={SecurityProtocallIcon} alt="" /> Security Protocall</NavLink></Link>





                                            <p className='mt-5 text-danger' style={{ margin: " 10px", padding: "14px", cursor: "pointer", borderTop: "1px solid #F4F4F4" }}> <TbLogout className='fs-3' />  Logout</p>
                                        </NavLinks>
                                    </Offcanvas.Body>
                                </Offcanvas>
                            </div>
                            <div className="search" style={{ width: "500px" }}>
                                {
                                    location.pathname === "/deshbord" ? <div>
                                        <SearchBar className='perent-search' onChange={() => setserch(2)} type='search' placeholder="           Search Here" />
                                        <CiSearch className='fs-3 fw-bolde child-search ' style={{ display: serch == 0 ? "block" : "none" }} />
                                    </div> :
                                        <div className='flex'>
                                            <span className='text-lg' onClick={() => naviget("/deshbord")} style={{ color: "#A7A7A7", cursor: "pointer" }}>Home</span>
                                            <span className='ms-2 mt-2  '><FaGreaterThan className='' /></span>
                                            <span style={{ color: "#5678E9" }} className='ms-2 text-lg'>{location.pathname.split("/")}</span>
                                        </div>
                                }


                            </div>
                            <UserInfo>
                                <Search_Icon className='search-icon'>
                                    <CiSearch className='fs-2' />
                                </Search_Icon>
                                <Notifiction >

                                    <MdNotificationImportant style={{ cursor: "pointer" }} onClick={toggleDropdown} className='fs-2 mx-2' />

                                    {
                                        isOpen && (
                                            <div className="notifications-container">
                                                <div className="notifications-header">
                                                    <h2>Notification</h2>
                                                    {
                                                        notifications.length > 0 ? <button className="clear-all" onClick={clearAll}>Clear all</button> : <IoMdClose className='fs-3 mb-1' style={{ cursor: "pointer" }} onClick={toggleDropdown} />
                                                    }
                                                </div>
                                                <div className="notifications-list col-12">
                                                    {notifications.length > 0 ? notifications.map((notification) => (
                                                        <div key={notification.id} className="notification-item">
                                                            <div className="notification-content">
                                                                <h3><img src={notification.img} alt="" /> {notification.title}</h3>
                                                                <p className="notification-time">{notification.time}</p>
                                                                <p>
                                                                    {notification.message.replace(notification.linkText, '')}
                                                                    <a href="#">{notification.linkText}</a>
                                                                </p>
                                                            </div>
                                                            <div className="notification-actions">
                                                                <button onClick={() => handleAccept(notification.id)} className="accept-btn">Accept</button>
                                                                <button onClick={() => handleDecline(notification.id)} className="decline-btn">Decline</button>
                                                                <span className="time-ago">{notification.timeAgo}</span>
                                                            </div>
                                                        </div>
                                                    )) : <img width={"100%"} src='src/assets/notification.png' />}
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        isOpen && (
                                            <div className="notifications-mobile d-sm-block d-md-none" >
                                                <div className="row">
                                                    <div className="col-12 w-100">
                                                        <div className="notifications-header">
                                                            <h2 className='ms-2'>Notification</h2>
                                                            {
                                                                notifications.length > 0 ? <button className="clear-all mx-3" onClick={clearAll}>Clear all</button> : <IoMdClose className='fs-3 mb-1 mx-3' style={{ cursor: "pointer" }} onClick={toggleDropdown} />
                                                            }

                                                        </div>
                                                        <div className="notifications-list col-12">
                                                            {notifications.length > 0 ? notifications.map((notification) => (
                                                                <div key={notification.id} className="notification-item">
                                                                    <div className="notification-content">
                                                                        <h3>{notification.title}</h3>
                                                                        <p className="notification-time">{notification.time}</p>
                                                                        <p>
                                                                            {notification.message.replace(notification.linkText, '')}
                                                                            <a href="#">{notification.linkText}</a>
                                                                        </p>
                                                                    </div>
                                                                    <div className="notification-actions">
                                                                        <button onClick={() => handleAccept(notification.id)} className="accept-btn">Accept</button>
                                                                        <button onClick={() => handleDecline(notification.id)} className="decline-btn">Decline</button>
                                                                        <span className="time-ago">{notification.timeAgo}</span>
                                                                    </div>
                                                                </div>
                                                            )) : <img width={"100%"} src='src/assets/notification.png' />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }



                                </Notifiction>
                                <div className="lile border   " style={{ height: "40px" }}>
                                </div>

                                <UserAvatar onClick={() => naviget("/profile")} className='' src={User} alt="User" style={{ cursor: "pointer" }} />


                                <UserName className=' search'>Moni Roy
                                    <br />
                                    <span className='mx-1 text-color '>admin</span>

                                </UserName>
                            </UserInfo>
                        </div>
                        <div className="component-layout  h-100   ">

                            <br />
                            <div className="p-4">
                                <div className="container-fluid">


                                    {component}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}