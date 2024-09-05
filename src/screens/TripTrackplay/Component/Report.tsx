import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

interface ReportProps {
  reportData: any;
  rawData: any;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
    fontSize: 12,
  },
  header: {
    fontSize: 11,
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  name: {
    fontSize: 11,
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 11,
    marginBottom: 10,
  },
  label: {
    fontSize: 11,
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
    backgroundColor: "#D3D3D3",
    borderBottomWidth: 1,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderBottomColor: "black",
    height: 30,
  },
  quantity: {
    width: "28%",
    borderRightWidth: 1,
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontSize: 10,
    textAlign: "center",
  },
  description: {
    width: "22%",
    borderRightWidth: 1,
    fontSize: 8,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
    paddingTop: "7px",
  },
  serialNumber: {
    width: "10%",
    borderRightWidth: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  price: {
    width: "20%",
    borderRightWidth: 1,
    textAlign: "center",
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  amount: {
    width: "20%",
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  total: {
    width: "20%",
    paddingRight: 10,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  },
  trackReport: {
    marginBottom: "1rem",
  },
});

const TrackReport = ({ reportData, rawData }: ReportProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.trackReport}>Track Report</Text>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.serialNumber}>S.N</Text>
            <Text style={styles.description}>IMEI No</Text>
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
                {(item.duration / 360).toFixed()} min
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default TrackReport;
