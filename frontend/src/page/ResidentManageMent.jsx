import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box } from '@mui/material';
import { Edit, Image, PlusOne } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { LuBuilding2 } from "react-icons/lu";
import { FaBuildingUser, FaPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ArticleIcon from '@mui/icons-material/Article';


const ResidentManageMent = () => {
    const naviget = useNavigate()
    // Sample Data
    const rows = [
        { id: 1, fullName: 'Evelyn Harper', unitNumber: '1001', wing: "A", unitStatus: 'Occupied', residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 0, vehicles: 1, img: "src/assets/notification-img.png" },
        { id: 2, fullName: '', unitNumber: '1002', unitStatus: 'Vacate', wing: "B", residentStatus: '', phoneNumber: '', members: 3, vehicles: 2 },
        { id: 3, fullName: 'Evelyn Harper', unitNumber: '1003', unitStatus: 'Occupied', wing: "C", residentStatus: 'Tenant', phoneNumber: '97687 85628', members: 3, vehicles: 1, img: "src/assets/notification-img.png" },
        { id: 4, fullName: 'Evelyn Harper', unitNumber: '1003', unitStatus: 'Occupied', wing: "C", residentStatus: 'Owner', phoneNumber: '97687 85628', members: 3, vehicles: 0, img: "src/assets/notification-img.png" },
        // Additional rows...
    ];

    // Define Columns
    const columns = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>

                    <img
                        src={params.row.img || "/src/assets/defultProfile.png"}
                        alt={params.value}
                        style={{ width: 35, height: 35, borderRadius: '50%', marginRight: 8, border: params.row.img ? "" : "1px solid #F4F4F4", backgroundColor: params.row.img ? "" : "#F4F4F4" }}
                    />
                    {
                        params.row.fullName === "" ? "-" : <span>{params.value}</span>
                    }



                </div>
            ),
        },
        {
            field: 'unitNumber', headerName: 'Unit Number', flex: 1, minWidth: 100, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <div className={`status-badge ${params.value.toLowerCase()} d-flex gap-3`}>
                    <p className='wing mt-2' ><p className='wing-chile mb-4'>{params.row.wing}</p> </p>  <span> {params.value}</span>

                </div>

            )

        },
        {
            field: 'unitStatus',
            headerName: 'Unit Status',
            flex: 1,
            minWidth: 130,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>
                    {
                        params.row.unitStatus === "Occupied" ? <span> <LuBuilding2 /> {params.value}</span> : <span><FaBuildingUser /> {params.value}</span>
                    }



                </span>
            )
        },
        {
            field: 'residentStatus',
            headerName: 'Resident Status',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>

                    {
                        params.row.residentStatus === "Tenant" ? <span> <FaUser /> {params.value}</span> : params.row.residentStatus === "" ? <span>--</span> : <span><RiShieldUserFill /> {params.value}</span>
                    }
                </span>
            )
        },
        {
            field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.phoneNumber ? <span>{params.value}</span> : <span>--</span>
                    }
                </span>
            )
        },
        {
            field: 'members', headerName: 'Members', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.members > 0 ? <span className=' wing p-2 '>{params.value}</span> : <span>-</span>
                    }
                </span>
            )

        },
        {
            field: 'vehicles', headerName: 'Vehicles', type: 'number', flex: 0.5, minWidth: 80, headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <span>
                    {
                        params.row.vehicles > 0 ? <span className=' wing p-2 '>{params.value}</span> : <span>-</span>
                    }
                </span>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            sortable: false,
            renderCell: (params) => (
                <div>
                    {
                        params.row.fullName === "" && params.row.residentStatus === "" && params.row.phoneNumber === "" ? <span>--</span> : <span>
                            <span className='' onClick={handleShow}>
                                <Edit style={{ cursor: "pointer" }} className='bg-success text-white p-1 radious mx-3 ' />
                            </span>
                            <span onClick={() => handleShow1(params.row.residentStatus)}>
                                <VisibilityIcon style={{ cursor: "pointer" }} className='bg-primary p-1 radious text-white' />
                            </span>
                        </span>

                    }




                </div>
            ),
        },
    ];



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [status, setStatus] = useState("Occupied");
    const [isAgreed, setIsAgreed] = useState(false);

    const handleStatusChange = (event) => setStatus(event.target.value);
    const handleAgreementChange = () => setIsAgreed(!isAgreed);


    // form page route  function 

    function HandleSubmit() {
        try {
            if (status === "Occupied") {

                naviget("/owner")
                setShow(false)
            } else {
                
                setShow(false)
                setShow3(true)
            }

        } catch (error) {
            console.log(error)
        }
    }
    function HandleSubmit1() {
        try {
            setShow3(false)
            setShow4(true)

        } catch (error) {
            console.log(error)
        }
    }


    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false)
    // const handleShow1 = () => setShow1(true);

    function handleShow1(Residence) {
        try {
            if (Residence === "Owner") {
                console.log("Owner")
                setShow1(true)
            } else {
                console.log("terent")
                setShow2(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <Box className="radious" bgcolor={"white"} sx={{ height: '600px', width: '100%', padding: 2 }}>
                <div className="row mt-3 justify-content-between align-items-center">
                    <div className="col-12 col-md-6 mt-2 add-text ">
                        <h5 className='fs-4 add-text'>Resident Tenant and Owner Details</h5>
                    </div>
                    <div className="col-12 col-md-3 mt-2 add-p-btn  ">
                        <div className=' add-btn ' onClick={() => naviget("/owner")}> <span><FaPlus /></span> <span>Add New Resident details</span> </div>
                    </div>
                </div>
                <DataGrid
                    className='mt-4 h-75'
                    rows={rows}
                    columns={columns}
                    pageSize={2}
                    rowsPerPageOptions={[5, 10, 20]}
                    disableSelectionOnClick
                    sx={{
                        '& .status-badge.occupied': {
                            backgroundColor: '#ECFFFF',
                            width: "131px",
                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#14B8A6',
                        },
                        '& .status-badge.vacate': {
                            backgroundColor: '#FFF6FF',
                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#9333EA',
                            maxWidth: "95.31px",

                        },
                        '& .status-badge.tenant': {
                            backgroundColor: '#FFF1F8',
                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#EC4899',
                        },
                        '& .status-badge.owner': {
                            backgroundColor: '#F1F0FF',

                            padding: '5px 10px',
                            borderRadius: '12px',
                            color: '#4F46E5',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#eaf1f8',
                        },
                    }}
                />
            </Box>

            {/* open a view section */}
            {

            }
            <Offcanvas show={show1} placement={"end"} >
                <div className="show-layout">
                    <div className="show-layout-body">
                        <div className="show-layout-header d-flex gap-4 mt-3">
                            <img className='mb-2 ms-3' src="/src/assets/closearo.png" alt="" onClick={handleClose1} />
                            <h4 className='mt-1 header-text'>View Owner Details</h4>
                        </div>

                        <div className="view-layour-body mt-3">
                            <div className="iew-layout-profile mt-4">
                                <center>
                                    <img width={"90px"} height={"90px"} src="/src/assets/Avatar.png" className='fs-1' alt="" />
                                             <h5 className='view-name mt-1'>Roger Lubin</h5>
                                    <p className='view-email'>RogerLubin@gmail.com</p>
                                </center>
                            </div>
                            <center>

                                <div className="viwe-detels-layout ">
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Wing</p>
                                        <p className='mx-3 text-2'>A</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2 ">
                                        <p className='ms-3  text-1'>Unit</p>
                                        <p className='mx-3 text-2'>101</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Age</p>
                                        <p className='mx-3 text-2'>20</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2">
                                        <p className='ms-3  text-1'>Gender</p>
                                        <p className='mx-3 text-2'>Male</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout mt-3 ">
                                    <div className="profile-detels ">
                                        <div >
                                            <h5 className='title'>Document</h5>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <Image className='fs-3' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Adharcard Front Side.JPG
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <ArticleIcon className='fs-3 text-danger' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Address Proof Front Side.PDF
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </center>

                            <center>

                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Member Counting</h6>
                                        <h6 className='mx-3 mt-2 text-white'>02</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                </div>

                            </center>
                        </div>
                    </div>
                </div>
            </Offcanvas>
            {/* terent canvase */}
            <Offcanvas show={show2} placement={"end"} >
                <div className="show-layout">
                    <div className="show-layout-body">
                        <div className="show-layout-header d-flex gap-4 mt-3">
                            <img className='mb-2 ms-3' src="/src/assets/closearo.png" alt="" onClick={handleClose2} />
                            <h4 className='mt-1 header-text'>View Tenant Details</h4>
                        </div>

                        <div className="view-layour-body mt-3">
                            <div className="iew-layout-profile mt-4">
                                <center>
                                    <img width={"90px"} height={"90px"} src="/src/assets/Avatar.png" className='fs-1' alt="" />
                                    <h5 className='view-name mt-1'>Roger Lubin</h5>
                                    <p className='view-email'>RogerLubin@gmail.com</p>
                                </center>
                            </div>
                            <center>

                                <div className="viwe-detels-layout ">
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Wing</p>
                                        <p className='mx-3 text-2'>A</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2 ">
                                        <p className='ms-3  text-1'>Unit</p>
                                        <p className='mx-3 text-2'>101</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels ">
                                        <p className='ms-3  text-1'>Age</p>
                                        <p className='mx-3 text-2'>20</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="profile-detels mt-2">
                                        <p className='ms-3  text-1'>Gender</p>
                                        <p className='mx-3 text-2'>Male</p>
                                    </div>
                                    <div className="line"></div>
                                </div>
                            </center>
                            <center>
                                <div className="viwe-detels-layout mt-3 ">
                                    <div className="profile-detels ">
                                        <div >
                                            <h5 className='title'>Document</h5>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <Image className='fs-3' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Adharcard Front Side.JPG
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="document">
                                                <div className="d-flex document-1">
                                                    <div className="document-ditels d-flex">
                                                        <div className="img-icon ">
                                                            <ArticleIcon className='fs-3 text-danger' />
                                                        </div>
                                                        <div className="document-name d-block ms-2">
                                                            <h6 className='d-text'>
                                                                Address Proof Front Side.PDF
                                                            </h6>
                                                            <p className="d-n ">3.5 MB</p>
                                                        </div>
                                                    </div>
                                                    <div className="document-view mt-1">
                                                        <VisibilityIcon />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>

                                </div>
                            </center>


                            <center>

                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Owner Details</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'> Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Address</p>
                                            <p className='mx-3 text-2'>2972 Westheimer Rd..</p>
                                        </div>

                                    </div>

                                </div>

                            </center>
                            <center>

                                <div className="viwe-detels-layout1 mt-4 ">
                                    <div className="MemberCounting d-flex justify-content-between  align-items-center  ">
                                        <h6 className='ms-3 mt-2 text-white'>Member Counting</h6>
                                        <h6 className='mx-3 mt-2 text-white'>02</h6>
                                    </div>
                                    <div className="member-info ">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                    <div className="member-info">
                                        <div className="profile-detels mt-4 p-1 ">
                                            <p className='ms-3  mt-2 text-1'>First Name</p>
                                            <p className='mx-3 mt-2 text-2'>Roger Lubin</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2 ">
                                            <p className='ms-3  text-1'>Phone No</p>
                                            <p className='mx-3 text-2'>9123455555</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels ">
                                            <p className='ms-3  text-1'>Age</p>
                                            <p className='mx-3 text-2'>20</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Gender</p>
                                            <p className='mx-3 text-2'>Male</p>
                                        </div>
                                        <div className="line"></div>
                                        <div className="profile-detels mt-2">
                                            <p className='ms-3  text-1'>Relation</p>
                                            <p className='mx-3 text-2'>Brother</p>
                                        </div>
                                    </div>
                                </div>

                            </center>
                        </div>
                    </div>
                </div>
            </Offcanvas>



            {/* Residence Status popup selelct occupied and vacate */}
            <div className="d-flex justify-content-center">
                <Modal
                    className="custom-modal"
                    show={show}

                    centered
                >
                    <Modal.Header >
                        <Modal.Title>Residence Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="status-options d-flex justify-content-between">
                                {/* Occupied Option */}
                                <div
                                    className={`p-2 d-flex align-items-center option ${status === "Occupied" ? "selected" : ""
                                        }`}
                                    onClick={() => setStatus("Occupied")}
                                    style={{ border: "1px solid #D3D3D3", borderColor: status === "Occupied" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Occupied" ? "black" : "#D3D3D3" }}
                                >
                                    <Form.Check
                                        type="radio"
                                        label="Occupied"
                                        name="status"
                                        value="Occupied"
                                        checked={status === "Occupied"}
                                        onChange={handleStatusChange}
                                        className="status-radio mt-2"
                                    />
                                </div>
                                {/* Vacant Option */}
                                <div
                                    style={{ border: "1px solid #D3D3D3", borderColor: status === "Vacant" ? "#FE512E #F09619" : "#D3D3D3", color: status === "Vacant" ? "black" : "#D3D3D3" }}

                                    className={`p-2 d-flex align-items-center option ${status === "Vacant" ? "selected" : ""
                                        }`}
                                    onClick={() => setStatus("Vacant")}
                                >
                                    <Form.Check
                                        type="radio"
                                        label="Vacant"
                                        name="status"
                                        value="Vacant"
                                        checked={status === "Vacant"}
                                        onChange={handleStatusChange}
                                        className="status-radio mt-2"
                                    />
                                </div>
                            </div>
                            {/* Agreement Checkbox */}
                            <Form.Group controlId="agreementCheckbox" className="mt-4">
                                <Form.Check
                                    type="checkbox"
                                    label="By submitting, you agree to select Occupied"
                                    checked={isAgreed}
                                    className='mt-3'
                                    onChange={handleAgreementChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className=" d-flex justify-content-between">
                        <div className="d-flex gap-3">
                        <Button
                            className=" cancel-btn radious "
                            style={{ border: "1px solid #D3D3D3",  }}
                            variant="light"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="save-btn radious l-btn "
                            style={{
                                background: "linear-gradient(90deg, #FE512E, #F09619)",
                                border: "none",
                                cursor: "pointer"
                            }}

                            onClick={HandleSubmit}
                        >
                            Save
                        </Button>
                        </div>
                      
                    </Modal.Footer>
                </Modal>
            </div>


            {/* Residence Status popup for select wing and unit */}
            <div className="d-flex justify-content-center">
                <Modal
                    className="custom-modal"
                    show={show3}

                    centered
                >
                    <Modal.Header >
                        <Modal.Title>Residence Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <div className="status-options d-flex ">
                                {/* Occupied Option */}
                                <div className="col-md-6 col-10">
                                    <label className='text-wrap'>Wing<span className='text-danger1 '>*</span></label>
                                    <select className="form-select  input-text mt-1 input-style" required>
                                        <option>Select Wing</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                    </select>
                                </div>
                                {/* Vacant Option */}
                                <div className="col-md-6 col-10 ">
                                    <label className='text-wrap'>Unit<span className='text-danger1 '>*</span></label>
                                    <select className="form-select  input-text mt-1 input-style" required>
                                        <option>Select Unit</option>
                                        <option>1000</option>
                                        <option>1002</option>
                                        <option>1003</option>
                                    </select>
                                </div>
                            </div>
                            {/* Agreement Checkbox */}
                            <Form.Group controlId="agreementCheckbox" className="mt-4">
                                <Form.Check
                                    type="checkbox"
                                    label="By submitting, you agree to select Vacant"
                                    checked={isAgreed}
                                    className='mt-3'
                                    onChange={handleAgreementChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className=" d-flex justify-content-between">
                        <div className="d-flex gap-3">

                        
                        <Button
                            className="cancel-btn radious "
                            style={{ border: "1px solid #D3D3D3",  }}
                            variant="light"
                            onClick={handleClose3}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="save-btn radious l-btn "
                            style={{
                                background: "linear-gradient(90deg, #FE512E, #F09619)",
                                border: "none",
                                cursor: "pointer"
                            }}

                            onClick={HandleSubmit1}
                        >
                            Conform
                        </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* Do you want to vacate the finlay flat? */}

            <div className="d-flex justify-content-center">
                <Modal
                    className="custom-modal"
                    show={show4}

                    centered
                >
                    <Modal.Header >
                        <Modal.Title>Do you want to vacate the finlay flat?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{color:"#A7A7A7"}}>
                    
                    Are you sure you want to delate all details?
                    </Modal.Body>
                    <Modal.Footer className=" d-flex">
                        <div className="d-flex gap-3">
                        <Button
                            className="cancel-btn radious "
                            style={{ border: "1px solid #D3D3D3", }}
                            variant="light"
                            onClick={handleClose4}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="save-btn radious l-btn "
                            style={{
                                background: "#E74C3C",
                                border: "none",
                                cursor: "pointer"
                            }}

                            onClick={()=>naviget("/resident")|| setShow4(false)}
                        >
                            Conform
                        </Button>
                        </div>
                       
                    </Modal.Footer>
                </Modal>
            </div>
        </>

    );
};

export default ResidentManageMent;
