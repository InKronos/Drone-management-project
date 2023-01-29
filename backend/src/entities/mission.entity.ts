import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

	@ManyToOne(() => Drone, (drone) => drone.missions)
	drone: Drone;

    @OneToMany(() => MissionPath, (missionPath) => missionPath.mission)
    missionPath: MissionPath[];

}