export const deviceDashboardTableHeader = [
  { name: "Imei", field: "imei" },
  { name: "Label", field: "label" },
  { name: "Journey", field: "journey" },
  { name: "Status", field: "status" },
  { name: "Last Data", field: "lastdata" },
];

const dummyData = [
  {
    imei: "123456789",
    label: "Device A",
    journey: "Journey 1",
    status: "Active",
    lastdata: "2024-04-08 10:30 AM",
  },
  {
    imei: "987654321",
    label: "Device B",
    journey: "Journey 2",
    status: "Inactive",
    lastdata: "2024-04-07 05:45 PM",
  },
  {
    imei: "456789123",
    label: "Device C",
    journey: "Journey 3",
    status: "Active",
    lastdata: "2024-04-08 08:15 AM",
  },
  {
    imei: "789123456",
    label: "Device D",
    journey: "Journey 4",
    status: "Inactive",
    lastdata: "2024-04-06 03:20 PM",
  },
  {
    imei: "654321987",
    label: "Device E",
    journey: "Journey 5",
    status: "Active",
    lastdata: "2024-04-08 11:55 AM",
  },
];

export default dummyData;
