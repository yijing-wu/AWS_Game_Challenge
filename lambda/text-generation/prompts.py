# example conversation prompt

guidelines = """You are a thoughtful and creative holiday card writer. Your task is to write personalized holiday cards that capture the right tone and sentiment for each specific occasion. Follow these guidelines:

1. Write cards that are appropriate for the specified holiday and relationship
2. Maintain the requested tone throughout the message
3. Include personal details provided in the additional information
4. Keep the message concise but meaningful
5. Don't make up information not provided in the prompt
6. End with an appropriate closing that matches the relationship and tone
7. Ensure the language is culturally appropriate for the holiday
8. Use html format for the email body and make it visually appealing

Format the card with:
- A greeting line
- Main message body
- Closing
- Signature line"""

user_message_ex1 = """
To: Sarah
From: Emily
Holiday: Christmas
Relationship: Friend
Tone: Warm and friendly
Additional information: None.
"""

assistant_message_ex1 = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        /* Using inline styles is recommended for email clients */
    </style>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f8f9fa;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Festive Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #c41e3a; font-size: 28px; margin: 0; padding-bottom: 15px; border-bottom: 2px solid #holly;">
                🎄 Season's Greetings 🎄
            </h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;">
                Dear Sarah,
            </p>
            
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px; line-height: 1.8;">
                Wishing you a holiday season filled with joy, warmth, and laughter! May your Christmas be merry and bright, and the New Year bring you happiness and success.
            </p>

            <!-- Decorative Divider -->
            <div style="text-align: center; margin: 25px 0;">
                ❄️ ⭐ 🎄 ⭐ ❄️
            </div>

            <!-- Signature -->
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 10px;">
                With love and holiday cheer,
            </p>
            <p style="font-size: 18px; color: #c41e3a; font-weight: bold; margin-bottom: 25px;">
                Emily
            </p>

            <!-- Music Link -->
            <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <a href="https://aws-game-music-bucket.s3.us-east-1.amazonaws.com/mistletoe.mp3" 
                   target="_blank" 
                   style="display: inline-block; padding: 12px 25px; background-color: #c41e3a; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; transition: background-color 0.3s ease;">
                    🎵 Click here to listen to a festive tune! 🎶
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #7f8c8d; font-size: 12px;">
            <p style="margin: 5px 0;">
                🎄 Wishing you a wonderful holiday season! 🎄
            </p>
        </div>
    </div>
</body>
</html>

"""

user_message_ex2 = """
To: Team ABC
From: Your Manager, John
Holiday: New Year
Relationship: Manager to team
Tone: Professional and motivational
Additional information: The upcoming year is 2025.
"""

assistant_message_ex2 = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 30px; text-align: center; background-color: #003366; border-radius: 8px 8px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-family: Arial, sans-serif; font-size: 28px;">✨ Happy New Year 2025! ✨</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                <tr>
                                    <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333333;">
                                        <p style="margin: 0 0 20px 0;">Dear Team,</p>
                                        <p style="margin: 0 0 20px 0;">Happy New Year! I am so grateful for the hard work and dedication you've shown this past year. Let's continue to achieve great things together in the year ahead. Wishing you and your families health, happiness, and prosperity in 2025!</p>
                                        <p style="margin: 30px 0 10px 0;">Best Regards,</p>
                                        <p style="margin: 0; font-weight: bold; color: #003366;">Jack</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Music Button -->
                    <tr>
                        <td style="padding: 0 30px 40px 30px; text-align: center;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin: 0 auto;">
                                <tr>
                                    <td style="background-color: #003366; border-radius: 25px; padding: 12px 25px;">
                                        <a href="https://aws-game-music-bucket.s3.us-east-1.amazonaws.com/mistletoe.mp3" 
                                           target="_blank" 
                                           style="color: #ffffff; text-decoration: none; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold;">
                                            🎵 Listen to Your New Year Music! 🎵
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px 30px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                            <p style="margin: 0; font-family: Arial, sans-serif; font-size: 12px; color: #666666;">
                                🎊 Here's to a fantastic 2025! 🎊
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
"""

user_message_ex3 = """
To: Grandma & Grandpa,
From: Chloe,
Holiday: Thanksgiving
Relationship: Family
Tone: Loving and grateful
Additional information: I am planning to visit them for Christmas. I am thankful for their love and support.
"""

assistant_message_ex3 = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        /* Inline styles for better email client compatibility */
    </style>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; background-color: #fffaf0;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <!-- Festive Header -->
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #d2691e; font-size: 28px; margin: 0; padding-bottom: 15px; border-bottom: 2px solid #f4a460;">
                🦃 Happy Thanksgiving! 🦃
            </h1>
        </div>

        <!-- Main Content -->
        <div style="padding: 20px 0;">
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px;">
                Dear Grandma and Grandpa,
            </p>
            
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px; line-height: 1.8;">
                Happy Thanksgiving! I’m so thankful for all the love and support you’ve given me. You’ve always been there for me, and it means the world.
            </p>

            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px; line-height: 1.8;">
                I can’t wait to see you both this Christmas and spend time together during the holidays.
            </p>

            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 20px; line-height: 1.8;">
                Wishing you a wonderful Thanksgiving filled with love, delicious food, and cherished memories.
            </p>

            <!-- Decorative Divider -->
            <div style="text-align: center; margin: 25px 0;">
                🍂 🦃 🍁 🧡 🍁 🦃 🍂
            </div>

            <!-- Signature -->
            <p style="font-size: 16px; color: #2c3e50; margin-bottom: 10px;">
                With all my love,
            </p>
            <p style="font-size: 18px; color: #d2691e; font-weight: bold; margin-bottom: 25px;">
                Chloe
            </p>

            <!-- Thanksgiving Recipe Link -->
            <div style="text-align: center; margin-top: 30px; padding: 15px; background-color: #fffaf0; border-radius: 8px;">
                <a href="https://www.example.com/thanksgiving-recipe" 
                   target="_blank" 
                   style="display: inline-block; padding: 12px 25px; background-color: #d2691e; color: white; text-decoration: none; border-radius: 25px; font-weight: bold; transition: background-color 0.3s ease;">
                    🦃 Check Out your Thanksgiving Music! 🎶
                </a>
            </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #7f8c8d; font-size: 12px;">
            <p style="margin: 5px 0;">
                🧡 Wishing you a Thanksgiving full of love and gratitude! 🧡
            </p>
        </div>
    </div>
</body>
</html>
"""
