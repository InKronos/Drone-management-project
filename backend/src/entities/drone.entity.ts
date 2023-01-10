import {
	Entity,
	Column,
    BaseEntity,
    PrimaryGeneratedColumn,
	OneToMany,
} from 'typeorm';
import { Mission } from './mission.entity';

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

	@OneToMany(() => Mission, (mission) => mission.drone)
	missions: Mission[];
}