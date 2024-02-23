import '@mantine/core/styles.css';
import { MantineProvider, Button } from '@mantine/core';
import theme from './theme';

const App = () => {
  return (
    <MantineProvider theme={theme} forceColorScheme="dark">
      <Button>Primary</Button>
      <Button variant="default" radius={'lg'}>
        Primary
      </Button>
      <Button
        variant="gradient"
        radius={'lg'}
        gradient={{ from: 'white', to: 'blue', deg: 90 }}
      >
        Primary
      </Button>
      <Button variant="filled" color="cyan.7" size="compact-sm">
        Primary
      </Button>
    </MantineProvider>
  );
};

export default App;
