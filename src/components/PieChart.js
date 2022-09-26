import { Pie } from "@ant-design/plots";

const PieChart = ({ data }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: false,
  };
  return <Pie {...config} />;
};

export default PieChart;
