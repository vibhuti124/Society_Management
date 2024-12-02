import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export default function Owner() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("Male");
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const [photo, setPhoto] = useState(null);

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/png, image/jpeg, image/gif',
        maxSize: 10 * 1024 * 1024, // 10 MB
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        },
    });

    const [vehicleCount, setVehicleCount] = useState(2); // Default to 2 vehicles
    const totalVehicle = 5; // Total number of rows available
    const [memberCount, setMemberCount] = useState(2); // Default to 2 members
    const totalRows = 5; // Total number of rows available

    const handleMemberCountChange = (event) => {
        setMemberCount(Number(event.target.value));
    };

    const handleVehicleCountChange = (event) => {
        setVehicleCount(Number(event.target.value));
    };

    return (

        <>
        <div div className=''>
           

            <div className='row'>
                <div className="d-flex mt-4">
                    <div
                        onClick={() => navigate("/owner")}
                        style={{
                            background: location.pathname === "/owner" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff",
                            color: location.pathname === "/owner" ? "white" : "black"
                        }}
                        className='f-btn d-flex justify-content-center'
                    >
                        <p>Owner</p>
                    </div>
                    <div
                        onClick={() => navigate("/Tenant")}
                        style={{
                            background: location.pathname === "/Tenant" ? "linear-gradient(90deg, #FE512E, #F09619)" : "#ffff",
                            color: location.pathname === "/Tenant" ? "white" : "black"
                        }}
                        className='f-btn d-flex justify-content-center'
                    >
                        <p>Tenant</p>
                    </div>
                </div>
            </div>

            <div className="bg-white section-1">
                <div className="row d-flex">

                    <div className="col-12 col-md-1 p-3 profilePage img-profile ">
                        <label className="photo-upload mt-2 ">
                            <img src="/src/assets/addprofile.png " alt="" />
                            <input type="file" accept="image/*" />
                            <div className="photo-preview text-center mt-4 profil-text" style={{ backgroundImage: `url(${photo || ''})` }}>

                                {!photo && <span className="camera-icon text-center mt-5">Add Photo</span>}
                            </div>
                        </label>
                    </div>
                    <div className="col-12 col-md-10">
                        <div className="row">
                            <div className="col-12 col-md-4">
                                <label className='labal-name'>Full Name <span className='text-danger1'>*</span></label>
                                <input className='input-style' placeholder='Enter Full Name' type="text" />
                            </div>
                            <div className="col-12 col-md-4">
                                <label className='labal-name'>Phone Number <span className='text-danger1'>*</span></label>
                                <input className='input-style' type="text" placeholder='+91' />
                            </div>
                            <div className="col-12 col-md-4">
                                <label className='labal-name'>Email Address</label>
                                <input className='input-style' placeholder='Enter Email Address' type="text" />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-12 col-md-2">
                                <label className='labal-name'>Age <span className='text-danger1'>*</span></label>
                                <input type="text" placeholder='Enter Age' className='input-section-2' />
                            </div>
                            <div className="col-12 col-md-3">
                                <div className="custom-dropdown">
                                    <label className="dropdown-label">Gender <span className="required">*</span></label>
                                    <div className="dropdown-header input-style input-section-2" onClick={() => setIsOpen(!isOpen)}>
                                        {selectedOption}
                                    </div>
                                    {isOpen && (
                                        <div className="dropdown-options input-style">
                                            {["Male", "Female", "Other"].map((option) => (
                                                <div
                                                    key={option}
                                                    className={`dropdown-option ${selectedOption === option ? "selected" : ""}`}
                                                    onClick={() => handleSelect(option)}
                                                >
                                                    <span className="radio-icon">
                                                        {selectedOption === option ? "🔘" : "⚪"}
                                                    </span>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-12 col-md-2">
                                <label className='labal-name'>Wing <span className='text-danger1'>*</span></label>
                                <input type="text" className='input-section-2' placeholder='Enter Wing' />
                            </div>
                            <div className="col-12 col-md-3">
                                <label className='labal-name'>Relation <span className='text-danger1'>*</span></label>
                                <input type="text" className='input-section-2' placeholder='Enter Relation' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* File Uploads */}
                <div className="row">
                    {['Aadhar Card (Front Side)', 'Aadhar Card (Back Side)', 'Address Proof', 'Rent Agreement'].map((text, index) => (
                        <div key={index} className="col-12 col-md-3 mt-4">
                            <div className="text-img">
                                <span className='t-img'>{`Upload ${text}`}</span>
                            </div>
                            <div className="file-upload" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className="upload-area">
                                    <center>
                                        <div className="icon"><AddPhotoAlternateIcon className='miui-icon fs-1 ms-3' /></div>
                                    </center>
                                    <p><span className='img-text'>Upload a file </span> or drag and drop</p>
                                    <small>PNG, JPG, GIF up to 10MB</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Member Count Section */}
            <div className="section-2 mt-3">
                <div className="header d-flex justify-content-between align-items-center">
                    <h6 className='MEMBER-TEX'>Member Counting: <span className='othe-text'>(Other Members)</span></h6>
                    <div className="select-member">
                        <label className="me-2 SELECT-MEMBER">Select Member</label>
                        <select value={memberCount} onChange={handleMemberCountChange} className="form-select">
                            {[...Array(totalRows).keys()].map((num) => (
                                <option key={num} value={num + 1}>{num + 1}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="member-rows mt-3">
                    {[...Array(totalRows).keys()].map((index) => (
                        <div key={index} className={`member-row ${index < memberCount ? '' : 'd-none'}`}>
                            <div className="col-md-2 col-12">
                                <label className='text-wrap'>Full Name <span className='text-danger1'>*</span></label>
                                <input type="text" className="form-control input-text input-style" placeholder="Enter Full Name" required />
                            </div>
                            <div className="col-md-2 col-12">
                                <label className='text-wrap'>Phone No <span className='text-danger1'>*</span></label>
                                <input type="tel" className="form-control input-text input-style" placeholder="+91" required />
                            </div>
                            <div className="col-md-2 col-12">
                                <label className='text-wrap'>Email</label>
                                <input type="email" className="form-control input-text input-style" placeholder="Enter Email Address" />
                            </div>
                            <div className="col-md-2 col-12">
                                <label className='text-wrap'>Aadhar Card</label>
                                <input type="text" className="form-control input-text input-style" placeholder="Enter Aadhar No" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        </>
        )
}

