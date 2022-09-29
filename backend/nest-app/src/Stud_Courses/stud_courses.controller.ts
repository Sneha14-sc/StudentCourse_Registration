import { Controller } from '@nestjs/common';
import { Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Student_Courses } from './stud_cor.entity';
import {StudCoursesService} from './stud_courses.service';
import { Broker } from '../rmq/broker';
import studCourseDto from '../Dto/course.dto';
import ResponseModel from '../Dto/responseModel';

@Controller('stud-courses')
export class StudCoursesController {
  private broker = Broker.getInstance();
  //Topics We need for the controller
  private topicArray = ['STUD_COURSE_ADD', 'STUD_COURSE_UPDATE', 'STUD_COURSE_DELETE'];
  private serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];

  constructor(private studCorService: StudCoursesService) {
    this.module_init();
  }

  async module_init() {
    for (var i = 0; i < this.topicArray.length; i++) {
      this.broker.listenToService(
        this.topicArray[i],
        this.serviceName[i],
        (() => {
          var value = this.topicArray[i];
          return async (result) => {
           // dto used to define how the data will be sent over network using typescript
            let responseModelwithDto: ResponseModel<studCourseDto>;
            try {
              //to check what user has requested to perform and select the case accordingly
              switch (value) {
                case 'STUD_COURSE_ADD':
                  this.studCorService.createStud_cor(result.message);
                  break;
                case 'STUD_COURSE_UPDATE':
                  var uid = result.message.id;
                  this.studCorService.updateStud_cor(uid, result.message);
                  break;
                case 'STUD_COURSE_DELETE':
                  var id = result.message;
                  this.studCorService.deleteStud_cor(id);
                  break;
              }
              responseModelwithDto = result;
              // borker
              for (var i = 0; i < result.OnSuccessTopicsToPush.length; i++) {
                const topicName = result.OnSuccessTopicsToPush[i];
                this.broker.PublicMessageToTopic(
                  topicName,
                  responseModelwithDto,
                );
              }
            } catch (error) {
              console.log('Error Occured while listening to queues');
              console.log(error, result);
              for (var i = 0; i < result.OnFailureTopicsToPush.length; i++) {
                const topicName = result.OnFailureTopicsToPush[i];
                this.broker.PublicMessageToTopic(
                  topicName,
                  responseModelwithDto,
                );
              }
            }
          };
        })(),
      );
    }
  }
    //add, update and delete done using rabbitMq but not get.
    @Get()
    findAll(): Promise<Student_Courses[]> {
      return this.studCorService.findAll();
    }
}
