import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

function NotificationListener() {

  useEffect(() => {

    const client = new Client({

      webSocketFactory: () =>
        new SockJS(
          "https://nexushr-production-612e.up.railway.app/ws"
        ),

      reconnectDelay: 5000,

      onConnect: () => {

        console.log(
          "WebSocket Connected"
        );

        client.subscribe(
          "/topic/notifications",
          (message) => {

            const data =
              JSON.parse(
                message.body
              );

            toast.success(
              `${data.title} - ${data.message}`
            );

          }
        );

      }

    });

    client.activate();

    return () => {

      client.deactivate();

    };

  }, []);

  return null;
}

export default NotificationListener;