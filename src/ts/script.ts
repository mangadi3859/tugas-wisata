const nav = document.querySelector("[data-nav]");
const hero = document.querySelector("#hero");
const animates = document.querySelectorAll("[data-slide]");
const sections = Array.from(document.querySelectorAll<HTMLDivElement>("#header, #about, #gallery, #location, #contact")).reverse();
const navItems = Array.from(document.querySelectorAll<HTMLAnchorElement>("#navbar .menu a"));
const heroTitle = <HTMLElement>document.querySelector("#hero .title");
const heroBtn = <HTMLAnchorElement>document.querySelector("#hero a");
const sideMenu = document.querySelectorAll("#sidebar .menu a");
const sideBtn = document.querySelectorAll("[data-side-btn]");
const sidebar = <HTMLDivElement>document.querySelector("#sidebar");
const contactForm = <HTMLFormElement>document.querySelector("#contact-form");
const carousel = document.querySelector("[data-carousel]");

const heroObserver = new IntersectionObserver(
    (e) => {
        e.forEach((el) => {
            if (!el.isIntersecting) {
                nav?.classList.add("passed");
                return;
            }
            nav?.classList.remove("passed");
        });
    },
    { threshold: 0.2 },
);

heroObserver.observe(<NonNullable<any>>hero);

const loadingObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (!e.isIntersecting) return;
        if ("slideLength" in (<HTMLElement>e.target).dataset) (<HTMLElement>e.target).style.setProperty("--length", <any>(<HTMLElement>e.target).dataset.slideLength);
        e.target.classList.add("show");
        loadingObserver.unobserve(e.target);
    });
});

animates.forEach((e) => loadingObserver.observe(e));

let lastNav: HTMLDivElement;

document.addEventListener("scroll", (event) => {
    heroParallax();

    let y = window.scrollY + window.screenY;
    let target = sections.find((e) => {
        let el = e.getBoundingClientRect();
        return el.top + window.scrollY - window.screen.height * 0.15 <= y;
    });

    if (lastNav === target) return;
    lastNav = <HTMLDivElement>target;
    let actived = <HTMLAnchorElement>navItems.find((el) => {
        return el.dataset.to === target?.id;
    });
    actived.classList.add("active");
    navItems.forEach((el) => el !== actived && el.classList.remove("active"));
});

function heroParallax(): void {
    let y = window.scrollY;
    let rect = (<HTMLElement>hero).getBoundingClientRect();

    if (y > rect.height) return;

    heroBtn.style.top = `${y * 0.5}px`;
    heroTitle.style.top = `${y * 0.6}px`;
    heroTitle.style.fontSize = `calc(var(--font-size) + ${3 * (y / rect.height)}vw)`;
}

sideBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
        if (sidebar.classList.contains("show")) return sidebar.classList.remove("show");
        sidebar.classList.add("show");
    });
});

sideMenu.forEach((e) => e.addEventListener("click", () => sidebar.classList.remove("show")));

contactForm.addEventListener("submit", (e) => {
    let target = <HTMLFormElement>e.target;
    let name = <HTMLInputElement>target.querySelector("#f-name");
    let number = <HTMLInputElement>target.querySelector("#f-number");
    e.preventDefault();

    window.open(`https://wa.me/6281337614453?text=Halo%20Nama%20Saya%20${encodeURIComponent(`*${name.value}* *_[${number.value}]_*`)}`);
});

new Carousel(<HTMLDivElement>carousel);
