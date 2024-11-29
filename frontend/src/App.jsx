// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signup from './component/Signup';
import Login from './component/Login';
import ForgotPassword from './component/ForgotPassword';
import EnterOtp from './component/EnterOtp';
import ResetPassword from './component/ResetPassword';
import ResidentManagement from './component/ResidentManagement';
import Dashboard from './component/Dashboard';
import ResidentForm from './component/ResidentForm';

import FinancialManagementOtherIncome from './component/FinancialManagementOtherIncome';
import FinancialManagementExp from './component/FinancialManagementExp';
import FinancialManagementNote from './component/FinancialManagementNote';
import FinancialManagementIncome from './component/FinancialManagementIncome';
import FacilityManagement from './component/FacilityManagement';
import ComplaintTracking from './component/CreateComplaint';
import RequestTracking from './component/RequestTracking';
import DetailTracking from './component/VisitorsLogs';
import SecurityProtocols from './component/SecurityProtocols';
import SecurityGaurd from './component/SecurityGaurd';
import Announcement from './component/Announcement';
import VisitorsTracking from './component/VisitorsTracking';
import EmergencyManagement from './component/EmergencyManagement';
import Profile from './component/Profile';

import EditProfile from './component/EditProfile'
import PersonalDetail from './component/PersonalDetail';
import TenantPersonalDetails from './component/TenantPersonalDetails';
import ServiceComplaint from './component/ServiceComplaint.jsx';
import RequestSubmission from './component/RequestSubmission.jsx';
import EventParticipation from './component/EventParticipation.jsx';
import ActivityParticipation from './component/ActivityParticipation.jsx';
import MaintenanceInvoices from './component/MaintenanceInvoices.jsx';

import SecurityProtocolsResident from './component/SecurityProtocolsResident';

import ViewInvoice from './component/ViewInvoice.jsx';

import OtherIncomeInvoices from './component/OtherIncomeInvoice.jsx';


function App() {
  return (
    <div className="d-flex">
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<EnterOtp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/residentmanagement' element={<ResidentManagement />} />
          <Route path='/residentForm' element={<ResidentForm />} />
          <Route path="/Financial-Maintenance" element={<FinancialManagementIncome />} />
          <Route path="/OtherIncome" element={<FinancialManagementOtherIncome />} />
          <Route path="/Expense" element={<FinancialManagementExp />} />
          <Route path="/Note" element={<FinancialManagementNote />} />
          <Route path="/facilitymanagement" element={<FacilityManagement />} />
          <Route path="/createcomplaint" element={<ComplaintTracking />} />
          <Route path="/requesttracking" element={<RequestTracking />} />
          <Route path="/visitorslog" element={<DetailTracking />} />
          <Route path="/securityprotocols" element={<SecurityProtocols />} />
          <Route path="/securityguard" element={<SecurityGaurd />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path='/visitortracking' element={<VisitorsTracking />} />
          <Route path='/emergencymanagement' element={<EmergencyManagement />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/EditProfile' element={<EditProfile />} />


          <Route path='/personaldetails' element={<PersonalDetail />} />
          <Route path='/personaldetailstenant' element={<TenantPersonalDetails />} />
          <Route path='/serviceandcomplaint' element={<ServiceComplaint />} />
          <Route path='/requestandsubmission' element={<RequestSubmission />} />
          <Route path='/eventsandparticipation' element={<EventParticipation />} />
          <Route path='/activityandparticipation' element={<ActivityParticipation />} />
          <Route path='/maintenanceinvoices' element={<MaintenanceInvoices />} />
          <Route path='/otherincomenvoice' element={<OtherIncomeInvoices />} />


          <Route path='/ResidentProtocols' element={<SecurityProtocolsResident />} />
          <Route path='viewinvoice' element={<ViewInvoice />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
