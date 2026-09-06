import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./RestaurantPage.module.css";

/* ------------------------------------------------------------------ */
/*  Sample data — swap these out for real API data                    */
/* ------------------------------------------------------------------ */

const FOOD_IMAGES = [
  { id: "img1", url: "https://picsum.photos/seed/thali/800/450", alt: "Rajasthani thali" },
  { id: "img2", url: "https://picsum.photos/seed/paneer/800/450", alt: "Paneer curry" },
  { id: "img3", url: "https://picsum.photos/seed/dal/800/450", alt: "Dal makhani" },
  { id: "img4", url: "https://picsum.photos/seed/sweets/800/450", alt: "Indian sweets" },
  { id: "img5", url: "https://picsum.photos/seed/roti/800/450", alt: "Tandoori roti basket" },
];

const OFFERS = [
  { id: "o1", title: "Flat ₹150 OFF above ₹349", subtitle: "Use code WELCOME150", icon: "🎟️" },
  { id: "o2", title: "20% OFF up to ₹100", subtitle: "Valid on orders above ₹199", icon: "💳" },
  { id: "o3", title: "Free dessert on ₹499+", subtitle: "Applied automatically at checkout", icon: "🍮" },
  { id: "o4", title: "10% OFF for new users", subtitle: "Use code NEW10, max ₹75", icon: "✨" },
  { id: "o5", title: "Bank offer: 5% cashback", subtitle: "On HDFC credit cards", icon: "🏦" },
  { id: "o6", title: "Free delivery this weekend", subtitle: "No minimum order value", icon: "🚴" },
];

const MENU = [
  {
    id: "s1",
    title: "Recommended",
    items: [
      { id: "m1", name: "Deluxe Thali", price: 249, veg: true, desc: "4 sabzi, dal, rice, 6 roti, salad & sweet" },
      { id: "m2", name: "Paneer Butter Masala", price: 189, veg: true, desc: "Creamy tomato gravy with paneer cubes" },
      { id: "m3", name: "Dal Makhani", price: 149, veg: true, desc: "Slow-cooked black lentils with butter & cream" },
    ],
  },
  {
    id: "s2",
    title: "Main Course",
    items: [
      { id: "m4", name: "Kadhai Vegetable", price: 169, veg: true, desc: "Mixed veggies tossed in a spiced kadhai gravy" },
      { id: "m5", name: "Malai Kofta", price: 199, veg: true, desc: "Fried veg dumplings in a rich cashew gravy" },
      { id: "m6", name: "Jeera Rice", price: 99, veg: true, desc: "Basmati rice tempered with cumin" },
    ],
  },
  {
    id: "s3",
    title: "Breads",
    items: [
      { id: "m7", name: "Tandoori Roti", price: 20, veg: true, desc: "Whole-wheat bread from the clay oven" },
      { id: "m8", name: "Butter Naan", price: 40, veg: true, desc: "Soft leavened bread brushed with butter" },
    ],
  },
  {
    id: "s4",
    title: "Desserts",
    items: [
      { id: "m9", name: "Gulab Jamun (2 pc)", price: 60, veg: true, desc: "Soft milk dumplings in sugar syrup" },
      { id: "m10", name: "Rasmalai (2 pc)", price: 70, veg: true, desc: "Cottage cheese discs in saffron milk" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Food image carousel                                                */
/* ------------------------------------------------------------------ */

function FoodCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (i) => setIndex(((i % images.length) + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    timerRef.current = setInterval(() => goTo(index + 1), 4000);
    return () => clearInterval(timerRef.current);
  }, [index, goTo]);

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img) => (
          <div className={styles.carouselSlide} key={img.id}>
            <img className={styles.carouselImg} src={img.url} alt={img.alt} />
          </div>
        ))}
      </div>

      <button
        aria-label="Previous image"
        className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
        onClick={() => goTo(index - 1)}
      >
        ‹
      </button>
      <button
        aria-label="Next image"
        className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
        onClick={() => goTo(index + 1)}
      >
        ›
      </button>

      <div className={styles.carouselDots}>
        {images.map((img, i) => (
          <button
            key={img.id}
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Offers dropdown section                                            */
/* ------------------------------------------------------------------ */

function OffersSection({ offers }) {
  const [open, setOpen] = useState(false);
  const topOffer = offers[0];

  return (
    <div className={styles.offersSection}>
      <button
        className={styles.offersSummary}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.offerIcon}>%</span>
        <span className={styles.offersSummaryText}>{topOffer.title}</span>
        <span className={styles.offersCount}>
          {offers.length} offers
          <span className={`${styles.offersChevron} ${open ? styles.offersChevronOpen : ""}`}>
            ⌄
          </span>
        </span>
      </button>

      {open && (
        <ul className={styles.offersList}>
          {offers.map((offer) => (
            <li className={styles.offerItem} key={offer.id}>
              <span className={styles.offerItemIcon}>{offer.icon}</span>
              <span className={styles.offerItemText}>
                <span className={styles.offerItemTitle}>{offer.title}</span>
                <span className={styles.offerItemSubtitle}>{offer.subtitle}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Menu overlay                                                       */
/* ------------------------------------------------------------------ */

function MenuOverlay({ open, onClose, menu }) {
  if (!open) return null;

  return (
    <div className={styles.overlayBackdrop} onClick={onClose}>
      <div
        className={styles.menuOverlay}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Full menu"
      >
        <div className={styles.menuHeader}>
          <h2 className={styles.menuHeaderTitle}>Full Menu</h2>
          <button className={styles.menuCloseBtn} onClick={onClose} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className={styles.menuBody}>
          {menu.map((section) => (
            <div className={styles.menuSection} key={section.id}>
              <h3 className={styles.menuSectionTitle}>{section.title}</h3>
              {section.items.map((item) => (
                <div className={styles.menuItem} key={item.id}>
                  <span className={item.veg ? styles.vegDot : styles.nonVegDot} />
                  <div className={styles.menuItemInfo}>
                    <div className={styles.menuItemName}>{item.name}</div>
                    <div className={styles.menuItemPrice}>₹{item.price}</div>
                    <div className={styles.menuItemDesc}>{item.desc}</div>
                  </div>
                  <button className={styles.addBtn}>ADD</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible section row (Orders & Collections, etc.)              */
/* ------------------------------------------------------------------ */

function CollapsibleRow({ title, subtitle }) {
  const [open, setOpen] = useState(false);
  return (
    <button className={styles.sectionRow} onClick={() => setOpen((o) => !o)}>
      <div>
        <div className={styles.sectionTitle}>{title}</div>
        {subtitle && <div className={styles.sectionSubtitle}>{subtitle}</div>}
      </div>
      <span className={`${styles.chevronBtn} ${open ? styles.chevronOpen : ""}`}>▾</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                          */
/* ------------------------------------------------------------------ */

export default function FoodDetails() {
  const [hideNonVeg, setHideNonVeg] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.page}>
      {/* Top nav */}
      <div className={styles.header}>
        <button className={styles.iconBtn} aria-label="Back">‹</button>
        <div className={styles.navActions}>
          <button className={styles.searchBtn}>
            <span>🔍</span> Search
          </button>
          <button className={styles.iconBtn} aria-label="More options">⋮</button>
        </div>
      </div>

      {/* Food image carousel */}
      <FoodCarousel images={FOOD_IMAGES} />

      {/* Restaurant title + rating */}
      <div className={styles.titleRow}>
        <div>
          <h1 className={styles.title}>
            Jain Shudh Bhojanalya <span className={styles.infoIcon}>ⓘ</span>
          </h1>
        </div>
        <div className={styles.ratingWrap}>
          <div className={styles.ratingBadge}>★ 3.9</div>
          <div className={styles.ratingCount}>By 12K+</div>
        </div>
      </div>

      <div className={styles.infoRow}>
        <span className={styles.infoItem}>📍 3.4 km · Ambedkar Road</span>
      </div>
      <div className={styles.infoRow}>
        <span className={styles.infoItem}>⏱ 40–45 mins · Schedule for later ⌄</span>
      </div>

      <div className={styles.badge}>✓ Last 100 orders without complaints</div>

      {/* Closing soon banner */}
      <div className={styles.closingBanner}>
        <div>
          <span className={styles.closingTag}>CLOSING SOON</span>
          <p className={styles.closingText}>Hurry up! Restaurant closes in 40 minutes</p>
        </div>
        <span className={styles.closingIcon}>⏰</span>
      </div>

      {/* Offers dropdown */}
      <OffersSection offers={OFFERS} />

      {/* Filters */}
      <div className={styles.filtersRow}>
        <button className={styles.filterChip}>⇅ Filters (1) ⌄</button>
        <button
          className={`${styles.filterChip} ${hideNonVeg ? styles.filterChipActive : ""}`}
          onClick={() => setHideNonVeg((v) => !v)}
        >
          🚫 Hide non-veg {hideNonVeg && "✕"}
        </button>
        <button className={styles.filterChip}>↻ Highly rated</button>
      </div>

      {/* Collapsible list sections */}
      <CollapsibleRow title="Your Orders and Collections" subtitle="Past customisations are pre-selected" />
      <CollapsibleRow title="Most ordered together" />
      <CollapsibleRow title="Recommended for you" />

      {/* Floating menu button -> opens overlay */}
      <button className={styles.menuFab} onClick={() => setMenuOpen(true)}>
        🍴 Menu
      </button>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} menu={MENU} />
    </div>
  );
}