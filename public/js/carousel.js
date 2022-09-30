"use strict";
class Carousel {
    carouselContainer;
    carouselDots;
    items;
    dots = [];
    curIndex = 0;
    constructor(element) {
        this.carouselContainer = element.querySelector("[data-carousel-container]");
        this.carouselDots = element.querySelector("[data-carousel-dots]");
        this.items = Array.from(this.carouselContainer.querySelectorAll(".item"));
        for (let i = 0; i < this.items.length; i++) {
            let el = document.createElement("span");
            el.classList.add("dot", "fa-regular", "fa-circle");
            el.dataset.index = i.toString();
            this.carouselDots.append(el);
            this.dots.push(el);
        }
        this.setActive(0);
        this.dots.forEach((e) => {
            e.addEventListener("click", (event) => {
                let i = parseInt(event.target.dataset.index);
                this.setActive(i);
            });
        });
        setInterval(() => {
            this.setActive((this.curIndex + 1) % this.dots.length);
        }, 5000);
    }
    setActive(index) {
        // if (index == this.curIndex) return;
        // if (index > this.curIndex) {
        //     this.items[index].style.animation = "co-sleft 1s linear";
        //     this.items[this.curIndex].style.animation = "co-sright-out 1s linear";
        // }
        this.curIndex = index;
        this.items.forEach((e) => e.classList.remove("show"));
        this.items[index].classList.add("show");
        this.dots.forEach((e) => e.classList.remove("show"));
        this.dots[index].classList.add("show");
    }
}
