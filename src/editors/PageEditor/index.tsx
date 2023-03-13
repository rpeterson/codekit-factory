import * as ui from "@chakra-ui/react";
import { Editor, Frame, Element } from "@craftjs/core";
import { Layers } from "@craftjs/layers";

import { Toolbox, UI } from "./toolbox";

export function PageEditor() {
  return (
    <Editor resolver={UI}>
      <ui.Flex justifyContent="space-between" alignItems="flex-start">
        <ui.Box width="300px">
          <Layers />
          <Toolbox />
        </ui.Box>
        <ui.Box flex={1} display="block" height="100vh">
          <Frame>
            <Element is={ui.Box}  height="100vh" width="100%" background="#EEE" border="1px dashed black" canvas>
            </Element>
          </Frame>
        </ui.Box>
      </ui.Flex>
    </Editor>
  );
}
