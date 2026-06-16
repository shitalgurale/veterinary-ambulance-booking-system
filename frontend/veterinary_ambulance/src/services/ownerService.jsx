const BASE_URL = import.meta.env.VITE_API_URL;

// -----------------------------
// GET all owners
// -----------------------------
export const getOwners = async () => {
    try {
        const response = await fetch(`${BASE_URL}/owners/`);

        if (!response.ok) {
            throw new Error("Failed to fetch owners");
        }

        return await response.json();
    } catch (error) {
        console.error("Get owners error:", error);
        return [];
    }
};

// -----------------------------
// CREATE owner
// -----------------------------
export const createOwner = async (ownerData) => {
    try {
        const response = await fetch(`${BASE_URL}/owners/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ownerData),
        });

        if (!response.ok) {
            throw new Error("Failed to create owner");
        }

        return await response.json();
    } catch (error) {
        console.error("Create owner error:", error);
        return null;
    }
};

// -----------------------------
// UPDATE owner
// -----------------------------
export const updateOwner = async (ownerId, ownerData) => {
    try {
        const response = await fetch(`${BASE_URL}/owners/${ownerId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ownerData),
        });

        if (!response.ok) {
            throw new Error("Failed to update owner");
        }

        return await response.json();
    } catch (error) {
        console.error("Update owner error:", error);
        return null;
    }
};

// -----------------------------
// DELETE owner (FIXED)
// -----------------------------
export const deleteOwner = async (ownerId) => {
    try {
        const response = await fetch(`${BASE_URL}/owners/${ownerId}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete owner");
        }

        return true;
    } catch (error) {
        console.error("Delete owner error:", error);
        return false;
    }
};