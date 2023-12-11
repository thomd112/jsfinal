document.addEventListener('DOMContentLoaded', function () {
    const hairContainer = document.getElementById('hair-container');
    const shaver = document.getElementById('shaver');
  

    let isDragging = false;

    shaver.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', dragShaver);
    document.addEventListener('mouseup', stopDragging);
  

    for (let i = 0; i < 200; i++) {
      const hairStrand = document.createElement('div');
      hairStrand.classList.add('hair-strand');
      hairContainer.appendChild(hairStrand);
    }
  
    function startDragging(event) {
      isDragging = true;
  
  
      const offsetX = event.clientX - shaver.getBoundingClientRect().left;
      const offsetY = event.clientY - shaver.getBoundingClientRect().top;
  
     
      function updatePosition(event) {
        if (isDragging) {
          const x = event.clientX - offsetX;
          const y = event.clientY - offsetY;
  

          const maxX = window.innerWidth - shaver.offsetWidth;
          const maxY = window.innerHeight - shaver.offsetHeight;
  
          shaver.style.left = `${Math.min(maxX, Math.max(0, x))}px`;
          shaver.style.top = `${Math.min(maxY, Math.max(0, y))}px`;
        }
      }
  
  
      document.addEventListener('mousemove', updatePosition);
  
      
      document.addEventListener('mouseup', function () {
        isDragging = false;
        document.removeEventListener('mousemove', updatePosition);
      });
    }
  
    function dragShaver(event) {
      if (isDragging) {
       
        event.preventDefault();
  
        const x = event.clientX - shaver.offsetWidth / 2;
        const y = event.clientY - shaver.offsetHeight / 2;
  
      
        const maxX = window.innerWidth - shaver.offsetWidth;
        const maxY = window.innerHeight - shaver.offsetHeight;
  
        shaver.style.left = `${Math.min(maxX, Math.max(0, x))}px`;
        shaver.style.top = `${Math.min(maxY, Math.max(0, y))}px`;
      }
    }
  
    function stopDragging() {
      isDragging = false;
    }
  

    function shaveHair(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
  
      const hairStrands = document.querySelectorAll('.hair-strand');
  
      hairStrands.forEach((hairStrand) => {
        const rect = hairStrand.getBoundingClientRect();
  
        if (
          mouseX >= rect.left &&
          mouseX <= rect.right &&
          mouseY >= rect.top &&
          mouseY <= rect.bottom
        ) {
          hairStrand.style.opacity = 0; 
        }
      });
    }
  
    shaver.addEventListener('mousemove', shaveHair);
  });
  
  