import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Prisma } from '@prisma/client';

type statusPayload = {
  userid: string;
  status: string;
};

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('health')
  checkHealth() {
    return this.todosService.getInfo();
  }

  @Post()
  create(@Body() createTodoDto: Prisma.TodosCreateInput) {
    return this.todosService.create(createTodoDto);
  }

  @Get(':todoid')
  findOneTodo(@Param('todoid') todoid: string) {
    return this.todosService.findOne(todoid);
  }

  @Post('status')
  findAllByStatus(@Body() statusPayload: statusPayload) {
    return this.todosService.findAllByStatus(
      statusPayload.userid,
      statusPayload.status,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: Prisma.TodosUpdateInput,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}
