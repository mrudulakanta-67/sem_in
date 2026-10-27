import { useState } from 'react'
import './App.css'

const courses = [
  { name: 'Artificial Intelligence & Machine Learning', code: 'AI101', credits: 4, lecturer: 'Dr. Ananya Rao', schedule: 'Mon & Wed · 10:00 AM' },
  { name: 'Full Stack Web Development', code: 'FS101', credits: 3, lecturer: 'Prof. Kiran Patel', schedule: 'Tue & Thu · 11:30 AM' },
  { name: 'Embedded Systems', code: 'EM101', credits: 4, lecturer: 'Dr. Meera Shah', schedule: 'Fri · 9:00 AM' },
]

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark" aria-hidden="true">S</div>
      <span>Student<span className="brand-accent">Portal</span></span>
    </div>
  )
}

function Login({ onLogin }) {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!studentId.trim() || !password) {
      setError('Please enter your student ID and password to continue.')
      return
    }
    setError('')
    onLogin(studentId.trim())
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <Logo />
        <div className="login-copy">
          <p className="eyebrow">STUDENT ACCESS</p>
          <h1>Welcome back</h1>
          <p>Sign in to view your registered courses for this semester.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="student-id">Student ID</label>
          <div className="input-wrap">
            <span className="input-icon" aria-hidden="true">ID</span>
            <input
              id="student-id"
              type="text"
              placeholder="e.g. STU2024001"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
              autoComplete="username"
            />
          </div>

          <label htmlFor="password">Password</label>
          <div className="input-wrap">
            <span className="input-icon lock-icon" aria-hidden="true">●</span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="primary-button" type="submit">Sign in <span aria-hidden="true">→</span></button>
        </form>

        <p className="login-help">Need help signing in? <a href="mailto:support@studentportal.edu">Contact support</a></p>
      </section>
      <aside className="login-art" aria-label="Student portal information">
        <div className="art-circle circle-one" />
        <div className="art-circle circle-two" />
        <div className="art-content">
          <div className="art-icon">✦</div>
          <p className="eyebrow light">YOUR ACADEMIC JOURNEY</p>
          <h2>Everything you need,<br /><em>all in one place.</em></h2>
          <p>Check your schedule, stay on top of your courses, and make the most of your semester.</p>
        </div>
        <div className="art-stats">
          <div><strong>24/7</strong><span>Access</span></div>
          <div><strong>1,200+</strong><span>Students</span></div>
          <div><strong>98%</strong><span>Uptime</span></div>
        </div>
      </aside>
    </main>
  )
}

function CourseCard({ course, index }) {
  return (
    <article className="course-card">
      <div className={`course-icon course-icon-${index}`} aria-hidden="true">
        {index === 0 ? '✦' : index === 1 ? '</>' : '⌁'}
      </div>
      <div className="course-details">
        <div className="course-heading">
          <div>
            <p className="course-code">{course.code}</p>
            <h2>{course.name}</h2>
          </div>
          <span className="credits">{course.credits} credits</span>
        </div>
        <div className="course-meta">
          <span>◷ {course.schedule}</span>
          <span>◉ {course.lecturer}</span>
        </div>
      </div>
      <span className="enrolled">Enrolled</span>
    </article>
  )
}

function Dashboard({ studentId, onLogout }) {
  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <Logo />
        <div className="student-menu">
          <div className="avatar">{studentId.slice(-2).toUpperCase()}</div>
          <div className="student-name"><strong>Student</strong><span>{studentId}</span></div>
          <button className="logout-button" onClick={onLogout}>Sign out</button>
        </div>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-intro">
          <div>
            <p className="eyebrow">ACADEMIC OVERVIEW</p>
            <h1>Your registered courses</h1>
            <p className="intro-text">Here&apos;s what you&apos;re learning in the current semester.</p>
          </div>
          <div className="semester-pill"><span className="status-dot" /> Spring 2025 <span className="chevron">⌄</span></div>
        </div>

        <div className="summary-row">
          <div className="summary-card"><span className="summary-symbol">▦</span><div><strong>{courses.length}</strong><span>Registered courses</span></div></div>
          <div className="summary-card"><span className="summary-symbol">◈</span><div><strong>{courses.reduce((total, course) => total + course.credits, 0)}</strong><span>Total credits</span></div></div>
          <div className="summary-card"><span className="summary-symbol">◷</span><div><strong>Active</strong><span>Registration status</span></div></div>
        </div>

        <div className="courses-heading"><h2>Course list</h2><span>{courses.length} courses this semester</span></div>
        <div className="course-list">
          {courses.map((course, index) => <CourseCard key={course.code} course={course} index={index} />)}
        </div>
        <p className="dashboard-note">Need to make a change to your registration? <a href="mailto:registrar@studentportal.edu">Contact the registrar&apos;s office</a></p>
      </section>
    </main>
  )
}

function App() {
  const [studentId, setStudentId] = useState('')

  return studentId
    ? <Dashboard studentId={studentId} onLogout={() => setStudentId('')} />
    : <Login onLogin={setStudentId} />
}

export default App
