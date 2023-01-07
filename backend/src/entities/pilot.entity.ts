import {
	Entity,
	Column,
    BaseEntity,
    PrimaryGeneratedColumn,
	JoinTable,
	ManyToMany,
} from 'typeorm';
import { Drone } from './drone.entity';

@Entity('pilot')
export class Pilot extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

	@Column()
	full_name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column()
	password: string;

	@Column()
	phone_number: string;

	@ManyToMany(() => Drone)
	@JoinTable()
	drone: Drone[];

    static async comparePasswords(
		candidatePassword: string,
		hashedPassword: string
	  ) {
		return (candidatePassword === hashedPassword);
	  }
}