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

const PetModal = ({
    modalOpen,
    setModalOpen,
    selectedPet,
    refreshPets
}) => {

    const isEdit = Boolean(selectedPet?.id);

    const [formData, setFormData] = useState({
        name: "",
        species: "",
        age: "",
        owner: ""
    });

    const [owners, setOwners] = useState([]);

    // Load form when editing
    useEffect(() => {
        if (selectedPet) {
            setFormData({
                name: selectedPet.name || "",
                species: selectedPet.species || "",
                age: selectedPet.age || "",
                owner: selectedPet.owner?.id || ""
            });
        } else {
            setFormData({
                name: "",
                species: "",
                age: "",
                owner: ""
            });
        }
    }, [selectedPet]);

    // Fetch owners
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const res = await fetch(`${API_URL}/owners/`);
                const data = await res.json();
                setOwners(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchOwners();
    }, []);

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isEdit
            ? `${API_URL}/pets/${selectedPet.id}/`
            : `${API_URL}/pets/`;

        const method = isEdit ? "PUT" : "POST";

        // IMPORTANT: serializer expects owner_id
        const payload = {
            name: formData.name,
            species: formData.species,
            age: Number(formData.age),
            owner_id: Number(formData.owner)
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const responseData = await res.json();

            if (!res.ok) {
                console.error(responseData);
                throw new Error("Failed to save pet");
            }

            await refreshPets();
            setModalOpen(false);

        } catch (err) {
            console.error("Error saving pet:", err);
        }
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "white",
                    p: 3,
                    width: 350,
                    borderRadius: 2
                }}
            >
                <Typography variant="h6" mb={2}>
                    {isEdit ? "Edit Pet" : "Add Pet"}
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        fullWidth
                        label="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        label="Species"
                        value={formData.species}
                        onChange={(e) =>
                            setFormData({ ...formData, species: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="Age"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />

                    <TextField
                        select
                        fullWidth
                        label="Owner"
                        value={formData.owner}
                        onChange={(e) =>
                            setFormData({ ...formData, owner: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    >
                        {owners.map((owner) => (
                            <MenuItem key={owner.id} value={owner.id}>
                                {owner.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                    >
                        {isEdit ? "Update" : "Create"}
                    </Button>

                </form>
            </Box>
        </Modal>
    );
};

export default PetModal;