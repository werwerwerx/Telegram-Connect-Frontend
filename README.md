# 🚀 Telegram Mini App React Template

A production-ready template for developing **Telegram Mini Apps** with modern React stack.

## ✨ What's Included

### 🎯 **Telegram Mini App Features**
- ✅ **Telegram SDK React** - full Telegram integration
- ✅ **Automatic theme adaptation** - shadcn + Telegram themes
- ✅ **Language support** - i18n with user language from Telegram
- ✅ **Back Button** - back button management
- ✅ **Viewport adaptation** - proper screen dimensions
- ✅ **Haptic Feedback** - tactile feedback

### 🛠 **Tech Stack**
- **React 19** - latest version with async components
- **React Router 7** - modern routing
- **TypeScript** - full type safety
- **Tailwind CSS 4** - utility-first styling
- **shadcn/ui** - ready-to-use components
- **Bun** - fast package manager
- **Vite** - fast build tool

### 🎨 **UI/UX**
- **Responsive design** - works on all devices
- **Dark/light theme** - automatic switching
- **Telegram themes** - native color integration
- **Animations** - smooth transitions
- **Navigation** - bottom navigation for TMA

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/werwerwerx/TMA-react-template.git
cd TMA-react-template/web
```

### 2. Install dependencies
```bash
bun install
# or
npm install
```

### 3. Development
```bash
bun run dev
# or
npm run dev
```

### 4. Build
```bash
bun run build
# or
npm run build
```

## 📱 Project Structure

```
web/
├── app/
│   ├── routes/
│   │   ├── telegram/          # TMA routes
│   │   │   ├── entry.tsx      # TMA initialization
│   │   │   ├── home.tsx       # Home page
│   │   │   ├── channels.tsx   # Channels
│   │   │   ├── advertisers.tsx # Advertisers
│   │   │   ├── deals.tsx      # Deals
│   │   │   └── layout.tsx     # TMA Layout
│   │   └── web/               # Web version
│   │       ├── home.tsx
│   │       └── layout.tsx
│   ├── shared/
│   │   ├── components/        # Reusable components
│   │   │   ├── navigation.tsx # Navigation
│   │   │   ├── telegram-shadcn-theme-adapter.tsx # Theme adapter
│   │   │   └── ui-kit/        # UI components
│   │   └── i18n.ts           # Internationalization
│   └── root.tsx              # Root component
└── package.json
```

## 🎨 Telegram Integration

### Automatic theme adaptation
```typescript
// Automatically applies Telegram colors to shadcn
<TelegramShadcnThemeAdapter />
```

### Language support
```typescript
// Automatically detects user language
const userLang = launchParams.initData?.user?.language_code || 'en';
await i18n.changeLanguage(userLang);
```

### TMA initialization
```typescript
await init();
mountBackButton.ifAvailable();
restoreInitData();
setDebug(true);
```

## 🌐 Deployment

### Vercel (recommended)
1. Connect repository to Vercel
2. Set `web` folder as root directory
3. Framework: React Router
4. Build Command: `npm run build`
5. Output Directory: `build/client`

### Other platforms
- **Netlify** - similar to Vercel
- **Railway** - for full-stack applications
- **Docker** - included Dockerfile

## 🔧 Configuration

### Telegram Bot
1. Create bot via [@BotFather](https://t.me/BotFather)
2. Add `/newapp` command
3. Set your app URL
4. Get bot token

### Environment variables
```env
NODE_ENV=production
```

## 📚 Documentation

- [Telegram Mini Apps](https://docs.telegram-mini-apps.com/)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have questions or issues:
- Create [Issue](https://github.com/werwerwerx/TMA-react-template/issues)
- Contact via [Telegram](https://t.me/your_username)

---

**Built with ❤️ for Telegram Mini Apps developers**
