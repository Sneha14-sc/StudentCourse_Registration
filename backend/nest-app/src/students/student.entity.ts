import {Column, JoinColumn, Entity, OneToOne, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Address } from '../address/address.entity';
import { Student_Courses } from '../Stud_Courses/stud_cor.entity';


@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    student_id:number;

    @Column()
    fname: string;

    @Column()
    lname: string;

    @Column()
    gender: string;

    @Column()
    age: number;

    @Column({type: "bigint", nullable: true})
    contact_no: number;

    @OneToOne(() => Address,{cascade: true, eager: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({ name: 'address_id' })
    address: Address

    @OneToMany(type => Student_Courses, stud_cor => stud_cor.student, {
		onDelete: 'CASCADE',onUpdate: 'CASCADE'
    })
    stud_cours !: Student_Courses [];
}