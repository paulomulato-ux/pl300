-- ==========================================
-- TABELA 1: DISCUSSÕES / COMENTÁRIOS
-- ==========================================
CREATE TABLE public.question_discussions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_code TEXT NOT NULL,          -- Ex: 'PL-300', 'AZ-900'
    question_index INTEGER NOT NULL,  -- O número da questão no banco local
    question_text TEXT,               -- Trecho da pergunta para referência caso a ordem mude
    user_email TEXT NOT NULL,
    selected_vote TEXT NOT NULL,      -- A, B, C, D...
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- TABELA 2: RELATÓRIOS DE ERROS
-- ==========================================
CREATE TABLE public.question_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exam_code TEXT NOT NULL,          -- Ex: 'PL-300', 'AZ-900'
    question_index INTEGER NOT NULL,
    question_text TEXT,
    user_email TEXT NOT NULL,
    problem_types TEXT[] NOT NULL,    -- Array com as opções ('Resposta errada', 'Opções faltantes'...)
    additional_notes TEXT,
    status TEXT DEFAULT 'pending',    -- pending, reviewing, resolved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ==========================================
-- Habilitar Row Level Security para segurança
ALTER TABLE public.question_discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_reports ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT para qualquer usuário anônimo no site (para enviarem forms)
CREATE POLICY "Allow anonymous insert on discussions" 
ON public.question_discussions FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anonymous insert on reports" 
ON public.question_reports FOR INSERT TO anon WITH CHECK (true);

-- Permitir SELECT (leitura) pública nas discussões para podermos renderizar os comentários abaixo da questão
CREATE POLICY "Allow public read on discussions" 
ON public.question_discussions FOR SELECT TO public USING (true);
