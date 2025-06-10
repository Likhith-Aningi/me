// Experience calculator
function updateExperience() {
    const startDate = new Date('2022-10-01'); // October 2022
    const currentDate = new Date();
    // Calculate years difference
    let yearsDiff = currentDate.getFullYear() - startDate.getFullYear();
    // Adjust for months if we haven't reached October in the current year
    if (currentDate.getMonth() < startDate.getMonth() ||
        (currentDate.getMonth() === startDate.getMonth() && currentDate.getDate() < startDate.getDate())) {
        yearsDiff--;
    }
    // Determine the display text (2+, 3+, etc.)
    const displayYears = yearsDiff >= 2 ? Math.floor(yearsDiff) + "+" : "2+";
    // Update all instances of experience years using jQuery
    $('.toChange').text(displayYears);
    $('.exp h1').first().text(displayYears + " YEARS OF");
    // Update in profile description using jQuery
    const $description = $('#Home p');
    $description.html($description.html().replace(/\d\+\s*years/, displayYears + " years"));
}

// Initialize VANTA fog effect
function initVantaFog() {
    VANTA.FOG({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 600,
        minWidth: 300,
        highlightColor: 0x9b9b9b,
        midtoneColor: 0x444444,
        lowlightColor: 0x0,
        baseColor: 0x151312,
        blurFactor: 0.6,
        speed: 1.0,
        zoom: 1.4
    });
}

// Initialize particles.js
function initParticles() {
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.2,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.3,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffffff",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "window",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.4
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                },
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Initialize automatic social links glow
function initSocialLinksGlow() {
    const socialLinks = {
        linkedin: $('a[href*="linkedin"]'),
        github: $('.toGlow'),
        leetcode: $('a[href*="leetcode"]'),
        resume: $('a[href*="resume"]')
    };

    const platforms = Object.keys(socialLinks);
    let currentIndex = 0;

    // Function to remove all glows
    function removeAllGlows() {
        Object.values(socialLinks).forEach(link => {
            link.removeClass('glow-linkedin glow-github glow-leetcode glow-resume glowing');
        });
    }

    // Function to add glow to specific platform
    function glowPlatform(platform) {
        removeAllGlows();
        socialLinks[platform].addClass(`glow-${platform} glowing`);
    }

    // Initial glow
    glowPlatform(platforms[0]);

    // Set interval for cycling through platforms
    setInterval(() => {
        currentIndex = (currentIndex + 1) % platforms.length;
        glowPlatform(platforms[currentIndex]);
    }, 2500); // 2.5 seconds per platform = 10 seconds total cycle

    // Keep hover effects
    Object.entries(socialLinks).forEach(([platform, link]) => {
        link.hover(
            function () {
                removeAllGlows();
                $(this).addClass(`glow-${platform} glowing`);
            },
            function () {
                if (!$(this).hasClass(`glow-${platforms[currentIndex]}`)) {
                    $(this).removeClass(`glow-${platform} glowing`);
                    glowPlatform(platforms[currentIndex]);
                }
            }
        );
    });
}

// Initialize VANTA fog effect
initVantaFog();

// Initialize particles
initParticles();

// Initialize experience counter
updateExperience();

// Initialize social links glow
initSocialLinksGlow();

// Update experience every day
setInterval(updateExperience, 86400000);

// Add smooth scrolling to all navigation links
$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();

    const target = $(this.hash);
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 80
        }, 500, 'swing');
    }
});
$('.ui-toggle').on('click', function () {
    $('#uiDropdown').toggle();
});

$('#uiDropdown li').on('click', function () {
    const theme = $(this).data('ui');
    if (theme === 'classic') {
        window.location.href = 'classic-ui.html';
    } else if (theme === 'clean') {
        window.location.href = 'clean-ui.html';
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('.ui-switcher').length) {
        $('#uiDropdown').hide();
    }
});
$(window).on('scroll', function () {
    $('#uiDropdown').hide();
});
if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    $(document).on("contextmenu", function (e) {
        e.preventDefault();
    });
    $(document).on("keydown", function (e) {
        if (e.key === "F12") {
            e.preventDefault();
        }
    });
}
if (/Windows/.test(navigator.userAgent)) {
  $("#gameDownload").show();
}