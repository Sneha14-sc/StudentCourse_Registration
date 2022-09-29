import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Student_Courses } from '../Stud_Courses/stud_cor.entity';
import { Address } from '../address/address.entity';
import { AddressService } from '../address/address.service';
import { AddressController } from '../address/address.controller';
import { StudCoursesController } from '../stud_courses/stud_courses.controller';
import { StudCoursesService } from '../stud_courses/stud_courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Address, Student_Courses])],
  providers: [StudentsService, AddressService, StudCoursesService],
  controllers: [StudentsController,AddressController, StudCoursesController]
})
export class StudentsModule {
  
}
