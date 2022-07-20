import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Canvas from './components/canvas'

const container = document.getElementById('root') as HTMLElement

const root = createRoot(container)

root.render(
    <StrictMode>
        <Canvas />
    </StrictMode>
)
