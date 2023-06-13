import { ChangeEvent, FormEvent, useState } from "react";

import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button size="large">Login</Button>
      </FormRow>
    </Form>
  );
};

export default LoginForm;
