import { ColumnsType } from "antd/es/table";
import { Button, Space, Tag } from "antd";
import { Customer } from "@/src/interfaces/customer";
import { CustomerActions } from "../Actions";
import { ShoppingCartOutlined } from '@ant-design/icons';

export const getCustomerColumns = (
    onDelete: (id: string) => Promise<void>,
    onEdit: (id: string) => void,
    handleOpenCreate: (customerId: string) => void

): ColumnsType<Customer> => [
        /*{
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (id) => id.slice(0, 8) + "...",
        },*/
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            minWidth: 200,
        },
        {
            title: "Documento",
            dataIndex: "document",
            key: "document",
            minWidth: 150,
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
            minWidth: 220,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status) => {
                const isActive = status === true;

                return (
                    <Tag color={isActive ? "green" : "red"}>
                        {isActive ? "ATIVO" : "INATIVO"}
                    </Tag>
                );
            },
        },
        {
            title: 'Criado em',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date: string) =>
                new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(new Date(date)),
            minWidth: 150,
        },
        {
            title: 'modificado em',
            dataIndex: 'updated_at',
            key: 'created_at',
            render: (date: string) =>
                new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                }).format(new Date(date)),
            minWidth: 150,
        },

        {
            title: "Ações",
            key: "action",
            width: 200,
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        // Verifica se o status é falso para desabilitar
                        disabled={record.status === false}

                        onClick={() => handleOpenCreate(record.id)}
                    >
                        Novo Pedido
                    </Button>
                    <CustomerActions
                        record={record}
                        onDelete={onDelete}
                    />
                </Space>
            ),

        },
    ];