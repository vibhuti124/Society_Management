import React from 'react';
import FinancialCard from '../components/FinancialCard';
import Graph from '../components/Graph';
import ComplaintList from '../components/ComplaintList';
import ContactList from '../components/ContactList';
import MaintenanceList from '../components/MaintenanceList';
import ActivityList from '../components/ActivityList';
import { FaBuilding, FaEquals } from 'react-icons/fa';
import { BiDollar } from 'react-icons/bi';

const Dashboard = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className="flex justify-center xl:flex-nowrap flex-wrap gap-[20px] mt-6 w-full">
        <FinancialCard title="Total Balance" amount="₹ 2,22,520" bordercolor="border-r-orange-500" bgcolor="bg-orange-100" textcolor="text-orange-600" icon={<FaEquals />} />
        <FinancialCard title="Total Income" amount="₹ 55,000" bordercolor="border-r-green-500" bgcolor="bg-green-100" textcolor="text-green-600" icon={<BiDollar />} />
        <FinancialCard title="Total Expense" amount="₹ 20,550" bordercolor="border-r-blue-500" bgcolor="bg-blue-100" textcolor="text-blue-600" icon={<BiDollar />} />
        <FinancialCard title="Total Unit" amount="₹ 20,550" bordercolor="border-r-pink-500" bgcolor="bg-pink-100" textcolor="text-pink-600" icon={<FaBuilding />} />
      </div>

      <div className="flex flex-wrap justify-center 2xl:flex-nowrap gap-[20px] w-full">
        <Graph />
        <ContactList />
        <MaintenanceList />
      </div>

      <div className="flex flex-wrap justify-center 2xl:flex-nowrap gap-[20px] w-full">
        <div className="bg-white p-4 shadow-md rounded-lg mt-6 w-full 2xl:w-[1180px] h-[361px] overflow-auto">
          <ComplaintList
            title="Complain List"
            cn="Complaint Name"
            un="Complainer Name"
            FormTitle="Edit Complaint"
            showDropdown={true}
            deltitle="Complaint"
            viewtitle="View Complain"
            peoplename="Complainer Name"
            peoplercname="Complaint Name"
            deletepages="Complaint "
            complainedit="Edit Complaint"
            fields={['complainerName', 'complaintName', 'date', 'priority', 'status', 'action']}
          />
        </div>
        <ActivityList />
      </div>
    </div>
  );
};

export default Dashboard;
