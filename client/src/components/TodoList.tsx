import {
  Box,
  Checkbox,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';
import { format } from 'date-fns';
import { Todo } from 'src/modules/todo/domain/Todo';
import { MarkTodoAsCompleted } from 'src/modules/todo/domain/application/MarkTodoAsCompleted';
import { MarkCompletedTodoAsNotCompleted } from 'src/modules/todo/domain/application/MarkCompletedTodoAsNotCompleted';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';

type TodoListProps = {
  todoList: Todo[];
  markTodoAsCompleted: MarkTodoAsCompleted;
  markCompletedTodoAsNotComplete: MarkCompletedTodoAsNotCompleted;
  todoRepository: ITodoRepository;
};

export const TodoList = ({
  todoList,
  markTodoAsCompleted,
  markCompletedTodoAsNotComplete,
  todoRepository,
}: TodoListProps) => {
  return (
    <ScrollArea.Autosize w="60%" mah={700}>
      {todoList.map((todo) => (
        <Box key={todo.id} p="xs" pr="lg">
          <Group wrap="nowrap" align="flex-start">
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
                <Checkbox.Indicator mt="sm" ml="sm" />
                <Stack p="xs" align="stretch" gap="xs">
                  <Title order={4}>{todo.title}</Title>
                  <Text size="sm">{`Created At: ${format(todo.createdAt, 'M/d/yyyy h:m aaa')}`}</Text>
                  <Text size="sm">{`Completed At: ${todo.completedAt ? format(todo.completedAt, 'M/d/yyyy h:m aaa') : 'N/A'}`}</Text>
                </Stack>
              </Group>
            </Checkbox.Card>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <IconDots />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Todo Options</Menu.Label>
                <Menu.Item
                  color="red"
                  leftSection={
                    <IconTrash style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() => todoRepository.delete(todo.id)}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
      ))}
    </ScrollArea.Autosize>
  );
};
