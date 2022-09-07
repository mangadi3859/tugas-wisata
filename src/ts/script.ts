const nav = document.querySelector("[data-nav]");
const hero = document.querySelector("#hero");
const animates = document.querySelectorAll("[data-slide]");
const sections = Array.from(document.querySelectorAll<HTMLDivElement>("#header, #about, #gallery, #location, #contact")).reverse();
const navItems = Array.from(document.querySelectorAll<HTMLAnchorElement>("#navbar .menu a"));
const heroTitle = <HTMLElement>document.querySelector("#hero .title");
const heroBtn = <HTMLAnchorElement>document.querySelector("#hero a");

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
    heroBtn.style.top = `${y * 0.5}px`;
    heroTitle.style.top = `${y * 0.6}px`;
    heroTitle.style.fontSize = `${48 + y * 0.05}px`;
}
