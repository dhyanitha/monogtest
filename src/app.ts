import "reflect-metadata";
import { createConnection, ConnectionOptions } from 'typeorm';
import { User, Category } from './entity/User';


const options: ConnectionOptions = {
    type: 'mongodb',
    database: 'testdev',
    host: 'ds143717.mlab.com',
    port: 43717,
    username: 'deva',
    password: 'devapass',
    synchronize: true,
    entities: [User,Category]
};

createConnection(options).then(async connection => {
    const userRepository = connection.getRepository(User);
    const categoryRepository = connection.getRepository(Category);
    const user = userRepository.create({
        name: "Deva",
        age: 23,
    });

    const savedUser = await userRepository.save(user);

    const cat1 = categoryRepository.create({
        title: "Post #1",
        isPublished: true,
        owner: savedUser
    });
    const cat2 = categoryRepository.create({
        title: "Post #2",
        isPublished: false,
        owner:savedUser
    });

    await categoryRepository.save([cat1, cat2]);

     console.log("Post has been saved: ", savedUser);
     // check saved post
     const loadedUser = await userRepository.findOne({ name: "deva" });


    console.log("Post has been loaded: ", loadedUser);



}, error => console.log("Error: ", error));