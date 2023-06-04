import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';

import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

export default function AuthenticationTitle() {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async () => {
    // e.preventDefault();
    if (!email || !password) return;
    loginService(email, password);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md" >
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput label="Email" placeholder="you@mantine.dev" required onChange={(e)=> setEmail(e.target.value)}/>
          <PasswordInput label="Password" placeholder="Your password" required mt="md"  onChange={(e) => setPassword(e.target.value)}/>
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" onClick={onLogin}>
            Sign in
          </Button >
          {authLoading ? <h2>Loading...</h2> : null}
        </form>
      </Paper>
    </Container>
  );
}