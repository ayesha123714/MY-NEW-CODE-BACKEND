// import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import { UserService } from 'src/api/message/user/user.service';
// import { Observable } from "rxjs";
// import { WsException } from "@nestjs/websockets";
// import { JwtService } from "@nestjs/jwt";
// import { Socket } from "socket.io";
// @Injectable()
// export class GateWayGuard implements CanActivate{
//     constructor( private readonly userService:UserService){}
//     async canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
//         const client = context.switchToWs().getClient();
//         const token = this.extractTokenFromHandshake(client);
//         if(!token){
//             throw new WsException('UnAuthorized');
//         }
//         const user = await this.userService.validateToken(token);
//         if(!user){
//             throw new WsException('UnAuthorized');
//         }
//            client.user = user;
//            return true;
 
//     }
//     extractTokenFromHandshake(client:any):string{
//         return client.handshake?.query?.token;
//     }

// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.headers.authorization?.split(' ')[1];  

    if (!token) {
      return false;  
    }

    try {
      const decoded = this.jwtService.verify(token);
      client.data.user = decoded;  
      return true;
    } catch (error) {
      console.log('JWT verification failed', error);
      return false;  
    }
  }
}



// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { UserService } from 'src/api/message/user/user.service';
// import { Observable } from 'rxjs';
// import { WsException } from '@nestjs/websockets';
// import { JwtService } from '@nestjs/jwt';
// import { Socket } from 'socket.io';

// @Injectable()
// export class GateWayGuard implements CanActivate {
//   constructor(
//     private readonly userService: UserService,
//     private readonly jwtService: JwtService, // Inject JwtService
//   ) {}

//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean> {
//     const client: Socket = context.switchToWs().getClient<Socket>();
//     const token = this.extractTokenFromHandshake(client);

//     if (!token) {
//       throw new WsException('Unauthorized: No token provided');
//     }

//     try {
//       // Verify and decode the token
//       const payload = this.jwtService.verify(token);
//       const user = await this.userService.getUserById(payload.userId || payload.sub); // Adjust according to your payload structure

//       if (!user) {
//         throw new WsException('Unauthorized: User not found');
//       }

//       // Attach user to the client for further requests
//       client.data.user = user;
//       return true;
//     } catch (error) {
//       throw new WsException('Unauthorized: Invalid token');
//     }
//   }

//   // Helper method to extract the token from handshake query or auth object
//   private extractTokenFromHandshake(client: Socket): string {
//     // Try to retrieve token from client handshake auth or query
//     return client.handshake?.auth?.token || client.handshake?.query?.token;
//   }
// }
