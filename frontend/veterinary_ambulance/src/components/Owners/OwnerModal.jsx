import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const OwnerModal = ({
    modalOpen,
    setModalOpen,
    selectedOwner,
    refreshOwners
}) => {

    const isCreate = !selectedOwner?.id;

    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });

    const [loading, setLoading] = useState(false);

    // -----------------------------
    // Fill form when editing
    // -----------------------------
    useEffect(() => {
        if (selectedOwner?.id) {
            setFormData({
                name: selectedOwner?.name || "",
                phone: selectedOwner?.phone || ""
            });
        }
    }, [selectedOwner]);

    // -----------------------------
    // Reset when opening create modal
    // -----------------------------
    useEffect(() => {
        if (modalOpen && isCreate) {
            setFormData({
                name: "",
                phone: ""
            });
        }
    }, [modalOpen, isCreate]);

    // -----------------------------
    // Reset when closing modal
    // -----------------------------
    const handleClose = () => {
        setModalOpen(false);
        setFormData({ name: "", phone: "" });
    };

    // -----------------------------
    // STYLE
    // -----------------------------
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 320,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 2,
        boxShadow: 24
    };

    // -----------------------------
    // SUBMIT
    // -----------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isCreate
            ? `${API_URL}/owners/`
            : `${API_URL}/owners/${selectedOwner.id}/`;

        const method = isCreate ? "POST" : "PUT";

        const payload = {
            name: formData.name.trim(),
            phone: formData.phone.trim()
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
                throw new Error("Failed to save owner");
            }

            await refreshOwners();
            handleClose();

        } catch (error) {
            console.error("Error saving owner:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={modalOpen} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isCreate ? "Create Owner" : "Update Owner"}
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
                        label="Phone"
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : isCreate
                                ? "Create"
                                : "Update"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default OwnerModal;