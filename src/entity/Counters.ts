import { Column } from 'typeorm';

export class Counters {

        @Column()
        likes: number;

        @Column()
        text: string;

        constructor(likes: number, text: string) {
            this.likes = likes;
            this.text = text;
        }

    }