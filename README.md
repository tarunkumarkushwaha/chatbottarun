🚀 Chatbot Onboarding UI
A modern, user-friendly onboarding interface for setting up a chatbot for businesses. The UI covers user registration, organization setup, chatbot training, and integration testing.

📌 Features
1️⃣ User Registration
Users enter their name, email, and password.
Option to continue with Google.
Email verification with a one-time code to ensure genuine registrations.
2️⃣ Organization Setup
Users enter company name, website URL, and company description.
Bonus: Auto-fetch meta description from the website.
UI displays detected webpages:
Scraped pages ✅
Pending pages ⏳
Failed pages ❌
Users can click any page to see scraped data chunks.
Users can wait for chatbot training completion or proceed to the next step.
3️⃣ Chatbot Integration & Testing
🔹 Test Chatbot
"Test chatbot" button opens the client’s website with a dummy chatbot at the bottom right.
Topbar: "Chatbot not working as intended? Share feedback".
🔹 Integration Options
Users can integrate the chatbot via two methods:
Copy-Paste Code – Instructions to insert a script in the <head> tag.
Email Instructions – Mail chatbot integration steps to a developer.
🔹 Test Integration
Clicking "Test Integration" checks for successful setup.
🎉 Success UI with confetti animation 🎉
"Explore Admin Panel" button.
"Start talking to your chatbot" button.
Social media sharing buttons.
If integration fails:
Display an alternate UI guiding users on troubleshooting.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
