"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const address_module_1 = require("./address/address.module");
const students_module_1 = require("./students/students.module");
const courses_module_1 = require("./courses/courses.module");
const stud_courses_module_1 = require("./stud_courses/stud_courses.module");
const typeorm_1 = require("@nestjs/typeorm");
const student_entity_1 = require("./students/student.entity");
const address_entity_1 = require("./address/address.entity");
const course_entity_1 = require("./courses/course.entity");
const stud_cor_entity_1 = require("./Stud_Courses/stud_cor.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [students_module_1.StudentsModule, address_module_1.AddressModule, courses_module_1.CoursesModule, stud_courses_module_1.StudCoursesModule, typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'Sneha1415',
                database: 'Student_data',
                synchronize: true,
                logging: true,
                autoLoadEntities: true,
                entities: [student_entity_1.Student, address_entity_1.Address, course_entity_1.Course, stud_cor_entity_1.Student_Courses],
            })],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map