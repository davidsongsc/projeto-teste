'use client';

import { App } from 'antd';
import NotificationBinder from '@/src/components/Notification/Binder';

interface Props {
    children: React.ReactNode;
}

export default function NotificationProvider({ children }: Props) {
    return (
        <App>
            <NotificationBinder />
            {children}
        </App>
    );
}