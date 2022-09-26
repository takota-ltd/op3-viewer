import { useCallback, useState } from "react";
import { Button, Divider, Input, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const downloadsUrl = (prefix) => `/downloads?prefix=${prefix}&start=-7d`;

export default function Home() {
  const router = useRouter();
  const [prefix, setPrefix] = useState("");
  const ready = prefix.length > 8;

  const onContinue = useCallback(() => {
    router.push(downloadsUrl(prefix));
  }, [router, prefix]);

  return (
    <div>
      <h1>op3-viewer</h1>
      <p>
        This is a quick proof-of-concept to visualise a podcast&apos;s download
        numbers using the <a href="https://op3.dev/">OP3</a> API. The goal is to
        improve this as the API matures and use it as a test ground.
      </p>
      <p>
        You can find the source code on GitHub{" "}
        <a href="http://github.com/takota-ltd/op3-viewer">here</a>.
      </p>
      <p>
        <i>
          Note that (1) it doesn&apos;t do anything clever with the range header
          yet, (2) by default it looks back at the past seven days and (3)
          it&apos;s limited to display a maximum of <b>1000 downloads</b> by the
          API.
        </i>
      </p>
      <Input
        placeholder={
          "Enter the start of a typical episode URL for a podcast e.g. " +
          "mypodcasthost.com/episodes"
        }
        autoFocus
        spellCheck="false"
        autoCorrect="off"
        value={prefix}
        onChange={(e) => {
          setPrefix(e.target.value);
        }}
        onPressEnter={() => {
          if (ready) {
            onContinue();
          }
        }}
      />
      <Button
        disabled={!ready}
        type="primary"
        onClick={onContinue}
        style={{ marginTop: "12px" }}
      >
        Continue
      </Button>
      <Divider />
      <h3>Or try one of these:</h3>
      <Space>
        <Link href={downloadsUrl("podnews.net/audio/podnews")} prefetch={false}>
          <a>
            <Button size="small">Podnews</Button>
          </a>
        </Link>
        <Link
          href={downloadsUrl("mp3s.nashownotes.com/NA-1489")}
          prefetch={false}
        >
          <a>
            <Button size="small">No Agenda (Episode 1489)</Button>
          </a>
        </Link>
      </Space>
    </div>
  );
}
