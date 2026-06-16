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

            setAppointments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            setAppointments([]);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // -----------------------------
    // DELETE APPOINTMENT
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
    // TABLE COLUMNS (SAFE VERSION)
    // -----------------------------
    const columns = [
        { field: "id", headerName: "ID", width: 70 },

        // DATE
        {
            field: "date",
            headerName: "Date",
            width: 220,
            valueGetter: (params) => {
                const value = params?.row?.date;
                if (!value) return "—";

                const dateObj = new Date(value);
                return isNaN(dateObj.getTime())
                    ? "Invalid"
                    : dateObj.toLocaleString("en-IN");
            },
        },

        // PET (SAFE)
        {
            field: "pet",
            headerName: "Pet",
            width: 180,
            valueGetter: (params) => {
                return params?.row?.pet?.name ?? "—";
            },
        },

        // VET (SAFE)
        {
            field: "vet",
            headerName: "Vet",
            width: 180,
            valueGetter: (params) => {
                return params?.row?.vet?.name ?? "—";
            },
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

    // -----------------------------
    // CREATE APPOINTMENT
    // -----------------------------
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

            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    getRowId={(row) => row.id}
                    pageSize={5}
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