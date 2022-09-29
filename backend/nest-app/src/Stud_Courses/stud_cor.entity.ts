import { Student } from '../students/student.entity';
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import { Course } from '../courses/course.entity';

@Entity()
export class Student_Courses{
   
   @PrimaryGeneratedColumn()
   stud_course_id!: number;

   @Column()
   student_ids!: number;

   @Column()
   course_ids!:number;
   
   @Column()
   fees!: number;   
   
   //Student(obj)
   @ManyToOne(type => Student, student =>student.stud_cours, {
      onDelete: 'CASCADE',onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'student_ids' })
    student!: Student;

   //Course(obj)
   @ManyToOne(type => Course, course =>course.s_courses, {
      onDelete: 'CASCADE',onUpdate: 'CASCADE'
    })
    @JoinColumn({ name: 'course_ids' })
   course!: Course;
}