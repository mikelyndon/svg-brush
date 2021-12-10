import React, { useEffect, useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { MousePointer, PenTool, X } from "react-feather";
import { actions, store, useSnapshot } from "../state";

const Toolbar = () => {
  const [mode, setMode] = useState("sketch");
  const [colour, setColour] = useState("black");
  const snapshot = useSnapshot(store);

  useEffect(() => {
    setMode(snapshot.mode);
  }, [snapshot.mode]);

  const handleMode = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode);
      actions.updateToolbarMode(newMode);
    }
  };

  const handleColour = (event, newColour) => {
    if (newColour !== null) {
      setColour(newColour);
      actions.updateSelectedColour(newColour);
    }
  };

  const colors = [
    { value: "black", label: "Black" },
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "blue", label: "Blue" },
  ];

  return (
    <Box sx={{ width: 50, position: "absolute", zIndex: 1, padding: "8px" }}>
      <Stack>
        <ToggleButtonGroup
          orientation="vertical"
          color="secondary"
          value={mode}
          exclusive
          onChange={handleMode}
        >
          <ToggleButton value="sketch" size="small">
            <PenTool />
          </ToggleButton>
          <ToggleButton value="select" size="small">
            <MousePointer />
          </ToggleButton>
          <ToggleButton value="erase" size="small">
            <X />
          </ToggleButton>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          orientation="vertical"
          color="secondary"
          value={colour}
          exclusive
          onChange={handleColour}
        >
          {colors.map(({ value, label }) => (
            <ToggleButton
              sx={{ color: `${value}` }}
              key={value}
              value={value}
              size="small"
            >
              {label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {/* <Button onClick={() => actions.undo()}>Undo</Button>
      <Button onClick={() => actions.redo()}>Redo</Button> */}
      </Stack>
    </Box>
  );
};

export default Toolbar;
