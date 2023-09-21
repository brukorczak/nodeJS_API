import { Controller, Get, Param, Body, Post, Delete, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './create-course.dto';
import { query } from 'express';
import { ApiOkResponse, ApiCreatedResponse} from '@nestjs/swagger';

@Controller('courses')
export class CoursesController {
    constructor (private coursesService: CoursesService){}

    /*get pega os dados */
    @Get()
    @ApiOkResponse({description: 'List of all courses'})
    async getCourses(){
        const courses = await this.coursesService.getCourses();
        return courses;
    }

    @Get(':courseId')
    @ApiOkResponse({description: 'List of 1 courses'})
    async getCourse(@Param('courseId') courseId){
        const course = await this.coursesService.getCourse(courseId);
        return course;
    }

    @Post()
    @ApiCreatedResponse({description: 'Added a Course'})
    async addCourse(@Body() createCourseDto: CreateCourseDto){
        const course = await this.coursesService.addCourse(createCourseDto);
        return course;
    }

    @Delete()
    @ApiOkResponse({description: 'Remove a courses'})
    async deleteCourse(@Query() query){
        const courses = await this.coursesService.deleteCourse(query.courseID);
        return courses;
    }
}

//localhost:3000/courses/2
//localhost:3000/courses?nome_do_parametro=valor_do_parametro
//localhost:3000/courses?courseID=2&...

//POST enviar dados para o servidor
//PATCH atualiza
//DELETE deletar algum dado
