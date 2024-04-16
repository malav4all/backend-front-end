export const alertConfigTableHeader = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "IMEI",
    field: "imei",
  },

  {
    name: "Geozone in",
    field: "geozoneIn",
  },

  {
    name: "Geozone in",
    field: "geozoneOut",
  },
];

export interface UserData {
  name: JSX.Element;
  imei: string;
  geozoneIn: number;
  geozoneOut: string;
}
