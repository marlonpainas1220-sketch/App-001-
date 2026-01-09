import feedparser
import openai

# Configurações
OPENAI_API_KEY = "SUA_CHAVE_AQUI" # Adicione a sua chave da OpenAI
openai.api_key = OPENAI_API_KEY

# Fontes de notícias (Exemplo: G1 Entretenimento)
RSS_URL = "https://g1.globo.com/rss/g1/pop-arte/"

def reescrever_com_ia(titulo, texto_original):
    print(f"Reescrevendo: {titulo}")
    
    prompt = f"""
    Aja como um redator do portal Alfinetei. 
    Reescreva a notícia abaixo com um tom jovem, descolado e profissional.
    - O fundo deve ser branco e o tom verídico (sem fake news).
    - Crie um título bombástico.
    - Use emojis.
    - Garanta que não haja plágio.
    
    Título Original: {titulo}
    Conteúdo: {texto_original[:500]}...
    """
    
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    
    return response.choices[0].message.content

def buscar_noticias():
    feed = feedparser.parse(RSS_URL)
    
    for entry in feed.entries[:5]: # Pega as 5 notícias mais recentes
        titulo = entry.title
        link = entry.link
        resumo = entry.summary
        
        # A IA entra em ação aqui
        noticia_pronta = reescrever_com_ia(titulo, resumo)
        
        print("-" * 30)
        print(f"NOTÍCIA PROCESSADA:\n{noticia_pronta}")
        # O próximo passo será dar um 'push' para o seu banco de dados (Supabase/Firebase)

if __name__ == "__main__":
    buscar_noticias()
