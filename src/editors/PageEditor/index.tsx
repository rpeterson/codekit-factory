import { Box, Flex, SimpleGrid, Button } from "@chakra-ui/react";
import { Editor, Frame, Canvas, Selector } from "@craftjs/core";

import * as PageComponents from "@codekit/studio/components";

export function PageEditor() {
  return (
    <>
      <Box />
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box width="300px">
          <SimpleGrid columns={1} spacingX={1} spacingY={1}>
            <Button variant="solid" size="md">
              Button
            </Button>
          </SimpleGrid>
        </Box>
        <Box flex={1} display="block" height="100%">
          <Editor resolver={{ Button }}>
            <Frame>
            </Frame>
          </Editor>
        </Box>
      </Flex>
      <Box />
    </>
  );
}
