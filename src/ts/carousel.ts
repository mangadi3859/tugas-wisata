type Item = HTMLImageElement | HTMLVideoElement;

class Carousel {
    public carouselContainer: HTMLElement;
    public carouselDots: HTMLElement;
    public items: Item[];
    public dots: HTMLSpanElement[] = [];
    private curIndex = 0;
    private queue: number = 0;
    private DELAY: number = 5000;

    constructor(element: HTMLElement) {
        this.carouselContainer = <HTMLElement>element.querySelector("[data-carousel-container]");
        this.carouselDots = <HTMLElement>element.querySelector("[data-carousel-dots]");
        this.items = Array.from(this.carouselContainer.querySelectorAll<HTMLImageElement | HTMLVideoElement>(".item"));

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
                let i = parseInt(<string>(<HTMLElement>event.target).dataset.index);
                this.setActive(i);
            });
        });
    }

    private setQueue() {
        clearTimeout(this.queue);
        this.queue = setTimeout(() => {
            this.setActive((this.curIndex + 1) % this.dots.length);
            //this.setQueue();
        }, this.DELAY);
    }

    public setActive(index: number): void {
        this.setQueue();
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
