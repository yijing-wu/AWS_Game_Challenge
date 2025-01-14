# AWS Dev Challenge Project

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [How we built it](#How-we-built-it)
- [How to Run the Project](#how-to-run-the-project)
- [Team Members](#team-members)

## Project Overview
video: https://youtu.be/ZeEgnOYpwLs

1.**Inspiration**  

This game is designed to help players express love and gratitude through music and words on holidays and special occasions. It encourages meaningful connections by turning collected musical notes into personalized melodies that convey heartfelt emotions.  
Our team of four members, who were once classmates, created this game to bridge the physical distance between us after graduation as we now live across the globe. Despite being separated by oceans, music, and warm words have kept us close.  
The game reflects our shared humanistic values and showcases the charm of combining creativity with technology, inspiring players to connect with their loved ones in an innovative and emotional way.  
As we step into 2025 new year, we hope everyone remembers to reconnect with old friends and cherish the bonds that have shaped our lives.

2.**Challenges we ran into**  
Some of the biggest challenges we faced involved integrating multiple Amazon AWS services seamlessly, especially ensuring smooth data flow between the game, generative AI, and the email delivery system. Debugging unexpected behavior across the pipeline also required significant effort and teamwork.

3.**Accomplishments that we're proud of**  
We are proud of creating a game that helps people reconnect and express their emotions in a thoughtful way. Our biggest accomplishment is enabling players to easily share their feelings of love and gratitude with friends and family at the start of a new year, fostering deeper connections despite physical distances.

4.**What we learned**  
Throughout this journey, we gained extensive knowledge about Amazon AWS Services and how to use them effectively in building scalable and interactive applications. From learning how to manage secure APIs to leveraging generative AI for creating personalized content, this project has been a tremendous learning experience.

5.**What's next**
Moving forward, we plan to expand the features of the game, including:  
- Adding multiplayer modes for collaborative music creation,  
- Introducing more dynamic music styles and instruments for greater personalization,  
- Enhancing the AI to better capture and reflect player emotions,  
- Supporting additional platforms and devices to make the game accessible to a broader audience.  


## Key Features

1. **Music Note Collection Game**
- Players collect musical notes while playing a fun and interactive game.
- The collected notes are automatically composed into unique music based on the player’s progress and input.
- Players can customize the music by selecting its key and tonality, adding a creative and personal touch to the experience.
- The game incorporates interactive 3D objects on the webpage, allowing players to engage with a visually dynamic environment. Players can interact with 3D elements such as instruments, note icons, or other creative objects, enhancing the overall immersive experience.

2. **AI-Assisted Text Polishing**
- Integrate with generation model to generate personalized content.
- Quickly and effectively polish user input to produce high-quality, refined text.
- AI helps refine greeting messages, improving grammar, tone, and style with juicy Emojis

3. **Automated html based Email Generation and Sending**
- Players can generate emails automatically based on specific commands or templates provided during gameplay or other interactions.
- Once the email content is finalized, the system ensures it is sent to the desired recipients seamlessly, saving time and effort.

## How we built it

To build this game, we combined creative ideas with the right technologies and tools to deliver a fun and engaging experience. Here’s what we used:
Frontend Development:
We built the frontend using **React**, creating a dynamic and responsive user interface. To make the experience more immersive and interactive, we added 3D models using **Three.js**, giving the game a unique and playful flavor.
Music Generation
The game incorporates music theory, using music scales to generate melodies in different styles, perfectly matching the theme and emotion of each greeting card.
We relied heavily on powerful AWS tools: 
- **Amazon S3** for scalable storage of game assets  	
- **CloudFront** for fast content delivery and low latency  
- **IAM** for secure access management  
- **Lambda** for serverless computing  
- **CloudWatch** for monitoring, logging, and troubleshooting
- **API Gateway** to connect and manage APIs  
- **Bedrock** for leveraging generative AI capabilities  
- **SES (Simple Email Service)** for sending personalized emails with the generated music cards  
       - CI/CD Pipeline:
We used GitHub Actions to automate deployments and ensure smooth updates.

By combining these technologies, we created a game that’s not only functional and scalable but also creative, fun, and easy to use.

   
## How to Run the Project

### 1. Clone the Repository
Clone the project to your local environment using the following command:
```
git clone git@github.com:wuqiujie/AWS_Game_Challenge.git
```

### 2. Install Dependencies
Make sure you have Node.js and npm installed. Then, install dependencies:
   ```
   npm install
   ```

### 3. Configure Environment Variables
Create a .env file in the root directory and add the following environment variables:

REACT_APP_AWS_REGION=<your-aws-region>
REACT_APP_AWS_ACCESS_KEY=<your-aws-access-key>
REACT_APP_AWS_ACCESS_SECRET=<your-aws-access-secret>
REACT_APP_S3_BUCKET_NAME=<your-s3-bucket-name>

Replace <your-aws-region>, <your-aws-access-key>, <your-aws-access-secret>, and <your-s3-bucket-name> with your actual AWS credentials and configuration details.



### 4. Run the Application 
Start the application locally: 
    ```
    npm start
    ```

## Team Members
* [Kristin Wu](https://github.com/wuqiujie)
* [Jialu Sun](https://github.com/sx18014) 
* [Yijing Wu](https://github.com/yijing-wu)
* [Lena Du](https://github.com/LenaDu)
