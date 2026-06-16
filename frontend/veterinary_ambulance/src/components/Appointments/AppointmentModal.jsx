import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
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
    // Fill form when editing
    // ---------------------------
    useEffect(() => {
        if (selectedAppointment) {
            setFormData({
                date: selectedAppointment?.date || "",
                pet: selectedAppointment?.pet?.id || selectedAppointment?.pet || "",
                vet: selectedAppointment?.vet?.id || selectedAppointment?.vet || ""
            });
        }
    }, [selectedAppointment]);

    // ---------------------------
    // Fetch pets & vets
    // ---------------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const petRes = await fetch(`${API_URL}/pets/`);
                const vetRes = await fetch(`${API_URL}/vets/`);

                const petsData = await petRes.json();
                const vetsData = await vetRes.json();

                setPets(petsData);
                setVets(vetsData);
            } catch (error) {
                console.error("Error fetching pets/vets:", error);
            }
        };

        fetchData();
    }, []);

    // ---------------------------
    // Submit handler
    // ---------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isCreate
            ? `${API_URL}/appointments/`
            : `${API_URL}/appointments/${selectedAppointment.id}/`;

        const method = isCreate ? "POST" : "PUT";

        const payload = {
            date: new Date(formData.date).toISOString(),
            pet: Number(formData.pet),
            vet: Number(formData.vet)
        };

        try {
            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            await refreshAppointments();
            setModalOpen(false);

        } catch (error) {
            console.error("Error saving appointment:", error);
        }
    };

    // ---------------------------
    // Modal style
    // ---------------------------
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 320,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 1
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isCreate ? "Add Appointment" : "Edit Appointment"}
                </Typography>

                <form onSubmit={handleSubmit}>

                    {/* DATE */}
                    <TextField
                        type="datetime-local"
                        label="Date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{ shrink: true }}
                        required
                    />

                    {/* PET DROPDOWN */}
                    <TextField
                        select
                        label="Pet"
                        value={Number(formData.pet)}
                        onChange={(e) =>
                            setFormData({ ...formData, pet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    >
                        {pets.map((pet) => (
                            <MenuItem key={pet.id} value={pet.id}>
                                {pet.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* VET DROPDOWN */}
                    <TextField
                        select
                        label="Vet"
                        value={Number(formData.vet)}
                        onChange={(e) =>
                            setFormData({ ...formData, vet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    >
                        {vets.map((vet) => (
                            <MenuItem key={vet.id} value={vet.id}>
                                {vet.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth>
                        {isCreate ? "Create" : "Update"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AppointmentModal;