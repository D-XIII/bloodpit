import { useEffect, useState, useRef } from 'react'
import './style.css'
import Coordinate from './dto/coordinate'
function Canvas() {
    let canvasRef = useRef<HTMLCanvasElement | null>(null)
    let canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)
    const [ctx, setCtx] = useState()
    const [hexOrigin, setHexOrigin] = useState({ x: 400, y: 300 })

    const [hexSize, setHexSize] = useState(20)
    const [{ hexHeight, hexWidth, vertDist, horizDist }, setHexParameter] =
        useState({
            hexHeight: 1,
            hexWidth: 1,
            vertDist: 1,
            horizDist: 1,
        })

    const getHexParameter = () => {
        let newHexHeight = hexSize / 2
        let newHexWidth = (Math.sqrt(3) / 2) * newHexHeight
        let newVertDist = (newHexHeight * 3) / 4
        let newHorizDist = newHexWidth
        return {
            hexHeight: newHexHeight,
            hexWidth: newHexWidth,
            vertDist: newVertDist,
            horizDist: newHorizDist,
        }
    }

    const [canvasHex, setCanvasHex] = useState({ height: 50, width: 50 })
    const [canvasSize, setCanvasSize] = useState({
        canvasWidth: 800,
        canvasHeight: 600,
    })

    useEffect(() => {
        setHexParameter(getHexParameter())
        console.log('params :', hexHeight, hexWidth, vertDist, horizDist)
        if (canvasRef.current) {
            // canvasCtxRef.current = canvasRef.current.getContext('2d')
            //componentWillMount()
            setCanvasSize({ canvasWidth: 800, canvasHeight: 600 })

            //componentDidMount()
            const { canvasWidth, canvasHeight } = canvasSize
            canvasHex.width = canvasWidth
            canvasHex.height = canvasHeight
            drawHexes()
        }
    }, [])

    const drawHexes = () => {
        const { canvasHeight, canvasWidth } = canvasSize

        let qLeftSide = Math.round(hexOrigin.x / horizDist)
        let qRightSide = Math.round((canvasWidth - hexOrigin.x) / horizDist)
        let rTopSide = Math.round(hexOrigin.y / vertDist)
        let rBottomSide = Math.round((canvasHeight - hexOrigin.y) / vertDist)

        console.log(qLeftSide, qRightSide, rTopSide, rBottomSide)

        for (let r = -rTopSide; r <= rBottomSide; r++) {
            for (let c = -qLeftSide; c <= qRightSide; c++) {
                let center = hexToPixel(hex(r, c))
                if (
                    center.x > hexWidth / 2 &&
                    center.x < canvasWidth - hexWidth / 2 &&
                    center.y > hexHeight / 2 &&
                    center.y < canvasHeight - hexHeight / 2
                ) {
                    // console.log(r, c)
                    drawHex(center)
                    drawHexCoordinate(center, hex(r, c))
                }
            }
        }
    }

    const drawHex = (center: Coordinate) => {
        for (let i = 0; i <= 5; i++) {
            let start = getHexCornerCoord(center, i)
            let end = getHexCornerCoord(center, i + 1)
            drawLine({ x: start.x, y: start.y }, { x: end.x, y: end.y })
        }
    }

    const getHexCornerCoord = (center: Coordinate, i: number) => {
        let angle_deg = 60 * i + 30
        let angle_rad = (Math.PI / 180) * angle_deg
        let x = center.x + hexSize * Math.cos(angle_rad)
        let y = center.y + hexSize * Math.sin(angle_rad)
        return Point(x, y)
    }

    const hex = (r: number, c: number) => {
        return { r: r, c: c }
    }

    const hexToPixel = (hex: any) => {
        let x: number =
            hexSize * Math.sqrt(3) * (hex.c + hex.r / 2) + hexOrigin.x
        let y: number = ((hexSize * 3) / 2) * hex.r + hexOrigin.y
        return Point(x, y)
    }

    const Point = (x: number, y: number) => {
        return { x: x, y: y }
    }

    const drawHexCoordinate = (center: any, hex: any) => {
        const ctx = canvasRef?.current?.getContext('2d')
        if (ctx) {
            ctx.fillText(hex.c, center.x - 10, center.y)
            ctx.fillText(hex.r, center.x + 7, center.y)
        } else console.log('no ctx')
    }

    const drawLine = (start: Coordinate, end: Coordinate) => {
        const ctx = canvasRef?.current?.getContext('2d')
        if (ctx) {
            ctx.beginPath()
            ctx.moveTo(start.x, start.y)
            ctx.lineTo(end.x, end.y)
            ctx.stroke()
            ctx.closePath()
        } else console.log('no ctx')
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
