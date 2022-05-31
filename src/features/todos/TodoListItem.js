import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPenSquare } from '@fortawesome/free-solid-svg-icons'

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId)
}

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id))
  const [show, setShow] = useState(false)
  const [newText, setNewText] = useState('')
  const dispatch = useDispatch()

  const { text, completed, color } = todo

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: todo.id })
  }
  const handleColorChanged = (e) => {
    const color = e.target.value
    dispatch({
      type: 'todos/colorSelected',
      payload: { todoId: todo.id, color },
    })
  }
  const onDelete = () => {
    dispatch({ type: 'todos/todoDeleted', payload: todo.id })
  }

  const onUpdate = (e) => {
    e.preventDefault()
    dispatch({ type: 'todos/todoUpdated', payload: { newText, id: todo.id } })
    handleClose()
  }
  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))
  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
            style={{ cursor: 'pointer' }}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color, cursor: 'pointer' }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleShow}>
            <FontAwesomeIcon icon={faPenSquare} />
          </button>
          <button className="destroy" onClick={onDelete}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={onUpdate}>
            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              onChange={(e) => setNewText(e.target.value)}
            >
              <Form.Label>Change content</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </li>
  )
}

export default TodoListItem
