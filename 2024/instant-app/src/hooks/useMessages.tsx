import { useState, useEffect } from "react";
import { fetchMessageBundle } from "@arcgis/core/intl";
import { getMessageBundlePath } from "../utils/utils";

export const useMessages = function <
  T = Record<string, string | { [key: string]: string }>
>(fileName: string): T | null {
  const [messages, setMessages] = useState<T | null>(null);

  useEffect(() => {
    async function fetchMessages(): Promise<void> {
      const data = (await fetchMessageBundle(
        getMessageBundlePath(fileName)
      )) as T;
      setMessages(data);
    }
    void fetchMessages();
  }, [fileName]);

  return messages;
};
