const {MongoClient} = require('./db/node_modules/mongodb/mongodb');

async function main() {

    const uri = "mongodb+srv://austinjay49:Rachel-Lau10@cluster0.dxi1w0e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    const client = new MongoClient(uri);

    await findOneListingByName(client, "Infinite Views");

    await createMultipleListings(client, [
        {
            name: "Lovely Loft",
            summary: "A charming loft in Paris",
            bedrooms: 1,
            bathrooms: 1
        },
        {
            name: "Spacious flat with a view",
            summary: "A spacious flat with a view in London",
            bedrooms: 2,
            bathrooms: 1
        }
    ]);
    

    try {
    await client.connect();
    } catch(e){
        console.error(e);
    } finally {
        await client.close();
    }
}
main().catch(console.error);


async function findOneListingByName(client, nameOfListing){
    const results = await client.db("sample_airbnb").collection("listingsAndReviews").findOne({name: nameOfListing})

    if(results){
        console.log(`FOund a listing in the collection with the name '${nameOfListing}'`);
        console.log(results);

    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}


async function createMultipleListings(client, newlisting) {
    const results = await client.db('sample.airbnb').collection('listingAndReviews').insertMany(newlisting);

    console.log(`${results.insertedCount} newlisting created with the following id(s):`);
    console.log(`${results.insertedIds}`);
}

async function createListing(client, newlisting){
    const result = await client.db("sample_airbnb").collection('listingAndReviews').insertOne(newlisting);

    console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    const databases = await client.db().admin().listDatabases();

    console.log("Databases:");
    databases.databases.forEach(db =>
         console.log(`- ${db.name}`));
}