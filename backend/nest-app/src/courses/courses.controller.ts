import { Controller } from '@nestjs/common';
import { Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Course } from './course.entity';
import { CoursesService } from './courses.service';
import { Broker } from '../rmq/broker';
import courseDto from '../Dto/course.dto';
import ResponseModel from '../Dto/responseModel';

@Controller('courses')
export class CoursesController {
    private broker = Broker.getInstance();
    //Topics We need for the controller
    private topicArray = ['COURSE_ADD', 'COURSE_UPDATE', 'COURSE_DELETE'];
    private serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];
  
    constructor(private coursesService: CoursesService) {
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
              let responseModelwithDto: ResponseModel<courseDto>;
              try {
                //to check what user has requested to perform and select the case accordingly
                switch (value) {
                  case 'COURSE_ADD':
                    this.coursesService.createCourse(result.message);
                    break;
                  case 'COURSE_UPDATE':
                    this.coursesService.updateCourse( result.message);
                    break;
                  case 'COURSE_DELETE':
                    var id = result.message;
                    this.coursesService.deleteCourse(id);
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
    findAll(): Promise<Course[]> {
      return this.coursesService.findAll();
    }
}
