'use client';

import { App } from 'antd';
import { useEffect } from 'react';
import { bindNotification } from '../notification';

export default function NotificationBinder() {
  const { notification } = App.useApp();

  useEffect(() => {
    bindNotification(notification);
  }, [notification]);

  return null;
}