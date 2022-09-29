import courseDto from "./course.dto";
import studentDto from "./student.dto";


export default class studCourseDto {
    stud_course_id: number;
    student_ids: number;
    course_ids: number;
    fees: number;
    student: studentDto;
    course:courseDto;
}