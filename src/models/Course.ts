import {model, Schema, Document} from 'mongoose';

export interface ICourse extends Document {
    id?:string;
    name: string;
    surname: string;
    email:string;
    phone:string;
    orderNumber: string;
}

export const CourseSchema: Schema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  orderNumber: {type: String, required: true},
});


export default model <ICourse>('Course', CourseSchema);
