import "reflect-metadata";
import { createConnection, ConnectionOptions } from 'typeorm';
import {Post} from "./entity/Post";
import { Counters } from './entity/Counters';

const options: ConnectionOptions = {
    type: 'mongodb',
    database: 'testdev',
    host: 'ds143717.mlab.com',
    port: 43717,
    username: 'deva',
    password: 'devapass',
    synchronize: true,
    entities: [Post,Counters]
};

createConnection(options).then(async connection => {
    const postRepository = connection.getRepository(Post);
     // save a post
     const post = new Post();
     post.title = "Post";
     post.names = ["umed", "dima", "bakhrom"];
     post.numbers = [1, 0, 1];
     post.booleans = [true, false, false];
     post.counters = [
         new Counters(1, "number #1"),
         new Counters(2, "number #2"),
         new Counters(3, "number #3"),
     ];
     post.other1 = [];
     await postRepository.save(post);
     console.log("Post has been saved: ", post);
     // check saved post
     const loadedPost = await postRepository.findOne({ title: "Post" });
    await connection.getRepository(Post).save(post);

    console.log("Post has been loaded: ", loadedPost);

    // take last 5 of saved posts
    const allPosts = await connection.getRepository(Post).find({ take: 5 });
    console.log("All posts: ", allPosts);

    // now update the post
    post.names = ["umed!", "dima!", "bakhrom!"];
    post.numbers = [11, 10, 11];
    post.booleans = [true, true, true];
    post.counters = [
        new Counters(11, "number #11"),
        new Counters(12, "number #12"),
    ];
    post.other1 = [
        new Counters(0, "other"),
    ];
    await postRepository.save(post);

    // now load updated post
    const loadedUpdatedPost = await postRepository.findOne({ title: "Post" });

    console.log("Post has been loaded: ", loadedUpdatedPost);

}, error => console.log("Error: ", error));