"use server"
import client from '@/app/db';
import { NextRequest} from 'next/server';
import rateLimit from 'next-rate-limit';
import { cookies } from "next/headers";
import { Cache } from '@/app/utils/cache';


const limiter = rateLimit({
  interval: 60 * 1000, 
  uniqueTokenPerInterval: 500 
});


async function withRateLimit(fn:any, req:NextRequest) {
  const headers = limiter.checkNext(req, 2);
  const remaining = headers.get('X-RateLimit-Remaining');
  if(!remaining){
    throw new Error('Rate limit exceeded');
  }
  if (remaining && remaining === '0') {
    throw new Error('Rate limit exceeded');
  }

  return fn();
}

export default async function update(selectedContestant : string) {
  try {
    const uniqueKey = cookies().get('udaal');
    if(!uniqueKey){
      throw new Error('No unique key found');
    }

    if(Cache.getInstance().has('udaal')){
      throw new Error('You have already voted');
    }
    const dummyReq :unknown = { headers: new Map([['X-User-ID', uniqueKey]]) };
    
    await withRateLimit(async () => {
      await client.contestant.updateMany({
        where: {
          Name: selectedContestant
        },
        data: {
          Votes:{
            increment:1
          }
        },
      });
    }, dummyReq as NextRequest);
    return { message: 'Update successful' };
  } catch (error : any) {
    return { error: error.message, status: 429 };
  }
}
