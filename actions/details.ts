"use server"
import client from '@/app/db';


export default async function getDetails() {
    try{
        const votes = await client.contestant.findMany({
            where: {
                Nominated:true
            }
          });
          console.log("Votes",votes);
          return votes;
    }
    catch(error){
        return [];
    }

   
}