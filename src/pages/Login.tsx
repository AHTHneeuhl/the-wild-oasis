import styled from "styled-components";
import Logo from "@/ui/Logo";
import Heading from "@/ui/Heading";
import { SignInForm } from "@/features/auth";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

const Login: React.FC = () => {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <SignInForm />
    </LoginLayout>
  );
};

export default Login;
