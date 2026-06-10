import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import VetModal from "./VetModal";

const Vets = () => {
    const [vets, setVets] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedVet, setSelectedVet] = useState({});

    const fetchVets = async () => {
        const res = await fetch("http://127.0.0.1:8000/api/vets/");
        const data = await res.json();
        setVets(data);
    };

    useEffect(() => {
        fetchVets();
    }, []);

    const handleDelete = async (id) => {
        await fetch(`http://127.0.0.1:8000/api/vets/${id}/`, {
            method: "DELETE",
        });
        fetchVets();
    };

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

            <div style={{ height: 400 }}>
                <DataGrid rows={vets} columns={columns} />
            </div>

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