import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Try to find a user to test database query
    const User = (await import('@/models/User')).default;
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection and query successful!',
      timestamp: new Date().toISOString(),
      data: {
        userCount: userCount,
        mongoUri: process.env.MONGODB_URI ? 'Connected' : 'Not set',
        jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not set'
      }
    });
  } catch (error: any) {
    console.error('Database connection test error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error.message
      },
      { status: 500 }
    );
  }
}