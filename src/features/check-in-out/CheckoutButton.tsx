import { useCheckout } from "@/hooks/checkInOut";
import Button from "@/ui/Button";

type TProps = {
  bookingId: string;
};

const CheckoutButton: React.FC<TProps> = ({ bookingId }) => {
  const { isLoading, handleCheckout } = useCheckout();

  return (
    <Button
      variant="primary"
      size="small"
      onClick={() => handleCheckout(bookingId)}
      disabled={isLoading}
    >
      Check out
    </Button>
  );
};

export default CheckoutButton;
