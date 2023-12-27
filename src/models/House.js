import { Schema, model } from 'mongoose';
import 'dotenv/config';

const HouseSchema = new Schema(
    {
        thumbnail: String,
        description: String,
        price: Number,
        locaction: String,
        status: Boolean,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);
HouseSchema.virtual('thumbnail_url').get(function () {
    const baseUrl = process.env.BASEURL;
    return `${baseUrl}${this.thumbnail}`;
});

export default model('House', HouseSchema);
