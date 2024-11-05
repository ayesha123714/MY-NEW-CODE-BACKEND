import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class MessageEntity{
    @PrimaryGeneratedColumn('uuid')
    MessageId:string;

    @Column()
    username:string;

    @Column()
    userId:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    content:string;
}
