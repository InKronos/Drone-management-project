import {
	Entity,
	Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('drone')
export class Drone extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

	@Column()
	droneName: string;

	@Column()
	imageURL: string;

	@Column()
	isConnected: string;

    
}