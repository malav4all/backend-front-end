import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface ReportProps {
  reportData: any;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  name: {
    flexDirection: "column",
    justifyContent: "flex-start",
    fontSize: 22,
    marginBottom: 5,
  },
  invoiceNumber: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    marginBottom: 10,
    paddingBottom: 5,
  },
  client: {
    borderTopWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: "#D3D3D3",
    borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomColor: "black",
    fontStyle: "bold",
    alignItems: "center",
    height: 22,
  },
  quantity: {
    width: "30%",
    borderRightWidth: 1,
    textAlign: "right",
    borderRightColor: "#000000",
    paddingRight: 10,
  },
  description: {
    width: "30%",
    borderRightColor: "#000000",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: 10,
  },
  serialNumber: {
    width: "5%",
    borderRightColor: "#000000",
    borderRightWidth: 1,
    textAlign: "left",
    paddingLeft: 10,
  },
  price: {
    width: "20%",
    borderRightColor: "#000000",
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 10,
  },
  amount: {
    width: "15%",
    textAlign: "right",
    paddingRight: 10,
  },
  total: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
});
const TrackReport = ({ reportData }: ReportProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text>Track Report</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.serialNumber}>SNO</Text>
            <Text style={styles.description}>IMEI NO</Text>
            <Text style={styles.quantity}>Instruction</Text>
            <Text style={styles.price}>Action</Text>
            <Text style={styles.amount}>Duration</Text>
          </View>

          {reportData.map((item: any, index: any) => (
            <View key={index} style={styles.row}>
              <Text style={styles.serialNumber}>{item.sNo}</Text>
              <Text style={styles.description}>{item.imei}</Text>
              <Text style={styles.quantity}>{item.instruction}</Text>
              <Text style={styles.price}>{item.action}</Text>
              <Text style={styles.amount}>
                {(item.duration / 360).toFixed()}Min
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default TrackReport;
