import { useEffect, useState } from 'react'
import './style.css'
import Coordinate from './dto/coordinate'

function Canvas(this: any) {
    const canvas = React.useRef()

    const [canvasSize, setCanvasSize] = useState({
        canvasWidth: 800,
        canvasHeight: 600,
    })
    const [hexSize, setHexSize] = useState(20)

    useEffect(() => {
        const context = canvas.current.getContext('2d')

        const { canvasWidth, canvasHeight } = canvasSize
        const canvasHex: any = {}
        canvasHex.width = canvasWidth
        canvasHex.height = canvasHeight
        drawHex(canvasHex, { x: 50, y: 50 })
    }, [])

    const getHexCornerCoord = (center: Coordinate, i: number) => {
        let angle_deg = 60 * i + 30
        let angle_rad = (Math.PI / 180) * angle_deg
        let x = center.x + hexSize * Math.cos(angle_rad)
        let y = center.y + hexSize * Math.sin(angle_rad)
        return Point(x, y)
    }

    const drawHex = (canvasID, center: Coordinate) => {
        for (let i = 0; i <= 5; i++) {
            let start = this.getHexCornerCoord(center, i)
            let end = this.getHexCornerCoord(center, i + 1)
            drawLine(
                canvasID,
                { x: start.x, y: start.y },
                { x: end.x, y: end.y }
            )
        }
    }

    const drawLine = (canvasID: string, start: Coordinate, end: Coordinate) => {
        const ctx = canvasID.getContext('2D')

        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        ctx.closePath()
    }

    const Point = (x: number, y: number) => {
        return { x: x, y: y }
    }

    return (
        <div>
            <canvas ref={(canvasHex) => (this.canvasHex = canvasHex)}> </canvas>
        </div>
    )
}

export default Canvas
