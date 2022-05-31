import React from 'react'
import Footer from './features/footer/Footer'
import Header from './features/header/Header'
import TodoList from './features/todos/TodoList'

function App() {
  return (
    <div className="App">
      <main>
        <section>
          <h2>Todos</h2>
          <div className="todoapp">
            <Header />
            <TodoList />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
