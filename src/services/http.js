
import {QueryClient} from '@tanstack/react-query'

const BASE_URL = process.env.REACT_APP_API_URL;

export const queryClient = new QueryClient();

export function testURL(){
    console.log(BASE_URL);
    
}
