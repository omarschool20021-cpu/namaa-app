# نماء (Namaa) - Design Guidelines

## Design Approach
This is a **utility-focused productivity application** with strong cultural and spiritual elements. The design follows a custom approach tailored to the unique bilingual, faith-based tracking needs.

## Core Visual Identity

### Color Palette
- **Primary Theme**: White & Gold (elegant, modern, clean aesthetic)
- **Dark/Light Mode**: Full support with toggle control
- **Accent Elements**: Subtle gold highlights for progress, achievements, and key actions

### Layout & Structure
- Rounded cards throughout the interface
- Soft shadows for depth and hierarchy
- Clean whitespace between sections
- Fully responsive grid system adapting from desktop to mobile

### Typography
- **Bilingual Support**: 
  - Arabic: Proper RTL layout with appropriate Arabic web font
  - English: LTR layout with clean, modern sans-serif
- **Hierarchy**: Clear heading levels (H1 for page titles, H2 for sections, H3 for cards)
- **Font Size Control**: User-adjustable in settings (small, medium, large options)
- **Personalized Greetings**: Display user's name (default: Omar) in both languages

### Spacing System
- Consistent padding: p-4, p-6, p-8 for cards and sections
- Margins: m-2, m-4, m-6 between elements
- Section gaps: space-y-6, space-y-8 for vertical rhythm

## Component Library

### Navigation
- Fixed header with app logo/name "نماء"
- Language toggle button (AR/EN with flag icons)
- Settings icon/link
- Mobile: Hamburger menu with slide-out navigation

### Cards & Containers
- Rounded corners (rounded-lg to rounded-xl)
- Subtle shadows (shadow-md to shadow-lg)
- White background (light mode) / dark gray (dark mode)
- Gold accent borders for active/focused states

### Progress Indicators
- **Progress Bars**: Horizontal bars showing % completion with smooth fill animations
- **Percentage Display**: Large, readable numbers with % symbol
- **Color Coding**: Gold fill for progress, light gray for remaining
- **Categories**: Tasks, Prayers, Quran, Lessons

### Interactive Elements
- **Checkboxes**: Custom styled with smooth animation on check/uncheck
- **Subtle Football Effect**: Minimal ⚽ icon/animation on task completion (not dominant)
- **Star Rating**: 1-5 stars for Focus metric in Lessons
- **Toggle Switches**: For Yes/No metrics (Interaction, Homework, etc.)
- **Buttons**: Primary (gold), Secondary (outlined), with hover states

### Forms & Inputs
- Text inputs for editable fields (daily intention, custom quotes, username)
- Time pickers for alarm/reminder system
- Priority flags for tasks
- Dropdown/select for filters (Today/This Week)

## Page Layouts

### Home Dashboard ("My Day")
- **Top Section**: Auto-updating date + Daily greeting with user's name
- **Daily Intention Card**: Editable text field with save button
- **Progress Overview**: 4 horizontal progress bars (Tasks, Prayers, Quran, Lessons) in 2x2 grid on desktop, stacked on mobile
- **Inspirational Content**: 
  - Daily motivational quote card
  - Daily Quranic verse card
  - Micro-productivity tip
- **Upcoming Reminders**: Small card showing next alarms

### Task Management Page
- Greeting header
- Add new task input with priority flag option
- Filter buttons (Today / This Week)
- Task list with checkboxes, priority indicators, edit/delete actions
- Pomodoro timer integration suggestion
- Progress bar at top

### Prayer Tracker Page
- Greeting header
- 5 prayer cards in horizontal row (desktop) / vertical stack (mobile)
- Each prayer: Name, checkbox, time indicator
- Daily completion percentage
- End-of-day message area (conditional rendering based on completion)

### Quran Tracker Page
- Greeting header
- Daily target: 5 pages with checkboxes (numbered 1-5)
- Weekly view toggle showing 7 days x 5 pages grid
- Weekly progress bar (35 pages total)
- Completion celebration message

### Lessons Tracker Page
- Greeting header
- Weekly calendar view: Saturday → Friday (7 columns on desktop)
- Each day cell contains:
  - Date
  - Focus (star rating input)
  - Interaction (Yes/No toggle)
  - Homework (Yes/No toggle)
  - Mistake Reduction (Yes/No toggle)
  - Respect & Discipline (Yes/No toggle)
  - Optional task notes field
- Weekly averages summary bar at bottom
- Improvement indicators (up/down arrows)

### Weekly Overview Page
- Greeting header
- Grid layout showing all categories
- Daily completion summaries
- Missing items highlighted
- Motivational message based on performance
- Historical data access button

### Motivation Page
- Greeting header
- Large quote card with bilingual random quotes (faith, productivity, subtle football themes)
- Quote refresh button
- Add custom quote section with input + save
- Daily micro-challenge card

### Settings Page
- Greeting header
- **Theme Control**: Dark/Light mode toggle with icon
- **Language Switch**: Arabic/English selector with immediate effect
- **Username**: Text input with save button
- **Font Size**: Small/Medium/Large radio buttons or slider
- **Reset Data**: Warning button with confirmation modal

### Alarm/Reminder System
- **Dashboard Widget**: Upcoming reminders card
- **Reminder Modal/Panel**: 
  - Category selector (Tasks/Prayers/Lessons)
  - Time picker
  - On/Off toggle
  - Repeat options (daily/weekly)
  - Save/Delete buttons
- **Notification UI**: Browser notification with sound option
- **Alert Display**: Visual cue on dashboard when reminder triggers

## Animations & Interactions

### Intro Animation
- Full-screen fade-in with logo animation on first load
- Smooth transition to dashboard (2-3 seconds total)

### Micro-interactions
- Checkbox check animation with subtle bounce
- Progress bar fill animation (smooth, not instant)
- Card hover elevation (subtle shadow increase)
- Button press feedback
- Page transitions (fade/slide)
- Success celebrations (confetti or sparkle effect) on major completions

### Loading States
- Skeleton screens for data loading
- Smooth content appearance

## Responsive Breakpoints
- **Mobile**: < 768px (single column, stacked cards)
- **Tablet**: 768px - 1024px (2-column grids where appropriate)
- **Desktop**: > 1024px (full multi-column layouts)

## Accessibility
- ARIA labels for Arabic and English
- Keyboard navigation support
- High contrast mode compatibility
- Focus indicators on all interactive elements
- Screen reader friendly structure

## Data Persistence
- All tracking data stored in Local Storage
- Auto-save on all changes
- Auto-refresh date at midnight
- Weekly auto-reset with archival

## Football Theme Integration
- Subtle ⚽ icons in task completion celebrations
- Small football graphic in motivation quotes occasionally
- Trophy 🏆 icon for perfect prayer completion
- NOT dominant - elegant and minimal integration

This design creates an elegant, spiritually-focused productivity system that honors both Arabic and English users while maintaining modern web standards and delightful user experience.