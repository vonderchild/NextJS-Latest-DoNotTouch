import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export async function getServerSideProps() {
  try {
    const client = new S3Client({ region: "us-west-2" });
    const response = await client.send(
      new GetObjectCommand({
        Bucket: "test-bucket-73050844263c440b9f227036b8ca8320",
        Key: "index.html",
      }),
    );
    const body = await response.Body.transformToString("utf8");
    return { props: { file: body } };
  } catch (caught) {
    console.error(caught);
    return { props: { file: "there was an error" } };
  }
}

export default function Home({ file }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <pre>{file}</pre>
    </Layout>
  );
}
