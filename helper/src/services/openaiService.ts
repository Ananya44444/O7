// import OpenAI from 'openai';

// Initialize OpenAI client (commented out for now)
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// Generate AI summary for blog content
export const generateAISummary = async (content: string): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock summary
    console.log('OpenAI integration disabled - returning mock summary');
    
    // Mock summary generation
    const wordCount = content.split(' ').length;
    const mockSummary = `This is a ${wordCount > 200 ? 'comprehensive' : 'concise'} article covering key topics and insights. The content provides valuable information and actionable takeaways for readers interested in the subject matter.`;
    
    return mockSummary;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise, engaging summaries of blog posts. Keep summaries under 150 words and highlight the main points."
        },
        {
          role: "user",
          content: `Please summarize the following blog post: ${content}`
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Unable to generate summary";
    */
  } catch (error) {
    console.error('OpenAI summary error:', error);
    return 'Summary generation is temporarily unavailable. Please try again later.';
  }
};

// Generate AI tagline for hero section
export const generateHeroTagline = async (companyDescription: string): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock tagline
    console.log('OpenAI integration disabled - returning mock tagline');
    
    const mockTaglines = [
      "Innovating Tomorrow, Today",
      "Your Success, Our Expertise",
      "Transforming Ideas into Reality",
      "Excellence in Every Solution",
      "Building the Future Together"
    ];
    
    const randomTagline = mockTaglines[Math.floor(Math.random() * mockTaglines.length)];
    return randomTagline;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a creative marketing assistant. Create compelling, professional taglines for businesses. Keep them under 20 words and make them memorable."
        },
        {
          role: "user",
          content: `Create a hero tagline for this company: ${companyDescription}`
        }
      ],
      max_tokens: 50,
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content || "Innovating Tomorrow, Today";
    */
  } catch (error) {
    console.error('OpenAI tagline error:', error);
    return "Innovating Tomorrow, Today";
  }
};

// Generate AI service descriptions
export const generateServiceDescription = async (serviceName: string, serviceType: string): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock service description
    console.log('OpenAI integration disabled - returning mock service description');
    
    const mockDescription = `${serviceName}

Our ${serviceName.toLowerCase()} service (${serviceType}) delivers exceptional results through innovative approaches and proven methodologies. We combine industry expertise with cutting-edge technology to provide tailored solutions that meet your specific requirements.

Key features include comprehensive analysis, strategic planning, and seamless implementation. Our team of experienced professionals ensures quality delivery and ongoing support to maximize your return on investment.

Whether you're looking to optimize existing processes or implement new solutions, our ${serviceName.toLowerCase()} service provides the expertise and reliability you need to achieve your goals.`;
    
    return mockDescription;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional copywriter. Create engaging service descriptions that highlight benefits and value propositions. Keep descriptions under 200 words."
        },
        {
          role: "user",
          content: `Create a professional service description for: ${serviceName} (Type: ${serviceType})`
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Professional service tailored to your needs.";
    */
  } catch (error) {
    console.error('OpenAI service description error:', error);
    return "Professional service tailored to your needs.";
  }
};

// Generate AI project summary
export const generateProjectSummary = async (projectTitle: string, projectDescription: string, technologies: string[]): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock project summary
    console.log('OpenAI integration disabled - returning mock project summary');
    
    const mockSummary = `${projectTitle}

${projectDescription}

This innovative project leverages modern technologies including ${technologies.join(', ')} to deliver a robust and scalable solution. The implementation showcases best practices in software development, featuring clean architecture, responsive design, and optimal performance.

Key highlights include comprehensive functionality, user-friendly interface, and seamless integration capabilities. The project demonstrates expertise in full-stack development and delivers exceptional user experience across all platforms.`;
    
    return mockSummary;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a technical writer. Create concise project summaries that highlight key features, technologies, and outcomes. Keep summaries professional and under 150 words."
        },
        {
          role: "user",
          content: `Create a project summary for: ${projectTitle}. Description: ${projectDescription}. Technologies used: ${technologies.join(', ')}`
        }
      ],
      max_tokens: 200,
      temperature: 0.6,
    });

    return response.choices[0]?.message?.content || "Innovative project showcasing modern technologies and best practices.";
    */
  } catch (error) {
    console.error('OpenAI project summary error:', error);
    return "Innovative project showcasing modern technologies and best practices.";
  }
};

// Generate AI team introduction
export const generateTeamIntro = async (companyInfo: string): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock team introduction
    console.log('OpenAI integration disabled - returning mock team introduction');
    
    const mockIntro = `Meet Our Team

Our experienced team of professionals brings together diverse expertise and a shared commitment to excellence. With years of industry experience and a passion for innovation, we work collaboratively to deliver outstanding results for our clients.

We believe in the power of teamwork, continuous learning, and maintaining the highest standards of professionalism. Our team members are not just skilled professionals – they are dedicated partners in your success.

From initial consultation to project completion, our team is committed to providing exceptional service, innovative solutions, and building lasting relationships with our clients.`;
    
    return mockIntro;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional content writer. Create engaging team introduction content that highlights expertise, experience, and company culture. Keep it professional yet personable."
        },
        {
          role: "user",
          content: `Create a team introduction for this company: ${companyInfo}`
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content || "Our experienced team of professionals is dedicated to delivering exceptional results and innovative solutions.";
    */
  } catch (error) {
    console.error('OpenAI team intro error:', error);
    return "Our experienced team of professionals is dedicated to delivering exceptional results and innovative solutions.";
  }
};

// Generate AI reply for contact form
export const generateContactReply = async (originalMessage: string, senderName: string): Promise<string> => {
  try {
    // OpenAI integration commented out - returning mock contact reply
    console.log('OpenAI integration disabled - returning mock contact reply');
    
    const mockReply = `Dear ${senderName},

Thank you for reaching out to us! We have received your inquiry and appreciate you taking the time to contact us.

Our team will review your message carefully and respond within 24 hours with detailed information to address your needs. In the meantime, please feel free to browse our services and resources on our website.

We look forward to the opportunity to work with you and provide the solutions you're looking for.

Best regards,
The MasterSolis Team`;
    
    return mockReply;

    // Original OpenAI code (commented out):
    /*
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional customer service representative. Create personalized, helpful replies to contact form submissions. Be professional, acknowledge their inquiry, and provide next steps."
        },
        {
          role: "user",
          content: `Create a professional reply to this contact form message from ${senderName}: "${originalMessage}"`
        }
      ],
      max_tokens: 250,
      temperature: 0.6,
    });

    return response.choices[0]?.message?.content || `Thank you for your inquiry, ${senderName}. We have received your message and will respond within 24 hours.`;
    */
  } catch (error) {
    console.error('OpenAI contact reply error:', error);
    return `Thank you for your inquiry, ${senderName}. We have received your message and will respond within 24 hours.`;
  }
};