/* ============================================================
   BULK.JS — Bulk Inquiry Modal Logic
   Standalone file — loaded after premium.js
   ============================================================ */

(function () {
    'use strict';

    // === PRODUCT DATA ===
    var PRODUCTS = [
        {id:"spider-bottle",  name:"SPIDER BOTTLE",     slug:"Spider Bottle",    tag:"Shaker Bottle", desc:"Boostio shaker — gym grade, leak-proof, BPA free",                           img:"https://z-cdn-media.chatglm.cn/files/5c780550-0a2d-43ef-a33b-5d4d926f4958.jpg?auth_key=1877798216-a478512afa5a4624bc66f7a4b0b98d58-0-57caeba2990f96d39b0352484eab0138"},
        {id:"kids-lunchbox",  name:"KIDS LUNCH BOX",    slug:"Kids Lunch Box",   tag:"Kids Meal Box", desc:"Multi-compartment with utensils — Spider-Man edition",                       img:"https://z-cdn-media.chatglm.cn/files/72ab3b09-e02d-4a77-be98-bdc88ba24389.jpg?auth_key=1877798216-c9e4e02e117941dea8b55ce926a7af05-0-b3fece50b3afa8f435b5293e03696477"},
        {id:"beast-bottle",   name:"BEAST MODE BOTTLE", slug:"Gym Bottle",       tag:"Gym Bottle",    desc:"500ml gym bottle with ml/oz scale & carry loop",                             img:"https://z-cdn-media.chatglm.cn/files/00a43c29-b216-4f4c-afbb-ca5eb0f0b843.jpg?auth_key=1877798216-5b9e6ea58fe343fcb7851c8cb34ba3fd-0-06d317d0bc8f14a00a299da2edc8a5e5"},
        {id:"fresh-lunchbox", name:"FRESH LUNCH BOX",   slug:"Fresh Box",        tag:"Meal Box",      desc:"Multi-compartment — keeps food fresh & separated",                           img:"https://z-cdn-media.chatglm.cn/files/91ffb7a2-cbc5-45b8-b69d-bfd2ef7c8557.jpg?auth_key=1877798216-6fe0d154dccd4ba5b84e482fbc7e6920-0-af064b20259534464a71ba196a859830"},
        {id:"food-chopper",   name:"FOOD CHOPPER",      slug:"Chopper",          tag:"Kitchen Tool",  desc:"Manual vegetable chopper — fast, safe, easy to clean",                      img:"https://z-cdn-media.chatglm.cn/files/30e16f4e-8f8e-4452-a4e7-ca0e736cadf3.jpg?auth_key=1877798216-28f7b0c68e7d4a5192edbc1ccb51922d-0-244f90bae62d3ed24e694f4b5c9952eb"},
        {id:"gym-hydration",  name:"GYM HYDRATION",     slug:"Hydration",        tag:"Hydration",     desc:"Large capacity bottle — built for intense workouts",                         img:"https://z-cdn-media.chatglm.cn/files/18489e66-471a-4a1b-aff9-a65c0bb47273.jpg?auth_key=1877798216-45ff894d621f408098f53dcf5187cd93-0-5972f7b13141ad837c5fcd362f68518b"},
        {id:"tifin",          name:"TIFIN BOX",         slug:"Tifin",            tag:"Meal Box",      desc:"Premium tifin box",                                                          img:"./images/tifin.jpg"},
        {id:"burger-lunch",   name:"BURGER LUNCH",      slug:"Burger Lunch",     tag:"Meal Box",      desc:"Fun burger-themed lunch box",                                                img:"./images/burgerlunch.jpg"},
        {id:"bus-bottle",     name:"BUS BOTTLE",        slug:"Bus Bottle",       tag:"Bottle",        desc:"Unique bus-shaped water bottle",                                             img:"./images/busbottle.jpg"},
        {id:"freezer-6in1",   name:"FREEZER 6 IN 1",   slug:"Freezer 6in1",     tag:"Storage",       desc:"6-in-1 freezer storage set",                                                 img:"./images/freezer6.jpg"},
        {id:"2in1-bottle",    name:"2 IN 1 BOTTLE",     slug:"2in1 Bottle",      tag:"Bottle",        desc:"Dual-purpose bottle",                                                        img:"./images/2in1botlle.jpg"},
        {id:"ameya-bottle",   name:"AMEYA BOTTLE",      slug:"Ameya Bottle",     tag:"Bottle",        desc:"Stylish Ameya series bottle",                                                img:"./images/ameyabotlle.jpg"},
        {id:"aroma-dis",      name:"AROMA DIS",         slug:"Aroma Dis",        tag:"Aroma",         desc:"Aroma dispenser",                                                            img:"./images/aroma dis.jpg"},
        {id:"atom-shaker",    name:"ATOM SHAKER",       slug:"Atom Shaker",      tag:"Shaker",        desc:"Atom series protein shaker",                                                 img:"./images/atomshaker.jpg"},
        {id:"baby-shipper",   name:"BABY SHIPPER",      slug:"Baby Shipper",     tag:"Storage",       desc:"Baby food storage set",                                                      img:"./images/babyshipper.jpg"},
        {id:"cheese-greter",  name:"CHEESE GRATER",     slug:"Cheese Grater",    tag:"Kitchen Tool",  desc:"Stainless steel cheese grater",                                              img:"./images/cheesegreter.jpg"},
        {id:"chopper",        name:"CHOPPER",           slug:"Chopper",          tag:"Kitchen Tool",  desc:"Quick vegetable chopper",                                                    img:"./images/chopper.jpg"},
        {id:"dd-lunch",       name:"DOUBLE DECKER",     slug:"Double Decker",    tag:"Meal Box",      desc:"Double decker tiffin box",                                                   img:"./images/ddlunch.jpg"},
        {id:"freezer-4in1",   name:"FREEZER 4 IN 1",   slug:"Freezer 4in1",     tag:"Storage",       desc:"4-in-1 freezer storage set",                                                 img:"./images/freezer4.jpg"},
        {id:"fruit-lunch",    name:"FRUIT LUNCH BOX",   slug:"Fruit Lunch",      tag:"Meal Box",      desc:"Fruit-themed lunch box",                                                     img:"./images/fruitlunch.jpg"},
        {id:"gallon-bottle",  name:"GALLON BOTTLE",     slug:"Gallon Bottle",    tag:"Bottle",        desc:"1 gallon gym water bottle",                                                  img:"./images/gbotlle.jpg"},
        {id:"jelly-bottle",   name:"JELLY BOTTLE",      slug:"Jelly Bottle",     tag:"Bottle",        desc:"Jelly-inspired cute water bottle",                                           img:"./images/jellybottle.jpg"},
        {id:"kitty-tumbler",  name:"KITTY TUMBLER",     slug:"Kitty Tumbler",    tag:"Tumbler",       desc:"Kitty-themed tumbler cup",                                                   img:"./images/kittytumbler.jpg"},
        {id:"tokyo-lunch",    name:"TOKYO LUNCH BOX",   slug:"Tokyo Lunch",      tag:"Meal Box",      desc:"Tokyo-style compartment lunch box",                                          img:"./images/llunch.jpg"},
        {id:"labubu-cup",     name:"LABUBU CUP",        slug:"Labubu Cup",       tag:"Cup",           desc:"Labubu character themed cup",                                                img:"./images/lububucup.jpg"},
        {id:"labubu-tumbler", name:"LABUBU TUMBLER",    slug:"Labubu Tumbler",   tag:"Tumbler",       desc:"Labubu themed tumbler",                                                      img:"./images/lumtumbler.jpg"},
        {id:"tasty-lunch",    name:"TASTY LUNCH BOX",   slug:"Tasty Lunch",      tag:"Meal Box",      desc:"Tasty series lunch box",                                                     img:"./images/lunch.jpg"},
        {id:"onion-cutter",   name:"ONION CUTTER",      slug:"Onion Cutter",     tag:"Kitchen Tool",  desc:"Quick onion & vegetable cutter",                                             img:"./images/onioncuttor.jpg"},
        {id:"orange-jug",     name:"ORANGE JUG",        slug:"Orange Jug",       tag:"Jug",           desc:"Orange-themed water jug",                                                    img:"./images/orange jug.jpg"},
        {id:"peanut-tumbler", name:"PEANUT TUMBLER",    slug:"Peanut Tumbler",   tag:"Tumbler",       desc:"Peanut-themed cute tumbler",                                                 img:"./images/peanuttumbler.jpg"},
        {id:"round-lunch",    name:"ROUND LUNCH BOX",   slug:"Round Lunch",      tag:"Meal Box",      desc:"Round shaped lunch box",                                                     img:"./images/rlunch.jpg"},
        {id:"shaker",         name:"SHAKER",            slug:"Shaker",           tag:"Shaker",        desc:"Classic protein shaker bottle",                                              img:"./images/shaker.jpg"},
        {id:"shop-dis",       name:"SHOP DISPLAY",      slug:"Shop Dis",         tag:"Display",       desc:"Shop display stand set",                                                     img:"./images/shop dis.jpg"},
        {id:"spider-shaker",  name:"SPIDER SHAKER",     slug:"Spider Shaker",    tag:"Shaker",        desc:"Spider-themed shaker bottle",                                                img:"./images/sshaker.jpg"},
        {id:"vacuum-bottle",  name:"VACUUM BOTTLE",     slug:"Vacuum Bottle",    tag:"Bottle",        desc:"Vacuum insulated water bottle",                                              img:"./images/vaccum bottle.jpg"},
        {id:"vacuum-insul",   name:"VACUUM INSULATED",  slug:"Vacuum Insulated", tag:"Bottle",        desc:"Premium vacuum insulated bottle",                                            img:"./images/vbottle.jpg"},
        {id:"veg-cutter",     name:"VEG CUTTER",        slug:"Veg Cutter",       tag:"Kitchen Tool",  desc:"Manual vegetable cutter",                                                    img:"./images/veg cutter.jpg"},
        {id:"veg-cutter-1l",  name:"VEG CUTTER 1000ML", slug:"Veg Cutter 1L",   tag:"Kitchen Tool",  desc:"1000ml vegetable cutter",                                                    img:"./images/vegc1000.jpg"},
        {id:"vento-box",      name:"VENTO BOX",         slug:"Vento Box",        tag:"Storage",       desc:"Vento series storage box",                                                   img:"./images/vento.jpg"},
        {id:"vacuum-water",   name:"VACUUM WATER BOTTLE",slug:"Vacuum Water",    tag:"Bottle",        desc:"Vacuum water bottle — hot & cold",                                           img:"./images/vwbottle.jpg"},
        {id:"yummy-lunch",    name:"YUMMY LUNCH BOX",   slug:"Yummy Lunch",      tag:"Meal Box",      desc:"Yummy series lunch box",                                                     img:"./images/y lunch.jpg"}
    ];

    // === INJECT PRODUCT GRID ===
    function buildGrid() {
        var grid = document.getElementById('bulk-products-grid');
        if (!grid) return;
        grid.innerHTML = PRODUCTS.map(function (p) {
            return '<div class="bp-card" data-pid="' + p.id + '">' +
                '<div class="bp-card-img-wrap">' +
                '<img src="' + p.img + '" class="bp-card-img" alt="' + p.name + '" loading="lazy" onerror="this.style.opacity=\'0.3\'">' +
                '<div class="bp-card-badge">Selected</div>' +
                '</div>' +
                '<div class="bp-card-info">' +
                '<div class="bp-card-name">' + p.name + '</div>' +
                '<div class="bp-card-desc">' + p.desc + '</div>' +
                '<div class="bp-card-bottom">' +
                '<div class="bp-qty">' +
                '<button type="button" onclick="bulkChangeQty(this,-1)">−</button>' +
                '<span>0</span>' +
                '<button type="button" onclick="bulkChangeQty(this,1)">+</button>' +
                '</div>' +
                '<div class="bp-check" onclick="bulkToggleCheck(this)" role="checkbox" aria-checked="false" tabindex="0"></div>' +
                '</div></div></div>';
        }).join('');
    }

    // === MODAL STATE ===
    var bulkOpen = false;

    window.openBulkModal = function () {
        var m = document.getElementById('bulk-modal');
        if (!m) return;
        m.classList.add('open');
        m.setAttribute('aria-hidden', 'false');
        bulkOpen = true;
        document.body.style.overflow = 'hidden';
    };

    window.closeBulkModal = function () {
        var m = document.getElementById('bulk-modal');
        if (!m) return;
        m.classList.remove('open');
        m.setAttribute('aria-hidden', 'true');
        bulkOpen = false;
        document.body.style.overflow = '';
    };

    // === TOGGLE CHECK ===
    window.bulkToggleCheck = function (el) {
        var checked = el.classList.contains('checked');
        var card    = el.closest('.bp-card');
        var qtySpan = card.querySelector('.bp-qty span');
        if (checked) {
            el.classList.remove('checked');
            el.setAttribute('aria-checked', 'false');
            card.classList.remove('selected');
            qtySpan.textContent = '0';
        } else {
            el.classList.add('checked');
            el.setAttribute('aria-checked', 'true');
            card.classList.add('selected');
            if (parseInt(qtySpan.textContent) === 0) qtySpan.textContent = '1';
        }
        updateSelectedCount();
    };

    // === QUANTITY CHANGE ===
    window.bulkChangeQty = function (btn, dir) {
        var qtySpan = btn.parentElement.querySelector('span');
        var v = parseInt(qtySpan.textContent) + dir;
        if (v < 0) v = 0;
        if (v > 9999) v = 9999;
        qtySpan.textContent = v;
        var card  = btn.closest('.bp-card');
        var check = card.querySelector('.bp-check');
        if (v > 0 && !check.classList.contains('checked')) {
            check.classList.add('checked');
            check.setAttribute('aria-checked', 'true');
            card.classList.add('selected');
        }
        if (v === 0 && check.classList.contains('checked')) {
            check.classList.remove('checked');
            check.setAttribute('aria-checked', 'false');
            card.classList.remove('selected');
        }
        updateSelectedCount();
    };

    function updateSelectedCount() {
        var count = document.querySelectorAll('.bp-check.checked').length;
        var countEl = document.getElementById('sel-count');
        var submitBtn = document.getElementById('bulk-submit-btn');
        if (countEl) countEl.textContent = count;
        if (submitBtn) submitBtn.disabled = (count === 0);
    }

    function getDateTime() {
        var d = new Date();
        return String(d.getDate()).padStart(2, '0') + '/' +
               String(d.getMonth() + 1).padStart(2, '0') + '/' +
               d.getFullYear() + ' ' +
               String(d.getHours()).padStart(2, '0') + ':' +
               String(d.getMinutes()).padStart(2, '0');
    }

    window.submitBulkInquiry = function () {
        var n   = document.getElementById('b-name').value.trim();
        var p   = document.getElementById('b-phone').value.trim();
        var e   = document.getElementById('b-email').value.trim();
        var ci  = document.getElementById('b-city').value.trim();
        var msg = document.getElementById('b-msg').value.trim();

        if (!n) { showBulkToast('Please enter your full name.'); document.getElementById('b-name').focus(); return; }
        if (!p) { showBulkToast('Please enter your phone number.'); document.getElementById('b-phone').focus(); return; }
        if (p.replace(/\D/g, '').length < 10) { showBulkToast('Please enter a valid 10-digit phone number.'); document.getElementById('b-phone').focus(); return; }

        var prods = [];
        document.querySelectorAll('.bp-card.selected').forEach(function (c) {
            prods.push({
                name: c.querySelector('.bp-card-name').textContent,
                qty:  c.querySelector('.bp-qty span').textContent
            });
        });
        if (!prods.length) { showBulkToast('Please select at least one product.'); return; }

        var tq = 0;
        prods.forEach(function (pr) { tq += parseInt(pr.qty); });
        var pl = '';
        prods.forEach(function (pr, i) { pl += '\n  ' + (i + 1) + '. ' + pr.name + '  →  Qty: ' + pr.qty; });

        var wa =
            '╔═══════════════════════════════════╗\n' +
            '║     DIMAZOFLY — BULK INQUIRY      ║\n' +
            '╚═══════════════════════════════════╝\n\n' +
            '📅 Date: ' + getDateTime() + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '👤 CUSTOMER INFORMATION\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '▸ Name: ' + n + '\n' +
            '▸ Phone: ' + p + '\n' +
            (e  ? '▸ Email: ' + e  + '\n' : '') +
            (ci ? '▸ City: '  + ci + '\n' : '') +
            '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '🛒 ORDER DETAILS\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '▸ Products: ' + prods.length + '\n' +
            '▸ Total Qty: ' + tq + '\n' +
            '▸ Items:' + pl + '\n\n' +
            (msg ?
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                '💬 ADDITIONAL NOTES\n' +
                '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
                msg + '\n\n'
            : '') +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '📍 Source: dimazo.in\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━';

        window.open('https://wa.me/917000418227?text=' + encodeURIComponent(wa), '_blank');
        showBulkToast('Opening WhatsApp with your inquiry...');

        setTimeout(function () {
            ['b-name', 'b-phone', 'b-email', 'b-city', 'b-msg'].forEach(function (id) {
                var el = document.getElementById(id);
                if (el) el.value = '';
            });
            document.querySelectorAll('.bp-card.selected').forEach(function (c) {
                c.classList.remove('selected');
                var ck = c.querySelector('.bp-check');
                ck.classList.remove('checked');
                ck.setAttribute('aria-checked', 'false');
                c.querySelector('.bp-qty span').textContent = '0';
            });
            updateSelectedCount();
            closeBulkModal();
        }, 1500);
    };

    function showBulkToast(msg) {
        var t = document.getElementById('toast');
        if (!t) return;
        t.innerHTML = '<span class="toast-icon">✓</span> ' + msg;
        t.classList.add('show');
        clearTimeout(window._bulkTT);
        window._bulkTT = setTimeout(function () { t.classList.remove('show'); }, 4500);
    }

    // === KEYBOARD SUPPORT ===
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && bulkOpen) closeBulkModal();
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('bp-check')) {
            e.preventDefault();
            bulkToggleCheck(e.target);
        }
    });

    // === INIT ===
    document.addEventListener('DOMContentLoaded', function () {
        buildGrid();

        // Prevent overlay-click from propagating through modal content
        var content = document.querySelector('.bulk-content');
        if (content) {
            content.addEventListener('click', function (e) { e.stopPropagation(); });
        }
    });

})();