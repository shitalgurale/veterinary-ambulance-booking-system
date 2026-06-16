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

    // -----------------------------
    // LOAD FORM ON EDIT
    // -----------------------------
    useEffect(() => {
        if (selectedPet) {
            setFormData({
                name: selectedPet?.name || "",
                species: selectedPet?.species || "",
                age: selectedPet?.age || "",
                owner: selectedPet?.owner?.id || selectedPet?.owner || ""
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

    // -----------------------------
    // FETCH OWNERS
    // -----------------------------
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const res = await fetch(`${API_URL}/owners/`);
                const data = await res.json();
                setOwners(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching owners:", error);
            }
        };

        fetchOwners();
    }, []);

    // -----------------------------
    // SUBMIT
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isEdit
            ? `${API_URL}/pets/${selectedPet.id}/`
            : `${API_URL}/pets/`;

        const method = isEdit ? "PUT" : "POST";

        const payload = {
            name: formData.name,
            species: formData.species,
            age: Number(formData.age),
            owner: Number(formData.owner)
        };

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error("Failed to save pet");
            }

            await refreshPets();
            setModalOpen(false);

        } catch (error) {
            console.error("Error saving pet:", error);
        }
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "white",
                width: 320,
                p: 3,
                borderRadius: 2
            }}>

                <Typography variant="h6" mb={2}>
                    {isEdit ? "Edit Pet" : "Add Pet"}
                </Typography>

                <form onSubmit={handleSubmit}>

                    <TextField
                        label="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        label="Species"
                        value={formData.species}
                        onChange={(e) =>
                            setFormData({ ...formData, species: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    />

                    <TextField
                        label="Age"
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    />

                    {/* OWNER DROPDOWN */}
                    <TextField
                        select
                        label="Owner"
                        value={formData.owner}
                        onChange={(e) =>
                            setFormData({ ...formData, owner: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    >
                        {owners.map((o) => (
                            <MenuItem key={o.id} value={o.id}>
                                {o.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth>
                        {isEdit ? "Update" : "Create"}
                    </Button>

                </form>
            </Box>
        </Modal>
    );
};

export default PetModal;