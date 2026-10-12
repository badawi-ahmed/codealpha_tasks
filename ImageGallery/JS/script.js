

const galleryGrid = document.getElementById("galleryGrid");
const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const filterButtons = document.querySelectorAll(".filter-btn");
const imageCount = document.getElementById("imageCount");
const emptyMessage = document.getElementById("emptyMessage");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxCounter = document.getElementById("lightboxCounter");

const closeButton = document.getElementById("closeLightbox");
const prevButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");

// ==============================
// 2. Gallery Variables
// ==============================

let visibleImages = [];
let currentIndex = 0;
let lastFocusedElement = null;

// ==============================
// 3. Update Gallery
// ==============================

function updateGallery() {
    visibleImages = galleryItems.filter(function (item) {
        return !item.hidden;
    });

    const count = visibleImages.length;

    imageCount.textContent =
        count + (count === 1 ? " photograph" : " photographs");

    emptyMessage.hidden = count !== 0;
}

// ==============================
// 4. Filter Images
// ==============================

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.filter;

        filterButtons.forEach(function (filterButton) {
            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);

            filterButton.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });

        galleryItems.forEach(function (item) {
            const category = item.dataset.category;

            item.hidden =
                selectedCategory !== "all" &&
                category !== selectedCategory;
        });

        updateGallery();
    });
});

// ==============================
// 5. Open Lightbox
// ==============================

function openLightbox(index) {
    if (visibleImages.length === 0) {
        return;
    }

    currentIndex = index;
    lastFocusedElement = document.activeElement;

    lightbox.inert = false;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");

    showImage(currentIndex);
    closeButton.focus();
}

// ==============================
// 6. Display Image
// ==============================

function showImage(index) {
    if (visibleImages.length === 0) {
        return;
    }

    const total = visibleImages.length;

    currentIndex = (index + total) % total;

    const item = visibleImages[currentIndex];
    const image = item.querySelector("img");
    const title = item.querySelector(".image-title");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;
    lightboxCategory.textContent = item.dataset.category.toUpperCase();

    lightboxCounter.textContent =
        String(currentIndex + 1).padStart(2, "0") +
        " / " +
        String(total).padStart(2, "0");
}

// ==============================
// 7. Next and Previous
// ==============================

function nextImage() {
    showImage(currentIndex + 1);
}

function previousImage() {
    showImage(currentIndex - 1);
}

nextButton.addEventListener("click", nextImage);

prevButton.addEventListener("click", previousImage);

// ==============================
// 8. Close Lightbox
// ==============================

function closeLightbox() {
    if (!lightbox.classList.contains("open")) {
        return;
    }

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.inert = true;

    document.body.classList.remove("lightbox-open");

    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";

    if (
        lastFocusedElement &&
        document.contains(lastFocusedElement)
    ) {
        lastFocusedElement.focus();
    }

    lastFocusedElement = null;
}

closeButton.addEventListener("click", closeLightbox);

// Close when clicking the background
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// ==============================
// 9. Click Gallery Images
// ==============================

galleryGrid.addEventListener("click", function (event) {
    const card = event.target.closest(".image-card");

    if (!card) {
        return;
    }

    const item = card.closest(".gallery-item");
    const index = visibleImages.indexOf(item);

    if (index !== -1) {
        openLightbox(index);
    }
});

// ==============================
// 10. Keyboard Controls
// ==============================

document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        nextImage();
    }

    if (event.key === "ArrowLeft") {
        previousImage();
    }
});

// ==============================
// 11. Initialize Gallery
// ==============================

galleryItems.forEach(function (item) {
    const card = item.querySelector(".image-card");

    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-expanded", "false");
});

updateGallery();