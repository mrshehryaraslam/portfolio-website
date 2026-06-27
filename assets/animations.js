const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");

if (menuBtn && siteNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });
}

const typing = document.querySelector(".typing");
if (typing && typing.dataset.text) {
  const text = typing.dataset.text;
  let index = 0;
  typing.textContent = "";
  const type = () => {
    typing.textContent += text.charAt(index);
    index += 1;
    if (index < text.length) setTimeout(type, 42);
  };
  type();
}

const revealItems = document.querySelectorAll(".revealable");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll("a[href]").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || link.target === "_blank") return;
  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => { window.location.href = link.href; }, 220);
  });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(contactForm);
    const subject = encodeURIComponent(`Portfolio Contact from ${form.get("name")}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\nMessage:\n${form.get("message")}`);
    formStatus.textContent = "Opening your email app...";
    window.location.href = `mailto:mrsherryusa@gmail.com?subject=${subject}&body=${body}`;
  });
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (!loader) return;
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";
  setTimeout(() => loader.remove(), 380);
});
