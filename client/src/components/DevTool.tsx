import { List, ListItem, Sheet, Tooltip, Typography } from "@mui/joy";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

export const DevTool = (props: {
  events: any[];
  onClickEvent: (index: number) => void;
  currentEventIndex: number;
}) => {
  const { events, onClickEvent, currentEventIndex } = props;

  if (!events) return <></>;

  useEffect(() => {
    const goNext = () => {
      if (currentEventIndex > events.length - 1) return;

      onClickEvent(currentEventIndex + 1);
    };

    const goBack = () => {
      if (currentEventIndex == 0) return;
      onClickEvent(currentEventIndex - 1);
    };

    const keyDownListener = (ev: KeyboardEvent) => {
      if (ev.key === "ArrowLeft") goBack();
      if (ev.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [currentEventIndex]);

  return (
    <DevToolStyle sx={{ width: 200 }}>
      <List variant="soft">
        <ListItem
          onClick={() => {
            onClickEvent(0);
          }}
          variant={currentEventIndex == 0 ? "solid" : "soft"}
        >
          <Tooltip title="null" placement="right">
            <Typography>Initial state</Typography>
          </Tooltip>
        </ListItem>

        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, height: 0, scale: 0 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0 }}
          >
            <ListItem
              onClick={() => {
                onClickEvent(index + 1);
              }}
              variant={currentEventIndex - 1 == index ? "solid" : "soft"}
            >
              <Tooltip
                title={<pre>{JSON.stringify(event, null, 4)}</pre>}
                placement="right"
              >
                <Typography>{event.constructor.name}</Typography>
              </Tooltip>
            </ListItem>
          </motion.div>
        ))}
      </List>
    </DevToolStyle>
  );
};

const DevToolStyle = styled(Sheet)`
  position: absolute;
  left: 0;
  top: 0;
  background: none;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;
