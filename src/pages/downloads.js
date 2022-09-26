import { Alert, Card, Col, Row, Skeleton, Space } from "antd";
import { useAsync } from "react-async-hook";
import { useRouter } from "next/router";
import DownloadsChart from "components/DownloadsChart";
import PieChart from "components/PieChart";
import {
  fetchRedirectLogs,
  countDownloads,
  countColoEdges,
  countUserAgents,
} from "api";

const DownloadsPage = () => {
  const { query, isReady } = useRouter();
  const { prefix, start } = query;
  const {
    result: rows,
    loading,
    error,
  } = useAsync(
    async () => (isReady ? await fetchRedirectLogs(prefix, start) : []),
    [prefix, start, isReady]
  );

  if (error) {
    return <Alert message={error.message} type="error" />;
  }

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <>
      <h1 style={{ opacity: 0.4 }}>{prefix}*</h1>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Downloads">
            <DownloadsChart data={countDownloads(rows)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="CDN Edges">
            <PieChart data={countColoEdges(rows)} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="User Agents">
            <PieChart data={countUserAgents(rows)} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DownloadsPage;
