import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import VetModal from "./VetModal";

const API_URL = import.meta.env.VITE_API_URL;

const Vets = () => {

    const [vets, setVets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVet, setSelectedVet] = useState({});

    // -----------------------------
    // FETCH VETS
    // -----------------------------
    const fetchVets = async () => {
        try {
            const res = await fetch(`${API_URL}/vets/`);
            const data = await res.json();
            setVets(data);
        } catch (error) {
            console.error("Error fetching vets:", error);
        }
    };

    useEffect(() => {
        fetchVets();
    }, []);

    // -----------------------------
    // DELETE VET
    // -----------------------------
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/vets/${id}/`, {
                method: "DELETE",
            });

            fetchVets();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // -----------------------------
    // TABLE COLUMNS
    // -----------------------------
    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "specialization", headerName: "Specialization", width: 200 },

        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedVet(params.row);
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

    // -----------------------------
    // CREATE VET
    // -----------------------------
    const createVet = () => {
        setSelectedVet({});
        setModalOpen(true);
    };

    return (
        <>
            <h1>Vets</h1>

            <Button variant="contained" onClick={createVet} sx={{ mb: 2 }}>
                Add Vet
            </Button>

            {/* DATA GRID WRAPPER */}
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={vets}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>

            {/* MODAL */}
            <VetModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedVet={selectedVet}
                refreshVets={fetchVets}
            />
        </>
    );
};

export default Vets;