import { Alert, Skeleton } from "antd";
import { useAsync } from "react-async-hook";
import _ from "lodash";
import { parseISO, format } from "date-fns";
import DownloadsChart from "../components/DownloadsChart";
import { useRouter } from "next/router";

const base = "https://op3.dev/api/1";
const token = "preview07ce";
const limit = 1000;

const fetchRedirectLogs = async (prefix, start) => {
  const url = `https://op3.dev/e/${prefix}*`;
  const result = await (
    await fetch(
      `${base}/redirect-logs?start=${start}&url=${url}&format=json` +
        `&limit=${limit}&token=${token}`
    )
  ).json();
  return result.rows;
};

const countDownloads = async (prefix, start) => {
  const rows = await fetchRedirectLogs(prefix, start);
  return _.map(
    _.countBy(rows, (row) => format(parseISO(row["time"]), "yyyy-MM-dd")),
    (v, k) => ({ date: k, downloads: v })
  );
};

const DownloadsPage = () => {
  const { query, isReady } = useRouter();
  const { prefix, start } = query;
  const {
    result: data,
    loading,
    error,
  } = useAsync(
    async () => (isReady ? await countDownloads(prefix, start) : []),
    [prefix, start, isReady]
  );

  if (error) {
    return <Alert message={error.message} type="error" />;
  }

  if (loading) {
    return <Skeleton active />;
  }

  return <DownloadsChart data={data} />;
};

export default DownloadsPage;
