import React from "react";
import { 
  Flex, 
  Stack, 
  Heading,
} from "@chakra-ui/react";

function TestResults() {
  return(
    <div>
      <Flex
        height="100vh"
        alignItems="baseline"
        justifyContent="left"
        background="blue.400"
      >
      <Stack direction="column" mt={50}>
        <Flex
          width="100%"
          ml={100}
          direction="column"
          background="blue.200"
          p={12}
          rounded={6}
        >
        <Stack direction="row" justify="left">
          <Heading mb={3}>Test Results</Heading>
        </Stack>
        </Flex>
      </Stack>
      </Flex>
    </div>
  )
}
<<<<<<< HEAD
export default TestResults;
=======
export default TestResults;
>>>>>>> patient home page and sign up page
