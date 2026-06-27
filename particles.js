if (!document.getElementById("particles") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const canvas = document.createElement("canvas");
  canvas.id = "particles";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = window.innerWidth < 768 ? 18 : 46;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.7 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35
    }));
  };

  resize();
  window.addEventListener("resize", resize);

  const draw = () => {
    const color = getComputedStyle(document.body).getPropertyValue("--primary").trim() || "#00e5ff";
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  };

  draw();
}
