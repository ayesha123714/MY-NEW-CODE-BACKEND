// import { JwtService } from '@nestjs/jwt';
// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   ConnectedSocket,
//   WebSocketServer,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   MessageBody,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { MessageService } from 'src/api/message/message.service';
// import { UserService } from 'src/api/message/user/user.service';
// import { UserEntity } from 'src/entity/user.entity';
// import { CreateMessageDto } from 'src/auth/dto/createMessage.dto';

// @WebSocketGateway({ cors: { origin: '*' } })
// export class MyGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;
//   private users: { [clientId: string]: UserEntity } = {};

//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly userService: UserService,
//     private readonly messageService: MessageService,
//   ) {}

//   afterInit(server: Server) {
//     console.log('WebSocket server initialized');
//   }

//   async handleConnection(client: Socket) {
//     const token = client.handshake.auth?.token;
//     if (!token) {
//       console.log(`Client ${client.id} did not provide a token.`);
//       client.disconnect(); // Disconnect if no token is provided
//       return;
//     }
//     try {
//       // Verify the JWT token
//       const payload = this.jwtService.verify(token);
//       const userId = payload.userId || payload.sub; // Adjust if needed based on token structure
//       const user = await this.userService.findById(userId);
//       if (user) {
//         this.users[client.id] = user;
//         this.server.emit('users', Object.values(this.users));
//         console.log(`Client connected: ${client.id} as ${user.username}`);
//       } else {
//         console.log(`User not found for token, disconnecting client ${client.id}.`);
//         client.disconnect();
//       }
//     } catch (error) {
//       console.error(`Invalid token from client ${client.id}:`, error.message);
//       client.disconnect(); // Disconnect if token verification fails
//     }
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     delete this.users[client.id];
//     this.server.emit('users', Object.values(this.users));
//   }

//   @SubscribeMessage('join')
//   handleJoin(@ConnectedSocket() client: Socket) {
//     const user = this.users[client.id];
//     if (user) {
//       console.log(`${user.username} joined the chat`);
//       this.server.emit('users', this.users);
//     }
//   }

//   @SubscribeMessage('newMessage')
//   async handleNewMessage(
//     @ConnectedSocket() client: Socket,
//     @MessageBody() data: { message: string },
//   ) {
//     const user = this.users[client.id];
//     if (user) {
//       const createMessageDto: CreateMessageDto = {
//         content: data.message,
//         username: user.username,
//         id: user.id.toString(),
//       };
//       await this.messageService.createMessage(createMessageDto);
//       this.server.emit('message', {
//         username: user.username,
//         message: data.message,
//       });
//     } else {
//       console.log(
//         `Client with ID ${client.id} attempted to send a message without joining.`,
//       );
//     }
//   }
// }





// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage, 
//   MessageBody, 
//   ConnectedSocket,
//   OnGatewayInit, 
//   OnGatewayConnection, OnGatewayDisconnect
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/api/message/user/user.service';
// import { UserEntity } from 'src/entity/user.entity';
// import { UserLoginDto } from 'src/auth/dto/login.dto';
// import { MessageService } from 'src/api/message/messages/message.service';
// import { signUpDto } from 'src/auth/dto/signup.dto';
// import { CreateMessageDto } from 'src/auth/dto/createMessage.dto';

// @WebSocketGateway({ cors: { origin: ['http://localhost:3001'], credentials: true}})
// export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;
//   private users: { [clientId: string]: UserEntity } = {}; // To store connected users
//   private readonly jwtService: JwtService;
//   private readonly userService: UserService;
//   private readonly messageService : MessageService;

//   constructor(jwtService: JwtService, userService: UserService, messageService: MessageService) {
//     this.jwtService = jwtService;
//     this.userService = userService;
//     this.messageService = messageService; 
//   }

//   afterInit(server: Server) {
//     console.log('WebSocket server initialized');
//   }

//   async handleConnection(client: Socket) {
//     const token = client.handshake.auth.token; // Get the token from the client's handshake
//     if (!token) {
//       console.log(`Client ${client.id} did not provide a token.`);
//       client.disconnect(); // Disconnect if no token is provided
//       return;
//     }
//     try {
//       const payload = this.jwtService.verify(token); // Verify the JWT token
//       const user = await this.userService.findById(payload.userid); // Fetch the user from the repository
//       if (user) {
//         this.users[client.id] = user;
//         this.server.emit('users', this.users);
//         console.log(`Client connected: ${client.id} as ${user.username}`);
//       } else {
//         console.log(`User not found for token, disconnecting client ${client.id}.`);
//         client.disconnect();
//       }
//     } catch (error) {
//       console.error(`Invalid token from client ${client.id}:`, error.message);
//       client.disconnect(); // Disconnect if token verification fails
//     }
//   }

//   handleDisconnect(client: Socket) {
//     console.log(`Client disconnected: ${client.id}`);
//     delete this.users[client.id];
//     this.server.emit('users', this.users); // Emit updated user list to all clients
//   }


//  //@UseGuards(GatewayGuard)
//   @SubscribeMessage('join')
//   handleJoin(@ConnectedSocket() client: Socket) {
//     const user = this.users[client.id]
//     if (user) {
//       console.log(`${user.username} joined the chat`);
//       this.server.emit('users', this.users); // Emit updated user list to all clients
//     }
//   }
  
//   //@UseGuards(GatewayGuard)
//   @SubscribeMessage('message')
//   async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { message: string }) {
//     const user = this.users[client.id]
//     if (user) {
//       const messageDto: CreateMessageDto = {
//         content: data.message,
//         username: user.username,
//         id: user.id.toString(),
//       }
//       await this.messageService.createMessage(messageDto); // Save to database
//       this.server.emit('message', { username: user.username, message: data.message });
//     }
//     else {
//       console.log(`Client with ID ${client.id} attempted to send a message without joining.`);
//     }
//   }

// }




import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/api/message/user/user.service';
import { UserEntity } from 'src/entity/user.entity';
import { MessageService } from 'src/api/message/messages/message.service';
import { CreateMessageDto } from 'src/auth/dto/createMessage.dto';

@WebSocketGateway({ cors: { origin: ['http://localhost:3001'], credentials: true } })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: { [clientId: string]: UserEntity } = {}; // To store connected users
  private readonly jwtService: JwtService;
  private readonly userService: UserService;
  private readonly messageService: MessageService;

  constructor(jwtService: JwtService, userService: UserService, messageService: MessageService) {
    this.jwtService = jwtService;
    this.userService = userService;
    this.messageService = messageService;
  }

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token; // Get the token from the client's handshake
    if (!token) {
      console.log(`Client ${client.id} did not provide a token.`);
      client.disconnect(); // Disconnect if no token is provided
      return;
    }

    try {
      // Verify the JWT token and extract payload
      const payload = this.jwtService.verify(token); // Replace 'your_jwt_secret' with your actual secret if required

      // Fetch the user from the repository using the payload data
      const user = await this.userService.findById(payload.userid);

      if (user) {
        this.users[client.id] = user; // Store the user for future reference
        this.server.emit('users', this.users); // Emit the updated user list to all clients
        console.log(`Client connected: ${client.id} as ${user.username}`);
      } else {
        console.log(`User not found for token, disconnecting client ${client.id}.`);
        client.disconnect();
      }
    } catch (error) {
      console.error(`Invalid token from client ${client.id}:`, error.message);
      client.disconnect(); // Disconnect if token verification fails
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.users[client.id];
    this.server.emit('users', this.users); // Emit updated user list to all clients
  }

  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() client: Socket) {
    const user = this.users[client.id];
    if (user) {
      console.log(`${user.username} joined the chat`);
      this.server.emit('users', this.users); // Emit updated user list to all clients
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { message: string }) {
    const user = this.users[client.id];
    if (user) {
      const messageDto: CreateMessageDto = {
        content: data.message,
        username: user.username,
        id: user.id.toString(),
      };
      await this.messageService.createMessage(messageDto); // Save to database
      this.server.emit('message', { username: user.username, message: data.message });
    } else {
      console.log(`Client with ID ${client.id} attempted to send a message without joining.`);
    }
  }
}
