import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AppointmentModal from "./AppointmentModal";

const API_URL = import.meta.env.VITE_API_URL;

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({});

    // -----------------------------
    // FETCH APPOINTMENTS
    // -----------------------------
    const fetchAppointments = async () => {
        try {
            const res = await fetch(`${API_URL}/appointments/`);
            const data = await res.json();

            console.log("Appointments API:", data);

            const formattedData = Array.isArray(data)
                ? data.map((item) => ({
                      ...item,
                      petName: item.pet?.name || "-",
                      vetName: item.vet?.name || "-",
                      formattedDate: item.date
                          ? new Date(item.date).toLocaleString("en-IN")
                          : "-",
                  }))
                : [];

            setAppointments(formattedData);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // -----------------------------
    // DELETE
    // -----------------------------
    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/appointments/${id}/`, {
                method: "DELETE",
            });

            fetchAppointments();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    // -----------------------------
    // COLUMNS
    // -----------------------------
    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "formattedDate",
            headerName: "Date",
            width: 220,
        },
        {
            field: "petName",
            headerName: "Pet",
            width: 180,
        },
        {
            field: "vetName",
            headerName: "Vet",
            width: 180,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 220,
            sortable: false,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => {
                            setSelectedAppointment(params.row);
                            setModalOpen(true);
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const createAppointment = () => {
        setSelectedAppointment({});
        setModalOpen(true);
    };

    return (
        <>
            <h1>Appointments</h1>

            <Button
                variant="contained"
                sx={{ mb: 2 }}
                onClick={createAppointment}
            >
                Add Appointment
            </Button>

            <div style={{ height: 450, width: "100%" }}>
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                                page: 0,
                            },
                        },
                    }}
                />
            </div>

            <AppointmentModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedAppointment={selectedAppointment}
                refreshAppointments={fetchAppointments}
            />
        </>
    );
};

export default Appointments;