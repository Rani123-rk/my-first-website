// Simple JavaScript for the affiliate site

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add click tracking for affiliate links
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.closest('.product-card').querySelector('h3').textContent;
        
        // Track click (you can replace this with Google Analytics)
        console.log('Affiliate link clicked:', productName);
        
        // Store in localStorage
        let clicks = JSON.parse(localStorage.getItem('affiliateClicks') || '[]');
        clicks.push({
            product: productName,
            time: new Date().toISOString(),
            url: this.href
        });
        localStorage.setItem('affiliateClicks', JSON.stringify(clicks));
    });
});

// Mobile menu toggle
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form validation (if you add a contact form)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Load products from JSON (optional)
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        
        // You can use this to dynamically load products
        console.log('Products loaded:', products);
    } catch (error) {
        console.log('No product data found, using static content');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Affiliate website loaded');
    loadProducts();
    
    // Show welcome message on first visit
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            alert('Welcome to our affiliate site! We recommend products we trust.');
            localStorage.setItem('visited', 'true');
        }, 2000);
    }
});