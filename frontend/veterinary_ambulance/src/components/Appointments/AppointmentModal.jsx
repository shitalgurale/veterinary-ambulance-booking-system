import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        setFormData({
            date: selectedAppointment?.date || "",
            pet: selectedAppointment?.pet || "",
            vet: selectedAppointment?.vet || ""
        });
    }, [selectedAppointment]);

    // ✅ fetch pets + vets
    useEffect(() => {
        const fetchData = async () => {
            const petRes = await fetch("http://127.0.0.1:8000/api/pets/");
            const vetRes = await fetch("http://127.0.0.1:8000/api/vets/");

            const petsData = await petRes.json();
            const vetsData = await vetRes.json();

            setPets(petsData);
            setVets(vetsData);
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isCreate
            ? "http://127.0.0.1:8000/api/appointments/"
            : `http://127.0.0.1:8000/api/appointments/${selectedAppointment.id}/`;

        const method = isCreate ? "POST" : "PUT";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                date: new Date(formData.date).toISOString()
            })
        });

        await refreshAppointments();
        setModalOpen(false);
    };

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
                        value={formData.pet}
                        onChange={(e) =>
                            setFormData({ ...formData, pet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    >
                        {pets.map(pet => (
                            <MenuItem key={pet.id} value={pet.id}>
                                {pet.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* VET DROPDOWN */}
                    <TextField
                        select
                        label="Vet"
                        value={formData.vet}
                        onChange={(e) =>
                            setFormData({ ...formData, vet: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    >
                        {vets.map(vet => (
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