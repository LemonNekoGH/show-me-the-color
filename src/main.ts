const container = document.createElement('div')
container.style.width = '100vw'
container.style.height = '100vh'
container.style.position = 'fixed'
container.style.top = '0'
container.style.left = '0'
container.style.pointerEvents = 'none'
container.id = 'color-preview-container'
document.body.appendChild(container)

const colorPreview = document.createElement('div')
colorPreview.style.width = '40px'
colorPreview.style.height = '20px'
colorPreview.style.background = '#FF0000'
colorPreview.style.position = 'absolute'
colorPreview.style.top = '0'
colorPreview.style.left = '0'
colorPreview.style.zIndex = '9999'
colorPreview.id = 'color-preview'

const debounced = <F extends (args: any) => any>(fn: F) => {
    let timeout = 0
    
    return (args: any) => {
        if (timeout) {
            clearTimeout(timeout)
        }
        
        timeout = setTimeout(() => {
            fn(args)
        }, 500)
    }
}

let l = 0
let t = 0

const onSelectionChange = (_: Event) => {
    if (colorPreview.isConnected)
        colorPreview.remove()

    const selection = document.getSelection()

    if (!selection) return

    colorPreview.style.top = `${t}px`
    colorPreview.style.left = `${l}px`
    colorPreview.style.background = selection.toString()
    
    container.appendChild(colorPreview)
}

const onMouseMove = (e: MouseEvent) => {
    l = e.clientX
    t = e.clientY
}

document.addEventListener('selectionchange', debounced(onSelectionChange))
window.addEventListener('mousemove', onMouseMove)

console.log('Color previewer is running')
