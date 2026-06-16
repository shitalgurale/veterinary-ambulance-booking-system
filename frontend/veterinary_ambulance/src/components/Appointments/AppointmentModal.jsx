import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    MenuItem
} from "@mui/material";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentModal = ({
    modalOpen,
    setModalOpen,
    selectedAppointment,
    refreshAppointments
}) => {

    const isCreate = !selectedAppointment?.id;

    const [formData, setFormData] = useState({
        date: "",
        pet: "",
        vet: ""
    });

    const [pets, setPets] = useState([]);
    const [vets, setVets] = useState([]);

    // ---------------------------
    // Fill form for edit
    // ---------------------------
    useEffect(() => {
        if (selectedAppointment) {
            setFormData({
                date: selectedAppointment.date
                    ? selectedAppointment.date.slice(0, 16)
                    : "",
                pet: selectedAppointment.pet?.id || "",
                vet: selectedAppointment.vet?.id || ""
            });
        } else {
            setFormData({
                date: "",
                pet: "",
                vet: ""
            });
        }
    }, [selectedAppointment]);

    // ---------------------------
    // Load pets & vets
    // ---------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const petRes = await fetch(`${API_URL}/pets/`);
                const vetRes = await fetch(`${API_URL}/vets/`);

                const petData = await petRes.json();
                const vetData = await vetRes.json();

                setPets(Array.isArray(petData) ? petData : []);
                setVets(Array.isArray(vetData) ? vetData : []);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    // ---------------------------
    // Submit
    // ---------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isCreate
            ? `${API_URL}/appointments/`
            : `${API_URL}/appointments/${selectedAppointment.id}/`;

        const method = isCreate ? "POST" : "PUT";

        // IMPORTANT: Backend expects pet_id and vet_id
        const payload = {
            date: new Date(formData.date).toISOString(),
            pet_id: Number(formData.pet),
            vet_id: Number(formData.vet)
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Backend Error:", data);
                return;
            }

            await refreshAppointments();
            setModalOpen(false);

        } catch (err) {
            console.error("Error saving appointment:", err);
        }
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "white",
        width: 370,
        p: 3,
        borderRadius: 2
    };

    return (
        <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
        >
            <Box sx={style}>

                <Typography variant="h5" mb={2}>
                    {isCreate ? "Add Appointment" : "Edit Appointment"}
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        type="datetime-local"
                        label="Date"
                        InputLabelProps={{ shrink: true }}
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                date: e.target.value
                            })
                        }
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        select
                        fullWidth
                        label="Pet"
                        value={formData.pet}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                pet: e.target.value
                            })
                        }
                        sx={{ mb: 2 }}
                        required
                    >
                        {pets.map((pet) => (
                            <MenuItem key={pet.id} value={pet.id}>
                                {pet.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="Vet"
                        value={formData.vet}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                vet: e.target.value
                            })
                        }
                        sx={{ mb: 2 }}
                        required
                    >
                        {vets.map((vet) => (
                            <MenuItem key={vet.id} value={vet.id}>
                                {vet.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {isCreate ? "Create" : "Update"}
                    </Button>

                </form>
            </Box>
        </Modal>
    );
};

export default AppointmentModal;