import { Input, Button, Container } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

function create() {
  const [pro, setPro] = useState("");

  const createPro = async () => {
    const response = await axios.post("api/createPro", { data: pro });
    console.log(response.status);
  };

  return (
    <div>
      <Container my={10}>
        <Input onChange={(e) => setPro(e.target.value)} value={pro} />
        <Button onClick={() => createPro()}>Create Pro</Button>
      </Container>
    </div>
  );
}

export default create;
