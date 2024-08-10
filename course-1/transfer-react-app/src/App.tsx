import './App.css'
import { AppBar } from './components/AppBar'
import { Form } from './components/Form'
import { WalletContextProvider } from './components/WalletContextProvider'

function App() {

  return (
      <div className='h-screen w-full flex justify-center items-center'>
        <WalletContextProvider>
          <AppBar />
          <Form />
        </WalletContextProvider>
      </div>
    
  )
}

export default App
