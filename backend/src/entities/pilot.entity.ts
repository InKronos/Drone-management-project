import {
	Entity,
	Column,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';

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

    static async comparePasswords(
		candidatePassword: string,
		hashedPassword: string
	  ) {
		return (candidatePassword === hashedPassword);
	  }
}