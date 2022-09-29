import { Module } from '@nestjs/common';
import { StudCoursesService } from './stud_courses.service';
import { StudCoursesController } from './stud_courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/student.entity';
import { Course } from '../courses/course.entity';
import { Student_Courses } from './stud_cor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student,Course,Student_Courses])],
  providers: [StudCoursesService],
  controllers: [StudCoursesController]
})
export class StudCoursesModule {}
