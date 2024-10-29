import { MongoClient } from 'mongodb';

// Connection URI
const uri = 'mongodb+srv://blank:Astro_13@cluster0.h3zj1.mongodb.net/';

// Create a new MongoClient
const client = new MongoClient(uri);

export async function fetchProjects() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Specify the database and collection
        const database = client.db('Projects');
        const collection = database.collection('Projects');

        // Query the collection for all projects
        const projects = await collection.find({}).toArray();

        return projects;

    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    } finally {
        // Close the connection
        await client.close();
    }
}

