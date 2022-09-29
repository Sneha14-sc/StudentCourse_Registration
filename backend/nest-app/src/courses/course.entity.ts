import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Student_Courses } from '../Stud_Courses/stud_cor.entity';

@Entity()
export class Course{
    @PrimaryGeneratedColumn()
    course_id:number;

    @Column()
    name: string;

    @Column()
    desc: string;

    @Column({ type: 'timestamptz' })
    start_date: Date;

    @Column({ type: 'timestamptz' })
    end_date: Date;

    @OneToMany(type => Student_Courses, stud_cor => stud_cor.course,{
		onDelete: 'CASCADE',onUpdate: 'RESTRICT'
    })
    s_courses !: Student_Courses [];
}