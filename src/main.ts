const colorPreview = document.createElement('div')
colorPreview.style.width = '40px'
colorPreview.style.height = '20px'
colorPreview.style.position = 'absolute'
colorPreview.style.top = '0'
colorPreview.style.left = '0'
colorPreview.style.zIndex = '9999'
colorPreview.style.borderRadius = '4px'
colorPreview.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)'
colorPreview.id = 'color-preview'

document.addEventListener('mouseup', () => {
    const selection = document.getSelection()
    if (!selection || !selection.rangeCount) return
    if (!selection.toString().trim()) return

    const bounding = selection.getRangeAt(0).getBoundingClientRect()
    colorPreview.style.top = `${bounding.bottom + 4}px`
    colorPreview.style.left = `${bounding.right + 4}px`
    colorPreview.style.background = selection.toString()

    if (!colorPreview.style.background) {
        return
    }

    document.body.appendChild(colorPreview)
})

document.addEventListener('selectionchange', () => {
    const selection = document.getSelection()?.toString() ?? ''
    if (selection || !colorPreview.isConnected) {
        return
    }

    colorPreview.style.background = ''
    colorPreview.remove()
})

console.log('Color previewer is running')
