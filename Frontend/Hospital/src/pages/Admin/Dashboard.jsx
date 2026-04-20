import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar.jsx'
import Sidebar from '../../components/Sidebar.jsx'
import api from '../../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    bills: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [doctors, patients, appointments, bills] = await Promise.all([
          api.get('/all-doctor'),
          api.get('/all-patient'),
          api.get('/all-appointment'),
          api.get('/all-bill'),
        ])

        setStats({
          doctors: doctors.data.data.length,
          patients: patients.data.data.length,
          appointments: appointments.data.data.length,
          bills: bills.data.data.length,
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Doctors', value: stats.doctors, color: 'primary', icon: '👨‍⚕️' },
    { label: 'Total Patients', value: stats.patients, color: 'success', icon: '🤒' },
    { label: 'Total Appointments', value: stats.appointments, color: 'warning', icon: '📅' },
    { label: 'Total Bills', value: stats.bills, color: 'danger', icon: '💰' },
  ]

  return (
    <>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <div className="p-4 w-100">

          <h4 className="mb-4">📊 Admin Dashboard</h4>

          {loading ? (
            <div className="d-flex justify-content-center mt-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : (
            <div className="row g-4">
              {cards.map((card) => (
                <div className="col-md-3" key={card.label}>
                  <div className={`card border-${card.color} shadow-sm`}>
                    <div className="card-body text-center">
                      <div style={{ fontSize: '2rem' }}>{card.icon}</div>
                      <h2 className={`text-${card.color} fw-bold`}>{card.value}</h2>
                      <p className="text-muted mb-0">{card.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Dashboard