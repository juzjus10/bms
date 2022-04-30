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
  import { TableActivity } from "../components/TableActivity";
  
  const columns = [
    {
      name: <th> What </th>,
      cell: (row) => row.what,
    },
    {
      name: <th> Where </th>,
      cell: (row) => row.where,
    },
    {
      name: <th> When </th>,
      cell: (row) => row.when,
    },
    {
      name: <th> Why </th>,
      cell: (row) => row.why,
    },
    {
      name: <th> Who </th>,
      cell: (row) => row.who,
    },
    {
      name: <th> How </th>,
      cell: (row) => row.how,
    },
    {
      name: <th> Status </th>,
      cell: (row) => row.status,
    },
    {
      name: <th> Action </th>,
      cell: (row) => <EditRecordButton id={row._id}>Edit</EditRecordButton>,
    },
  ];
  
  const ActivityRecords = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const [activity, setActivity] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
  
    const { data: session } = useSession();
    const { data, error } = useSWR("/api/activity/getActivity", fetcher, {
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
                  <Title mb={6} >Activity Records</Title>
                 
                  <Group> 
                  <AddRecordButton />
                  <DeleteRecordButton
                    selectedRows={selectedRows}
                    data={data}
                    setData={setActivity}
                    setSelectedRows={setSelectedRows}
                    toggleCleared={toggleCleared}
                    setToggleCleared={setToggleCleared}
                  />
                  </Group>
                  
                  <TableActivity
                    data={data}
                    setData={setActivity}
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
  
  export default ActivityRecords;
  
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
  