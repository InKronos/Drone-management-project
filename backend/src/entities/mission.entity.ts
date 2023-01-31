import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Drone } from "./drone.entity";
import { MissionPath } from "./missionPath.entity";

@Entity('misison')
export class Mission extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

	@Column()
	missionStart: Date;

	@Column({
		nullable: true,
	})
	missionEnd: Date;

	@Column({nullable: true})
	isAccepted: boolean;

	@OneToOne(() => MissionPath)
	@JoinColumn()
	missionDestination: MissionPath;

	@ManyToOne(() => Drone, (drone) => drone.missions)
	drone: Drone;

    @OneToMany(() => MissionPath, (missionPath) => missionPath.mission)
    missionPath: MissionPath[];

}