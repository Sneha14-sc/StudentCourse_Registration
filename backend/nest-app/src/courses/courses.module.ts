import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Student_Courses } from '../Stud_Courses/stud_cor.entity';
import { StudCoursesService } from '../stud_courses/stud_courses.service';
import { StudCoursesController } from '../stud_courses/stud_courses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Student_Courses])],
  providers: [CoursesService, StudCoursesService],
  controllers: [CoursesController,StudCoursesController]
})
export class CoursesModule {}
