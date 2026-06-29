'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, Typography, Spin } from 'antd';
import { OrderCreateForm } from '@/src/components/Order/FormSimple';
import { useOrders } from '@/src/hooks/useOrders';
import { useAuthStore } from '@/src/store/useAuthStore';

export default function CreateOrderPage() {
    const params = useParams();
    const customerId = params.userId as string; // 'userId' é o nome da pasta no seu [userId]
    
    const { user } = useAuthStore();
    const { createOrder, isLoading } = useOrders();
    const router = useRouter();

    const handleFinish = async (values: any) => {
        const total = values.items.reduce((acc: number, item: any) =>
            acc + (Number(item.price) * item.count), 0);

        await createOrder({
            ...values,
            userId: user?.id,
            customerId: customerId,
            totalPrice: total
        });

        router.push('/orders');
    };

    if (!customerId) return <Spin />;

    return (
        <div className="p-10 max-w-4xl mx-auto">
            <OrderCreateForm
                customerId={customerId}
                onSubmit={handleFinish}
                loading={isLoading}
            />
        </div>
    );
}