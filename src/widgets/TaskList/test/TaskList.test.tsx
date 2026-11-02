import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TaskList from '../ui/TaskList'
import type { TaskStore } from '../../../store/TaskStore'

vi.mock('../../../store/TaskStore')
vi.mock('../../../entity/Task/ui/Task', () => ({
  default: ({ id, title, completed }: { id: string; title: string; completed: boolean }) => (
    <div data-testid={`task-${id}`}>
      {title} - {completed ? 'выполнена' : 'активна'}
    </div>
  ),
}))

describe('TaskList', () => {
  const mockDeleteAllTasks = vi.fn()

  beforeEach(async () => {
    vi.clearAllMocks()
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })
  })

  it('должен рендериться с заголовком "Total Tasks"', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByText(/Total Tasks:/i)).toBeInTheDocument()
  })

  it('должен отображать правильное количество задач', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [
        { id: '1', title: 'Задача 1', isDone: false },
        { id: '2', title: 'Задача 2', isDone: true },
      ],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByText('Total Tasks: 2')).toBeInTheDocument()
  })

  it('должен отображать кнопку "Delete All"', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByText('Delete All')).toBeInTheDocument()
  })

  it('должен рендерить список задач', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [
        { id: '1', title: 'Задача 1', isDone: false },
        { id: '2', title: 'Задача 2', isDone: true },
        { id: '3', title: 'Задача 3', isDone: false },
      ],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByTestId('task-1')).toBeInTheDocument()
    expect(screen.getByTestId('task-2')).toBeInTheDocument()
    expect(screen.getByTestId('task-3')).toBeInTheDocument()
  })

  it('должен отображать пустой список когда нет задач', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByText('Total Tasks: 0')).toBeInTheDocument()
    expect(screen.queryByTestId(/task-/)).not.toBeInTheDocument()
  })

  it('должен вызывать deleteAllTasks при клике на "Delete All"', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [{ id: '1', title: 'Задача 1', isDone: false }],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    const user = userEvent.setup()
    render(<TaskList />)
    const deleteButton = screen.getByText('Delete All')
    await user.click(deleteButton)

    expect(mockDeleteAllTasks).toHaveBeenCalledTimes(1)
  })

  it('должен передавать правильные props в компонент Task', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [
        { id: '10', title: 'Тестовая задача', isDone: true },
      ],
      addTask: vi.fn(),
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: mockDeleteAllTasks,
    })

    render(<TaskList />)
    expect(screen.getByText('Тестовая задача - выполнена')).toBeInTheDocument()
  })
})
