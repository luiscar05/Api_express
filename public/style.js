const slider=document.getElementById("slider");
let sliderSection=document.querySelectorAll(".slider__section");
let sliderSectionLast=sliderSection[sliderSection.length-1];

const btnLeft=document.getElementById("left1")
const btnRight=document.getElementById("right1")

slider.insertAdjacentElement('afterbegin',sliderSectionLast);


function next() {
    let sliderSectionFirst=document.querySelectorAll(".slider__section")[0];
    slider.style.marginLeft="-200%";
    slider.style.transition="all  0.5s";
    setTimeout(()=>{
        slider.style.transition="none";
        slider.insertAdjacentElement('beforeend',sliderSectionFirst);
        slider.style.marginLeft="-100%";
    },500);
}
function prev() {
    let sliderSection=document.querySelectorAll(".slider__section");
    let sliderSectionLast=sliderSection[sliderSection.length-1];
    slider.style.marginLeft="0";
    slider.style.transition="all  0.5s";
    setTimeout(()=>{
        slider.style.transition="none";
        slider.insertAdjacentElement('afterbegin',sliderSectionLast);
        slider.style.marginLeft="-100%";
    },500);
}

btnRight.addEventListener("click",()=>{
    next(sliderSection);
});
btnLeft.addEventListener("click",()=>{
    prev()
});

