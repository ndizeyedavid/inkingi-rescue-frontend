import { getCurrentUser } from "./authService";
import Axios from "./axios";
import { toast } from "sonner";

export async function getContacts() {
    try {
        const response = await Axios.get("/contacts/view/all/" + getCurrentUser()?._id);
        return response.data.data;
    } catch (error) {
        toast.error("Failed to fetch contacts");
        return [];
    }
}

export async function addContact(contactData) {
    try {
        const response = await Axios.post(
            "/contacts/add/" + getCurrentUser()?._id,
            contactData
        );
        toast.success("Contact added successfully");
        return response.data;
    } catch (error) {
        toast.error("Failed to add contact");
        throw error;
    }
}

export async function deleteContact(id) {
    try {
        await Axios.delete(`/${id}`);
        toast.success("Contact deleted successfully");
    } catch (error) {
        toast.error("Failed to delete contact");
        throw error;
    }
}
