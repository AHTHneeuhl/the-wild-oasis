import { BookingTable, BookingTableOperations } from "@/features/bookings";
import Heading from "@/ui/Heading";
import Row from "@/ui/Row";

function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
