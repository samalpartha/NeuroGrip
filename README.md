# 🧠 NeuroGrip

**NeuroGrip** is a modern, full-stack web application designed for physical therapists and patients undergoing hand rehabilitation. It combines progress tracking, customized therapy plans, data visualization, and comprehensive patient management to enhance recovery outcomes.

🚀 **Live Demo:** [https://neuro-grip-eqycpcd2x-samalparthas-projects.vercel.app/](https://neuro-grip-eqycpcd2x-samalparthas-projects.vercel.app/)

![NeuroGrip Dashboard](/Users/psama0214/.gemini/antigravity/brain/abfec9a0-cd2c-49fb-9f4d-b203364d1c10/neurogrip_landing_page_1764641244685.png)

## ✨ Key Features

### For Therapists
- **📊 Enhanced Dashboard** - Real-time statistics showing total patients, active cases, average progress, and therapy hours
- **👥 Patient Management** - Complete patient records with demographics, conditions, and therapy history
- **📈 Progress Tracking** - Interactive charts visualizing grip strength improvements and therapy hours
- **📝 Clinical Notes** - Document observations and adjust treatment plans per patient
- **🎯 Goal Setting** - Set target strength goals and track completion milestones

### For Patients
- **📉 Visual Progress** - See your recovery journey with easy-to-understand charts
- **🏆 Goal Tracking** - Monitor your achievements and stay motivated
- **📅 Session History** - Review past therapy sessions and hours completed

### Technical Features
- **💾 Local Database** - All data stored in browser localStorage (no external server required)
- **🔄 Real-time Updates** - Event-driven architecture for instant data synchronization
- **🎨 Modern UI** - Built with ShadCN UI components and Tailwind CSS
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🌓 Dark Mode Ready** - Comfortable viewing in any lighting condition

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NeuroGrip.git
   cd NeuroGrip
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

### Demo Account

The application automatically logs you in as a test therapist:
- **User ID**: `test-user-id`
- **Display Name**: `Test User`
- **Email**: `test@example.com`

### Sample Data

On first launch, NeuroGrip automatically creates 5 sample patients with realistic therapy data:

1. **Emma Thompson** (68) - Post-stroke recovery
2. **James Chen** (45) - Carpal tunnel syndrome recovery
3. **Maria Rodriguez** (52) - Rheumatoid arthritis management
4. **Robert Kim** (71) - Parkinson's disease hand tremor therapy
5. **Sarah Johnson** (34) - Sports injury wrist fracture recovery

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3+ (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Components**: ShadCN UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: Browser localStorage (local implementation)
- **Authentication**: Mock authentication (for demo)
- **Real-time Updates**: Custom event emitter system

### Development
- **Build Tool**: Next.js with Turbopack
- **Package Manager**: npm
- **TypeScript**: Strict mode enabled

## 📁 Project Structure

```
NeuroGrip/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (app)/             # Authenticated app pages
│   │   │   ├── page.tsx       # Enhanced dashboard
│   │   │   ├── patients/      # Patient management
│   │   │   └── settings/      # Settings page
│   │   └── (auth)/            # Authentication pages
│   ├── components/
│   │   ├── dashboard/         # Dashboard components
│   │   │   ├── stats-cards.tsx
│   │   │   ├── recent-activity.tsx
│   │   │   └── therapy-progress.tsx
│   │   ├── charts/            # Chart components
│   │   │   ├── grip-strength-chart.tsx
│   │   │   └── therapy-hours-chart.tsx
│   │   ├── patients/          # Patient components
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── local-db.ts        # Local database implementation
│   │   ├── db.ts              # Firestore-compatible adapter
│   │   ├── mock-auth.ts       # Mock authentication
│   │   ├── seed-data.ts       # Sample data generator
│   │   └── types.ts           # TypeScript type definitions
│   └── firebase/              # Firebase hooks (using local mocks)
├── public/                    # Static assets
└── README.md
```

## 💡 Usage

### Managing Patients

1. **View All Patients**: Click "Patients" in the sidebar
2. **Add New Patient**: Click "Add New Patient" button
3. **View Patient Details**: Click on any patient card
4. **Update Patient Info**: Use the "Customize Program" form on patient detail page

### Viewing Progress

- **Dashboard**: Shows aggregate statistics for all patients
- **Patient Detail**: Individual charts showing grip strength and therapy hours over time
- **Stats Cards**: Real-time metrics with trend indicators

### Data Management

All data is stored in your browser's localStorage under the key `neurogrip_db`.

**To reset the database:**
1. Open Developer Tools (F12)
2. Go to Application → Local Storage
3. Find `neurogrip_db` and delete it
4. Refresh the page - sample data will be re-seeded automatically

## 🎨 Customization

### Adding Custom Patients

Edit `src/lib/seed-data.ts` to modify or add sample patients.

### Changing Color Scheme

Modify `tailwind.config.ts` to customize the theme colors.

### Adjusting Charts

Chart configurations are in:
- `src/components/charts/grip-strength-chart.tsx`
- `src/components/charts/therapy-hours-chart.tsx`
- `src/components/dashboard/therapy-progress.tsx`

## 🔧 Development

### Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

### Environment Variables

No environment variables needed for local development. The app runs entirely in the browser.

## 📊 Data Storage

### LocalStorage Structure

```json
{
  "patients": {
    "patient-id-1": {
      "name": "Patient Name",
      "age": 68,
      "condition": "Condition description",
      "therapistId": "test-user-id",
      "avgGripStrength": 18,
      "targetStrength": 25,
      "gripStrengthHistory": [...],
      "therapyHoursHistory": [...]
    }
  },
  "users": {
    "user-id-1": {...}
  }
}
```

## 🚨 Troubleshooting

### Data Not Loading
- Clear localStorage and refresh the page
- Check browser console for errors
- Ensure JavaScript is enabled

### Charts Not Displaying
- Verify patient has `gripStrengthHistory` and `therapyHoursHistory` data
- Check browser console for errors
- Try refreshing the page

### Build Errors
- Delete `node_modules` and `.next` directories
- Run `npm install` again
- Ensure Node.js version is 18.x or higher

## 🌟 Future Enhancements

- [ ] Export data to CSV/JSON
- [ ] Import data from file
- [ ] Patient search and filtering
- [ ] Therapy session calendar
- [ ] Email notifications/reminders
- [ ] Printable progress reports
- [ ] Multi-therapist support with real authentication
- [ ] Cloud sync with backend API
- [ ] Mobile app version
- [ ] Integration with physical therapy devices

## 📝 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📧 Support

For questions or support, please open an issue in the GitHub repository.

---

Built with ❤️ using Next.js, React, and modern web technologies.
