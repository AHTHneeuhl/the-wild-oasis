import Button from "@/ui/Button";
import { useCheckout } from "./useCheckout";

type TProps = {
  bookingId: string;
};

const CheckoutButton: React.FC<TProps> = ({ bookingId }) => {
  const { isLoading, mutate: checkout } = useCheckout();

  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
