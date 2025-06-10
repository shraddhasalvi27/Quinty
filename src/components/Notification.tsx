import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';

import useNotificationStore from "../stores/useNotificationStore";
import { useConnection } from "@solana/wallet-adapter-react";
import { useNetworkConfiguration } from "../contexts/NetworkConfigurationProvider";
import NotificationSVG from "./SVG/NotificationSVG";

// 1. Props type for Notification component
interface NotificationProps {
  type: 'success' | 'info' | 'error';
  message: string;
  description?: string;
  txid?: string;
  onHide: () => void;
}

const Notification: React.FC<NotificationProps> = ({ type, message, description, txid, onHide }) => {
  const { connection } = useConnection();
  const { networkConfiguration } = useNetworkConfiguration(); // ✅ FIXED typo from `NetworkConfiguration`

  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);
    return () => clearTimeout(id);
  }, [onHide]);

  return (
    <div className="bg-bkg-1 pointer-events-auto z-50 mx-4 mt-2 mb-12 w-full max-w-sm overflow-hidden rounded-md bg-[#0a1023] p-2 shadow-lg right-1">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {type === "success" && (
              <CheckCircleIcon className="text-green-500 mr-1 h-8 w-8" />
            )}
            {type === "info" && (
              <InformationCircleIcon className="text-blue-500 mr-1 h-8 w-8" />
            )}
            {type === "error" && (
              <XCircleIcon className="text-red-500 mr-1 h-8 w-8" />
            )}
          </div>
          <div className="ml-2 w-0 flex-1">
            <div className="text-white font-bold">{message}</div>
            {description && (
              <p className="text-gray-300 mt-0.5 text-sm">{description}</p>
            )}
            {txid && (
              <div className="flex flex-row">
                <a
                  href={`https://explorer.solana.com/tx/${txid}?cluster=${networkConfiguration}`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-accent link flex flex-row"
                >
                  <NotificationSVG />
                  <div className="mx-4 flex">
                    {txid.slice(0, 8)}....{txid.slice(-8)}
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0 self-start">
            <button onClick={onHide}>
              <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NotificationList: React.FC = () => {
  const { notifications, set: setNotificationStore } = useNotificationStore(s => s);
  const reverseNotifications = [...notifications].reverse();

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-end px-4 py-6 sm:p-6">
      <div className="flex w-full flex-col">
        {reverseNotifications.map((n, idx) => (
          <Notification
            key={`${n.message} ${idx}`}
            type={n.type as 'success' | 'info' | 'error'} // ✅ Ensure union type
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state) => {
                const reversedIndex = reverseNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex),
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;
