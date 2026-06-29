import { customerService } from "@/src/services/customers.serivce";
import { useCustomerStore } from "@/src/store/useCustomerStore";
import {
    CustomerFilters,
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from "@/src/interfaces/customer";

export const useCustomers = () => {
    const {
        customers,
        pagination,
        isLoading,
        setLoading,
        setCustomers,
        addCustomer,
        updateCustomer: updateCustomerStore,
        removeCustomer,
    } = useCustomerStore();

    const fetchCustomers = async (params?: CustomerFilters) => {
        setLoading(true);

        try {
            const data = await customerService.list(params);
            setCustomers(data);
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createCustomer = async (data: CreateCustomerDTO) => {
        setLoading(true);

        try {
            const newCustomer = await customerService.create(data);
            addCustomer(newCustomer);
            return newCustomer;
        } finally {
            setLoading(false);
        }
    };

    const updateCustomer = async (
        id: string,
        data: UpdateCustomerDTO
    ) => {
        setLoading(true);

        try {
            const updatedCustomer = await customerService.update(id, data);
            updateCustomerStore(id, updatedCustomer);
            return updatedCustomer;
        } finally {
            setLoading(false);
        }
    };

    const deleteCustomer = async (id: string) => {
        setLoading(true);

        try {
            await customerService.remove(id);
            removeCustomer(id);
        } finally {
            setLoading(false);
        }
    };

    return {
        customers,
        pagination,
        isLoading,
        fetchCustomers,
        createCustomer,
        updateCustomer,
        deleteCustomer,
    };
};