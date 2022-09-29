import { Test, TestingModule } from '@nestjs/testing';
import { StudCoursesService } from './stud_courses.service';

describe('StudCoursesService', () => {
  let service: StudCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudCoursesService],
    }).compile();

    service = module.get<StudCoursesService>(StudCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
