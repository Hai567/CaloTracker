# Diet & Productivity App - Feature & Flow Overview

## Overview

This app is designed to help users efficiently manage their diet by integrating AI-driven task prioritization with fasting session tracking. Users can log meals manually or via AI chat, monitor fasting progress, and receive intelligent recommendations to optimize their health and productivity.

---

## Tech Stack:

-   Frontend: React Native with TypeScript, Expo, and Expo Router
-   Backend/Database: Supabase
-   UI Framework: React Native Paper
-   AI Processing: DeepSeek

## App Flow

### 1. **Welcome Screen**

-   Users are greeted with a clean, simple interface.
-   Options to **Sign Up** or **Log In** using email.

### 2. **Sign Up / Log In**

-   Users enter their email and create a password.
-   Email verification option (for security purposes).
-   Upon successful sign-up, users are redirected to the **Main Dashboard**.

### 3. **Main Dashboard**

-   Displays tasks prioritized by **AI**.
-   Options to add food intake manually or via **AI Chat**.
-   Ability to start a **Fasting Session**.
-   Quick access to progress tracking and past sessions.

### 4. **Adding Food**

#### 4.1 **Manual Entry**

-   Users input meal details (e.g., calories, macros, meal type).
-   Ability to save meals as templates for future logging.

#### 4.2 **AI Chat Entry**

-   Users log food through an AI-powered chat interface (e.g., "I ate a chicken salad").
-   AI provides nutritional breakdown and records the meal.

### 5. **Fasting Sessions**

#### 5.1 **Starting a Session**

-   Users select a fasting duration (e.g., 12h, 16h, 24h).
-   Enter **Session Mode**, initiating a countdown timer.
-   Option to receive notifications for checkpoints and hydration reminders.

#### 5.2 **During Fasting Mode**

-   Real-time tracking of fasting progress.
-   AI-generated motivation and health tips.
-   Option to cancel the session if needed.

#### 5.3 **Completing a Fasting Session**

-   Users receive a summary of their session, including:
    -   Total fasting duration.
    -   Progress toward goals.
    -   Suggested next steps.
-   Option to **start another session** or **take a break**.
    -   Break period = `24h - fasting session duration`.

### 6. **Progress & Analytics**

-   Users can review fasting history, meal logs, and dietary consistency.
-   AI generates reports with personalized recommendations.
-   Integration with external health apps (if applicable).

### 7. **Settings & Customization**

-   Profile setup (age, weight, dietary preferences, fasting goals).
-   AI settings (custom notifications, fasting preferences).
-   Syncing options for wearable devices and health platforms.

---

## Additional Features (Planned Enhancements)

-   AI-generated meal suggestions based on dietary goals.
-   Social leaderboard for community engagement and motivation.
-   Streak tracking and achievement rewards.

## Developer Notes

-   **Authentication**: Secure login using JWT-based authentication.
-   **Database**: Efficient storage and retrieval of user data with proper indexing.
-   **AI Integration**: NLP-powered food logging and priority-based task sorting.
-   **Push Notifications**: Timely reminders for fasting checkpoints and meal logging.

This structured flow provides clarity for development and ensures an intuitive user experience.

## Database Schema

The database schema for the Diet & Productivity App is designed to efficiently store and retrieve user data, meal logs, fasting sessions, and AI-generated recommendations. Below is the complete schema with all necessary tables and relationships:

### Core Tables

-   **Users**

    -   `id`: UUID (Primary Key)
    -   `email`: String (Unique)
    -   `password_hash`: String
    -   `created_at`: Timestamp
    -   `updated_at`: Timestamp
    -   `last_login`: Timestamp
    -   `is_active`: Boolean
    -   `notification_preferences`: JSONB

-   **UserProfiles**
    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `first_name`: String
    -   `last_name`: String
    -   `age`: Integer
    -   `weight`: Float
    -   `height`: Float
    -   `gender`: String
    -   `activity_level`: String
    -   `dietary_preferences`: JSONB
    -   `health_conditions`: JSONB
    -   `goals`: JSONB
    -   `timezone`: String
    -   `created_at`: Timestamp
    -   `updated_at`: Timestamp

### Food and Nutrition Tables

-   **Meals**

    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `name`: String
    -   `description`: Text
    -   `calories`: Integer
    -   `protein`: Float
    -   `carbs`: Float
    -   `fats`: Float
    -   `fiber`: Float
    -   `meal_type`: String (breakfast, lunch, dinner, snack)
    -   `consumed_at`: Timestamp
    -   `is_template`: Boolean
    -   `image_url`: String
    -   `created_at`: Timestamp
    -   `updated_at`: Timestamp

-   **FoodItems**

    -   `id`: UUID (Primary Key)
    -   `name`: String
    -   `calories`: Integer
    -   `protein`: Float
    -   `carbs`: Float
    -   `fats`: Float
    -   `fiber`: Float
    -   `serving_size`: Float
    -   `serving_unit`: String
    -   `is_verified`: Boolean
    -   `created_at`: Timestamp
    -   `updated_at`: Timestamp

-   **MealFoodItems**
    -   `id`: UUID (Primary Key)
    -   `meal_id`: UUID (Foreign Key to Meals)
    -   `food_item_id`: UUID (Foreign Key to FoodItems)
    -   `quantity`: Float
    -   `unit`: String
    -   `created_at`: Timestamp

### Fasting Tables

-   **FastingSessions**

    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `start_time`: Timestamp
    -   `end_time`: Timestamp
    -   `planned_duration`: Integer (in minutes)
    -   `actual_duration`: Integer (in minutes)
    -   `status`: String (planned, ongoing, completed, cancelled)
    -   `notes`: Text
    -   `mood_rating`: Integer
    -   `difficulty_rating`: Integer
    -   `created_at`: Timestamp
    -   `updated_at`: Timestamp

-   **FastingCheckpoints**
    -   `id`: UUID (Primary Key)
    -   `session_id`: UUID (Foreign Key to FastingSessions)
    -   `checkpoint_time`: Timestamp
    -   `checkpoint_type`: String (water, mood, weight)
    -   `value`: JSONB
    -   `notes`: Text
    -   `created_at`: Timestamp

### AI and Analytics Tables

-   **AIRecommendations**

    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `category`: String (meal, fasting, general)
    -   `recommendation`: Text
    -   `context`: JSONB
    -   `is_implemented`: Boolean
    -   `feedback_rating`: Integer
    -   `created_at`: Timestamp
    -   `expires_at`: Timestamp

-   **UserMetrics**

    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `metric_type`: String (weight, bmi, calories, water)
    -   `value`: Float
    -   `recorded_at`: Timestamp
    -   `created_at`: Timestamp

-   **ProgressAnalytics**
    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `analysis_type`: String
    -   `period_start`: Timestamp
    -   `period_end`: Timestamp
    -   `metrics`: JSONB
    -   `insights`: JSONB
    -   `created_at`: Timestamp

### Gamification Tables

-   **Achievements**

    -   `id`: UUID (Primary Key)
    -   `name`: String
    -   `description`: Text
    -   `category`: String
    -   `points`: Integer
    -   `requirements`: JSONB
    -   `icon_url`: String
    -   `created_at`: Timestamp

-   **UserAchievements**
    -   `id`: UUID (Primary Key)
    -   `user_id`: UUID (Foreign Key to Users)
    -   `achievement_id`: UUID (Foreign Key to Achievements)
    -   `earned_at`: Timestamp
    -   `created_at`: Timestamp

## Optimal Folder Structure

```
/
├── src/
│   ├── app/                    # App entry points and configuration
│   │   ├── _layout.tsx        # Root layout
│   │   └── index.tsx          # Entry point
│   │
│   ├── components/            # Reusable UI components
│   │   ├── common/            # Basic UI components
│   │   ├── forms/             # Form-related components
│   │   ├── layout/            # Layout components
│   │   └── features/          # Feature-specific components
│   │
│   ├── screens/               # Screen components
│   │   ├── auth/             # Authentication screens
│   │   ├── dashboard/        # Dashboard screens
│   │   ├── meals/           # Meal-related screens
│   │   ├── fasting/         # Fasting-related screens
│   │   └── profile/         # Profile screens
│   │
│   ├── navigation/           # Navigation configuration
│   │   ├── stacks/          # Stack navigators
│   │   ├── tabs/            # Tab navigators
│   │   └── routes.ts        # Route definitions
│   │
│   ├── services/            # Business logic and API services
│   │   ├── api/            # API client and endpoints
│   │   ├── auth/           # Authentication service
│   │   ├── database/       # Database operations
│   │   └── ai/            # AI integration services
│   │
│   ├── store/              # State management
│   │   ├── slices/        # Redux slices
│   │   ├── actions/       # Redux actions
│   │   └── reducers/      # Redux reducers
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── api/          # API-related hooks
│   │   ├── auth/         # Authentication hooks
│   │   └── ui/           # UI-related hooks
│   │
│   ├── utils/             # Utility functions
│   │   ├── validation/   # Form validation
│   │   ├── formatting/   # Data formatting
│   │   └── helpers/      # Helper functions
│   │
│   ├── constants/         # App constants
│   │   ├── api.ts       # API constants
│   │   ├── theme.ts     # Theme constants
│   │   └── config.ts    # App configuration
│   │
│   └── types/            # TypeScript type definitions
│
├── assets/               # Static assets
│   ├── images/          # Image assets
│   ├── fonts/           # Font files
│   └── animations/      # Lottie animations
│
├── docs/                # Documentation
│   ├── api/            # API documentation
│   ├── components/     # Component documentation
│   └── setup/          # Setup guides
│
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
│
├── scripts/            # Build and development scripts
│
└── config/             # Configuration files
    ├── jest/          # Jest configuration
    ├── babel/         # Babel configuration
    └── typescript/    # TypeScript configuration
```

This enhanced structure provides a scalable, maintainable, and organized codebase that follows React Native and TypeScript best practices. The database schema supports all the app's features including user management, meal tracking, fasting sessions, AI recommendations, and gamification elements.
