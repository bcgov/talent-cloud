import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

//TODO: Remove this entity and include with personell once we have final data model for form 

@Entity('form')
export class Form {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'jsonb' })
    data: any;
    
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
