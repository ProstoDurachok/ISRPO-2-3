import { $host } from "./index.js";

export const getALL = async () => {
    const { data } = await $host.get('/');
    return data;
};

export const createCustomer = async (customer) => {
    const { data } = await $host.post('/', customer);
    return data;
};

export const updateCustomer = async (id, customer) => {
    const { data } = await $host.put(`/${id}`, customer);
    return data;
};

export const deleteCustomer = async (id) => {
    await $host.delete(`/${id}`);
};
