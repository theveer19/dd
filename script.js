/* ============================================================
   SCRIPT.JS — Main Homepage Logic
   ============================================================ */

/* ============================================================
   ★ CATEGORY PRODUCT DATA
   ============================================================ */
const CATEGORY_DATA = {
    'water-bottle': [
        { img: 'asset/B1.png', alt: 'Crystal Clear Bottle', chip: 'Hydration', title: '01. Crystal Bottle', desc: 'Pure hydration, pure form.' },
        { img: 'asset/B2.png', alt: 'Sport Water Bottle', chip: 'Active', title: '02. Sport Series', desc: 'Built for movement.' },
        { img: 'asset/B3.png', alt: 'Thermal Water Bottle', chip: 'Thermal', title: '03. Thermal Pro', desc: '24h temperature lock.' },
        { img: 'asset/B4.png', alt: 'Eco Water Bottle', chip: 'Eco', title: '04. Eco Series', desc: 'Sustainable hydration.' }
    ],

    'gym-bottle': [
        { img: 'asset/G1.png', alt: 'Performance Shaker', chip: 'Premium', title: '01. Performance Shaker', desc: 'Double-wall matte finish.' },
        { img: 'asset/G2.png', alt: 'Pro Gym Bottle', chip: 'Hydration', title: '02. Pro Gym Bottle', desc: 'Leak-proof tech.' },
        { img: 'asset/G3.png', alt: 'Elite Shaker', chip: 'Edition', title: '03. Elite Shaker', desc: 'Competition-grade build.' },
        { img: 'asset/G4.png', alt: 'Ultimate Shaker', chip: 'Ultimate', title: '04. Ultimate Shaker', desc: 'Premium performance.' }
    ],

    'lunch-box': [
       

        { img: 'asset/L1.png', alt: 'Mini Chopper', chip: 'Kitchen', title: '01. Mini Chopper', desc: 'Precision blade system.' },
        { img: 'asset/L2.png', alt: 'Pro Chopper', chip: 'Pro', title: '02. Pro Chopper', desc: 'Chef-grade performance.' },
        { img: 'asset/L3.png', alt: 'Smart Chopper', chip: 'Smart', title: '03. Smart Series', desc: 'Effortless prep.' },
        { img: 'asset/L4.png', alt: 'Ultimate Chopper', chip: 'Ultimate', title: '04. Ultimate Chopper', desc: 'Professional-grade cutting.' }
    ],

    'container': [

         { img: 'asset/J1.png', alt: 'j1', chip: 'Insulated', title: '01. Thermal Box', desc: 'Stays fresh all day.' },
        { img: 'asset/J2.png', alt: 'j2', chip: 'Compact', title: '02. Slim Carrier', desc: 'Fits anywhere.' },
        { img: 'asset/J3.png', alt: 'j3', chip: 'Steel', title: '03. Steel Series', desc: 'Lifetime durability.' },
        { img: 'asset/J4.png', alt: '', chip: 'Smart', title: '04. Smart Series', desc: 'Tech meets lunch.' }

        
    ],

    'Kitchen': [
        { img: 'asset/K1.png', alt: 'Kitchen Essential 1', chip: 'Kitchen', title: '01. Kitchen Pro', desc: 'Professional-grade cutting.' },
        { img: 'asset/K2.png', alt: 'Kitchen Essential 2', chip: 'Kitchen', title: '02. Chef Series', desc: 'Chef-grade performance.' },
        { img: 'asset/K3.png', alt: 'Kitchen Essential 3', chip: 'Smart', title: '03. Smart Kitchen', desc: 'Effortless cooking.' },
        { img: 'asset/K4.png', alt: 'Kitchen Essential 4', chip: 'Ultimate', title: '04. Ultimate Kitchen', desc: 'Complete kitchen kit.' }
    ]
};

const CATEGORY_NAMES = {
    'water-bottle': 'Water Bottle',
    'gym-bottle':   'Gym Bottle',
    'lunch-box':    'Lunch Box',
    'container':    'Container',
    'Kitchen':      'Kitchen'
};

let activeCategory = 'water-bottle';

/* ============================================================
   RENDER ORBIT PRODUCTS
   — Uses dynamic degree spacing based on item count
   ============================================================ */
function renderOrbitProducts(category) {
    const wheel = document.getElementById('orbitWheel');
    const products = CATEGORY_DATA[category];
    if (!wheel || !products) return;

    wheel.classList.add('is-switching');

    setTimeout(() => {
        // ✅ FIX: Calculate degree step dynamically so all items are evenly spaced
        const count = products.length;
        const degStep = 360 / count;

        wheel.innerHTML = products.map((p, i) => `
            <div class="product-item" style="--i: ${i}; --deg: ${i * degStep}deg;">
                <div class="item-inner" id="item${i}">
                    <div class="product-visual">
                        <img src="${p.img}" alt="${p.alt}" class="floating-img">
                    </div>
                    <div class="product-data"></div>
                </div>
            </div>
        `).join('');

        const items = wheel.querySelectorAll('.item-inner');
        items.forEach((item, idx) => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.88) translateY(20px)';
            item.style.transition = `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s,
                                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${idx * 0.1}s`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                });
            });
        });

        wheel.classList.remove('is-switching');
    }, 160);
}

function updateCategoryIndicator(category) {
    const label = document.getElementById('ciLabel');
    const indicator = document.getElementById('categoryIndicator');
    if (!label || !indicator) return;

    indicator.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    indicator.style.opacity = '0';
    indicator.style.transform = 'translateX(-50%) translateY(6px)';

    setTimeout(() => {
        label.textContent = CATEGORY_NAMES[category] || category;
        indicator.style.opacity = '1';
        indicator.style.transform = 'translateX(-50%) translateY(0)';
    }, 200);
}

function selectCategory(category) {
    if (category === activeCategory) return;
    activeCategory = category;

    document.querySelectorAll('.dropdown-category').forEach(el => {
        el.classList.toggle('active-cat', el.dataset.category === category);
    });

    renderOrbitProducts(category);
    updateCategoryIndicator(category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ============================================================
   DROPDOWN HOVER LOGIC
   ============================================================ */
(function initDropdown() {
    const navItem  = document.getElementById('productsNavItem');
    const dropdown = document.getElementById('productsDropdown');
    if (!navItem || !dropdown) return;

    let closeTimer = null;

    const openDropdown  = () => { clearTimeout(closeTimer); navItem.classList.add('dropdown-open'); };
    const closeDropdown = () => { closeTimer = setTimeout(() => { navItem.classList.remove('dropdown-open'); }, 200); };

    navItem.addEventListener('mouseenter', openDropdown);
    navItem.addEventListener('mouseleave', closeDropdown);
    dropdown.addEventListener('mouseenter', () => clearTimeout(closeTimer));
    dropdown.addEventListener('mouseleave', closeDropdown);

    document.querySelectorAll('.dropdown-category').forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.preventDefault();
            selectCategory(cat.dataset.category);
            closeTimer = setTimeout(() => { navItem.classList.remove('dropdown-open'); }, 300);
        });
    });
})();

/* ============================================================
   ORBIT SCROLL
   ============================================================ */
function updateOrbitRotation() {
    const pivot      = document.getElementById('orbitPivot');
    const canvas     = document.querySelector('.main-canvas');
    const spacer     = document.getElementById('orbitSpacer');
    const innerItems = document.querySelectorAll('.item-inner');

    if (spacer && canvas) {
        const spacerBottom = spacer.offsetTop + spacer.offsetHeight;
        if (window.scrollY >= spacerBottom) {
            canvas.style.visibility = 'hidden';
            canvas.style.opacity    = '0';
            requestAnimationFrame(updateOrbitRotation);
            return;
        } else {
            canvas.style.visibility = 'visible';
            canvas.style.opacity    = '1';
        }
    }

    const spacerHeight  = spacer ? spacer.offsetHeight : (document.body.scrollHeight - window.innerHeight);
    const scrollPercent = Math.min(window.scrollY / spacerHeight, 1);

    const startAngle   = 15;
    const endAngle     = -255;
    const currentAngle = startAngle + (scrollPercent * (endAngle - startAngle));

    if (pivot) gsap.set(pivot, { rotate: currentAngle });

    // ✅ FIX: Use dynamic degree step matching current product count
    const count   = CATEGORY_DATA[activeCategory] ? CATEGORY_DATA[activeCategory].length : 4;
    const degStep = 360 / count;

    innerItems.forEach((item, index) => {
        const angleOnWheel = currentAngle + (index * degStep);
        const proximity    = Math.abs(angleOnWheel % 360 > 180 ? (angleOnWheel % 360) - 360 : angleOnWheel % 360);
        const focusFactor  = Math.max(0, (1 - proximity / 35));
        const scalePop     = 1 + (focusFactor * 0.18);
        const readabilityFix = focusFactor * -currentAngle * 0.2;

        gsap.set(item, { scale: scalePop, rotate: readabilityFix });

        const img = item.querySelector('.floating-img');
        if (img) {
            img.style.filter = `drop-shadow(0 20px 50px rgba(255,255,255,${0.3 + focusFactor * 0.3}))`;
        }
    });

    requestAnimationFrame(updateOrbitRotation);
}

requestAnimationFrame(updateOrbitRotation);

/* ============================================================
   NAVBAR SHRINK
   ============================================================ */
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.2)';
        nav.style.height = '70px';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.03)';
        nav.style.height = '80px';
    }
});

/* ============================================================
   SECTION 03 — MESH GRADIENT PARALLAX
   ============================================================ */
document.addEventListener('mousemove', (e) => {
    const mesh = document.querySelector('.mesh-gradient-bg');
    if (!mesh) return;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    mesh.style.background = `
        radial-gradient(circle at ${80 + (x / 20)}% ${20 + (y / 20)}%, var(--coral-accent) 0%, transparent 40%),
        radial-gradient(circle at ${10 - (x / 20)}% ${80 - (y / 20)}%, var(--deep-clay) 0%, transparent 35%)
    `;
});

/* ============================================================
   LIFESTYLE CHIP TOGGLE
   ============================================================ */
document.querySelectorAll('.ls-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.ls-chip').forEach(c => c.classList.remove('active-chip'));
        chip.classList.add('active-chip');
    });
});

/* ============================================================
   PARALLAX SCROLL — LIFESTYLE CARDS
   ============================================================ */
window.addEventListener('scroll', () => {
    const lifestyle = document.querySelector('.Dimazofly-lifestyle');
    if (!lifestyle) return;
    const rect = lifestyle.getBoundingClientRect();
    const progress = 1 - (rect.bottom / (window.innerHeight + rect.height));
    const editorialHeading = document.querySelector('.editorial-heading');
    if (editorialHeading) { editorialHeading.style.transform = `translateY(${progress * -30}px)`; }
    const floatingChips = document.querySelectorAll('.f-chip');
    floatingChips.forEach((chip, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        chip.style.transform = `translateY(${progress * direction * 20 - 5}px)`;
    });
});

/* ============================================================
   GSAP INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    renderOrbitProducts(activeCategory);

    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
});

/* ============================================================
   MOBILE NAV — Homepage (with category links)
   ============================================================ */
(function initMobileNav() {
    var ham = document.getElementById('navHamburger');
    var drw = document.getElementById('mobileNavDrawer');
    var ovl = document.getElementById('mobileNavOverlay');
    var cls = document.getElementById('mobileNavClose');
    if (!ham) return;

    ham.addEventListener('click', function () {
        drw.classList.add('open');
        ovl.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    function closeNav() {
        drw.classList.remove('open');
        ovl.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (cls) cls.addEventListener('click', closeNav);
    if (ovl) ovl.addEventListener('click', closeNav);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    // ✅ FIX: Wire up mobile category links
    document.querySelectorAll('.mobile-cat-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var category = this.dataset.category;
            selectCategory(category);
            closeNav();
        });
    });
})();