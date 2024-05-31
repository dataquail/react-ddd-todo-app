import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';

export class MarkTodoAsCompleted {
  constructor(private readonly todoRepository: ITodoRepository) {}

  public execute(todoId: string): void {
    const todoToComplete = this.todoRepository.getOneById(todoId);

    if (!todoToComplete) {
      throw new Error(`Todo with id ${todoId} not found`);
    }

    this.todoRepository.save(todoToComplete.complete());

    return;
  }
}
