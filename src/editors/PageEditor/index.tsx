import { Box, Flex } from "@chakra-ui/react";
import { Editor, Frame, Canvas, Selector } from "@craftjs/core";

import * as PageComponents from "@codekit/studio/components";

export function PageEditor() {
  return (
    <Flex>
      <Box></Box>
      <Box>
        <Editor resolver={PageComponents}>
          <Frame>
            <Canvas />
          </Frame>
        </Editor>
      </Box>
    </Flex>
  );
}
