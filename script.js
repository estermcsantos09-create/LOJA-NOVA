const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter.active')?.classList.remove('active');
    button.classList.add('active');
    const category = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'todos' && card.dataset.category !== category);
    });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Substitua pelo número do WhatsApp do estúdio, com código do país e DDD.
// Exemplo: 5511999999999 (somente números).
const WHATSAPP_NUMBER = '';

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    'Olá! Vim pelo site do Stars Studio e gostaria de solicitar um orçamento.',
    '',
    `Nome: ${form.get('name')}`,
    `E-mail: ${form.get('email')}`,
    `Serviço: ${form.get('service')}`,
    `Projeto: ${form.get('message')}`
  ].join('\n');

  if (!WHATSAPP_NUMBER) {
    alert('O formulário está pronto! Para ativar o envio, adicione o número de WhatsApp do Stars Studio no arquivo script.js.');
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-heading, .service-card, .project-card, .process-steps > div, .intro-content').forEach(element => {
  element.classList.add('reveal');
  observer.observe(element);
});
