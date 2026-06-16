import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import PetModal from "./PetModal";

const API_URL = import.meta.env.VITE_API_URL;

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState(null);

    // -----------------------------
    // FETCH PETS
    // -----------------------------
    const fetchPets = async () => {
        try {
            const res = await fetch(`${API_URL}/pets/`);
            const data = await res.json();

            console.log("Pets API:", data);

            setPets(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching pets:", error);
            setPets([]);
        }
    };

    useEffect(() => {
        fetchPets();
    }, []);

    // -----------------------------
    // DELETE PET
    // -----------------------------
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/pets/${id}/`, {
                method: "DELETE",
            });

            fetchPets();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // -----------------------------
    // COLUMNS (FINAL FIXED)
    // -----------------------------
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "species", headerName: "Species", width: 150 },
        { field: "age", headerName: "Age", width: 100 },

        // ✅ OWNER FIX (IMPORTANT)
        {
            field: "owner",
            headerName: "Owner",
            width: 180,
            renderCell: (params) => {
                return params.row?.owner?.name ?? "—";
            }
        },

        // ACTIONS
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedPet(params.row);
                            setModalOpen(true);
                        }}
                        sx={{ mr: 1 }}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <h1>Pets</h1>

            <Button variant="contained" onClick={() => {
                setSelectedPet(null);
                setModalOpen(true);
            }}>
                Add Pet
            </Button>

            <div style={{ height: 420, width: "100%" }}>
                <DataGrid
                    rows={pets}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                />
            </div>

            <PetModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedPet={selectedPet}
                refreshPets={fetchPets}
            />
        </>
    );
};

export default Pets;