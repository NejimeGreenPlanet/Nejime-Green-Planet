const toggle = document.querySelector('.nav-toggle')
const nav = document.querySelector('.site-nav')
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open')
  })
}

// Scroll Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view')
      observer.unobserve(entry.target) // Animate only once
    }
  })
}, observerOptions)

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el)
})

// Header Fadeout on Footer
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header')
  const footer = document.querySelector('.site-footer')

  if (header && footer) {
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          header.classList.add('hide')
        } else {
          header.classList.remove('hide')
        }
      })
    }, {
      rootMargin: '0px 0px -100px 0px'
    })

    footerObserver.observe(footer)
  }

  // Scroll Spy (Navigation Active State)
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('.site-nav a')

  if (sections.length > 0 && navLinks.length > 0) {
    const scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          const activeLink = document.querySelector(`.site-nav a[href="#${id}"]`)
          
          if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'))
            activeLink.classList.add('active')
          }
        }
      })
    }, {
      rootMargin: '-30% 0px -60% 0px'
    })

    sections.forEach(section => {
      if (document.querySelector(`.site-nav a[href="#${section.id}"]`)) {
        scrollSpyObserver.observe(section)
      }
    })
  }

  // News Accordion
  const newsItems = document.querySelectorAll('.news-item')
  
  newsItems.forEach(item => {
    const header = item.querySelector('.news-header')
    const content = item.querySelector('.news-content')
    
    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open')
        
        if (isOpen) {
          item.classList.remove('open')
          content.style.height = '0px'
        } else {
          item.classList.add('open')
          content.style.height = content.scrollHeight + 'px'
        }
      })
    }
  })

  // Contact Form Handling (Google Apps Script)
  const contactForm = document.querySelector('.contact-form')
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault()
      
      const submitBtn = contactForm.querySelector('button[type="submit"]')
      const originalBtnText = submitBtn.textContent
      submitBtn.disabled = true
      submitBtn.textContent = '送信中...'

      // Google Apps ScriptのURL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbyghkeJBY4vAq0J1879qooxBdd4JejHWsi3D4EhQmTOIORYsyJMHfyje3j8mdx0QVGCoA/exec'

      if (scriptURL === '') {
        alert('送信先が設定されていません。管理者に連絡してください。')
        submitBtn.disabled = false
        submitBtn.textContent = originalBtnText
        return
      }

      const formData = new FormData(contactForm)

      fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })
      .then(response => {
        alert('お問い合わせありがとうございます。送信が完了しました。')
        contactForm.reset()
        submitBtn.disabled = false
        submitBtn.textContent = originalBtnText
      })
      .catch(error => {
        console.error('Error!', error.message)
        alert('送信に失敗しました。時間をおいて再度お試しください。')
        submitBtn.disabled = false
        submitBtn.textContent = originalBtnText
      })
    })
  }
})
