import { AppBar, Button, Toolbar, Box, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';

const NavigationHeader = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            sx={{
                background: 'rgba(15, 15, 20, 0.65)',
                backdropFilter: 'blur(14px)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    px: 3,
                }}
            >

                {/* LEFT LOGO SECTION */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.2,
                        cursor: 'pointer',
                        transition: '0.3s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        }
                    }}
                >
                    <LocalHospitalIcon
                        sx={{
                            color: '#00e5ff',
                            fontSize: 30,
                            filter: 'drop-shadow(0px 0px 8px rgba(0,229,255,0.6))'
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            letterSpacing: 1,
                            color: '#fff',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                        Vet Ambulance
                    </Typography>
                </Box>

                {/* CENTER NAV BUTTONS */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center'
                    }}
                >

                    <Button
                        onClick={() => navigate("/pets")}
                        startIcon={<PetsIcon />}
                        sx={{
                            borderRadius: "25px",
                            px: 2.5,
                            py: 1,
                            color: "#fff",
                            background: "linear-gradient(135deg,#42a5f5,#1e88e5)",
                            textTransform: "none",
                            fontWeight: 600,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: '0 10px 25px rgba(66,165,245,0.4)'
                            }
                        }}
                    >
                        Pets
                    </Button>

                    <Button
                        onClick={() => navigate("/vets")}
                        sx={{
                            borderRadius: "25px",
                            px: 2.5,
                            py: 1,
                            color: "#fff",
                            border: '1px solid rgba(255,255,255,0.4)',
                            textTransform: "none",
                            fontWeight: 600,
                            backdropFilter: 'blur(6px)',
                            transition: '0.3s',
                            '&:hover': {
                                backgroundColor: "rgba(255,255,255,0.08)",
                                transform: 'translateY(-2px) scale(1.05)',
                                borderColor: '#ffffff'
                            }
                        }}
                    >
                        Vets
                    </Button>

                    <Button
                        onClick={() => navigate("/owners")}
                        sx={{
                            borderRadius: "25px",
                            px: 2.5,
                            py: 1,
                            color: "#fff",
                            background: "linear-gradient(135deg,#66bb6a,#2e7d32)",
                            textTransform: "none",
                            fontWeight: 600,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: '0 10px 25px rgba(102,187,106,0.4)'
                            }
                        }}
                    >
                        Owners
                    </Button>

                    <Button
                        onClick={() => navigate("/appointments")}
                        sx={{
                            borderRadius: "25px",
                            px: 2.5,
                            py: 1,
                            color: "#fff",
                            background: "linear-gradient(135deg,#ff9800,#ef6c00)",
                            textTransform: "none",
                            fontWeight: 600,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px) scale(1.05)',
                                boxShadow: '0 10px 25px rgba(255,152,0,0.4)'
                            }
                        }}
                    >
                        Appointments
                    </Button>

                </Box>

            </Toolbar>
        </AppBar>
    );
};

export default NavigationHeader;