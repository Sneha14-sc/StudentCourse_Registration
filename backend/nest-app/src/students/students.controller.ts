import { Controller } from '@nestjs/common';
import { Get, Post,Put, Delete, Body, Param } from  '@nestjs/common';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { Broker } from '../rmq/broker';
import studentDto from '../Dto/student.dto';
import ResponseModel from '../Dto/responseModel';

@Controller('students')
export class StudentsController {
    private broker = Broker.getInstance();
  //Topics We need for the controller
  private topicArray = ['STUDENT_ADD', 'STUDENT_UPDATE', 'STUDENT_DELETE'];
  private serviceName = ['IOT_SERVICE', 'IOT_SERVICE', 'IOT_SERVICE'];

  constructor(private studentsService: StudentsService) {
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
            let responseModelwithDto: ResponseModel<studentDto>;
            try {
              //to check what user has requested to perform and select the case accordingly
              switch (value) {
                case 'STUDENT_ADD':
                  this.studentsService.createStudent(result.message);
                  break;
                case 'STUDENT_UPDATE':
                  var uid = result.message[0];
                  this.studentsService.updateStudent(uid,result.message[1]);
                  break;
                case 'STUDENT_DELETE':
                  var id = result.message;
                  this.studentsService.deleteStudent(id);
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
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }
}
