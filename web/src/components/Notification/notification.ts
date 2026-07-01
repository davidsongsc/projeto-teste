'use client';

import { App } from 'antd';
import axios from 'axios';

let notificationApi: ReturnType<typeof App.useApp>['notification'] | null = null;

export function bindNotification(
  api: ReturnType<typeof App.useApp>['notification']
) {
  notificationApi = api;
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred.';
}

function normalize(
  titleOrError: string | unknown,
  descriptionOrError?: string | unknown
) {
  if (descriptionOrError === undefined) {
    if (typeof titleOrError === 'string') {
      return {
        message: '',
        description: titleOrError,
      };
    }

    return {
      message: 'Error',
      description: getErrorMessage(titleOrError),
    };
  }

  if (typeof descriptionOrError === 'string') {
    return {
      message: String(titleOrError),
      description: descriptionOrError,
    };
  }

  return {
    message: String(titleOrError),
    description: getErrorMessage(descriptionOrError),
  };
}

export const notification = {
  success(title: string | unknown, description?: string | unknown) {
    notificationApi?.success(normalize(title, description));
  },

  error(title: string | unknown, description?: string | unknown) {
    notificationApi?.error(normalize(title, description));
  },

  warning(title: string | unknown, description?: string | unknown) {
    notificationApi?.warning(normalize(title, description));
  },

  info(title: string | unknown, description?: string | unknown) {
    notificationApi?.info(normalize(title, description));
  },

  loading(title: string | unknown, description?: string | unknown) {
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