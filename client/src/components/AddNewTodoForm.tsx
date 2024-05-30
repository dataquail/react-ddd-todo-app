import { Button, Divider, Group, Space, TextInput } from '@mantine/core';
import { hasLength, useForm } from '@mantine/form';
import { Todo } from 'src/modules/todo/domain/Todo';
import { ITodoRepository } from 'src/modules/todo/domain/repositories/ITodoRepository';

type AddNewTodoFormProps = {
  todoRepository: ITodoRepository;
};

export const AddNewTodoForm = ({ todoRepository }: AddNewTodoFormProps) => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
    },
    validate: {
      title: hasLength({ min: 1 }, 'Must be at least 1 character long'),
    },
  });

  return (
    <>
      <form
        onSubmit={form.onSubmit((values) => {
          todoRepository.create(Todo.create(values.title));
          form.setFieldValue('title', '');
        })}
      >
        <TextInput
          key={form.key('title')}
          label="Todo Title"
          placeholder="Enter your todo"
          {...form.getInputProps('title')}
        />
        <Space h="lg" />
        <Divider my="md" />
        <Space h="lg" />
        <Group justify="space-between" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};
