# EmailJS Setup Guide

This guide will help you set up EmailJS to make your contact form functional.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail is recommended):
   - **Gmail**: Select "Gmail" and connect your Google account
   - **Outlook**: Select "Outlook" and connect your Microsoft account
   - **Other**: You can also use custom SMTP settings
4. Give your service a name (e.g., "Portfolio Contact Form")
5. Copy the **Service ID** - you'll need this for your `.env` file

## Step 3: Create an Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Template Name**: `contact_form`

**Subject**: `New Contact Form Message: {{subject}}`

**Content**:
```
Hello Rawaz,

You have received a new message from your portfolio contact form:

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Budget: {{budget}}
Timeline: {{timeline}}

Message:
{{message}}

---
This message was sent from your portfolio website contact form.
```

4. **Important**: Make sure to use these exact variable names:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`
   - `{{budget}}`
   - `{{timeline}}`

5. Save the template and copy the **Template ID**

## Step 4: Get Your Public Key

1. Go to "Account" → "General" in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy this key

## Step 5: Update Your Environment Variables

1. Open your `.env` file in the project root
2. Replace the placeholder values with your actual EmailJS credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test the Setup

1. Restart your development server: `npm run dev`
2. Navigate to the contact section of your portfolio
3. Fill out and submit the contact form
4. Check your email (the one connected to EmailJS) for the message

## EmailJS Free Plan Limits

- 200 emails per month
- Perfect for a portfolio contact form
- No credit card required

## Troubleshooting

**"EmailJS configuration is missing" error**:
- Make sure your `.env` file has the correct variable names with `VITE_` prefix
- Restart your development server after updating `.env`

**Emails not being sent**:
- Check your EmailJS dashboard for error logs
- Verify your email service is properly connected
- Make sure template variable names match exactly

**"Failed to send message" error**:
- Check browser console for detailed error messages
- Verify your public key and service ID are correct
- Ensure your EmailJS account is verified

## Security Notes

- The public key is safe to expose in frontend code
- Your email credentials are handled securely by EmailJS
- Never commit sensitive credentials to version control

## Need Help?

If you encounter issues:
1. Check the EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Verify all credentials are correct
3. Test with a simple message first

Once set up, your contact form will send emails directly to your configured email address! 