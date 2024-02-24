import { Title, Text } from '@mantine/core';

const SignupTitle = () => {
  return (
    <>
      <Title order={1} style={{ textAlign: 'center' }}>
        Sign Up
      </Title>
      <Text style={{ textAlign: 'center', marginBottom: '1.4rem' }} size="sm">
        Sign up to get access to all features
      </Text>
    </>
  );
};

export default SignupTitle;
