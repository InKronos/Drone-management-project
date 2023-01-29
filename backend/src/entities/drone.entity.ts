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

	@Column()
	isOnline: boolean;

	@Column({nullable: true})
	lastOnline: Date;

	@Column({nullable: true})
	veryfication: string;

	@Column({type: "decimal", precision: 10, scale: 6, nullable: true})
	longitude: number;

	@Column({type: "decimal", precision: 10, scale: 6, nullable: true})
	latitude: number;

	@OneToMany(() => Mission, (mission) => mission.drone)
	missions: Mission[];
}