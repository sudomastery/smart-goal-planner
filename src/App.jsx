import { useState, useEffect } from 'react'
import './App.css'
import GoalCard from './components/GoalCard'
import GoalForm from './components/GoalForm'

function App() {
  // store goals in state
  const [goals, setGoals] = useState([])
  // State for loading indicator
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    fetchGoals()
  }, [])

  // Function to fetch goals from the API
  const fetchGoals = async () => {
    try {
      const response = await fetch('http://localhost:3000/goals')
      const data = await response.json()
      setGoals(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching goals:', error)
      setLoading(false)
    }
  }

  // Function to add a new goal
  const handleAddGoal = async (goalData) => {
    try {
      const response = await fetch('http://localhost:3000/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData)
      })

      if (response.ok) {
        const newGoal = await response.json()
        setGoals([...goals, newGoal])
      }
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  // make a deposit to a goal
  const handleDeposit = async (goalId, amount) => {
    try {
      // find the goal to update
      const goal = goals.find(g => g.id === goalId)
      const newSavedAmount = goal.savedAmount + amount

      // UPDATE on the server
      const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          savedAmount: newSavedAmount
        })
      })

      if (response.ok) {
        // Update local state
        setGoals(goals.map(g => 
          g.id === goalId 
            ? { ...g, savedAmount: newSavedAmount }
            : g
        ))
      }
    } catch (error) {
      console.error('Error making deposit:', error)
    }
  }

  // Function to delete a goal
  const handleDelete = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        const response = await fetch(`http://localhost:3000/goals/${goalId}`, {
          method: 'DELETE'
        })

        if (response.ok) {
          // Remove from local state
          setGoals(goals.filter(g => g.id !== goalId))
        }
      } catch (error) {
        console.error('Error deleting goal:', error)
      }
    }
  }

  // Calculate overview statistics
  const totalGoals = goals.length
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0)
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0)

  if (loading) {
    return <div className="loading">Loading your goals...</div>
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Smart Goal Planner</h1>
        <p>Set your goals below</p>
      </header>
      
      <main className="app-main">
        {/* Add Goal Form - Always visible */}
        <GoalForm onAddGoal={handleAddGoal} />
        
        {/* Overview Stats */}
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-number">{totalGoals}</div>
            <div className="stat-label">Total Goals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Ksh {totalSaved.toLocaleString()}</div>
            <div className="stat-label">Total Saved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{completedGoals}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">Ksh {totalTarget.toLocaleString()}</div>
            <div className="stat-label">Total Target</div>
          </div>
        </div>
        
        {/* Goals Grid */}
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal}
              onDeposit={handleDeposit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {goals.length === 0 && (
          <div className="empty-state">
            <h3>No goals yet!</h3>
            <p>Add your goals</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
