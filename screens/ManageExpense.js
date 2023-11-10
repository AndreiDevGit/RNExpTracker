import { useContext, useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constans/styles'
import Button from '../components/UI/Button'
import { ExpensesContext } from '../store/expenses-context'

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId)

    console.log(editedExpenseId)

    navigation.goBack()
  }
  function cancelHandler() {
    navigation.goBack()
  }

  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, {
        description: 'HARDCODE_UPDATE',
        amount: 67.88,
        date: new Date('2023-04-27'),
      })
    } else {
      expensesCtx.addExpense({
        description: 'HARDCODE_ADD',
        amount: 188.77,
        date: new Date('2023-04-28'),
      })
    }
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          mode={'flat'}
          onPress={cancelHandler}
        >
          Cancel
        </Button>
        <Button
          style={styles.button}
          onPress={confirmHandler}
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      <View style={styles.deleteContainer}>
        {isEditing && (
          <IconButton
            icon={'trash'}
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        )}
      </View>
    </View>
  )
}
export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
