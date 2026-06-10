const API_URL = "http://127.0.0.1:8000/api/owners/";

// ✅ GET all owners
export const getOwners = async () => {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// ✅ CREATE owner
export const createOwner = async (ownerData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ownerData),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// ✅ UPDATE owner
export const updateOwner = async (ownerId, ownerData) => {
    try {
        const response = await fetch(`${API_URL}${ownerId}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ownerData),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

// ✅ DELETE owner
export const deleteOwner = async (ownerId) => {
    try {
        const response = await fetch(`${API_URL}${ownerId}/`, {
            method: "DELETE",
        });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
};