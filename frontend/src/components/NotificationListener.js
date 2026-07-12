import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";

function NotificationListener() {

    useEffect(() => {

        let client;

        try {

            client = new Client({

                webSocketFactory: () =>
                    new SockJS(
                        "https://nexushr-production-612e.up.railway.app/ws"
                    ),

                reconnectDelay: 0,

                debug: () => {},

                onConnect: () => {

                    console.log("WebSocket Connected");

                    client.subscribe(
                        "/topic/notifications",
                        (message) => {

                            try {

                                const data = JSON.parse(message.body);

                                toast.success(
                                    `${data.title} - ${data.message}`
                                );

                            } catch (e) {

                                console.log(e);

                            }

                        }
                    );

                },

                onStompError: (frame) => {

                    console.log("STOMP Error", frame);

                },

                onWebSocketError: (event) => {

                    console.log("WebSocket Error", event);

                }

            });

            client.activate();

        } catch (e) {

            console.log(e);

        }

        return () => {

            if (client) {

                client.deactivate();

            }

        };

    }, []);

    return null;

}

export default NotificationListener;