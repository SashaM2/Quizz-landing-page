// Estado do Quiz
const quizState = {
    currentPage: 1,
    totalPages: 8,
    answers: [],
    progress: 0
};

// Perfis de Resultado
const profiles = {
    lider: {
        badge: '👑',
        title: 'O Líder Visionário',
        description: 'Você tem o perfil de um líder natural com visão estratégica!',
        details: `
            <p><strong>🎯 Seu Perfil:</strong> Você é uma pessoa que lidera pelo exemplo e tem uma visão clara do futuro. Sua capacidade de motivar e inspirar outros é uma das suas maiores forças.</p>
            <p><strong>💪 Pontos Fortes:</strong> Visão estratégica, capacidade de liderança, foco em resultados e habilidade para tomar decisões importantes.</p>
            <p><strong>🚀 Próximos Passos:</strong> Você está pronto para assumir posições de liderança e criar impacto significativo. Seu potencial é ilimitado!</p>
        `,
        strengths: [
            'Liderança natural e inspiradora',
            'Visão estratégica de longo prazo',
            'Capacidade de tomar decisões importantes',
            'Foco em resultados e impacto'
        ]
    },
    executor: {
        badge: '⚡',
        title: 'O Executor de Resultados',
        description: 'Você é focado em ação e resultados concretos!',
        details: `
            <p><strong>🎯 Seu Perfil:</strong> Você é uma pessoa prática e orientada a resultados. Quando você define um objetivo, nada te impede de alcançá-lo.</p>
            <p><strong>💪 Pontos Fortes:</strong> Execução rápida, foco em resultados, disciplina e capacidade de superar obstáculos.</p>
            <p><strong>🚀 Próximos Passos:</strong> Você tem tudo para transformar suas ideias em realidade. Continue focado e os resultados virão!</p>
        `,
        strengths: [
            'Execução rápida e eficiente',
            'Foco absoluto em resultados',
            'Disciplina e persistência',
            'Capacidade de superar desafios'
        ]
    },
    equilibrado: {
        badge: '⚖️',
        title: 'O Equilibrado Estratégico',
        description: 'Você busca equilíbrio e harmonia em tudo que faz!',
        details: `
            <p><strong>🎯 Seu Perfil:</strong> Você é uma pessoa que valoriza o equilíbrio entre diferentes áreas da vida. Sua capacidade de encontrar harmonia é uma grande força.</p>
            <p><strong>💪 Pontos Fortes:</strong> Equilíbrio emocional, visão holística, capacidade de adaptação e inteligência emocional.</p>
            <p><strong>🚀 Próximos Passos:</strong> Você tem o perfil ideal para criar uma vida plena e satisfatória. Continue cultivando esse equilíbrio!</p>
        `,
        strengths: [
            'Equilíbrio entre vida pessoal e profissional',
            'Visão holística das situações',
            'Alta capacidade de adaptação',
            'Inteligência emocional desenvolvida'
        ]
    },
    inovador: {
        badge: '🚀',
        title: 'O Inovador Criativo',
        description: 'Você tem uma mente criativa e inovadora!',
        details: `
            <p><strong>🎯 Seu Perfil:</strong> Você é uma pessoa criativa que pensa fora da caixa. Sua capacidade de inovar e criar soluções únicas é impressionante.</p>
            <p><strong>💪 Pontos Fortes:</strong> Criatividade, pensamento inovador, capacidade de ver oportunidades e coragem para experimentar.</p>
            <p><strong>🚀 Próximos Passos:</strong> Você está pronto para criar algo único e impactante. Sua criatividade é seu maior diferencial!</p>
        `,
        strengths: [
            'Criatividade e inovação',
            'Pensamento fora da caixa',
            'Capacidade de ver oportunidades',
            'Coragem para experimentar'
        ]
    }
};

// Mapeamento de Respostas para Perfis
const answerMapping = {
    // Página 1
    crescimento: { lider: 2, executor: 2 },
    equilibrio: { equilibrado: 3 },
    independencia: { executor: 2, lider: 1 },
    impacto: { inovador: 2, lider: 2 },
    
    // Página 2
    pratico: { executor: 2 },
    teorico: { lider: 1, equilibrado: 1 },
    misturado: { equilibrado: 2, lider: 1 },
    experiencia: { inovador: 2, lider: 1 },
    
    // Página 3
    familia: { equilibrado: 2 },
    futuro: { lider: 3, executor: 1 },
    desafio: { executor: 3, inovador: 1 },
    legado: { lider: 3, inovador: 1 },
    
    // Página 4
    solitario: { executor: 2, inovador: 1 },
    equipe: { lider: 3, equilibrado: 1 },
    flexivel: { inovador: 2, equilibrado: 2 },
    estruturado: { executor: 2, lider: 1 },
    
    // Página 5
    liberdade: { inovador: 3, executor: 1 },
    seguranca: { equilibrado: 3 },
    crescimento: { lider: 3, executor: 1 },
    impacto: { lider: 2, inovador: 2 }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
    setupEventListeners();
});

// Inicializar Quiz
function initializeQuiz() {
    updateProgress(10);
    showPage(1);
}

// Configurar Event Listeners
function setupEventListeners() {
    // Adicionar listeners para todos os botões de opção
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleAnswer);
    });
}

// Manipular Resposta
function handleAnswer(event) {
    const button = event.target;
    const value = button.getAttribute('data-value');
    
    // Adicionar resposta ao estado
    quizState.answers.push(value);
    
    // Adicionar feedback visual
    button.style.background = 'linear-gradient(135deg, var(--success-color), #059669)';
    button.style.color = 'white';
    button.style.transform = 'scale(0.98)';
    
    // Desabilitar todos os botões
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });
    
    // Avançar para próxima página após delay
    setTimeout(() => {
        nextPage();
    }, 800);
}

// Avançar para Próxima Página
function nextPage() {
    // Scroll suave para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    quizState.currentPage++;
    
    if (quizState.currentPage <= quizState.totalPages) {
        // Atualizar progresso
        const progressPercentages = [10, 25, 40, 55, 70, 80, 90, 100];
        updateProgress(progressPercentages[quizState.currentPage - 1]);
        
        // Mostrar página apropriada
        if (quizState.currentPage === 6) {
            showValidationPage();
        } else if (quizState.currentPage === 7) {
            showPreResultPage();
        } else if (quizState.currentPage === 8) {
            showResultPage();
        } else {
            showPage(quizState.currentPage);
        }
    }
}

// Mostrar Página
function showPage(pageNumber) {
    // Esconder todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página atual
    const currentPage = document.getElementById(`page${pageNumber}`);
    if (currentPage) {
        currentPage.classList.add('active');
        currentPage.classList.add('page-enter');
        
        // Reabilitar botões
        setTimeout(() => {
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.disabled = false;
                btn.style.cursor = 'pointer';
                btn.style.background = '';
                btn.style.color = '';
                btn.style.transform = '';
            });
        }, 100);
    }
}

// Atualizar Barra de Progresso
function updateProgress(percent) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${percent}%`;
    }
    
    quizState.progress = percent;
}

// Mostrar Página de Validação
function showValidationPage() {
    showPage(6);
    
    // Animar barra de carregamento
    const loaderBar = document.querySelector('.loader-bar');
    if (loaderBar) {
        loaderBar.style.animation = 'loading 2s ease-in-out infinite';
    }
    
    // Rotacionar mensagens de confiança
    const trustMessages = document.querySelectorAll('.trust-message');
    let currentMessage = 0;
    
    const messageInterval = setInterval(() => {
        trustMessages.forEach(msg => msg.classList.remove('active'));
        
        if (currentMessage < trustMessages.length) {
            trustMessages[currentMessage].classList.add('active');
            currentMessage++;
        } else {
            clearInterval(messageInterval);
        }
    }, 1500);
    
    // Avançar para pré-resultado após 4.5 segundos
    setTimeout(() => {
        nextPage();
    }, 4500);
}

// Mostrar Página de Pré-resultado
function showPreResultPage() {
    showPage(7);
    
    // Calcular perfil do usuário
    const userProfile = calculateProfile();
    const profile = profiles[userProfile];
    
    // Preencher pontos fortes
    const strengthsList = document.getElementById('strengthsList');
    if (strengthsList && profile) {
        strengthsList.innerHTML = '';
        profile.strengths.forEach((strength, index) => {
            const li = document.createElement('li');
            li.textContent = strength;
            li.style.animationDelay = `${index * 0.1}s`;
            strengthsList.appendChild(li);
        });
    }
    
    // Avançar para resultado após 5 segundos
    setTimeout(() => {
        nextPage();
    }, 5000);
}

// Mostrar Página de Resultado
function showResultPage() {
    showPage(8);
    
    // Calcular perfil do usuário
    const userProfile = calculateProfile();
    const profile = profiles[userProfile] || profiles.lider;
    
    // Preencher resultado
    const resultBadge = document.getElementById('resultBadge');
    const resultTitle = document.getElementById('resultTitle');
    const resultDescription = document.getElementById('resultDescription');
    const resultDetails = document.getElementById('resultDetails');
    
    if (resultBadge) resultBadge.textContent = profile.badge;
    if (resultTitle) resultTitle.textContent = profile.title;
    if (resultDescription) resultDescription.textContent = profile.description;
    if (resultDetails) resultDetails.innerHTML = profile.details;
}

// Calcular Perfil do Usuário
function calculateProfile() {
    const profileScores = {
        lider: 0,
        executor: 0,
        equilibrado: 0,
        inovador: 0
    };
    
    // Contar pontos baseado nas respostas
    quizState.answers.forEach(answer => {
        const mapping = answerMapping[answer];
        if (mapping) {
            Object.keys(mapping).forEach(profile => {
                profileScores[profile] += mapping[profile] || 0;
            });
        }
    });
    
    // Encontrar perfil com maior pontuação
    let maxScore = 0;
    let selectedProfile = 'lider';
    
    Object.keys(profileScores).forEach(profile => {
        if (profileScores[profile] > maxScore) {
            maxScore = profileScores[profile];
            selectedProfile = profile;
        }
    });
    
    return selectedProfile;
}

