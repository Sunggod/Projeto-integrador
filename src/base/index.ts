import { v4 as uuidv4 } from 'uuid'; // Você pode usar o UUID para gerar IDs únicos

export abstract class BaseEntry {
    id: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: string = uuidv4(), createdAt: Date = new Date(), updatedAt: Date = new Date()) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    abstract validate?(): boolean;
}
