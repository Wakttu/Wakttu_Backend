import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
interface Chat {
    roomId: string;
    chat: string;
}
export declare class SocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly socketService;
    constructor(socketService: SocketService);
    server: Server;
    clients: {
        [socketId: string]: string;
    };
    rooms: {
        [roomId: string]: string[];
    };
    turn: {
        [roomId: string]: string;
    };
    handleConnection(client: Socket): void;
    afterInit(): void;
    handleDisconnect(client: Socket): void;
    handleMessage({ roomId, chat }: Chat, client: Socket): Promise<void>;
    handleEnter(roomId: string, client: Socket): void;
    handleExit(roomId: string, client: Socket): void;
    handleTurnStart(roomId: string, client: Socket): void;
    handleTurnEnd(roomId: string, client: Socket): void;
    handleAnswer({ roomId, chat }: Chat, client: Socket): Promise<void>;
}
export {};