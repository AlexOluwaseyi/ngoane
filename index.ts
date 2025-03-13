import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

async function main() {
  console.log('Testing database connection...');
  
  try {
    // Attempt to query the database
    const testCount = await prisma.diagnosticTest.count();
    console.log('✅ Database connection successful!');
    console.log(`Found ${testCount} diagnostic test records in the database.`);
    
    // Optional: Fetch a sample record
    if (testCount > 0) {
      const sampleTest = await prisma.diagnosticTest.findFirst();
      console.log('Sample record:');
      console.log(JSON.stringify(sampleTest, null, 2));
    }
    
    return { success: true, count: testCount };
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    return { success: false, error };
  } finally {
    // Close the Prisma client connection
    await prisma.$disconnect();
  }
}

// Run the test and log results
main()
  .then((result) => {
    if (result.success) {
      console.log('Database connection test completed successfully.');
    } else {
      console.error('Database connection test failed.');
      process.exit(1);
    }
  })
  .catch((e) => {
    console.error('Unhandled error during test:', e);
    process.exit(1);
  });