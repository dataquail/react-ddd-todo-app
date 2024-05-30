import { Box, Checkbox, Group, Text } from '@mantine/core';
import { Todo } from 'src/modules/todo/domain/Todo';
import { MarkTodoAsCompleted } from 'src/modules/todo/domain/application/MarkTodoAsCompleted';
import { MarkCompletedTodoAsNotCompleted } from 'src/modules/todo/domain/application/MarkCompletedTodoAsNotCompleted';

type TodoListProps = {
  todoList: Todo[];
  markTodoAsCompleted: MarkTodoAsCompleted;
  markCompletedTodoAsNotComplete: MarkCompletedTodoAsNotCompleted;
};

export const TodoList = ({
  todoList,
  markTodoAsCompleted,
  markCompletedTodoAsNotComplete,
}: TodoListProps) => {
  return (
    <Box>
      {todoList.map((todo) => (
        <Box key={todo.id}>
          <Checkbox.Card
            radius="md"
            checked={Boolean(todo.completedAt)}
            onClick={() => {
              const isCompleted = Boolean(todo.completedAt);
              if (isCompleted) {
                markCompletedTodoAsNotComplete.execute(todo.id);
              } else {
                markTodoAsCompleted.execute(todo.id);
              }
            }}
          >
            <Group wrap="nowrap" align="flex-start">
              <Checkbox.Indicator />
              <div>
                <Text>{todo.title}</Text>
                <Text>{`Created At: ${todo.createdAt}`}</Text>
                {todo.completedAt && (
                  <Text>{`Completed At: ${todo.completedAt}`}</Text>
                )}
              </div>
            </Group>
          </Checkbox.Card>
        </Box>
      ))}
    </Box>
  );
};
