import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import AppointmentModal from "./AppointmentModal";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState({});

    const fetchAppointments = async () => {
        try {
            const res = await fetch("http://127.0.0.1:8000/api/appointments/");
            const data = await res.json();
            setAppointments(data);
        } catch (error) {
            console.error("Error fetching appointments:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/appointments/${id}/`, {
                method: "DELETE",
            });
            fetchAppointments();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", width: 70 },

        // ✅ FIXED DATE COLUMN (no Invalid Date)
        {
            field: "date",
            headerName: "Date",
            width: 220,
            renderCell: (params) => {
                const value = params.row.date;

                if (!value) return "—";

                const dateObj = new Date(value);

                if (isNaN(dateObj)) return "Invalid";

                return dateObj.toLocaleString("en-IN");
            }
        },

        { field: "pet", headerName: "Pet ID", width: 120 },
        { field: "vet", headerName: "Vet ID", width: 120 },

        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setSelectedAppointment(params.row);
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

    const createAppointment = () => {
        setSelectedAppointment({});
        setModalOpen(true);
    };

    return (
        <>
            <h1>Appointments</h1>

            <Button
                variant="contained"
                onClick={createAppointment}
                sx={{ mb: 2 }}
            >
                Add Appointment
            </Button>

            <div style={{ height: 400 }}>
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
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