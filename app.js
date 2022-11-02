
class Section {
    lastSectionId = 0;
    get sectionHtmlContent() {
        return `
        <section id="section${this.lastSectionId}" data-nav"Section ${this.lastSectionId}">
        <div class = "landing__container">
            <h2>Section ${this.lastSectionId}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </div>
        </section>
        `
    };
    addNewSection() {
        this.lastSectionId += 1 ;
        document.getElementsByTagName('main')[0].insertAdjacentHTML('beforeend', this.sectionHtmlContent);
    }
}

class Navbar {
    menuElement = document.getElementById('navbar__list');

    buildMenu() {
        this.menuElement.innerHTML = '';
        document.querySelectorAll('section').forEach(element => {
            this.menuElement.insertAdjacentHTML('beforeend' 
            `<li><a class="menu__link" href"#${element.id}" data-section-id=${element.id}" >${element.dataset.nav}</a></li>`);
        });
        this.goToSection();
    }

    goToSection() {
        this.menuElement.addEventListener('click', function (event) {
            event.preventDefault();
            document.getElementById(event.target.dataset.sectionId).scrollIntoView({behavior: "smooth" });
            addActiveClass(event.target.dataset.sectionId)
        });
    }
}

const section = new Section();
const menu = new Navbar();
const goToTopElement = document.getElementById('scrollToTop');


function addNewSection() {
    section.addNewSection();
    menu.buildMenu();
}


function goToTop() {
    goToTopElement.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
        })
    });
}



function isSectionOnScreen(element, buffer) {
    buffer = typeof buffer === 'undefined' ? 0 : buffer;

    const bounding = element.getBoundingClientRect();

    if (bounding.top >= buffer && bounding.left >= buffer && bounding.right <=
    ((window.innerWidth || document.documentElement.clientWidth) - buffer) && 
    bounding.bottom <=
    ((window.innerHeight || document.documentElement.clientHeight) - buffer)) {
        return true
    } else {
        return false
    }
}


function addActiveClass(id) {
    document.querySelector('.link__active')?.classList.remove('link__active');
    document.querySelector(`[href="#${id}"]`).classList.add('link__active');

    document.querySelector('.your-active-class')?.classList.remove('your-active-class');
    document.querySelector(`#${id}`).classList.add('your-active-class');

        setTimeout( () => {
            window.location.hash = id
        }, 0);
}


window.addEventListener('scroll', () => {
    let scrollPersent = ((window.innerHeight + window.scrollY) / document.body.offsetHeight) * 100;
    if (scrollPersent > 40) {
        goToTopElement.classList.remove('display__none');
    } else {
        goToTopElement.classList.add('display__none');
    }

    document.querySelectorAll('section').forEach(element => {
        if (isSectionOnScreen(element, -300)) {
            addActiveClass(element.id);
        }
    });
});


section.addNewSection();
section.addNewSection();
section.addNewSection();

menu.buildMenu();
goToTop();

