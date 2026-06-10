import { Modal, Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";

const PetModal = ({ modalOpen, setModalOpen, selectedPet, refreshPets }) => {

    const isCreate = !selectedPet?.id;

    const [formData, setFormData] = useState({
        name: "",
        species: "",
        age: "",
        owner: ""
    });

    const [owners, setOwners] = useState([]);

    useEffect(() => {
        setFormData({
            name: selectedPet?.name || "",
            species: selectedPet?.species || "",
            age: selectedPet?.age || "",
            owner: selectedPet?.owner || ""
        });
    }, [selectedPet]);

    // ✅ fetch owners for dropdown
    useEffect(() => {
        const fetchOwners = async () => {
            const res = await fetch("http://127.0.0.1:8000/api/owners/");
            const data = await res.json();
            setOwners(data);
        };
        fetchOwners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isCreate
            ? "http://127.0.0.1:8000/api/pets/"
            : `http://127.0.0.1:8000/api/pets/${selectedPet.id}/`;

        const method = isCreate ? "POST" : "PUT";

        await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                age: Number(formData.age) // ensure number
            })
        });

        await refreshPets();
        setModalOpen(false);
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 300,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 1
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isCreate ? "Add Pet" : "Edit Pet"}
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        fullWidth sx={{ mb: 2 }} required
                    />

                    <TextField
                        label="Species"
                        value={formData.species}
                        onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                        fullWidth sx={{ mb: 2 }} required
                    />

                    <TextField
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        fullWidth sx={{ mb: 2 }} required
                    />

                    {/* ✅ OWNER DROPDOWN */}
                    <TextField
                        select
                        label="Owner"
                        value={formData.owner}
                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                        fullWidth sx={{ mb: 2 }} required
                    >
                        {owners.map(owner => (
                            <MenuItem key={owner.id} value={owner.id}>
                                {owner.name}
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

export default PetModal;