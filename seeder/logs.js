const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const LogModel = require('../modals/logs'); 
const mongoURI = 'mongodb://localhost:27017/'; 

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to generate a random log object
const generateRandomLog = () => {
    const randomInteger = Math.floor(Math.random() * 2)
    const options = ['info','warning','error']
    return {
        level: options[randomInteger],
        message: faker.lorem.sentence(),
        resourceId: `server-${faker.number.int({min:100000,max:999999})}`,
        timestamp: faker.date.recent(),
        traceId: faker.string.uuid(),
        spanId: `span-${faker.number.int({min:100000,max:999999})}`,
        commit: faker.git.commitSha(),
        metadata: {
            parentResourceId: `server-${faker.number.int({min:100000,max:999999})}`,
        },
    };
};

// Function to populate logs
const populateLogs = async (numLogs) => {
    try {
        const logs = Array.from({ length: numLogs }, generateRandomLog);
        const insertedLogs = await LogModel.insertMany(logs);
        console.log(`${insertedLogs.length} logs inserted into the database.`);
    } catch (error) {
        console.error('Error populating logs:', error);
    } finally {
        // Close the connection after inserting logs
        mongoose.connection.close();
    }
};

// Define the number of fake logs you want to generate
const numberOfLogsToGenerate = 1000;

// Call the populateLogs function
populateLogs(numberOfLogsToGenerate);
