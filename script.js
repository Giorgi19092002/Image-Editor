const fileInput = document.querySelector('.file-input')
const chooseBtn = document.querySelector('.choose-img')
const previewImg = document.querySelector('.preview-img img')
const filterOptions = document.querySelectorAll('.filter button')
const filterName = document.querySelector('.filter-info .name')
const filterSlider = document.querySelector('.slider input')
const filterValue = document.querySelector('.filter-info .value')
const rotateOptions = document.querySelectorAll('.rotate button')
const resetfilterBtn = document.querySelector(".reset-filters")
const saveImgBtn = document.querySelector('.save-img')

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0
let rotate = 0, fliphorizontal = 1, flipvertical = 1

const applyFilters = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal}, ${flipvertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}


const loadImage = () => {
    let file = fileInput.files[0]
    if(!file) return
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener('load', () => {
        document.querySelector('.container').classList.remove('disable')
    })
}

filterOptions.forEach(option => {
    option.addEventListener('click',() => {
        document.querySelector('.filter .active').classList.remove('active')
        option.classList.add('active')
        filterName.innerHTML = option.innerText

        if(option.id === 'brightness') {
            filterSlider.value = brightness
            filterValue.innerHTML = `${brightness}%`
        }
        else if(option.id === 'saturation'){
            filterSlider.value = saturation
            filterValue.innerHTML = `${saturation}%`
        }
        else if(option.id === 'inversion'){
            filterSlider.value = inversion
            filterValue.innerHTML = `${inversion}%`
        }
        else{
            filterSlider.value = grayscale
            filterValue.innerHTML = `${grayscale}%`
        }
    })
});

const updateFilter = () => {
    filterValue.innerHTML = `${filterSlider.value}%`
    const selectedFilter = document.querySelector('.filter .active')
    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value
    }
    else if(selectedFilter.id === 'saturation'){
        saturation = filterSlider.value
    }
    else if(selectedFilter.id === 'inversion'){
        inversion = filterSlider.value
    }
    else{
        grayscale = filterSlider.value
    }

    applyFilters()
}


rotateOptions.forEach(option => {
    option.addEventListener('click', () => {
        if(option.id === 'left'){
            rotate -= 90 
        }
        else if(option.id === 'right'){
            rotate += 90
        }
        else if(option.id === 'horizontal'){
            fliphorizontal = fliphorizontal === 1 ? -1 : 1
        }
        else{
            flipvertical = flipvertical === 1 ? -1 : 1 
        }
        applyFilters()
    })
})

const resetFilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0
    rotate = 0, fliphorizontal = 1, flipvertical = 1

    applyFilters()
}

const saveImg = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = previewImg.naturalWidth
    canvas.height = previewImg.naturalHeight

    ctx.filter = `brightness(${brightness}), saturate(${saturation}), inver(${inversion}), grayscale(${grayscale})`
    ctx.translate(canvas.width / 2, canvas.height / 2)
    if(rotate != 0){
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(fliphorizontal,flipvertical)
    ctx.drawImage(previewImg, -canvas.width / 2 , -canvas.height / 2 , canvas.width, canvas.height)
    const link = document.createElement('a')
    link.download = 'image.jpg'
    link.href = canvas.toDataURL()
    link.click()
}


fileInput.addEventListener('change', loadImage)
filterSlider.addEventListener('input',updateFilter)
chooseBtn.addEventListener('click', () => fileInput.click())
resetfilterBtn.addEventListener('click', resetFilter)
saveImgBtn.addEventListener('click',saveImg)