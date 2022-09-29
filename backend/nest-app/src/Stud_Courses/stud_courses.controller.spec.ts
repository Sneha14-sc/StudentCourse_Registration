import { Test, TestingModule } from '@nestjs/testing';
import { StudCoursesController } from './stud_courses.controller';

describe('StudCoursesController', () => {
  let controller: StudCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudCoursesController],
    }).compile();

    controller = module.get<StudCoursesController>(StudCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
