import { getOwners, deleteOwner } from '../../services/ownerService';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import OwnerModal from './OwnerModal';
import { Button } from '@mui/material';

const Owners = () => {
    const [owners, setOwners] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOwner, setSelectedOwner] = useState({});

    // ✅ reusable fetch function
    const fetchOwners = async () => {
        try {
            const data = await getOwners();
            setOwners(data);
        } catch (error) {
            console.error(error);
        }
    };

    // ✅ load data on page load
    useEffect(() => {
        fetchOwners();
    }, []);

    const handleDelete = async (ownerId) => {
        try {
            const success = await deleteOwner(ownerId);
            if (success) {
                setOwners(owners.filter(owner => owner.id !== ownerId));
                console.log("Owner deleted successfully");
            } else {
                console.error("Failed to delete owner");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
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

    const createOwner = () => {
        setSelectedOwner({});
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

            <div style={{ height: 400 }}>
                <DataGrid
                    rows={owners}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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