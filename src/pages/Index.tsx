import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type Section = 'chat' | 'menu' | 'faq' | 'help' | 'settings' | 'broadcast';

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>('chat');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Добро пожаловать! Я ваш Telegram бот-ассистент 👋', isBot: true, time: '14:32' },
    { id: 2, text: 'Чем могу помочь?', isBot: true, time: '14:32' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    setTimeout(() => {
      const botReply = {
        id: messages.length + 2,
        text: 'Спасибо за сообщение! Я обработаю ваш запрос.',
        isBot: true,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const faqItems = [
    { question: 'Как начать работу с ботом?', answer: 'Просто напишите /start в чате, и бот проведет вас через процесс регистрации.' },
    { question: 'Как получить помощь?', answer: 'Используйте команду /help или перейдите в раздел "Помощь" в меню.' },
    { question: 'Как настроить уведомления?', answer: 'Перейдите в раздел "Настройки" и включите/выключите нужные уведомления.' },
    { question: 'Как отписаться от рассылок?', answer: 'В настройках отключите опцию "Получать уведомления" или напишите команду /unsubscribe.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      <div className="mx-auto max-w-6xl p-4">
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <Icon name="Send" className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Telegram Bot</h1>
          </div>
          <p className="text-gray-600">Ваш персональный ассистент в мессенджере</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <Button
            variant={activeSection === 'chat' ? 'default' : 'outline'}
            onClick={() => setActiveSection('chat')}
            className="gap-2"
          >
            <Icon name="MessageCircle" size={18} />
            Чат
          </Button>
          <Button
            variant={activeSection === 'menu' ? 'default' : 'outline'}
            onClick={() => setActiveSection('menu')}
            className="gap-2"
          >
            <Icon name="Menu" size={18} />
            Меню
          </Button>
          <Button
            variant={activeSection === 'faq' ? 'default' : 'outline'}
            onClick={() => setActiveSection('faq')}
            className="gap-2"
          >
            <Icon name="HelpCircle" size={18} />
            FAQ
          </Button>
          <Button
            variant={activeSection === 'help' ? 'default' : 'outline'}
            onClick={() => setActiveSection('help')}
            className="gap-2"
          >
            <Icon name="LifeBuoy" size={18} />
            Помощь
          </Button>
          <Button
            variant={activeSection === 'settings' ? 'default' : 'outline'}
            onClick={() => setActiveSection('settings')}
            className="gap-2"
          >
            <Icon name="Settings" size={18} />
            Настройки
          </Button>
          <Button
            variant={activeSection === 'broadcast' ? 'default' : 'outline'}
            onClick={() => setActiveSection('broadcast')}
            className="gap-2"
          >
            <Icon name="Radio" size={18} />
            Рассылка
          </Button>
        </div>

        <div className="animate-fade-in">
          {activeSection === 'chat' && (
            <Card className="mx-auto max-w-3xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b bg-primary p-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Icon name="Bot" className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold">Бот-Ассистент</h2>
                    <p className="text-xs text-white/80">онлайн</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  <Icon name="Circle" size={8} className="mr-1 fill-green-400 text-green-400" />
                  Активен
                </Badge>
              </div>

              <div className="h-[500px] overflow-y-auto bg-gray-50 p-4">
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${
                          message.isBot
                            ? 'bg-white text-gray-800'
                            : 'bg-primary text-white'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`mt-1 text-xs ${message.isBot ? 'text-gray-500' : 'text-white/70'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Icon name="Paperclip" size={18} />
                  </Button>
                  <Input
                    placeholder="Введите сообщение..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="icon" className="shrink-0">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'menu' && (
            <div className="mx-auto max-w-3xl">
              <Card className="p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Icon name="Menu" className="text-primary" />
                  Главное меню
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
                    onClick={() => setActiveSection('chat')}
                  >
                    <Icon name="MessageCircle" size={32} className="text-primary" />
                    <span className="text-lg font-semibold">Открыть чат</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
                    onClick={() => setActiveSection('faq')}
                  >
                    <Icon name="HelpCircle" size={32} className="text-primary" />
                    <span className="text-lg font-semibold">FAQ</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
                    onClick={() => setActiveSection('help')}
                  >
                    <Icon name="LifeBuoy" size={32} className="text-primary" />
                    <span className="text-lg font-semibold">Помощь</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-3 p-6 transition-all hover:scale-105 hover:border-primary hover:shadow-lg"
                    onClick={() => setActiveSection('settings')}
                  >
                    <Icon name="Settings" size={32} className="text-primary" />
                    <span className="text-lg font-semibold">Настройки</span>
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'faq' && (
            <div className="mx-auto max-w-3xl">
              <Card className="p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Icon name="HelpCircle" className="text-primary" />
                  Часто задаваемые вопросы
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {faqItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="rounded-lg border bg-white px-4 shadow-sm"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:text-primary">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            </div>
          )}

          {activeSection === 'help' && (
            <div className="mx-auto max-w-3xl">
              <Card className="p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Icon name="LifeBuoy" className="text-primary" />
                  Центр помощи
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-primary">
                      <Icon name="Lightbulb" size={20} />
                      Быстрый старт
                    </h3>
                    <p className="text-sm text-gray-700">
                      Отправьте команду <code className="rounded bg-white px-2 py-1">/start</code> для начала работы с ботом.
                    </p>
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-green-700">
                      <Icon name="BookOpen" size={20} />
                      Основные команды
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li><code className="rounded bg-white px-2 py-1">/help</code> - показать справку</li>
                      <li><code className="rounded bg-white px-2 py-1">/menu</code> - открыть главное меню</li>
                      <li><code className="rounded bg-white px-2 py-1">/settings</code> - настройки бота</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold text-purple-700">
                      <Icon name="Mail" size={20} />
                      Техподдержка
                    </h3>
                    <p className="text-sm text-gray-700">
                      Если у вас возникли проблемы, напишите нам: <span className="font-semibold">support@bot.com</span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="mx-auto max-w-3xl">
              <Card className="p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Icon name="Settings" className="text-primary" />
                  Настройки
                </h2>
                <div className="space-y-6">
                  <div className="rounded-lg border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="notifications" className="text-base font-semibold">
                          Уведомления
                        </Label>
                        <p className="text-sm text-gray-600">Получать push-уведомления от бота</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="sound" className="text-base font-semibold">
                          Звук сообщений
                        </Label>
                        <p className="text-sm text-gray-600">Воспроизводить звук при получении сообщения</p>
                      </div>
                      <Switch id="sound" defaultChecked />
                    </div>
                  </div>

                  <div className="rounded-lg border bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="broadcast" className="text-base font-semibold">
                          Рассылки
                        </Label>
                        <p className="text-sm text-gray-600">Получать информационные рассылки</p>
                      </div>
                      <Switch id="broadcast" defaultChecked />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">Язык интерфейса</h3>
                    <select className="w-full rounded-lg border p-2">
                      <option>Русский</option>
                      <option>English</option>
                    </select>
                  </div>

                  <Button variant="destructive" className="w-full gap-2">
                    <Icon name="Trash2" size={18} />
                    Удалить все данные
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {activeSection === 'broadcast' && (
            <div className="mx-auto max-w-3xl">
              <Card className="p-6 shadow-xl">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Icon name="Radio" className="text-primary" />
                  Рассылка уведомлений
                </h2>
                <div className="space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold text-gray-800">Всего подписчиков</span>
                      <Badge className="text-lg">1,247</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Активных сегодня</span>
                      <span className="text-sm font-semibold text-green-600">892</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-base font-semibold">
                      Текст сообщения
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Введите текст рассылки..."
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                    <p className="text-sm text-gray-500">
                      {broadcastMessage.length} / 4096 символов
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 gap-2" disabled={!broadcastMessage.trim()}>
                      <Icon name="Send" size={18} />
                      Отправить всем
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Icon name="Eye" size={18} />
                      Предпросмотр
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-yellow-50 p-4">
                    <div className="flex gap-3">
                      <Icon name="AlertTriangle" className="mt-0.5 shrink-0 text-yellow-600" size={20} />
                      <div className="text-sm text-gray-700">
                        <p className="font-semibold">Важно!</p>
                        <p>Рассылка будет отправлена всем активным пользователям бота. Убедитесь, что текст составлен корректно.</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-800">История рассылок</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border bg-white p-3">
                        <div>
                          <p className="text-sm font-semibold">Новые возможности бота</p>
                          <p className="text-xs text-gray-500">15 октября 2024, 14:30</p>
                        </div>
                        <Badge variant="secondary">Доставлено: 98%</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border bg-white p-3">
                        <div>
                          <p className="text-sm font-semibold">Обновление системы</p>
                          <p className="text-xs text-gray-500">10 октября 2024, 10:15</p>
                        </div>
                        <Badge variant="secondary">Доставлено: 96%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
