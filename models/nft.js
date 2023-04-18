
import content from '../layers/content.js';

const nft = new Object(
    {
        Content: content,
        password: {
            type: String,
            max: 10,
            default:'password not provided yet'
        },
        hashCode: {
            type: String,
            default: 'hash not computed yet'
        }

    }
)
export default nft;