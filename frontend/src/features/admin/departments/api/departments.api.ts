import api from "@/lib/axios";
import type { CreateDepartmentData, Department } from "../types/departments.types";

export const getDepartments = async (): Promise<Department[]> => {
    const response = await api.get('/departments');
    return response.data;
};

export const createDepartment = async (
    data: CreateDepartmentData,
): Promise<Department> => {
    const response = await api.post('/departments', data);
    return response.data;
};