import {
  Card, Grid, Group, Text,
  Title
} from "@mantine/core";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import AddRecordButton from "../components/table/addRecordButton";
import DeleteRecordButton from "../components/table/deleteRecordButton";
import EditRecordButton from "../components/table/editRecordButton";
import { TableCertificate } from "../components/TableCertificate";

const columns = [
  {
    name: <th> Type </th>,
    cell: (row) => row.type,
  },
  {
    name: <th> Date Submitted </th>,
    cell: (row) => row.dateSubmitted,
  },
  {
    name: <th> Action </th>,
    cell: (row) => <EditRecordButton id={row._id}>View</EditRecordButton>,
  },
];

const CertificateRecords = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [certificate, setCertificate] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const { data: session } = useSession();
  const { data, error } = useSWR("/api/certificate/getCertificates", fetcher, {
    refreshInterval: 500,
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      {!session && (
        <>
          <Grid>
            <Grid.Col>
              <Text>
                You are not signed in. Sign in{" "}
                <Link href="/auth/login">here</Link>
              </Text>
            </Grid.Col>
          </Grid>
        </>
      )}
      {session && data && (
        <>
          <Grid mt={12}>
            <Grid.Col span={12}>
              <Card>
                <Title mb={6} >Certificate Records</Title>
               
                <Group> 
                <AddRecordButton />
                <DeleteRecordButton
                  selectedRows={selectedRows}
                  data={data}
                  setData={setCertificate}
                  setSelectedRows={setSelectedRows}
                  toggleCleared={toggleCleared}
                  setToggleCleared={setToggleCleared}
                />
                </Group>
                
                <TableCertificate
                  data={data}
                  setData={setCertificate}
                  columns={columns}
                  setSelectedRows={setSelectedRows}
                  toggleCleared={toggleCleared}
                  setToggleCleared={setToggleCleared}
                />
              </Card>
            </Grid.Col>
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default CertificateRecords;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
