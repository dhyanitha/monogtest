import { ObjectIdColumn, Entity, ObjectID, Column, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    age: number;

    @OneToMany(type => Category, category => category.owner, { cascadeInsert: true })
    categories: Category[]
}

@Entity()
export class Category {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    isPublished: boolean;

    @ManyToOne(type => User, user => user.posts, { cascadeInsert: true })
    owner: User;
}