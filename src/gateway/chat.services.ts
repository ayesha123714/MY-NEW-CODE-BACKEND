import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
    private messages: { user: string; message: string; timestamp: Date }[] = [];
    private activeUsers: Set<string> = new Set();

    addMessage(user: string, message: string) {
        this.messages.push({ user, message, timestamp: new Date() });
        console.log(`Message from ${user}: ${message}`);
    }

    getMessages() {
        return this.messages;
    }

    addActiveUser(username: string) {
        this.activeUsers.add(username);
    }

    removeActiveUser(username: string) {
        this.activeUsers.delete(username);
    }

    getActiveUsers() {
        return Array.from(this.activeUsers);
    }
}
