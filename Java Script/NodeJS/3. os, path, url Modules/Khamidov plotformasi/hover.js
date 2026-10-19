
document.querySelectorAll('h2').forEach(item => {
    item.addEventListener('click', function() {
        
        this.classList.toggle('active'); 
    });
});
