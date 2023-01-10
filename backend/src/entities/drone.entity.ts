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

	@Column({
		unique: true
	})
	droneName: string;

	@Column({
		nullable: true
	})
	imageURL: string;

	@Column()
	isConnected: boolean;

	@OneToMany(() => Mission, (mission) => mission.drone)
	missions: Mission[];
}