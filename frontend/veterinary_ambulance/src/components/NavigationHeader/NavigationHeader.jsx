import { AppBar, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ backgroundColor: "black" }}>
            <Toolbar>
                <Button onClick={() => navigate("/pets")} variant="outlined" color="inherit">
                    Pets
                </Button>

                <Button onClick={() => navigate("/vets")} color="inherit">
                    Vets
                </Button>

                <Button onClick={() => navigate("/owners")} variant="outlined" color="inherit">
                    Owners
                </Button>

                <Button onClick={() => navigate("/appointments")} color="inherit">
                    Appointments
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationHeader;