import Axios from "./axios";
import { toast } from "sonner";

// Get all SOS reports
export const getSosReports = async () => {
    try {
        const response = await Axios.get("/sos/view/all");
        return response.data.data || response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch SOS reports.";
        toast.error(message);
        throw error;
    }
};

// Get a single SOS report by ID
export const getSosReportById = async (id) => {
    try {
        const response = await Axios.get(`/sos/${id}`);
        return response.data.data || response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to fetch SOS report.";
        toast.error(message);
        throw error;
    }
};

// Create a new SOS report (with file upload support)
export const createSosReport = async (sosData) => {
    try {
        const formData = new FormData();

        // Append text fields
        Object.keys(sosData).forEach((key) => {
            if (key !== "proofs") {
                formData.append(key, sosData[key]);
            }
        });

        // Append files (proofs)
        if (Array.isArray(sosData.proofs)) {
            sosData.proofs.forEach((proof, index) => {
                if (proof.file) {
                    formData.append("proofs", proof.file);
                } else if (proof.url && proof.url.startsWith("data:image")) {
                    const file = dataURLtoFile(proof.url, `capture_${index}.jpg`);
                    formData.append("proofs", file);
                }
            });
        }

        const response = await Axios.post("/sos/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        toast.success("Emergency reported successfully!");
        return response.data.data || response.data;
    } catch (error) {
        const message = error.response?.data?.message || "Failed to report emergency.";
        toast.error(message);
        throw error;
    }
};

// Helper: Convert base64 dataURL to File object
function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
