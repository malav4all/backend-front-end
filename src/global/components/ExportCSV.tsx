const ExportCSV = (headers: any, title: any) => {
  const convertToCSV = () => {
    let str = "";
    str += getHeaderData();
    return str;
  };

  const getHeaderData = () => {
    let str = "";
    headers.forEach((header: any) => {
      if (str != "") str += ",";

      str += header;
    });
    str += "\r\n";
    return str;
  };

  const exportCSVFile = () => {
    // Convert Object to JSON
    let csv = convertToCSV();

    let exportedFilenmae = title + ".csv" || "export.csv";

    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    let link = document.createElement("a");
    if (link.download !== undefined) {
      let url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return exportCSVFile;
};

export default ExportCSV;
