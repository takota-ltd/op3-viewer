import { parseISO, format } from "date-fns";
import _ from "lodash";

const base = "https://op3.dev/api/1";
const token = "preview07ce";
const limit = 1000; // this is the max allowed for now.

export const fetchRedirectLogs = async (prefix, start) => {
  const url = `https://op3.dev/e/${prefix}*`;
  const result = await (
    await fetch(
      `${base}/redirect-logs?start=${start}&url=${url}&format=json` +
        `&limit=${limit}&token=${token}`
    )
  ).json();
  return result.rows;
};

export const countDownloads = (rows) =>
  _.map(
    _.countBy(rows, (row) => format(parseISO(row["time"]), "yyyy-MM-dd")),
    (v, k) => ({ date: k, downloads: v })
  );

const countStringValues = (rows, k) =>
  _.map(
    _.countBy(
      _.filter(rows, (row) => _.isString(row[k])),
      (row) => row[k]
    ),
    (v, k) => ({ type: k, value: v })
  );

export const countColoEdges = (rows) => countStringValues(rows, "edgeColo");

export const countUserAgents = (rows) => countStringValues(rows, "userAgent");
