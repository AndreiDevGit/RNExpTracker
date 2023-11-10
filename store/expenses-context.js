import { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'test hardcodet data',
    amount: 59.99,
    date: new Date('2023-04-25'),
  },
  {
    id: 'e2',
    description: 'input data 2',
    amount: 99.99,
    date: new Date('2023-04-23'),
  },
  {
    id: 'e3',
    description: 'input data 3',
    amount: 109.99,
    date: new Date('2021-12-21'),
  },
  {
    id: 'e4',
    description: 'input data 4',
    amount: 19.99,
    date: new Date('2021-12-22'),
  },
  {
    id: 'e5',
    description: 'input data 5',
    amount: 99.99,
    date: new Date('2021-12-20'),
  },
  {
    id: 'e6',
    description: 'input data 6',
    amount: 109.99,
    date: new Date('2021-12-21'),
  },
  {
    id: 'e7',
    description: 'input data 7',
    amount: 19.99,
    date: new Date('2021-12-22'),
  },
  {
    id: 'e8',
    description: 'input data 9',
    amount: 19.99,
    date: new Date('2021-12-22'),
  },
  {
    id: 'e9',
    description: 'input data 9',
    amount: 99.99,
    date: new Date('2021-12-20'),
  },
  {
    id: 'e10',
    description: 'input data 10',
    amount: 109.99,
    date: new Date('2021-12-21'),
  },
  {
    id: 'e11',
    description: 'input data 11',
    amount: 19.99,
    date: new Date('2021-12-22'),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})
function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatableExpense[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense !== action.payload)
    default:
      return state
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  function addExpense({ expenseData }) {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
