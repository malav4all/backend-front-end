import { FcInfo } from "react-icons/fc";
export const clusterViewDashboardTableHeader = [
  { name: "Label", field: "name" },
  { name: "Imei", field: "imei" },
  { name: "Status", field: "status" },
  { name: "Last Data", field: "lastdata" },
  { name: "Last Location", field: "lastlocation" },
  { name: "Action", field: "action" },
];

const dummyData = [
  {
    name: "Device A",
    imei: "123456789",
    status: "Active",
    lastdata: "2024-04-08 10:30 AM",
    lastlocation: "Location A",
    action: <FcInfo />,
  },
  {
    name: "Device B",
    imei: "987654321",
    status: "Inactive",
    lastdata: "2024-04-07 05:45 PM",
    lastlocation: "Location B",
    action: <FcInfo />,
  },
  {
    name: "Device C",
    imei: "456789123",
    status: "Active",
    lastdata: "2024-04-08 08:15 AM",
    lastlocation: "Location C",
    action: <FcInfo />,
  },
  {
    name: "Device D",
    imei: "789123456",
    status: "Inactive",
    lastdata: "2024-04-06 03:20 PM",
    lastlocation: "Location D",
    action: <FcInfo />,
  },
  {
    name: "Device E",
    imei: "654321987",
    status: "Active",
    lastdata: "2024-04-08 11:55 AM",
    lastlocation: "Location E",
    action: <FcInfo />,
  },
];

export default dummyData;
