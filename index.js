import getPosts,{getPostsLength} from './postController.js'
import { generateRandomNumber, celciusToFarenheit } from './utils.js'
console.log(getPosts());
console.log(`Posts Length:${ getPostsLength()}`)

// const {generateRandomNumber, celciusToFarenheit}= require('./utils')

// console.log(`Random Number:${ generateRandomNumber()}`);
// console.log(`Celcius to farenhiet: ${celciusToFarenheit(32)}`)