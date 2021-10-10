import { RichText } from "prismic-dom";


export function TextToReadingDuration(content){
    const text = `${content[0].heading} `.concat(RichText.asText(content[0].body));
    const totalWords = text.split(' ').length;
    return Math.ceil(totalWords / 200) 
}