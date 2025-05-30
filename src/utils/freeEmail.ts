// Free Email Service Utilities

// Option 1: EmailJS (Free tier: 200 emails/month)
export const sendEmailWithEmailJS = async (templateParams: any) => {
  // Install: npm install @emailjs/browser
  try {
    const emailjs = await import('@emailjs/browser')
    
    const result = await emailjs.send(
      'YOUR_SERVICE_ID', // Get from emailjs.com
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_PUBLIC_KEY'
    )
    
    return { success: true, result }
  } catch (error) {
    console.error('EmailJS error:', error)
    return { success: false, error }
  }
}

// Option 2: Resend Free Tier (3,000 emails/month)
export const sendEmailWithResend = async (emailData: {
  to: string
  subject: string
  html: string
}) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    })
    
    return await response.json()
  } catch (error) {
    console.error('Resend error:', error)
    return { success: false, error }
  }
}

// Email templates
export const emailTemplates = {
  welcome: (nickname: string) => `
    <h1>Welcome to uPickGolf, ${nickname}!</h1>
    <p>Your account has been created successfully.</p>
    <p>Start building your fantasy golf teams today!</p>
  `,
  
  tournamentReminder: (tournamentName: string, deadline: string) => `
    <h1>Tournament Entry Reminder</h1>
    <p>Don't forget to submit your team for ${tournamentName}!</p>
    <p>Entry deadline: ${deadline}</p>
  `,
  
  scoreUpdate: (tournamentName: string, rank: number, score: number) => `
    <h1>Score Update - ${tournamentName}</h1>
    <p>Your current rank: #${rank}</p>
    <p>Total score: ${score} points</p>
  `
}

// Free alternative: Browser notifications
export const sendBrowserNotification = (title: string, body: string) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body })
  }
}

// Request notification permission
export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }
  return false
} 