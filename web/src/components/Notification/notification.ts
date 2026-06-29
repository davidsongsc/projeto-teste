'use client';

import { App } from 'antd';

let notificationApi: ReturnType<typeof App.useApp>['notification'] | null = null;

export function bindNotification(
  api: ReturnType<typeof App.useApp>['notification']
) {
  notificationApi = api;
}

function normalize(title: string, description?: string) {
  if (!description) {
    return {
      message: '',
      description: title,
    };
  }

  return {
    message: title,
    description,
  };
}

export const notification = {
  success(title: string, description?: string) {
    notificationApi?.success(normalize(title, description));
  },

  error(title: string, description?: string) {
    notificationApi?.error(normalize(title, description));
  },

  warning(title: string, description?: string) {
    notificationApi?.warning(normalize(title, description));
  },

  info(title: string, description?: string) {
    notificationApi?.info(normalize(title, description));
  },

  loading(title: string, description?: string) {
    notificationApi?.open({
      type: 'info',
      duration: 0,
      ...normalize(title, description),
    });
  },

  destroy() {
    notificationApi?.destroy();
  },
};