import { AddCabin, CabinTable, CabinTableOperations } from "@/features/cabins";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

const Cabins: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
