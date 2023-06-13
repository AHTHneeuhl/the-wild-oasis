import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "@/ui/ButtonIcon";
import { useSignOut } from "@/hooks/auth";
import SpinnerMini from "@/ui/SpinnerMini";

const SignOut: React.FC = () => {
  const { handleSignOut, isLoading } = useSignOut();

  return (
    <ButtonIcon disabled={isLoading} onClick={() => handleSignOut()}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default SignOut;
