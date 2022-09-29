import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressModule } from './address/address.module';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';
import { StudCoursesModule } from './stud_courses/stud_courses.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from './students/student.entity';
import { Address } from './address/address.entity';
import { Course } from './courses/course.entity';
import { Student_Courses } from './Stud_Courses/stud_cor.entity';

@Module({
  imports: [StudentsModule, AddressModule,  CoursesModule, StudCoursesModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Sneha1415',
    database: 'Student_data',
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
    entities: [Student,Address,Course,Student_Courses],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
