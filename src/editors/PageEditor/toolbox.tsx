import React from "react";
import * as ui from "@chakra-ui/react";
import { Element, useEditor, useNode } from "@craftjs/core";

const withNode = (Component) => {
  return (props) => {
    const {
      connectors: { connect, drag },
    } = useNode();
    return <Component ref={(ref) => connect(drag(ref))} {...props} />;
  };
};

const Box = withNode(ui.Box);
const Button = withNode(ui.Button);
const SimpleGrid = withNode(ui.SimpleGrid);

export const UI = {
  Button,
  SimpleGrid,
  Box,
};

export const Toolbox = () => {
  const {
    connectors: { connect, drag, create },
  } = useEditor();

  return (
    <ui.Box px={2} py={2}>
      <ui.SimpleGrid columns={1} spacingX={1} spacingY={1}>
        <ui.Button
          variant="solid"
          size="md"
          ref={(ref) =>
            create(
              ref,
              <Element
                is={Box}
                canvas
                bg="tomato"
                w="100%"
                p={4}
                color="white"
              />
            )
          }
        >
          Box
        </ui.Button>
        <ui.Button
          variant="solid"
          size="md"
          ref={(ref) => create(ref, <Button size="large">Button</Button>)}
        >
          Button
        </ui.Button>
      </ui.SimpleGrid>
    </ui.Box>
  );
};
