import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';

const OwnerModal = ({ modalOpen, setModalOpen, selectedOwner, refreshOwners }) => {

    const isCreate = !selectedOwner?.id;

    const [formData, setFormData] = useState({
        name: "",
        phone: ""
    });

    useEffect(() => {
        setFormData({
            name: selectedOwner?.name || "",
            phone: selectedOwner?.phone || ""
        });
    }, [selectedOwner]);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        bgcolor: "white",
        width: 300,
        transform: "translate(-50%, -50%)",
        p: 3,
        borderRadius: 1,
        boxShadow: 24
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isCreate) {
                // ✅ CREATE
                await fetch("http://127.0.0.1:8000/api/owners/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                // ✅ UPDATE
                await fetch(`http://127.0.0.1:8000/api/owners/${selectedOwner.id}/`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
            }

            // ✅ Refresh table after save
            await refreshOwners();

            setModalOpen(false);

        } catch (error) {
            console.error("Error saving owner:", error);
        }
    };

    return (
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    {isCreate ? "Creating Owner" : "Updating Owner"}
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
                    >
                        {isCreate ? "Create" : "Update"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default OwnerModal;