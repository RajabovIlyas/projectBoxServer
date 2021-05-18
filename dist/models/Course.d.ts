import { Schema, Document } from 'mongoose';
export interface ICourse extends Document {
    id?: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}
export declare const CourseSchema: Schema;
declare const _default: import("mongoose").Model<ICourse, {}>;
export default _default;
