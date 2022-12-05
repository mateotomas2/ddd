import { useColorScheme } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/joy';

export const ModeToggle = () => {
    const { mode, setMode } = useColorScheme();
    return (
        <IconButton
            sx={{
                position: 'absolute',
                top: 20,
                right: 20,
            }}
            onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            style={{ position: "absolute", top: 20, right: 20 }}
        >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
    );
}