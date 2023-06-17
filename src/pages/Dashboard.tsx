import { DashboardFilter, DashboardLayout } from "@/features/dashboard";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

const Dashboard: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
};

export default Dashboard;
