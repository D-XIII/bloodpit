import { useEffect, useState, useRef } from 'react'
import './style.css'
import Coordinate from './dto/coordinate'
function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null)
    let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [ctx, setCtx] = useState()

    const [hexSize, setHexSize] = useState(20)
    const [canvasHex, setCanvasHex] = useState({ height: 50, width: 50 })
    const [canvasSize, setCanvasSize] = useState({
        canvasWidth: 800,
        canvasHeight: 600,
    })

    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d')
            // setCtx(canvasCtxRef.current)

            //componentWillMount()
            setCanvasSize({ canvasWidth: 800, canvasHeight: 600 })

            //componentDidMount()
            const { canvasWidth, canvasHeight } = canvasSize
            canvasHex.width = canvasWidth
            canvasHex.height = canvasHeight
            drawHex(canvasHex, { x: 50, y: 50 })
        }
    }, [])

    const drawHex = (canvasID: any, center: Coordinate) => {
        for (let i = 0; i <= 5; i++) {
            let start = getHexCornerCoord(center, i)
            let end = getHexCornerCoord(center, i + 1)
            drawLine(
                canvasID,
                { x: start.x, y: start.y },
                { x: end.x, y: end.y }
            )
        }
    }

    const getHexCornerCoord = (center: Coordinate, i: number) => {
        let angle_deg = 60 * i + 30
        let angle_rad = (Math.PI / 180) * angle_deg
        let x = center.x + hexSize * Math.cos(angle_rad)
        let y = center.y + hexSize * Math.sin(angle_rad)
        return Point(x, y)
    }

    const Point = (x: number, y: number) => {
        return { x: x, y: y }
    }

    const drawLine = (canvasID: any, start: Coordinate, end: Coordinate) => {
        const ctx = canvasRef.current.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(start.x, start.y)
        ctx.lineTo(end.x, end.y)
        ctx.stroke()
        ctx.closePath()
    }

    return (
        <div>
            <canvas
                ref={canvasRef}
                width={canvasSize.canvasWidth}
                height={canvasSize.canvasHeight}
            ></canvas>
        </div>
    )
}
export default Canvas
