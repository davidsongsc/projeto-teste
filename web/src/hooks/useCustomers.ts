import { customerService } from "@/src/services/customers.serivce";
import { useCustomerStore } from "@/src/store/useCustomerStore";
import {
    CustomerFilters,
    CreateCustomerDTO,
    UpdateCustomerDTO,
} from "@/src/interfaces/customer";
import { notification } from "../components/Notification/notification";

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
            notification.error(error);
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
        }
        catch (error) {
            notification.error(error);

        }
        finally {
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
        }
        catch (error) {
            notification.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    const autocompleteCustomers = async (search: string) => {
        try {
            return await customerService.getAutocomplete(search);
        } catch (error) {
            notification.error(error);
            return [];
        }
    };
    const deleteCustomer = async (id: string) => {
        setLoading(true);

        try {
            await customerService.remove(id);
            removeCustomer(id);
        }
        catch (error) {
            notification.error(error);
        }
        finally {
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
        autocompleteCustomers,
    };
};