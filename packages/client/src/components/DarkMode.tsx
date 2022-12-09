import { useColorScheme } from "@mui/joy/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { GlobalStyles, IconButton } from "@mui/joy";
import { muiTheme } from "../App";

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      sx={{
        position: "absolute",
        top: 20,
        right: 20,
      }}
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      style={{ position: "absolute", top: 20, right: 20 }}
    >
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}

      {mode && (
        <GlobalStyles
          styles={{
            body: {
              backgroundColor:
                muiTheme.colorSchemes[mode == "system" ? "dark" : mode].palette
                  .primary.main + " !important",
              backgroundImage:
                "linear-gradient(62deg, " +
                muiTheme.colorSchemes[mode == "system" ? "dark" : mode].palette
                  .primary.main +
                " 0%, " +
                muiTheme.colorSchemes[mode == "system" ? "dark" : mode].palette
                  .secondary.main +
                " 100%)",
            },
          }}
        />
      )}
    </IconButton>
  );
};
