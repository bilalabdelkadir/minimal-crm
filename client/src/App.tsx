import "@mantine/core/styles.css";
import { Button, Card } from "@mantine/core";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    console.log("Hello world");
  }, []);
  return (
    <div>
      <Button>Hello world</Button>
      <Card>Hey</Card>
    </div>
  );
};

export default App;
