import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';

export class MarkCompletedTodoAsNotCompleted {
  constructor(private readonly todoRepository: ITodoRepository) {}

  public execute(todoId: string): void {
    const todoToMarkAsNotComplete = this.todoRepository.getOneById(todoId);

    if (!todoToMarkAsNotComplete) {
      throw new Error(`Todo with id ${todoId} not found`);
    }

    this.todoRepository.update(todoToMarkAsNotComplete.incomplete());

    return;
  }
}
