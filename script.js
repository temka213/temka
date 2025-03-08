let cartCount = 0;
let activeCategory = 'nogo';

// Дэлгүүрийн товчлуурын функц
function toggleShop() {
    const shopButton = document.getElementById('shopToggle');
    const shopContent = document.getElementById('shopContent');
    const typingAnimation = document.getElementById('typingAnimation');
    
    if (shopButton.innerText === "Shop ON") {
        shopButton.innerText = "Shop OFF";
        shopContent.classList.add('hidden');
        typingAnimation.classList.remove('hidden');
    } else {
        shopButton.innerText = "Shop ON";
        shopContent.classList.remove('hidden');
        typingAnimation.classList.add('hidden');
    }
}

// Ангилал солих функц
function toggleCategory(category) {
    if(activeCategory === category) return;
    
    document.getElementById(activeCategory).classList.add('hidden');
    document.getElementById(category).classList.remove('hidden');
    activeCategory = category;
    
    // Товчны стилийг шинэчлэх
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        btn.classList.add('bg-gray-600', 'hover:bg-gray-700');
    });
    document.getElementById(`btn-${category}`).classList.add('bg-blue-500', 'hover:bg-blue-600');
}

// Сагсанд нэмэх функц
function addToCart(productName, price) {
    cartCount++;
    updateCartCounter();
    showToast(`${productName} сагсанд нэмэгдлээ!`);
}

// Сагсны тоолуур шинэчлэх
function updateCartCounter() {
    document.getElementById('cart-count').textContent = cartCount;
}

// Toast мэдэгдэл харуулах
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg opacity-0 animate-fade-in-out';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Чатботын функционал
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatbot-input');
    const chatMessages = document.getElementById('chatbot-messages');

    document.getElementById('chatbot-toggle').addEventListener('click', () => {
        document.getElementById('chatbot-window').classList.toggle('hidden');
    });

    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    document.querySelector('#chatbot-window button').addEventListener('click', () => {
        document.getElementById('chatbot-window').classList.add('hidden');
    });
});

function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    // Хэрэглэгчийн мессеж
    const userDiv = document.createElement('div');
    userDiv.className = 'user-message';
    userDiv.textContent = message;
    document.getElementById('chatbot-messages').appendChild(userDiv);

    // Ботын хариу
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'bot-message';
        botDiv.textContent = generateBotResponse(message);
        document.getElementById('chatbot-messages').appendChild(botDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    input.value = '';
}

// Чатботын автомат хариу үүсгэх
function generateBotResponse(message) {
    const responses = {
        'сайн уу': 'Сайн байна уу! Танд хэрхэн туслах вэ?',
        'баярлалаа': 'Таныг үйлчлэхэд баяртай байна!',
        'default': 'Би таны асуултыг ойлгож чадсангүй. Утасаар холбогдох уу?'
    };

    return responses[message.toLowerCase()] || responses['default'];
}