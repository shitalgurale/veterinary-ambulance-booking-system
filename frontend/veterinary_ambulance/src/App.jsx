import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box, Container, Paper } from '@mui/material'

import Pets from './components/Pets/Pets'
import Owners from './components/Owners/Owners'
import Appointments from './components/Appointments/Appointments'
import Vets from './components/Vets/Vets'
import NavigationHeader from './components/NavigationHeader/NavigationHeader'

function App() {
  return (
    <Router>
      {/* MAIN APP BACKGROUND */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e3f2fd, #f5f7fa)',
          paddingBottom: 4,
        }}
      >
        {/* HEADER */}
        <NavigationHeader />

        {/* MAIN CONTENT WRAPPER */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper
            elevation={4}
            sx={{
              borderRadius: 4,
              p: 3,
              backgroundColor: '#ffffff',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              },
            }}
          >
            <Routes>
              <Route path="/" element={<Pets />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/vets" element={<Vets />} />
              <Route path="/owners" element={<Owners />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </Paper>
        </Container>
      </Box>
    </Router>
  )
}

export default App