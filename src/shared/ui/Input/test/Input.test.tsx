import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from '../ui/Input'

describe('Input', () => {
  it('должен рендериться с placeholder', () => {
    render(<Input placeholder="Введите текст" />)
    expect(screen.getByPlaceholderText('Введите текст')).toBeInTheDocument()
  })

  it('должен вызывать onChange при вводе текста', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input placeholder="Тест" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Тест')
    await user.type(input, 'Hello')

    expect(handleChange).toHaveBeenCalled()
  })

  it('должен отображать переданное значение', () => {
    render(<Input value="Тестовое значение" onChange={() => {}} />)
    const input = screen.getByDisplayValue('Тестовое значение')
    expect(input).toBeInTheDocument()
  })

  it('должен рендерить дочерние элементы (иконку)', () => {
    render(
      <Input placeholder="Search">
        <img src="/search.svg" alt="Search icon" />
      </Input>
    )
    expect(screen.getByAltText('Search icon')).toBeInTheDocument()
  })

  it('должен применять правильные классы с children', () => {
    const { container } = render(
      <Input placeholder="Test">
        <span>Icon</span>
      </Input>
    )
    const wrapper = container.querySelector('.relative')
    expect(wrapper).toBeInTheDocument()
  })

  it('должен применять правильные классы без children', () => {
    const { container } = render(<Input placeholder="Test" />)
    const input = container.querySelector('input')
    expect(input).not.toHaveClass('relative')
  })

  it('должен быть disabled когда передан атрибут', () => {
    render(<Input placeholder="Disabled input" disabled />)
    expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled()
  })

  it('должен иметь правильный type', () => {
    render(<Input type="password" placeholder="Password" />)
    const input = screen.getByPlaceholderText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })
})
