import "./styles.css"
import { useState } from "react"

export default function App()
{
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  function handleSubmit(e)
  {
    e.preventDefault()
    setItems(current =>
    {
      return [...current, {
        id: Date.now(),
        title: newItem,
        completed: false
      }]
    })
    setNewItem('')
  }

  function handleToggle(id)
  {
    setItems(current =>
    {
      return current.map(item =>
      {
        if (item.id !== id) return item
        return { ...item, completed: !item.completed }
      })
    })
  }


  function handleDelete(id)
  {
    setItems(current =>
    {
      return current.filter(item => item.id !== id)
    })
  }

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input value={newItem} onChange={e => setNewItem(e.target.value)} type="text" id="item" />
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">Todo List</h1>
      <ul className="list">
        {items.length === 0 && <b><i>No Items</i></b>}

        {items.map(item =>
        {
          return (<li key={item.id} >
            <label>
              <input type="checkbox" checked={item.completed} onChange={e => handleToggle(item.id)} />
              <span>{item.title}</span>
            </label>
            <button className="btn btn-danger" onClick={e => handleDelete(item.id)}>Delete</button>
          </li>)
        })}
      </ul>
    </>
  )
}
