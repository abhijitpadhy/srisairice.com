// js code for produt page

window.onload = () => {
  console.log('GSAP loaded successfully');

  gsap.registerPlugin(ScrollTrigger);

  // Set the initial background color on load
  gsap.set('.gallery', { backgroundColor: '#FFc63e', color: '#1e1e1e' });

  // Set initial state for all photos except the first one
  gsap.set('.photo:not(:first-child)', { opacity: 1, scale: 1, y: '100%' });

  // Define the animation for the photo transition
  const photoAnimation = gsap.to('.photo:not(:first-child)', {
    opacity: 1,
    scale: 1,
    duration: 0.2,
    stagger: 1,
    y: '0%',
  });

  // Pin the `.right` section and apply the photo transition on scroll
  ScrollTrigger.create({
    trigger: '.gallery',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.right',
    animation: photoAnimation,
    scrub: true,
  });

  // Background and text color transitions for each section
  const colorTransitions = [
    { trigger: '.d1', backgroundColor: '#94154B', textColor: '#fff' },
    { trigger: '.d2', backgroundColor: '#541182', textColor: '#fff' },
    { trigger: '.d3', backgroundColor: '#94154B', textColor: '#fff' },
    { trigger: '.d4', backgroundColor: '#541182', textColor: '#fff' },
  ];

  // Apply color transitions for each section
  colorTransitions.forEach(({ trigger, backgroundColor, textColor }) => {
    ScrollTrigger.create({
      trigger,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      toggleActions: 'play none none reverse',
      onToggle: ({ isActive }) => {
        gsap.to('.gallery', {
          backgroundColor: isActive ? backgroundColor : '#FFc63e', // Reset to initial color if inactive
          color: isActive ? textColor : '#fff',
          overwrite: 'auto',
        });
      },
    });
  });

  // Reset color to initial when scrolled back to the top
  ScrollTrigger.create({
    trigger: '.gallery',
    start: 'top top',
    end: 'top+=1',
    scrub: true,
    onEnter: () => gsap.to('.project-one', { backgroundColor: '#FFc63e', color: '#1e1e1e', overwrite: 'auto' }),
    onEnterBack: () => gsap.to('.project-one', { backgroundColor: '#FFc63e', color: '#1e1e1e', overwrite: 'auto' }),
  });
};


// js code for produt page end

//  pop up form code
// Open and close functions
function openForm(event) {
  event.preventDefault(); // Prevent # from being added to the URL
  document.getElementById("popupForm").style.display = "flex";
  document.body.style.overflow = "hidden"; // Disable background scrolling
}

function closeForm() {
  const form = document.getElementById("popupForm");
  form.querySelector('.popup-form__content').style.transform = "translateY(-100vh)"; // Move form up on close
  setTimeout(() => {
      form.style.display = "none";
      form.querySelector('.popup-form__content').style.transform = "translateY(0)"; // Reset position for next open
      document.body.style.overflow = "auto"; // Re-enable background scrolling
  }, 300); // Wait for the animation to complete before hiding
}

// Form submission code
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("popupFormContent"); // Adjusted to avoid ID conflict

  form.onsubmit = function (e) {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(form); // Collect form data

      // Show loading spinner
      document.getElementById("loadingSpinner").style.display = "inline"; // Show spinner

      fetch("https://srisai-b-2.onrender.com/send-email", {
          method: "POST",
          body: formData, // Send FormData as the body
      })
      .then((response) => response.text())
      .then((data) => {
          console.log("Response from server:", data); // Debugging

          // Hide loading spinner
          document.getElementById("loadingSpinner").style.display = "none";

          // Show success message
          Toastify({
              text: data,
              style: {
                background: "linear-gradient(to right, #FFC63E, #FF9E1F)", // Success color
                color: "#000",
              },
              duration: 3000,
              close: true,
          }).showToast();

          // Reset the form fields
          form.reset();
      })
      .catch((error) => {
          console.error("Error:", error);
          // Hide loading spinner
          document.getElementById("loadingSpinner").style.display = "none";

          // Show error message
          Toastify({
              text: "Failed to send email.",
              style: {
                  background: "linear-gradient(to right, #ff5f6d, #ffc3a0)", // Error color
              },
              duration: 3000,
              close: true,
          }).showToast();
      });
  };
});



// about us timeline start

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// Set initial states
gsap.set('.timeline-item', { opacity: 0, y: 50 });
gsap.set('.timeline-ball', { opacity: 0 }); // Initially hide the ball

function initDesktopAnimations() {
    if (window.innerWidth >= 769) {
        // Create a timeline for the ball movement
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".timeline-container",
                start: "top center",
                end: "bottom center",
                scrub: 0.5,
                onEnter: () => gsap.to('.timeline-ball', { opacity: 1, duration: 0.5 }) // Make the ball visible
            }
        });

        // Add the ball movement to the timeline
        tl.to(".timeline-ball", {
            duration: 1,
            ease: "none",
            motionPath: {
                path: "#motionPath",
                align: "#motionPath",
                alignOrigin: [0.5, 0.5],
                autoRotate: false
            }
        });
    }
}

// Animate timeline items
document.querySelectorAll('.timeline-item').forEach((item) => {
    gsap.to(item, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
        }
    });
});

// Initialize animations
initDesktopAnimations();

// Handle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Kill all ScrollTrigger instances
        ScrollTrigger.getAll().forEach(st => st.kill());
        // Reinitialize animations
        initDesktopAnimations();
    }, 250);
});

//// about us timeline end





