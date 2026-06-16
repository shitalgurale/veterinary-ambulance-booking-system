import { getOwners, deleteOwner } from "../../services/ownerService";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import OwnerModal from "./OwnerModal";
import { Button } from "@mui/material";

const Owners = () => {

    const [owners, setOwners] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState(null);
    const [loading, setLoading] = useState(false);

    // -----------------------------
    // FETCH OWNERS
    // -----------------------------
    const fetchOwners = async () => {
        setLoading(true);
        try {
            const data = await getOwners();
            setOwners(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Fetch owners error:", error);
            setOwners([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    // -----------------------------
    // DELETE OWNER
    // -----------------------------
    const handleDelete = async (ownerId) => {
        try {
            const success = await deleteOwner(ownerId);

            if (success) {
                setOwners((prev) =>
                    prev.filter((owner) => owner.id !== ownerId)
                );
            }
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
        { field: "phone", headerName: "Phone", width: 150 },

        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedOwner(params.row);
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
    // CREATE OWNER
    // -----------------------------
    const createOwner = () => {
        setSelectedOwner(null);
        setModalOpen(true);
    };

    return (
        <>
            <h1>Owners</h1>

            <Button
                variant="contained"
                onClick={createOwner}
                sx={{ mb: 2 }}
            >
                Add Owner
            </Button>

            <div style={{ height: 420, width: "100%" }}>
                <DataGrid
                    rows={owners}
                    columns={columns}
                    getRowId={(row) => row.id}
                    loading={loading}
                    pageSize={5}
                />
            </div>

            <OwnerModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedOwner={selectedOwner}
                refreshOwners={fetchOwners}
            />
        </>
    );
};

export default Owners;