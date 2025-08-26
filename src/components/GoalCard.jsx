import { useState } from 'react'
import './GoalCard.css'

function GoalCard({ goal, onDeposit, onDelete, onUpdate }) {
  const [showDepositForm, setShowDepositForm] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')

  // calculate the percentage of progress
  const progressPercentage = Math.round((goal.savedAmount / goal.targetAmount) * 100)
  const remainingAmount = goal.targetAmount - goal.savedAmount
  
  // Calculate days until deadline
  const today = new Date()
  const deadline = new Date(goal.deadline)
  const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
  
  // Determine status
  const isCompleted = goal.savedAmount >= goal.targetAmount
  const isOverdue = daysRemaining < 0 && !isCompleted

  const handleDeposit = async (e) => {
    e.preventDefault()
    const amount = parseFloat(depositAmount)
    
    if (amount > 0) {
      await onDeposit(goal.id, amount)
      setDepositAmount('')
      setShowDepositForm(false)
    }
  }

  return (
    <div className="goal-card">
      {/* Goal Header */}
      <div className="goal-header">
        <h3 className="goal-name">{goal.name}</h3>
        <span className="goal-category">{goal.category}</span>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="amount-info">
          <div className="saved-amount">
            <span className="label">Saved</span>
            <span className="amount">Ksh {goal.savedAmount.toLocaleString()}</span>
          </div>
          <div className="target-amount">
            <span className="label">Target</span>
            <span className="amount">Ksh {goal.targetAmount.toLocaleString()}</span>
          </div>
        </div>
        
        {/* Progress Percentage Only */}
        <div className="progress-text">
          {progressPercentage}% complete
        </div>
      </div>

      {/* Status Section */}
      <div className="status-section">
        {isCompleted ? (
          <div className="status completed">Goal Completed!</div>
        ) : (
          <>
            <div className="remaining">
              <span className="label">Remaining:</span>
              <span className="amount">Ksh {remainingAmount.toLocaleString()}</span>
            </div>
            <div className={`deadline ${isOverdue ? 'overdue' : ''}`}>
              {isOverdue ? (
                <span>{Math.abs(daysRemaining)} days overdue</span>
              ) : (
                <span>{daysRemaining} days left</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* Actions Section */}
      <div className="actions-section">
        {!isCompleted && (
          <>
            {!showDepositForm ? (
              <button 
                className="btn btn-primary"
                onClick={() => setShowDepositForm(true)}
              >
                Make Deposit
              </button>
            ) : (
              <form onSubmit={handleDeposit} className="deposit-form">
                <input
                  type="number"
                  placeholder="Amount"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                />
                <div className="deposit-actions">
                  <button type="submit" className="btn btn-sm btn-success">
                    Add
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-secondary"
                    onClick={() => {
                      setShowDepositForm(false)
                      setDepositAmount('')
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </>
        )}
        
        <button 
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(goal.id)}
        >
          Delete
        </button>
      </div>

      {/* gooal data */}
      <div className="goal-meta">
        <small>Created: {new Date(goal.createdAt).toLocaleDateString()}</small>
        <small>Deadline: {new Date(goal.deadline).toLocaleDateString()}</small>
      </div>
    </div>
  )
}

export default GoalCard
