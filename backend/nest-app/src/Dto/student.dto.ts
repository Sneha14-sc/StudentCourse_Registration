
import addressDto from './address.dto';
import studCourseDto from './stud_course.dto';

export default class studentDto {
    student_id: number;
    fname: string;
    lname: string;
    gender: string;
    age: number;
    contact_no: number;
    address: addressDto;
    stud_cours: studCourseDto[];
  }