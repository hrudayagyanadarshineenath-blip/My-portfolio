/* =========================================================
   HRUDAYA GYANADARSHINEE NATH - PORTFOLIO
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVIGATION
    ===================================================== */

    const desktopNavLinks = document.querySelectorAll(".nav-links a");
    const mobileNavLinks = document.querySelectorAll(".mobile-menu a");

    const allNavLinks = [
        ...desktopNavLinks,
        ...mobileNavLinks
    ];


    /* -----------------------------------------------------
       Navigation Links
       ----------------------------------------------------- */

    allNavLinks.forEach(link => {

        link.addEventListener("click", function () {

            const target = this.getAttribute("href");

            if (!target) {
                return;
            }

            /*
             * Let the browser open the requested page normally.
             * This makes:
             *
             * Home     -> index.html
             * About    -> about.html
             * Projects -> projects.html
             * Contact  -> about.html#contact
             */

            window.location.href = target;
        });

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            mobileMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen =
                mobileMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* -------------------------------------------------
           Close Mobile Menu After Clicking a Link
        ------------------------------------------------- */

        mobileNavLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    const currentHash =
        window.location.hash;

    const navLinks =
        document.querySelectorAll(
            ".nav-links a, .mobile-menu a"
        );


    navLinks.forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (!linkPage) {
            return;
        }


        /* Remove existing active class */

        link.classList.remove("active");


        /* -------------------------------------------------
           Home
        ------------------------------------------------- */

        if (
            (currentPage === "index.html" ||
                currentPage === "") &&
            linkPage === "index.html"
        ) {

            link.classList.add("active");
        }


        /* -------------------------------------------------
           About
        ------------------------------------------------- */

        else if (
            currentPage === "about.html" &&
            linkPage === "about.html"
        ) {

            link.classList.add("active");
        }


        /* -------------------------------------------------
           Projects
        ------------------------------------------------- */

        else if (
            currentPage === "projects.html" &&
            linkPage === "projects.html"
        ) {

            link.classList.add("active");
        }


        /* -------------------------------------------------
           Contact
        ------------------------------------------------- */

        else if (
            currentPage === "about.html" &&
            currentHash === "#contact" &&
            linkPage === "about.html#contact"
        ) {

            link.classList.add("active");
        }

    });


    /* =====================================================
       NAVBAR SCROLL EFFECT
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 30) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        };


        window.addEventListener(
            "scroll",
            updateNavbar
        );

        updateNavbar();
    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* =====================================================
       SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".intro-card, .project-card, " +
            ".education-item, .skill-card, " +
            ".course-card, .value-card, " +
            ".contact-card, .about-content, " +
            ".about-visual, .learning-card"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("show");

        });

    }


    /* =====================================================
       PROJECT CARD HOVER EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "perspective(900px) " +
                    "rotateX(0deg) " +
                    "rotateY(0deg) " +
                    "translateY(0)";

            }
        );

    });



    /* =========================================================
       BACKGROUND ANIMATION — SYNAPTIC NETWORK
       Moving nodes with mouse-triggered travelling signal pulses
    ========================================================= */

    const canvas = document.getElementById("bg-canvas");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let neurons = [];
        let pulses = [];
        let animationFrame = null;

        const MAX_PULSES = 180;
        const CONNECTION_DISTANCE = 160;
        const MOUSE_RADIUS = 150;

        const mouse = {
            x: -1000,
            y: -1000
        };

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        class Neuron {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;

                this.radius = Math.random() * 2.5 + 2;
                this.neighbors = [];

                this.phase = Math.random() * Math.PI * 2;
                this.color =
                    Math.random() > 0.5 ? "#E11D48" : "#881337";
            }

            update() {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < MOUSE_RADIUS) {
                    // Excite nearby neurons and create signal pulses.
                    if (
                        this.neighbors.length > 0 &&
                        pulses.length < MAX_PULSES &&
                        Math.random() < 0.045
                    ) {
                        const neighbor =
                            this.neighbors[
                            Math.floor(
                                Math.random() * this.neighbors.length
                            )
                            ];

                        addPulse(this, neighbor);
                    }

                    // Gentle movement near the cursor.
                    this.x += (Math.random() - 0.5) * 1.8;
                    this.y += (Math.random() - 0.5) * 1.8;
                }

                // Return toward the original position.
                this.x += (this.baseX - this.x) * 0.035;
                this.y += (this.baseY - this.y) * 0.035;

                // Occasional ambient signal.
                if (
                    this.neighbors.length > 0 &&
                    pulses.length < MAX_PULSES &&
                    Math.random() < 0.0007
                ) {
                    const neighbor =
                        this.neighbors[
                        Math.floor(
                            Math.random() * this.neighbors.length
                        )
                        ];

                    addPulse(this, neighbor);
                }

                this.phase += 0.025;
            }

            draw() {
                const glow = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.radius * 5
                );

                glow.addColorStop(
                    0,
                    "rgba(253, 164, 175, 0.55)"
                );
                glow.addColorStop(
                    1,
                    "rgba(253, 164, 175, 0)"
                );

                ctx.beginPath();
                ctx.fillStyle = glow;
                ctx.arc(
                    this.x,
                    this.y,
                    this.radius * 5,
                    0,
                    Math.PI * 2
                );
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.arc(
                    this.x,
                    this.y,
                    this.radius,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }

        class Pulse {
            constructor(from, to) {
                this.from = from;
                this.to = to;
                this.progress = 0;
                this.speed = Math.random() * 0.018 + 0.018;
            }

            update() {
                this.progress += this.speed;
            }

            draw() {
                const x =
                    this.from.x +
                    (this.to.x - this.from.x) * this.progress;

                const y =
                    this.from.y +
                    (this.to.y - this.from.y) * this.progress;

                ctx.save();

                ctx.shadowBlur = 12;
                ctx.shadowColor = "#E11D48";
                ctx.fillStyle = "#E11D48";

                ctx.beginPath();
                ctx.arc(x, y, 2.5, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        function addPulse(from, to) {
            if (pulses.length < MAX_PULSES) {
                pulses.push(new Pulse(from, to));
            }
        }

        function initializeNetwork() {
            neurons = [];
            pulses = [];

            const count = Math.max(
                30,
                Math.min(
                    140,
                    Math.floor((width * height) / 18000)
                )
            );

            for (let i = 0; i < count; i++) {
                neurons.push(
                    new Neuron(
                        Math.random() * width,
                        Math.random() * height
                    )
                );
            }

            // Connect nearby neurons.
            for (let i = 0; i < neurons.length; i++) {
                for (let j = i + 1; j < neurons.length; j++) {
                    const dx = neurons[i].x - neurons[j].x;
                    const dy = neurons[i].y - neurons[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        neurons[i].neighbors.push(neurons[j]);
                        neurons[j].neighbors.push(neurons[i]);
                    }
                }
            }
        }

        function drawConnections() {
            ctx.lineWidth = 0.8;

            for (let i = 0; i < neurons.length; i++) {
                const neuron = neurons[i];

                for (const neighbor of neuron.neighbors) {
                    // Draw each connection only once.
                    if (neurons.indexOf(neighbor) <= i) {
                        continue;
                    }

                    const dx = neuron.x - neighbor.x;
                    const dy = neuron.y - neighbor.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    const opacity = Math.max(
                        0.06,
                        0.35 * (1 - distance / CONNECTION_DISTANCE)
                    );

                    ctx.beginPath();
                    ctx.strokeStyle =
                        `rgba(225, 29, 72, ${opacity})`;

                    ctx.moveTo(neuron.x, neuron.y);
                    ctx.lineTo(neighbor.x, neighbor.y);
                    ctx.stroke();
                }
            }
        }

        function drawFrame() {
            ctx.clearRect(0, 0, width, height);

            drawConnections();

            // Update and draw travelling signals.
            for (let i = pulses.length - 1; i >= 0; i--) {
                const pulse = pulses[i];

                pulse.update();
                pulse.draw();

                if (pulse.progress >= 1) {
                    pulses.splice(i, 1);
                }
            }

            for (const neuron of neurons) {
                if (!prefersReducedMotion) {
                    neuron.update();
                }

                neuron.draw();
            }
        }

        function animate() {
            drawFrame();

            if (!prefersReducedMotion) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        function resizeCanvas() {
            const dpr = Math.min(
                window.devicePixelRatio || 1,
                2
            );

            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            initializeNetwork();

            if (prefersReducedMotion) {
                drawFrame();
            }
        }

        // Mouse interaction.
        window.addEventListener("mousemove", (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        });

        window.addEventListener("mouseout", (event) => {
            if (!event.relatedTarget) {
                mouse.x = -1000;
                mouse.y = -1000;
            }
        });

        // Touch interaction for mobile devices.
        window.addEventListener(
            "touchmove",
            (event) => {
                if (event.touches.length > 0) {
                    mouse.x = event.touches[0].clientX;
                    mouse.y = event.touches[0].clientY;
                }
            },
            { passive: true }
        );

        window.addEventListener("touchend", () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        window.addEventListener("resize", resizeCanvas);

        resizeCanvas();
        animate();

        window.addEventListener("beforeunload", () => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
            }
        });
    }

    /* -----------------------------------------------------
       Particle Class
    ----------------------------------------------------- */

    class Particle {

        constructor() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;


            this.size =
                Math.random() * 2 + 1;


            this.speedX =
                (Math.random() - 0.5) * 0.7;

            this.speedY =
                (Math.random() - 0.5) * 0.7;

        }


        /* -------------------------------------------------
           Update
        ------------------------------------------------- */

        update() {

            this.x += this.speedX;
            this.y += this.speedY;


            /* Screen boundaries */

            if (
                this.x <= 0 ||
                this.x >= width
            ) {

                this.speedX *= -1;

            }


            if (
                this.y <= 0 ||
                this.y >= height
            ) {

                this.speedY *= -1;

            }


            /* Mouse interaction */

            if (
                mouse.active &&
                mouse.x !== null &&
                mouse.y !== null
            ) {

                const dx =
                    this.x - mouse.x;

                const dy =
                    this.y - mouse.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < MOUSE_RADIUS &&
                    distance > 0
                ) {

                    const force =
                        (MOUSE_RADIUS - distance) /
                        MOUSE_RADIUS;


                    this.x +=
                        (dx / distance) *
                        force *
                        2;


                    this.y +=
                        (dy / distance) *
                        force *
                        2;

                }

            }

        }


        /* -------------------------------------------------
           Draw
        ------------------------------------------------- */

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "rgba(225, 29, 72, 0.55)";


            ctx.fill();

        }

    }


    /* -----------------------------------------------------
       Create Particles
    ----------------------------------------------------- */

    function createParticles() {

        particles.length = 0;


        for (
            let i = 0;
            i < PARTICLE_COUNT;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }


    createParticles();


    /* -----------------------------------------------------
       Connect Particles
    ----------------------------------------------------- */

    function connectParticles() {

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const particleA =
                    particles[i];

                const particleB =
                    particles[j];


                const dx =
                    particleA.x -
                    particleB.x;

                const dy =
                    particleA.y -
                    particleB.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    MAX_DISTANCE
                ) {

                    const opacity =
                        1 -
                        distance /
                        MAX_DISTANCE;


                    ctx.beginPath();


                    ctx.moveTo(
                        particleA.x,
                        particleA.y
                    );


                    ctx.lineTo(
                        particleB.x,
                        particleB.y
                    );


                    ctx.strokeStyle =
                        `rgba(253, 164, 175, ${opacity * 0.55})`;


                    ctx.lineWidth = 0.7;


                    ctx.stroke();

                }

            }

        }

    }


    /* -----------------------------------------------------
       Mouse Position
    ----------------------------------------------------- */

    window.addEventListener(
        "mousemove",
        event => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

            mouse.active = true;

        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;
            mouse.y = null;
            mouse.active = false;

        }
    );


    /* -----------------------------------------------------
       Touch Support
    ----------------------------------------------------- */

    window.addEventListener(
        "touchmove",
        event => {

            if (
                event.touches.length > 0
            ) {

                mouse.x =
                    event.touches[0].clientX;

                mouse.y =
                    event.touches[0].clientY;

                mouse.active = true;

            }

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        () => {

            mouse.x = null;
            mouse.y = null;
            mouse.active = false;

        }
    );


    /* -----------------------------------------------------
       Animation
    ----------------------------------------------------- */

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            particle => {

                particle.update();
                particle.draw();

            }
        );


        connectParticles();


        requestAnimationFrame(
            animate
        );

    }


    /* =====================================================
       REDUCED MOTION
    ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (!prefersReducedMotion) {

        animate();

    } else {

        particles.forEach(
            particle => {

                particle.draw();

            }
        );


        connectParticles();

    }


    /* =====================================================
       RESIZE PARTICLES
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            particles.forEach(
                particle => {

                    if (
                        particle.x > width
                    ) {

                        particle.x =
                            Math.random() *
                            width;

                    }


                    if (
                        particle.y > height
                    ) {

                        particle.y =
                            Math.random() *
                            height;

                    }

                }
            );

        }
    );


    /* =====================================================
       PAGE LOAD EFFECT
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date().getFullYear();

        }
    );

});