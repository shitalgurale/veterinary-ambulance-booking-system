import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import PetModal from "./PetModal";

const Pets = () => {
    const [pets, setPets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPet, setSelectedPet] = useState({});

    const fetchPets = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/pets/");
        const data = await res.json();
        setPets(data);
    };

    useEffect(() => {
        fetchPets();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/pets/${id}/`, {
            method: "DELETE",
        });
        fetchPets();
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "species", headerName: "Species", width: 150 },
        { field: "age", headerName: "Age", width: 100 },
        { field: "owner", headerName: "Owner ID", width: 120 },
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

    const createPet = () => {
        setSelectedPet({});
        setModalOpen(true);
    };

    return (
        <>
            <h1>Pets</h1>

            <Button variant="contained" onClick={createPet} sx={{ mb: 2 }}>
                Add Pet
            </Button>

            <div style={{ height: 400 }}>
                <DataGrid rows={pets} columns={columns} />
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