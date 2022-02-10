import { AppStore } from '../../stores/AppStore'
import { AllRooms, isColliding, Point, Room } from './utils'

export class RoomsImageStore {
    private WILDCARD_ROOM_OFFSET = 400
    private ctx: CanvasRenderingContext2D
    private image: HTMLImageElement
    private animationFrameId = 0

    constructor(private canvas: HTMLCanvasElement, private imagePath: string) {
        this.image = new Image()
        this.image.onload = () => {
            this.canvas.width = this.image.width
            this.canvas.height = this.image.height
            this.setWildcardRoomRect()
            this.animationFrameId = window.requestAnimationFrame(() => this.draw())
        }
        this.image.src = imagePath
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('could not get canvas 2d context')
        this.ctx = ctx
        this.setEvents()
    }

    getCollidingRoom(point: Point) {
        return AllRooms.find((room) => isColliding(point, room.rect))
    }
    mouseClick(event: MouseEvent) {
        const point = { x: event.offsetX, y: event.offsetY }
        const room = this.getCollidingRoom(point)
        if (!room) return
        AppStore.eventsStore.setRoomName(room.name)
    }
    mouseMove(event: MouseEvent) {
        const point = { x: event.offsetX, y: event.offsetY }
        const room = this.getCollidingRoom(point)
        if (room) {
            this.cursorPointer(true)
        } else {
            this.cursorPointer(false)
        }
    }
    cursorPointer(add: boolean) {
        if (add) this.canvas.classList.add('pointer')
        else this.canvas.classList.remove('pointer')
    }
    setEvents() {
        this.canvas.addEventListener('mousemove', this.mouseMove.bind(this))
        this.canvas.addEventListener('click', this.mouseClick.bind(this))
    }
    cleanup() {
        window.cancelAnimationFrame(this.animationFrameId)
        this.canvas.removeEventListener('mousemove', this.mouseMove.bind(this))
        this.canvas.addEventListener('click', this.mouseClick.bind(this))
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.drawImage(this.image, 0, 0)
        for (const room of AllRooms) {
            const { rect, name } = room
            const w = rect.p2.x - rect.p1.x
            const h = rect.p2.y - rect.p1.y
            if (room.name === '*') {
                this.drawWildcardRoom(room, w, h)
                continue
            }
            this.ctx.strokeStyle = AppStore.eventsStore.roomIsAvailable(name, new Date())
                ? 'green'
                : 'red'
            this.ctx.strokeRect(rect.p1.x, rect.p1.y, w, h)
        }
        window.requestAnimationFrame(() => this.draw())
    }

    drawWildcardRoom({ rect }: Room, w: number, h: number) {
        this.ctx.fillStyle = 'rgba(240, 240, 240, 0.8)'
        this.ctx.fillRect(rect.p1.x, rect.p1.y, w, h)
        this.ctx.font = '20px Arial'
        this.ctx.fillStyle = 'black'
        this.ctx.textAlign = 'center'
        this.ctx.fillText('Voir toutes les salles', this.image.width / 2, 345)
    }

    setWildcardRoomRect() {
        const wildcardRoom = AllRooms.find((room) => room.name === '*')
        if (!wildcardRoom) return
        wildcardRoom.rect.p1.x = this.WILDCARD_ROOM_OFFSET
        wildcardRoom.rect.p2.x = this.image.width - this.WILDCARD_ROOM_OFFSET
    }
}
