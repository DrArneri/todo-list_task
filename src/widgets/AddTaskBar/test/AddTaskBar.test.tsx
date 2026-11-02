import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddTaskBar from '../ui/AddTaskBar'
import type { TaskStore } from '../../../store/TaskStore'

vi.mock('../../../store/TaskStore')

describe('AddTaskBar', () => {
  const mockAddTask = vi.fn()

  beforeEach(async () => {
    vi.clearAllMocks()
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [],
      addTask: mockAddTask,
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: vi.fn(),
    })
  })

  it('должен рендериться с input и кнопкой', () => {
    render(<AddTaskBar />)
    expect(screen.getByPlaceholderText('New task title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('должен добавлять задачу при вводе текста и клике на кнопку', async () => {
    const user = userEvent.setup()
    render(<AddTaskBar />)

    const input = screen.getByPlaceholderText('New task title')
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Новая задача')
    await user.click(button)

    expect(mockAddTask).toHaveBeenCalledWith({
      id: 1,
      title: 'Новая задача',
      isDone: false,
    })
  })

  it('не должен добавлять пустую задачу', async () => {
    const user = userEvent.setup()
    render(<AddTaskBar />)

    const button = screen.getByRole('button', { name: /add/i })
    await user.click(button)

    expect(mockAddTask).not.toHaveBeenCalled()
  })

  it('не должен добавлять задачу из одних пробелов', async () => {
    const user = userEvent.setup()
    render(<AddTaskBar />)

    const input = screen.getByPlaceholderText('New task title')
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, '   ')
    await user.click(button)

    expect(mockAddTask).not.toHaveBeenCalled()
  })

  it('должен очищать input после успешного добавления задачи', async () => {
    const user = userEvent.setup()
    render(<AddTaskBar />)

    const input = screen.getByPlaceholderText('New task title') as HTMLInputElement
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Тестовая задача')
    await user.click(button)

    expect(input.value).toBe('')
  })

  it('должен корректно генерировать id на основе длины массива tasks', async () => {
    const { useTask } = await import('../../../store/TaskStore')
    vi.mocked(useTask).mockReturnValue({
      tasks: [
        { id: 1, title: 'Задача 1', isDone: false },
        { id: 2, title: 'Задача 2', isDone: false },
      ],
      addTask: mockAddTask,
      deleteTask: vi.fn(),
      toggleComplete: vi.fn(),
      deleteAllTasks: vi.fn(),
    })

    const user = userEvent.setup()
    render(<AddTaskBar />)

    const input = screen.getByPlaceholderText('New task title')
    const button = screen.getByRole('button', { name: /add/i })

    await user.type(input, 'Задача 3')
    await user.click(button)

    expect(mockAddTask).toHaveBeenCalledWith({
      id: 3,
      title: 'Задача 3',
      isDone: false,
    })
  })

  it('должен обновлять значение input при вводе', async () => {
    const user = userEvent.setup()
    render(<AddTaskBar />)

    const input = screen.getByPlaceholderText('New task title') as HTMLInputElement

    await user.type(input, 'Текст задачи')

    expect(input.value).toBe('Текст задачи')
  })
})
