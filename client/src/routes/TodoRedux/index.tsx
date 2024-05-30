import { Container, Divider, Group, Space, Title } from '@mantine/core';
import { TodoList } from 'src/components/TodoList';
import { AddNewTodoForm } from 'src/components/AddNewTodoForm';
import { redux as useTodoRepository } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DI';
import { redux as useTodoRepositoryReactive } from 'src/modules/todo/infrastructure/repositories/TodoRepository/DIReactive';
import { redux as useMarkTodoAsCompleted } from 'src/modules/todo/domain/application/MarkTodoAsCompleted/DI';
import { redux as useMarkCompletedTodoAsNotComplete } from 'src/modules/todo/domain/application/MarkCompletedTodoAsNotCompleted/DI';
import { PageContainer } from 'src/components/PageContainer';
import { NavBar } from 'src/components/NavBar';
import { PageContent } from 'src/components/PageContent';

export const TodoRedux = () => {
  const todoRepository = useTodoRepository();
  const todoList = useTodoRepositoryReactive().useGetAll();
  const markTodoAsCompleted = useMarkTodoAsCompleted();
  const markCompletedTodoAsNotComplete = useMarkCompletedTodoAsNotComplete();

  return (
    <PageContainer>
      <NavBar />
      <Divider />
      <Space h="xl" />
      <PageContent>
        <Container>
          <Group justify="space-between" align="start">
            <Title order={1}>Todo List</Title>
            <AddNewTodoForm todoRepository={todoRepository} />
          </Group>
          <TodoList
            todoList={todoList}
            markTodoAsCompleted={markTodoAsCompleted}
            markCompletedTodoAsNotComplete={markCompletedTodoAsNotComplete}
            todoRepository={todoRepository}
          />
        </Container>
      </PageContent>
    </PageContainer>
  );
};
