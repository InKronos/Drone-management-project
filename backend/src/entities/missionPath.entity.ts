import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Mission } from "./mission.entity";

@Entity('misison_path')
export class MissionPath extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

	@Column({type: "decimal", precision: 10, scale: 6})
	longitude: number;

	@Column({type: "decimal", precision: 10, scale: 6})
	latitude: number;

	@ManyToOne(() => Mission, (mission) => mission.missionPath)
	mission: Mission;


}