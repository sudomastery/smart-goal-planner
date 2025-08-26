import { useState } from 'react'
import './GoalForm.css'

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  })

  const categories = [
    'Travel', 'Car', 'Electronics'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newGoal = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    await onAddGoal(newGoal)
    
    // reset form
    setFormData({
      name: '',
      targetAmount: '',
      category: '',
      deadline: ''
    })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // set so that user cannot select a past date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="goal-form-container">
      <div className="form-header">
        <h2>Add New Goal</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="name">Goal Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter financial goal...."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount (Ksh) *</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="0.00"
            min="1"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="deadline">Target Deadline *</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={today}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            Create Goal
          </button>
        </div>
      </form>
    </div>
  )
}

export default GoalForm
