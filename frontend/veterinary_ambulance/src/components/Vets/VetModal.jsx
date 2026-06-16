import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const VetModal = ({
    modalOpen,
    setModalOpen,
    selectedVet,
    refreshVets
}) => {

    const isCreate = !selectedVet?.id;

    const [formData, setFormData] = useState({
        name: "",
        specialization: ""
    });

    // -----------------------------
    // Fill form on edit
    // -----------------------------
    useEffect(() => {
        if (selectedVet) {
            setFormData({
                name: selectedVet?.name || "",
                specialization: selectedVet?.specialization || ""
            });
        }
    }, [selectedVet]);

    // -----------------------------
    // Reset form on create
    // -----------------------------
    useEffect(() => {
        if (modalOpen && isCreate) {
            setFormData({
                name: "",
                specialization: ""
            });
        }
    }, [modalOpen, isCreate]);

    // -----------------------------
    // Submit handler
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isCreate
            ? `${API_URL}/vets/`
            : `${API_URL}/vets/${selectedVet.id}/`;

        const method = isCreate ? "POST" : "PUT";

        const payload = {
            name: formData.name.trim(),
            specialization: formData.specialization.trim()
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
                throw new Error("Failed to save vet");
            }

            await refreshVets();
            setModalOpen(false);

        } catch (error) {
            console.error("Error saving vet:", error);
        }
    };

    // -----------------------------
    // Modal style
    // -----------------------------
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
                    {isCreate ? "Add Vet" : "Edit Vet"}
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
                        label="Specialization"
                        value={formData.specialization}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                specialization: e.target.value
                            })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                    />

                    <Button type="submit" variant="contained" fullWidth>
                        {isCreate ? "Create" : "Update"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default VetModal;