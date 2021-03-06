import { Card, Divider, Grid, Text, Title } from "@mantine/core";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import AgeBracket from "../components/charts/AgeBracket";
import EmploymentBracket from "../components/charts/EmploymentBracket";
import EducationBracket from "../components/charts/EducationBracket";
import BarangayActivities from "../components/charts/BarangayActivities";
import TotalPopulation from "../components/charts/TotalPopulation";
import Layout from "../components/Layout";


const Index = () => {
  const { data: session } = useSession();

  return (
    <>
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
        {session && (
          <>
            <Grid>
              <Grid.Col md={12} lg={12}>
                <Card>
                  <Title>Hello, {session.user.user.username}</Title>
                </Card>
              </Grid.Col>
              
              {/* <Grid.Col md={6} lg={6}>
                <Card>
                  <Title align="center">Announcement</Title>
                  <Divider my="xs" />
                  <Text>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.""Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum."
                  </Text>
                </Card>
              </Grid.Col>
              
              <Grid.Col md={6}lg={6}>
                <Card>
                <Title align="center">Barangay Activity</Title>
                <Divider my="xs" />
                <Text>
                      <BarangayActivities />
                  </Text>
                </Card>
              </Grid.Col> */}

              <Grid.Col md={12} lg={12}>
              
               <TotalPopulation />
              
              </Grid.Col>
                
              <Grid.Col md={4}lg={4}>
                <Card my="xs" sx={{ height: 400 }}>
                  <Text color="dimmed">Age Bracket</Text>
                  <Grid justify="center">
                    <AgeBracket />
                  </Grid>
                </Card>
              </Grid.Col>

              <Grid.Col md={4}lg={4}>
                <Card my="xs" sx={{ height: 400 }}>
                <Text color="dimmed">Employment</Text>
                  <Grid justify="center">
                    
                    <EmploymentBracket />                   
                  </Grid>
                </Card>
              </Grid.Col>

              <Grid.Col md={4}lg={4}>
                <Card my="xs" sx={{ height: 400 }}>
                  <Text color="dimmed">Education</Text>
                  <Grid justify="center">
                  <EducationBracket />
                  </Grid>
                  </Card>
              </Grid.Col>
            </Grid>
            
          </>
        )}
      </Layout>
    </>
  );
};

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
    props: { session },
  };
}


export default Index;
