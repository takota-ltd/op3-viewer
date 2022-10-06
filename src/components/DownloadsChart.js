import { Column } from "@ant-design/plots";

const DownloadsChart = ({ data }) => {
  const config = {
    data,
    xField: "date",
    yField: "downloads",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      date: {
        alias: "Date",
      },
      downloads: {
        alias: "Requests",
      },
    },
  };
  return <Column {...config} />;
};

export default DownloadsChart;
