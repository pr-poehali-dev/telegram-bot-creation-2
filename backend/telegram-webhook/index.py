import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Обрабатывает входящие сообщения и команды от Telegram бота
    Args: event - объект с httpMethod, body; context - объект с request_id
    Returns: HTTP ответ для Telegram
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    if not bot_token:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    body_str = event.get('body', '{}')
    update = json.loads(body_str)
    
    if 'message' not in update:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True})
        }
    
    message = update['message']
    chat_id = message['chat']['id']
    text = message.get('text', '')
    
    response_text = process_command(text)
    
    send_message(bot_token, chat_id, response_text)
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json'},
        'isBase64Encoded': False,
        'body': json.dumps({'ok': True})
    }


def process_command(text: str) -> str:
    '''Обрабатывает команды и текстовые сообщения'''
    text_lower = text.lower().strip()
    
    if text_lower == '/start':
        return (
            '👋 Добро пожаловать! Я ваш Telegram бот-ассистент.\n\n'
            'Доступные команды:\n'
            '/help - показать справку\n'
            '/menu - главное меню\n'
            '/settings - настройки\n'
            '/faq - часто задаваемые вопросы'
        )
    
    if text_lower == '/help':
        return (
            '📚 Справка по боту:\n\n'
            '/start - начать работу\n'
            '/menu - открыть главное меню\n'
            '/settings - настройки бота\n'
            '/faq - часто задаваемые вопросы\n\n'
            'Для связи с поддержкой: support@bot.com'
        )
    
    if text_lower == '/menu':
        return (
            '📋 Главное меню:\n\n'
            '1️⃣ /help - Справка\n'
            '2️⃣ /settings - Настройки\n'
            '3️⃣ /faq - FAQ\n'
            '4️⃣ Напишите любой текст для общения'
        )
    
    if text_lower == '/settings':
        return (
            '⚙️ Настройки бота:\n\n'
            '🔔 Уведомления: включены\n'
            '🔊 Звук: включен\n'
            '📧 Рассылки: включены\n\n'
            'Изменить настройки можно на сайте бота'
        )
    
    if text_lower == '/faq':
        return (
            '❓ Часто задаваемые вопросы:\n\n'
            '1. Как начать работу с ботом?\n'
            '   → Напишите /start\n\n'
            '2. Как получить помощь?\n'
            '   → Используйте команду /help\n\n'
            '3. Как настроить уведомления?\n'
            '   → Перейдите в /settings\n\n'
            '4. Как отписаться от рассылок?\n'
            '   → Используйте /settings'
        )
    
    return f'✅ Получил ваше сообщение: "{text}"\n\nЧем могу помочь? Используйте /help для списка команд.'


def send_message(bot_token: str, chat_id: int, text: str) -> None:
    '''Отправляет сообщение через Telegram Bot API'''
    import urllib.request
    import urllib.parse
    
    url = f'https://api.telegram.org/bot{bot_token}/sendMessage'
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    
    urllib.request.urlopen(req)
